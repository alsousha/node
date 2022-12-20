const http = require('http')
const url = require('url')

const server = http.createServer(function(req, res){
    const pathName = req.url
    console.log(pathName);
    const {query, path} = url.parse(pathName, true)
    console.log(url);
    console.log(query);
    console.log(path);
    console.log(query, path);
})
server.listen(3001)
console.log("Node is running");