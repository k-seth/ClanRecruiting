:: Setup environment
ren config_template.json .\app\config.json
cd .\app
if not exist .\historical mkdir .\historical
call npm install

:: Run server
node app.js

PAUSE