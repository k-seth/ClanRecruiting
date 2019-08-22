:: Setup the environment
ren .\config_template.json .\app\config.json
cd .\app
if not exist .\historical mkdir .\historical
call npm install

:: Start the web browser. This should take long enough that the server can start in time to prevent an error
start http://localhost:3030

:: Run the server
npm run dev 3030

PAUSE