# ClanRecruiting
Author: Seth Kuipers  
  
Enables the ability to check for players that have left their clan in World of Tanks (Public)

### Prerequisites  

For this program to function properly you will need some additional items.  
1. Node.js installed on your system (https://nodejs.org/en/)
2. An application_id from Wargaming's developer portal here: https://developers.wargaming.net/applications/  
   * This is specific to your account and should not be shared 
3. In config_template.json, change the value of "application_id" to your id. Quotations are required around your id 

### Configurables

This section outlines how to use the config_template.json file to get the most out of the application. REQUIRED fields are ones you must edit, OPTIONAL are if you wish to personalize your app, such as add new clans or change servers

1. "application_id": "Your App ID"
   * REQUIRED. How you access the Wargaming API
2. "inactive_weeks": 2
   * OPTIONAL, default = 2. The number of weeks since last battle before a player is labelled as inactive. Value must be 1 or greater
3. "server": "na"
   * OPTIONAL, default = "na". The game server that the data is taken from. Valid values: "na", "ru", "eu", "asia"
4. "clanlist": [ clan list ]
   * OPTIONAL, default = see bottom, all NA clans. The list of clans that are checked by the the bot. For other servers/additions, use the Developer portal to get the Clan ID

### Running the program

#### Windows

1. Navigate to the ClanRecruitment folder using the File Explorer
2. Double click "run.bat"
   * This will start the server and launch the web page with your default browser
3. If you have never run the program click "Setup Data"
   * This will get the current clan rosters from Wargaming.
4. Every couple of hours, click "Find Players" to run a check and update the data
   * You can click the name of active players to link to their wotlabs page. WARNING: Open in a new tab (right click > open in new tab) or the information will be lost!

#### Linux
 
1. Using the terminal, navigate to the ClanRecruiting directory
2. Enter "sh run.sh"
3. Go to "localhost:3030"
4. If you have never run the program click "Setup Data"
   * This will get the current clan rosters from Wargaming.
5. Every couple of hours, click "Find Players" to run a check and update the data.
   * You can click the name of active players to link to their wotlabs page. WARNING: Open wotlabs in a new tab (right click > open link in new tab) or the information will be lost!
  
### Trouble shooting
  
Below is a list of issues I have encountered in my testing. If something comes up that isn't listed, feel free to open an issue so I can look into it. Specific error output and steps to reproduce the issue would be helpful.  
  
- Issue: Localhost says: "This site can’t be reached"
   1. Fix: Make sure the server is running by following the "Running the program" instructions.
   2. Fix: Try reloading the web page. The page may have loaded before the server started
- Issue: The terminal shows: "Invalid region - please read the README for valid servers"
   1. Fix: An invalid server has been input in "config.json". Enter a valid one ("na", "eu", "ru" or "asia") and save the file. The server will restart automatically
- Issue: I tried the above and got an error (likely: "Failed to load resource: the server responded with a status of 400 (Bad Request)" and/or "Uncaught SyntaxError: Unexpected token '' in JSON at position #"
   1. Fix: Ensure there is a correct, and valid application_id in "config.json". This is required by Wargaming.
   2. Fix: Ensure ALL clans in the clanlist in "config.json" are from the same server as you specified
  
###  Other useful notes  
  
- The terminal will log some output (errors). Most issues will be configuration related. If the server crashes (you can confirm by your webpage will stop loading), type "rs" into the terminal and press enter, or follow the "Running the program" instructions above
- The node server can be shut down between checks if you wish. It only needs to be running to call the API
- All program output is (now!) displayed on the html page, not in console! Hurray! It may be ugly, but it is better. For the time being, I still recommend having the console open (Ctrl+Shift+I) in the event of errors

### Know limitations

- Bit of a delay between clicking the button and getting a response, particularly when finding players
- Removing clans from the config file but not removing their historical ".txt" file will result in the whole clan being posted. Every. Single. Time. This will be fixed at some point

Default list of clans that are checked (Subject to name changes):
<pre>  
- MAHOU : 1000016749  
- OTTER : 1000008386  
- -G-   : 1000002392  
- YOUJO : 1000043789  
- BULBA : 1000011903  
- 200IQ : 1000043236  
- BRVE  : 1000010647  
- SIMP  : 1000001960  
- CLAWS : 1000003319  
- YOLO  : 1000016051  
- PINGU : 1000020292  
- RELIC : 1000000017  
- VILIN : 1000002161  
- PLAIN : 1000052368
- THUGZ : 1000011108
- RDDT  : 1000001505
- F0CUS : 1000042946  
- ALERT : 1000016724  
- -ZOO- : 1000051474  
- -_W_- : 1000019152
</pre>  
  
Disclaimer: Use at own risk. Security and robustness are not guaranteed.  
