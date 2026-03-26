const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const text = JSON.parse(body).text;
      fs.appendFileSync('submissions.txt', text + '\n');
      res.end('Saved!');
    });
  } else {
    res.end();
  }
}).listen(PORT, () => console.log(`Running on port ${PORT}`));