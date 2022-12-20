//Bogdanov Alsu 333988939
//tsach barak 300096245
"use strict";
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path');

const file2Send = fs.readFileSync(`${__dirname}/templates/page.html`); //get data from file
const server = http.createServer(function (req, res) {
  let pathName = req.url
    pathName = url.parse(pathName, true)
    pathName = pathName.pathname
    console.log(pathName);


    if(pathName==='/'){
      res.setHeader('Content-Type', 'text/html');
      res.end(file2Send);
    }else if(req.url.match('.css$')){
    const cssPath = path.join(__dirname, "templates", req.url);
    console.log(cssPath);

    const fileStream = fs.createReadStream(cssPath, 'UTF-8');
    res.writeHead(200, {'Content-Type': 'text/css'});
    fileStream.pipe(res)
  }
});
server.listen(3001);
console.log("Node.js web server at port 3001 is running..");
