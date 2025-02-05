let http = require('http');
let url = require('url');
http.createServer(function (req, res) {
    let qury = url.parse(req.url, true).query;
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',  // Allow any origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',  // Allow these methods
        'Access-Control-Allow-Headers': 'Content-Type',  // Allow these headers
    });
    res.end(`Hello ${qury.name}!`);
}).listen(8000);