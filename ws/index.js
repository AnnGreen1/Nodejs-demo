const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', async (data, isBinary) => {
    if (isBinary) {
      handleBlob(data);
    } else {
      console.error('Received non-binary data, expected Blob.');
    }
  });
});

function handleBlob(binaryData) {
  const buffer = Buffer.from(binaryData);
  const outputPath = 'received.mp3';

  fs.writeFile(outputPath, buffer, (err) => {
    if (err) {
      console.error(`Error saving MP3 file: ${err}`);
    } else {
      console.log('MP3 file saved successfully.');
    }
  });
}