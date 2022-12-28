"use strict";
const http = require("http");
const { readFileSync } = require("fs");

const homePage = readFileSync(__dirname + "/navbar-app/index.html");
const aboutPage = readFileSync(__dirname + "/navbar-app/about.html");
const homeStyles = readFileSync(__dirname + "/navbar-app/styles.css");
const homeImage = readFileSync(__dirname + "/navbar-app/logo.svg");
const homeLogic = readFileSync(__dirname + "/navbar-app/browser-app.js");

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);
  if (url === "/" || url === "/home") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(aboutPage);
    res.end();
  } else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  } else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeImage);
    res.end();
  } else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Page not found</h1>");
    res.end();
  }
});
server.listen(3001);
