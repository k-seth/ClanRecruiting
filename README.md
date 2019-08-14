# ClanRecruiting
Author: Seth Kuipers  
  
Enables the ability to check for players that have left their clan in World of Tanks (Public) 
  
### Prerequisites  

For this program to function properly you will need some additional items.  
1. Node.js installed on your system (https://nodejs.org/en/)
2. An application_id from Wargaming's developer portal here: https://developers.wargaming.net/applications/  
   * This is specific to your account and should not be shared  
3. Rename "config_template.json" to "config.json"  
4. In said file, change the value of "application_id" to your id. Quotations are required around your id
   * Here you may also set which server you wish. "na" is default (as is the list of clans), however, "eu", "ru", and "asia" can be used (In progress)
   * If you are using a server other than "na" you can find the a Clan's ID through the Wargaming developer Portal "API Reference" section  
  
### Using Node.js  
  
To run the node server which does the bulk of the work, follow these steps:  
1. Using Powershell (Windows) or terminal (Unix), navigate to the ClanRecruiting directory  
2. Run "npm install"  
3. Type "npm run dev [port]"
   * An example of [port] may be 3030  
4. Go to "localhost:[port]"  
  
  
Note: All program output is currently sent to the browser console (Ctrl+Shift+I > Console for chrome). This will (likely) be changed in the future.  
  
Default list of clans that are checked (Subject to name changes):  
<pre>  
- Mahou : 1000016749  
- Otter : 1000008386  
- G     : 1000002392  
- Youjo : 1000043789  
- Bulba : 1000011903  
- 200IQ : 1000043236  
- Brve  : 1000010647  
- Simp  : 1000001960  
- Claws : 1000003319  
- Yolo  : 1000016051  
- Pingu : 1000020292  
- Relic : 1000000017  
- Vilin : 1000002161  
- Focus : (TODO)  
- Alert : (TODO)  
- Strng : (TODO)  
- Plain : 1000052368 -- Replace  
- 11ad  : 1000012171 -- Replace  
- Thugz : 1000011108 -- Replace  
- Goonz : 1000010483 -- Replace  
- Harm  : 1000010646 -- Replace  
- Rddt  : 1000001505 -- Replace  
</pre>  
  
Disclaimer: Use at own risk. Security and robustness are not guaranteed.  
