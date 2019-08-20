# ClanRecruiting
Author: Seth Kuipers  
  
Enables the ability to check for players that have left their clan in World of Tanks (Public)

### Prerequisites  

For this program to function properly you will need some additional items.  
1. Node.js installed on your system (https://nodejs.org/en/)
2. An application_id from Wargaming's developer portal here: https://developers.wargaming.net/applications/  
   * This is specific to your account and should not be shared 
3. In config_template.json, change the value of "application_id" to your id. Quotations are required around your id
   * Here you may also set which server you wish. "na" is default (as is the list of clans), however, "eu", "ru" or "asia" can be used
   * If you are using a server other than "na" you can find the a Clan's ID through the Wargaming developer Portal "API Reference" section  
  
### Running the program

#### Windows

1. Navigate to the ClanRecruitment directory using File Explorer
2. Double click "run.bat"
3. Go to "localhost:3030"  
4. If you have never run the program click "Setup Data"
   * This will get the current clan rosters from Wargaming.
5. Every couple of hours, click "Find Players" to run a check and update the data

#### Linux
 
1. Using the terminal, navigate to the ClanRecruiting directory
2. mv config_template.json config.json
3. Run "npm install"  
4. Type "npm run dev 3030" 
5. Go to "localhost:3030"  
6. If you have never run the program click "Setup Data"
   * This will get the current clan rosters from Wargaming.
7. Every couple of hours, click "Find Players" to run a check and update the data
8. TODO: Create shell script
  
### Trouble shooting
  
Below is a list of issues I have encountered in my testing. If something comes up that isn't listed, feel free to open an issue so I can look into it. Specific error output and steps to reproduce the issue would be helpful.  
  
- Issue: Localhost says: "This site can’t be reached"
   1. Fix: Make sure the server is running by following the "Using Node.js" instructions.
   2. Fix: If there are any errors, try to correct the issue if one of the issues below is helpful
- Issue: The terminal shows: "Error: Cannot find module './config.json' " (Should not be an issue on Windows)
   1. Fix: Make sure to follow the steps in "Running the program"
- Issue: The terminal shows: "Invalid region - please read the README for valid servers"
   1. Fix: An invalid server has been input in "config.json". Enter a valid one ("na", "eu", "ru" or "asia") and save the file. The server will restart automatically
- Issue: I tried the above and got an error (likely: "Failed to load resource: the server responded with a status of 400 (Bad Request)" and/or "Uncaught SyntaxError: Unexpected token '' in JSON at position #"
   1. Fix: Ensure there is a correct, and valid application_id in "config.json". This is required by Wargaming.
   2. Fix: Ensure ALL clans in the clanlist in "config.json" are from the same server as you specified
  
###  Other useful notes  
  
- The terminal will log some output, mainly errors. Most issues will be configuration related. If the server crashes (you can confirm by your webpage will stop loading), type "rs" into the terminal and press enter, or follow the "Using Node.js" instructions above again
- The node server can be shut down between checks. It only needs to be running to call the API
- All program output is (now!) displayed on the html page, not in console! Hurray! It may be ugly, but it is better. For the time being, I still recommend having the console open (Ctrl+Shift+I) in the event of errors

### Know limitations

- Bit of a delay between clicking the button and getting a response, particularly when finding players

Default list of clans that are checked (Subject to name changes. All clans are NA clans):  
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
