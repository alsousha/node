"use strict";

const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

//type of headers
let mime = {
  html: "text/html",
  txt: "text/plain",
  css: "text/css",
  gif: "image/gif",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  js: "application/javascript",
};
// create server
const server = http.createServer((req, res) => {
  let pathName = req.url;
  const pathUrl = url.parse(pathName, true);
  let reqpath = pathName.toString().split("?")[0];
  //console.log("reqpath" + reqpath);
  pathName = pathUrl.pathname;

  //?????
  let file = path.join(
    __dirname,
    reqpath.replace(/\/$/, "/templates/index.html")
  );
  //???
  //console.log("file" + file);

  let type = mime[path.extname(file).slice(1)] || "text/plain";
  if (reqpath === "/message") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      try {
        console.log("No more data");
        const obj = JSON.parse(body); //object from JSON
        //add dirs path to img file from FE
        obj.map(function (item) {
          let tmpName = item.img;
          item.img = "assets/img/" + tmpName;
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
      } catch (error) {
        console.error(error.message);
      }
    });
  } else {
    let s = fs.createReadStream(file);
    s.on("open", function () {
      res.setHeader("Content-Type", type);
      s.pipe(res);
    });
    s.on("error", function () {
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 404;
      res.end("Not found");
    });
  }
});

server.listen(3001);
