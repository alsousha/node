const http = require('http')
const fs = require('fs')
const file2Send = fs.readFileSync('./task4/templates/page.html')
const server = http.createServer(function(req, res){
    console.log(req);
    res.setHeader('Content-Type','text/html')
    res.end(file2Send)
})
server.listen(3001)
console.log('Node.js web server at port 3001 is running..');