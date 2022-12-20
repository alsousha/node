
'use strict'
const http = require('http')
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'application/json'})
    const obj = {
        firstname: 'John',
        lastname: 'Doe'
    }
    res.end(JSON.stringify(obj))
}).listen(3000)