'use strict';
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path');

const home = fs.readFileSync(`${__dirname}/templates/home.html`)
const books = fs.readFileSync(`${__dirname}/templates/books.html`)
const book = fs.readFileSync(`${__dirname}/templates/book.html`)

const server = http.createServer(function(req,res){
    let pathName = req.url
    //console.log('pathName: ' + pathName);
    pathName = url.parse(pathName, true)
    pathName = pathName.pathname
    //console.log('pathName after parse' + pathName);

    if(pathName==='/'){
        res.setHeader('Content-Type', 'text/html')
        res.end(home)
    }else if(pathName==='/books'){
        res.setHeader('Content-Type', 'text/html')
        res.end(books)
    }else if(pathName==='/book'){
        res.setHeader('Content-Type', 'text/html')
        res.end(book)


    }else if(req.url.match('.html$')){
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