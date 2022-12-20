const http = require('http')
const fs = require('fs')
const server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type': 'text/html'})
    const fileStream = fs.createReadStream(__dirname+'/index.htm')
    fileStream.pipe(res)
})
server.listen(3001)