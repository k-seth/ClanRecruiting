# ClanRecruiting Discord Bot
Author: Seth Kuipers  
  
A Discord bot integration for the ClanRecruiting App (Public)
  
### Prerequisites  

For this program to function properly you will need some additional items.  
1. Node.js installed on your system (https://nodejs.org/en/)
2. An application_id from Wargaming's developer portal here: https://developers.wargaming.net/applications/  
   * This is specific to your account and should not be shared
3. An app with a bot in your Discord server
   * You can follow these steps if needed: https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/
4. Rename "config_template.json" to "config.json" - TODO: Add to script?
5. In said file, change the value of "application_id" to your id. Quotations are required around your id
   * Here you may also set which server you wish. "na" is default (as is the list of clans), however, "eu", "ru" or "asia" can be used
   * If you are using a server other than "na" you can find the a Clan's ID through the Wargaming developer Portal "API Reference" section  
6. In said file, change the value of "token" to your bot's token. Quotations are required around your token 
 
### Using the program  
  
#### Windows

1. Navigate to ClanRecruitment
2. Double click "run.bat"
3. The bot will now be active in Discord

#### Linux

1. In terminal, navigate to the ClanRecruitment directory  
2. Run "npm install"  
3. Type "node app.js"
4. TODO: Make a shell script
  
### Trouble shooting
  
Below is a list of issues I have encountered in my testing. If something comes up that isn't listed, feel free to open an issue so I can look into it. Specific error output and steps to reproduce the issue would be helpful.  
  
- Issue: Terminal says "Error: Cannot find module './config.json'"
   1. Fix: Rename "config_template.json" to "config.json". Ensure all prerequisites have been done
  
###  Other useful notes  
  
- There is no web interface. All interaction is done using the Discord bot
  
### Known limitations  
  
- There is typically a short (1-2 seconds) delay between request and response. This is a learning exercise, so it isn't exactly perfectly optimized
- This was just setup, so testing has not been super rigorous yet. There is likely bugs
- Despite finding players the bot failed to correctly display them in Discord. Due to me not keeping historical data backups, I am unable to test this at the moment, but I will create a data backup to test this more thoroughly

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
