// server.js
const uuidv4 = require('uuid/v4');
const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
       
    })
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  
    const clientSize = {
        clients: wss.clients.size,
        type: "clientSize"
    }
    wss.broadcast(JSON.stringify(clientSize));




ws.on('message', function incoming(data) {
    data = JSON.parse(data);    
    
    let infoMessage = {};

        switch (data.type) {
            case 'postMessage':

            infoMessage = {
            id: uuidv4(),
            username: data.username,
            content: data.content,
            type: 'incomingMessage'
        }

            break;

            case 'postNotification':

            infoMessage = {
                id: uuidv4(),
                username: data.username,
                content: data.content,
                type: 'incomingNotification'
            }

            break;
    }
    

    wss.broadcast(JSON.stringify(infoMessage))
});


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    clientSize.clients = wss.clients.size
    
    wss.broadcast(JSON.stringify(clientSize));
    console.log('Client disconnected');

  })
  
  wss.broadcast(JSON.stringify(clientSize));
}
);



