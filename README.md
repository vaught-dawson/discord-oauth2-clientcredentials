## About
##### This is a basic library to generate client credentials (bearer tokens) for Discord using OAuth2.

## Installation
##### Run npm install on the command line or terminal.
```
npm install discord-oauth2-clientcredentials
```
## Usage
##### Generate client credentials JSON object.
```
const { generateClientCredentials } = require('discord-oauth2-clientcredentials');

main();
async function main() {
    var client_credentials = await generateClientCredentials({ 
        client_id: '', 
        client_secret: '',
        scope: 'identify'  
    });
}
```

## About the Author
##### This package came into existence after I tried to get client credentials for the 'application.commands.update' permission in Discord for two consecutive days. 

Want to show some support? [Buy me a coffee!](http://paypal.me/dawsonvaught1)