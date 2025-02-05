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
    if (req.method === 'POST') {
        console.log("Request receiveds1")
        let body = '';
        req.on('data', chunk => {
            if (chunk !== null){
                body += chunk.toString();
            }
        });
        req.on('end', () => {
            try{
                const data = JSON.parse(body);
                console.log(data);
                res.end(JSON.stringify({message: "Data received"}));
            } catch (e) {
                res.end(JSON.stringify({message: "Invalid data"}));
            }
        });
    }
    else {
        res.end("Hello World");
    }
}).listen(8080);