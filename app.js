// ClanRecruiting is a simple JavaScript app to allow players in the game World of Tanks to track players as they leave clans
// Copyright (C) 2019  Seth Kuipers

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const portNum = process.argv[2];

// Modules required by the program
const fs = require("fs");
const readline = require("readline");
const JavaScriptObfuscator = require("javascript-obfuscator");
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const path = require("path");

// Path constants
const historical = "./historical/";

// Other constants
const config = require("./config.json");
const appConfig = config.app;
const clanList = config.clanlist;
const numClans = clanList.length;
const server = determineURL(appConfig.server);

// Serve the html file
app.get("/",function(req,res){ res.sendFile(path.join(__dirname+"/index.html")); });

// Serve the supporting JS file. Obfuscate
app.get("/recruitTracker.js",function(req,res){
    fs.readFile(path.join(__dirname+"/recruitTracker.js"), "utf8", function(err, contents) {
        const minimizedContents = JavaScriptObfuscator.obfuscate(contents, {compact: true, controlFlowFlattening: true});
        res.contentType("application/javascript");
        res.send(minimizedContents._obfuscatedCode);
    });
});

// Request the data from WG API and save it to disk
app.get("/pullData", function(req, res) {
    var input = "";

    // Construct the string of the clan_ids to be requested from WG API
    // Done in one shot to ensure the Req/Sec is not exceeded
    for (i = 0; i < numClans; i++) { input = input + clanList[i] + "%2C"; }

    // Using node-fetch, retrieve the data needed and run the check
    // Everything is done in the here because fetches are handled async, so it was just easier(TM)
    fetch("https://api.worldoftanks" + server + "/wot/clans/info/?application_id=" + appConfig.application_id + "&clan_id=" + input + "&fields=members.account_id%2Ctag")
        .then(res => res.json())
        .then(json => {
            if (req.query.check == "true") {
                runCheck(json);
                res.status(200).json({success : "New comparison data pulled"});
                return;
            } else {
                seedData(json);
                res.status(200).json({success : "New starting data has been pulled"});
                return;
            }
        })
        .catch(function() { res.status(400).json({error : "An unexpected error occured during an api call. Try again later"}); return; });
});

app.get("/display", function(req, res) {
    var players = "";

    // Wargaming API will return fields not in the order they are sent, but in numerically increasing order
    // Therefore I need to be able to track the index the players are removed and
    var playerId = [];
    var oldClans = [];

    // Construct the string of the account_id's to convert to player names for readable output
    // Done in one shot to ensure the Req/Sec is not exceeded
    fs.readFileSync(historical + "left_players.txt", "utf-8").trim().split(",").forEach(element => {
        if (element.trim() != "") { // A blank file or eof
            let splitLine = element.trim().split("_");
            players = players + splitLine[0] + "%2C";
            
            playerId.push(splitLine[0]);
            oldClans.push(splitLine[1]);
        }
    });
        
    if (playerId.length < 1) { res.status(200).json({success : "No players have left any tracked clans"}) ; return; }
    
    // Using node-fetch, retrieve the data needed and run the check
    fetch("https://api.worldoftanks" + server + "/wot/account/info/?application_id=" + appConfig.application_id  + "&account_id=" + players + "&fields=nickname%2C+account_id")
        .then(res => res.json())
        .then(json => {
            let numPlayers = playerId.length;
            
            // Assemble a JSON object of all the players that have left
            var playerList = "{";
            
            for (i = 0; i < numPlayers; i++) {
                playerList = playerList + "\"" + (json.data)[(playerId[i]).trim()].nickname + "\"" + " : " + "\"" + oldClans[i] + "\"";
                if (i != numPlayers - 1) { playerList = playerList + ", "; }
            }
            
            playerList = playerList + "}";
            
            res.status(200).send(playerList);
            return;
        })
        .catch(function() { res.status(400).json({error : "An unexpected error occured during an api call. Try again later"}); return; });
});

// Using the new player data run a check to see all players that have left their respective clans
function runCheck(fetched) {
    var historicalData = [];

    // Load the historical data from files and add them to an array
    fs.readdirSync(historical).forEach(file => {
        if (file != "README.md" && file != "left_players.txt") { 
            fs.readFileSync(historical + file, "utf-8").trim().split("\n").forEach(line => { 
            historicalData.push(line + "_" + file.split(".")[0]); });
        }
    });
    
    for (i = 0; i < numClans; i++) {
        let playerList = "";

        (((fetched.data)[clanList[i]]).members).forEach(player => {
            playerList = playerList + player.account_id + "\n";
            
            let index = historicalData.indexOf(player.account_id + "_" + ((fetched.data)[clanList[i]]).tag);
            if (index != -1) { historicalData.splice(index, 1); }
        });
        
        // Write the player list to the file. This is the new historical data
        fs.writeFile(historical + ((fetched.data)[clanList[i]]).tag + ".txt", playerList, (err) => { if (err) { throw err; } });
    }
    
    // Write the remaining players to the left file
    fs.writeFile(historical + "left_players.txt", historicalData, (err) => { if (err) { throw err; } });
    
    return;
}

// Seed new files into the "historical" directory in the event it is empty
function seedData(fetched) {
    for (i = 0; i < numClans; i++) {
        let playerList = "";

        (((fetched.data)[clanList[i]]).members).forEach(player => { playerList = playerList + player.account_id + "\n"; });

        // Write the player list to the file. This is the new historical data
        fs.writeFile(historical + ((fetched.data)[clanList[i]]).tag + ".txt", playerList, (err) => { if (err) { throw err; } });
    }

    return;
}

// Helper function for assigning the correct TLD for the various regions
function determineURL(region) {
    switch(region.toLowerCase()) {
        case "na":
            return ".com";
        case "eu":
            return ".eu";
        case "ru":
            return ".ru";
        case "asia":
            return ".asia"
        default:
            throw "Invalid region - please read the README for valid servers";
            return;
    }
}
app.listen(portNum);