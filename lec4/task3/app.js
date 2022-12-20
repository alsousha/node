'use strict'
const http = require('http')
const fs = require('fs')
let html = fs.readFileSync(__dirname+'/templates/page.html', 'utf8')
const heading = 'HTML File as Response'
html = html.replace('{h1-heading}', heading)
console.log(html);
const server = http.createServer(function(req, res){
    res.writeHead(200,{'Content-Type': 'text/html'})
    res.end(html)
})
server.listen(3000)