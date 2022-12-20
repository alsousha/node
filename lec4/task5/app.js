'use strict'
const http = require('http')
const fs = require('fs')

let data = fs.readFileSync(__dirname +'/data/data.json')
console.log(data);

const server = http.createServer(function (req, res){
    console.log(req);
    res.setHeader('Content-Type', 'application/json')

    res.end(data)
})
server.listen(3000)