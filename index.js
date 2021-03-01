const btoa = require('btoa');
const fetch = require('node-fetch');

module.exports.generateClientCredentials = async ({ client_id, client_secret, scope }) => {
    const obj = {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'client_credentials',
        scope: scope
    }

    const creds = btoa(`${obj.client_id}:${obj.client_secret}`);
    const headers = {
        'User-Agent': 'Discord-OAuth2',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${creds}`
    }

    const encodedBody = uriEncode(obj);
    const encodedUrl = `https://discord.com/api/oauth2/token?${encodedBody}`;

    let generatedCredentials;

    await fetch(encodedUrl,{
        method: 'POST',
        headers: headers,
    })
    .then(async res => {
        const credentials = await res.json();
        if (await credentials['access_token']) {
            generatedCredentials = await credentials;
        }
        else {
            throw(`Recieved unexpected response:\n${credentials}`);
        }
    })

    return generatedCredentials;
}

function uriEncode(obj) {
    let string = "";

    for (const [key, value] of Object.entries(obj)) {
        if (!value) continue;
        string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }

    return string.substring(1);
}