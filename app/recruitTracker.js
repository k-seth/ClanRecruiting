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

$(document).ready(function() {
    // On button click, make a call to Node to pull info from API and save.
    $("#runCheck").click(function(e) {
        $.ajax({
            url:"/pullData",
            type:"GET",
            dataType:"text",
            data: {check:"true"},
          
            success: function(msg) {
                $("#resultBlock").html("");
                let obj = JSON.parse(msg);
                
                if (obj.success) { $("#resultBlock").html(obj.success); }
                else {
                    for (var key in obj) {
                        $("#resultBlock").append(key + " left " + obj[key] + "</br>");
                    }  
                }
            },
            error: function(msg) { $("#resultBlock").html(""); alert(JSON.parse(msg).error); }
        });
    });

    // On button click, make a call to the API and get seed data to be the first comparison
    $("#setupInfo").click(function(e) {
        $.ajax({
            url:"/pullData",
            type:"GET",
            dataType:"text",
            data: {check:"false"},
          
            success: function(msg) {
                $("#resultBlock").html("");
                $("#resultBlock").html(JSON.parse(msg).success);
            },
            error: function(msg) { $("#resultBlock").html(""); alert(JSON.parse(msg).error); }
        });
    });
});