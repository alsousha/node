'use strict'
const http = require('http')
const server = http.createServer(function(req, res){
    console.log(req);
    res.end('Hello from the server')
})
server.listen(3000)
console.log('Node.js web server at port 3000 is running...');
