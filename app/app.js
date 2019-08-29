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
const JavaScriptObfuscator = require("javascript-obfuscator");
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const path = require("path");

// Path constants
const historical = "./historical/";

// Config constants
const config = require("./config.json");
const inactive = determineValidTime((config.app).inactive_weeks);
const urlStarter = "https://api.worldoftanks" + determineApiUrl((config.app).server);
const wotlabs = "https://wotlabs.net/" + determineWotlabsRegion((config.app).server) + "/player/";

// Other constants
const clanList = config.clanlist;
const epochWeek = 604800;
const numClans = clanList.length;

// Serve the html file
app.get("/",function(req,res){ res.sendFile(path.join(__dirname+"/index.html")); });

// Serve the supporting JS file. Obfuscate
app.get("/recruitTracker.js", function(req,res){
    fs.readFile(path.join(__dirname+"/recruitTracker.js"), "utf8", function(err, contents) {
        const minimizedContents = JavaScriptObfuscator.obfuscate(contents, {compact: true, controlFlowFlattening: true});
        res.contentType("application/javascript");
        res.send(minimizedContents._obfuscatedCode);
    });
});

// Callback function to handle Ajax request
app.get("/pullData", async function(req, res) {
    let result = await pullRosters(req.query.check); res.status(200).send(result); return;
});

// CORE FUNCTIONS

// An async function which will assemble a string of all the clans and request an API call
// If the user has requested on new data, the pulled data is written to file. If the user wants to compare to the old data, this is handed to a different function
async function pullRosters(check) {
    var clansToCheck = "";

    // Construct the string of the clan_ids to be requested from WG API
    // Done in one shot to ensure the Req/Sec is not exceeded
    for (i = 0; i < numClans; i++) { clansToCheck = clansToCheck + clanList[i] + "%2C"; }
        
    let json = await callApi(urlStarter + "/wot/clans/info/?application_id=" + (config.app).application_id + "&clan_id=" + clansToCheck + "&fields=members.account_id%2Ctag");

    if (check == "true") { checkClanRosters(json); return await constructNameList(); }
    else { // Seed New Data
        for (i = 0; i < numClans; i++) {
            let playerList = "";

            (((json.data)[clanList[i]]).members).forEach(player => { playerList = playerList + player.account_id + "\n"; });

            // Write the player list to the file. This is the new historical data
            fs.writeFileSync(historical + ((json.data)[clanList[i]]).tag + ".txt", playerList, (err) => { if (err) { throw err; } });
        } // Return value

        return "{ \"success\" : \"New data has been saved\" }";
    }
}

// A function which uses the information retrieved by pullRosters to compare the existing clan rosters to the new roster in order to find players that have left
// When it is done it writes the new roster to file as well as the the ids of the players that have left
function checkClanRosters(fetched) {
    var historicalData = [];

    // Load the historical data from files and add them to an array
    fs.readdirSync(historical).forEach(file => {
        if (file != "left_players.txt") { 
            fs.readFileSync(historical + file, "utf-8").trim().split("\n").forEach(line => { 
            historicalData.push(line + "." + file.split(".")[0]); });
        }
    });
    
    for (i = 0; i < numClans; i++) {
        let playerList = "";

        (((fetched.data)[clanList[i]]).members).forEach(player => {
            playerList = playerList + player.account_id + "\n";
            
            let index = historicalData.indexOf(player.account_id + "." + ((fetched.data)[clanList[i]]).tag);
            if (index != -1) { historicalData.splice(index, 1); }
        });
        
        // Write the player list to the file. This is the new historical data
        fs.writeFileSync(historical + ((fetched.data)[clanList[i]]).tag + ".txt", playerList, (err) => { if (err) { throw err; } });
    }
    
    // Write the remaining players to the left file
    fs.writeFileSync(historical + "left_players.txt", historicalData, (err) => { if (err) { throw err; } });
    
    return;
}

// An async function which makes an API call to get the names of all the and then constructs and returns the message for the app
async function constructNameList() {
    var playerIds = "";

    // Wargaming API will return fields not in the order they are sent, but in numerically increasing order
    // Therefore I need to be able to track the index the players are removed and
    var playerId = [];
    var oldClans = [];

    // Construct the string of the account_id's to convert to player names for readable output
    // Done in one shot to ensure the Req/Sec is not exceeded
    fs.readFileSync(historical + "left_players.txt", "utf-8").trim().split(",").forEach(element => {
        if (element.trim() != "") { // A blank file or eof
            let splitLine = element.trim().split(".");
            playerIds = playerIds + splitLine[0] + "%2C";
            
            playerId.push(splitLine[0]);
            oldClans.push(splitLine[1]);
        }
    });

    if (playerId.length < 1) { return "{ \"success\" : \"No players have left any tracked clans\" }" ; return; }

    let json = await callApi(urlStarter + "/wot/account/info/?application_id=" + (config.app).application_id  + "&account_id=" + playerIds + "&fields=nickname%2C+account_id%2Clast_battle_time");

    let numPlayers = playerId.length;
            
    // Assemble a JSON object of all the players that have left
    var playerList = "{";
    
    for (i = 0; i < numPlayers; i++) {
        var id = (json.data)[(playerId[i]).trim()];

        // Check for inactive players. Get the current system time, convert to seconds and then do the calculation
        if(((new Date).getTime()/1000) - id.last_battle_time >= epochWeek * inactive) {
            playerList = playerList + "\"" + id.nickname + "\"" + " : " + "\"" + oldClans[i] + " - (INACTIVE)"+ "\"";
        } else {
            playerList = playerList + "\"" + "<a href=" + wotlabs + id.nickname + ">" + id.nickname + "</a>" + "\"" + " : " + "\"" + oldClans[i] + "\"";
        }
        if (i != numPlayers - 1) { playerList = playerList + ", "; }
    }
    
    playerList = playerList + "}";

    return playerList;
}

// API CALL FUNCTIONS

// An async function which retrieves the clan rosters of all clans defined in the config.json file
async function callApi(url) {
    // Using node-fetch, retrieve the data needed and run the check
    return await fetch(url)
        .then(res => res.json())
        .catch(err => { return "An unexpected error occured during an api call. Try again later"; });
}

// HELPER FUNCTIONS

// Helper function for assigning the correct TLD for the various regions
function determineApiUrl(region) {
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
    }
}

function determineWotlabsRegion(region) {
    switch(region.toLowerCase()) {
        case "na":
            return "na";
        case "eu":
            return "eu";
        case "ru":
            return "ru";
        case "asia":
            return "sea";
        default:
            throw "Invalid region - please read the README for valid servers";
    }
}

// Helper function for ensuring the user has given a valid inactive period
function determineValidTime(time) {
    if(time < 1) {
        throw "The number of inactive weeks can not be set lower than 1 week";
    }
    return time;
}

app.listen(portNum);