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
                console.log(JSON.parse(msg).success);
				display();
            }, error: function(msg) {
				console.log(JSON.parse(msg).error);
			}
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
                console.log(JSON.parse(msg).success);
            }, error: function(msg) {
				console.log(JSON.parse(msg).error);
			}
        });
    });
	
	// Debug only. Program should be used via the runCheck callback
	// $("#display").click(function(e) {
		// display();
	// });
});

function display() {
	$.ajax({
		url:"/display",
		type:"GET",
		dataType:"text",
										  
		success: function(msg) {
			let obj = JSON.parse(msg); // TODO: if it returns with a 204 this will throw an error in console
			for (var key in obj) { console.log(key + " left " + obj[key]); }
		}, error: function(msg) {
			console.log(JSON.parse(msg).error);
		}
	});
}