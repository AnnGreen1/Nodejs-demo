const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8080 });
let fileStream = ''
wss.on('connection', function connection(ws) {
    fileStream = fs.createWriteStream('audio.mp3');

    // fileStream.on('error', function (err) {
    //     console.log(err.stack);
    // });
    // fileStream.on('finish', function () {
    //     console.log("写入完成。");
    // });



    // ws.on('close', function () {

    // })
});

wss.on('message', function incoming(message) {
    console.log(message);
    debugger
    fileStream.write(message);
    // 手动刷新缓冲区
    fileStream.once('drain', function () {
        console.log('Data flushed to file');
    });
});