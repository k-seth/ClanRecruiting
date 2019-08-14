# ClanRecruiting
Author: Seth Kuipers  
  
Enables the ability to check for players that have left their clan in World of Tanks (Public)  
To run the node server, follow these steps:  
1. Using Powershell (Windows) or terminal (Unix), navigate to the ClanRecruiting directory  
2. Run "npm install"  
3. Type "npm run dev [port]"  
4. Go to "localhost:[port]"  
  
To configure the environment:  
1. Rename "config_template.json" to "config.json"  
2. In said file, change the value of "application_id" to your id. Quotations are required around your id  
  
Note: All program output is currently sent to the browser console (Ctrl+Shift+I > Console for chrome). This will be changed in the future.  
  
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
