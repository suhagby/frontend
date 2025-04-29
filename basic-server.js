const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 12001;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Set content type
  res.setHeader('Content-Type', 'text/html');
  
  // Always serve the test.html file
  const filePath = path.join(__dirname, 'public', 'test.html');
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error: ${err.message}`);
      return;
    }
    
    res.writeHead(200);
    res.end(content);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  console.log(`Access URL: https://work-2-krobgjjrimhyoywn.prod-runtime.all-hands.dev`);
});