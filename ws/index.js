const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8080 });

fileStream = fs.createWriteStream('audio.mp3');
wss.on('connection', function connection(ws) {
    console.log('Client connected');
    wss.on('message', function incoming(message) {
        console.log('received: %s', message);
        fileStream.write(message);
    });

    // wss.send('Hello, Client!');

});


// wss.on('message', function incoming(message) {
//     console.log(message);
//     debugger
//     fileStream.write(message);
//     // 手动刷新缓冲区
//     fileStream.once('drain', function () {
//         console.log('Data flushed to file');
//     });
// });