'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');

const home = fs.readFileSync(`${__dirname}/templates/index.html`);

// create server
const server = http.createServer((req, res) => {
  let pathName = req.url;
  const path = url.parse(pathName, true);
  // path before query
  pathName = path.pathname;
  const query = path.query;
  // form method
  const method = req.method;
  if (pathName === '/') {
    res.setHeader('Content-Type', 'text/html');
    // write html file to the client and complete the request (return)
    return res.end(home);
  }
  if (pathName === '/message') {
    if (method === 'GET') {
      // get query and  after that redirect to home
      console.log(query);
    } else if (method === 'POST') {
      const body = [];
      req.on('data', chunk => {
        console.log(chunk);//<Buffer 6d 65 73 73 61 67 65 31 3d 61 61 26 6d 65 73 73 61 67 65 32 3d 61 26 6e 75 6d 62 65 72 3d 32 32>
        body.push(chunk); 
      });
      req.on('end', () => {
        console.log(body);//[<Buffer 6d 65 73 73 61 67 65 31 3d 61 61 26 6d 65 73 73 61 67 65 32 3d 61 26 6e 75 6d 62 65 72 3d 32 32>]
        // receive request and save it
        // after that redirect to home

        console.log('No more data');
        const parsedBody = Buffer.concat(body).toString(); //message1=aa&message2=a&number=22
        // in POST requests, values are encoded and sent in the "body" of the request
        console.log(parsedBody);

        const formData = parsedBody.split('&');
        const message1 = formData[0];
        const val = formData[0].split('=');
        console.table(val);
        const message2 = formData[1];
        const number = formData[2];
        console.log({ message1, message2, number });
        fs.writeFileSync('message.txt', message1);
        fs.appendFileSync('message.txt', message2);
        fs.appendFileSync('message.txt', `\n${number}`);
      });
    }
    // redirection for both forms to home page
    // res.statusCode = 302;
    // res.setHeader('Location', '/');
    res.writeHead(302, { Location: '/' });
    return res.end();
  }
  // invalid url
  res.writeHead(404, {
    'Content-TYpe': 'text/html',
  });
  res.end('<h1>Page not found</h1>');
});

server.listen(3000);