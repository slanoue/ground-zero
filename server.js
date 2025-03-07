const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

let peers = [];

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'register') {
            peers.push(data.id);
            ws.send(JSON.stringify({ type: 'peers', peers: peers.filter(id => id !== data.id) }));
        }
    });

    ws.on('close', () => {
        peers = peers.filter(id => id !== ws.id);
    });
});

console.log('WebSocket server running on ws://localhost:3000');