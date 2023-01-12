const http = require("http"); // Import Node.js core module
const url = require("url");
const fs = require("fs");

const data = require("./data");
//  creating server
const server = http.createServer(function (req, res) {
  //handle incoming requests here..

  function sendFile(mime) {
    const file = fs.readFileSync(`${__dirname}/fe/${pathName}`);
    res.setHeader("content-type", mime);
    res.end(file);
  }

  let pathName = req.url;
  console.log(pathName);

  if (pathName === "/") {
    pathName = "/index.html";
  }

  if (/\.html/.test(pathName)) {
    return sendFile("text/html");
  }

  if (/\.css$/.test(pathName)) {
    // if (pathName.match(/\.css/)) {

    return sendFile("text/css");
  }

  if (/\.js$/.test(pathName)) {
    sendFile("text/javascript");
    return;
  }

  if (/\.jpg$/.test(pathName)) {
    return sendFile("image/jpeg");
  }

  if (pathName === "/getBooks") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  }
});

server.listen(3000); //listen for any incoming requests

console.log("Node.js web server at port 3000 is running..");
