//Bogdanov Alsu 333988939
//Barak Tsach 300096245
'use strict';
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path');

const home = fs.readFileSync(`${__dirname}/templates/page.html`)

const server = http.createServer(function(req,res){
    let pathName = req.url
    pathName = url.parse(pathName, true)
    pathName = pathName.pathname

    if(pathName==='/'){
        res.setHeader('Content-Type', 'text/html')
        res.end(home)
    }
    else if(req.url.match('.html$')){
        const htmlPath = path.join(__dirname, req.url);
        console.log(htmlPath);
        console.log(__dirname);
        console.log(req.url);

        const fileStream = fs.createReadStream(htmlPath, 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        fileStream.pipe(res);


    }else if(req.url.match('.css$')){
        const cssPath = path.join(__dirname, req.url);
        console.log(cssPath);
        console.log(__dirname);
        console.log(req.url);

        const fileStream = fs.createReadStream(cssPath, 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res)


    }else{
        res.writeHead(404, {
            'Content-Type': 'text/html',
        })
        res.end('<h1>Page not found</h1>')
    }
})
server.listen(3001)
console.log('Node is running');