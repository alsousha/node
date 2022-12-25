"use strict";

const http = require("http");
const fs = require("fs");
const url = require("url");
const path2 = require("path");

// home page
const home = fs.readFileSync(`${__dirname}/templates/index.html`);
const imgDir = path2.join(__dirname, "/assets/img");
var mime = {
  html: "text/html",
  txt: "text/plain",
  css: "text/css",
  gif: "image/gif",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  js: "application/javascript",
};
var dir = path2.join(__dirname, "templates");
// create server
const server = http.createServer((req, res) => {
  let pathName = req.url;
  const path = url.parse(pathName, true);
  var reqpath = req.url.toString().split("?")[0];

  pathName = path.pathname;
  var file = path2.join(dir, reqpath.replace(/\/$/, "/index.html"));
  var type = mime[path2.extname(file).slice(1)];
  if (pathName === "/" || pathName === "/home") {
    res.setHeader("Content-Type", "text/html");
    return res.end(home);
    //   }
    //    else if (req.url.match(".html$")) {
    //     const fileStream = fs.createReadStream(path.join(__dirname, req.url), "utf-8");
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     fileStream.pipe(res);
  } else if (req.url.match(".css$")) {
    const cssPath = path2.join(__dirname, req.url);
    const fileStream = fs.createReadStream(cssPath, "utf-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
  } else if (req.url.match(".jpg$")) {
    var imagePath = path2.join(__dirname, "/assets/img", req.url);
    var fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "content-type": "image/jpg" });
    fileStream.pipe(res);
  } else if (pathName === "/message") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      try {
        console.log("No more data");
        const obj = JSON.parse(body); //object from JSON

        //obj[0].img = imgDir + "/1.jpg";
        // console.log(obj[0].img);
        // do something with JSON
        //console.log(obj);

        //fs.appendFileSync("message.txt", JSON.stringify(obj));

        // write back to FE
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
      } catch (error) {
        console.error(error.message);
      }
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
  console.log(req.url);
});

server.listen(3001);
