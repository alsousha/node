//get data (JSON) from Front, processing in Back and send back to Front

"use strict";

const http = require("http");
const fs = require("fs");
const url = require("url");
const path2 = require("path");

// home page
const home = fs.readFileSync(`${__dirname}/templates/index.html`);

// create server
const server = http.createServer((req, res) => {
  let pathName = req.url;
  const path = url.parse(pathName, true);

  // get path string before query (before ? in url)
  pathName = path.pathname;

  if (pathName === "/" || pathName === "/home") {
    res.setHeader("Content-Type", "text/html");
    // send home html file to the client
    // and complete the request (the code after return is not executed)
    return res.end(home);
    //   }
    //    else if (req.url.match(".html$")) {
    //     const htmlPath = path.join(__dirname, req.url);
    //     console.log(htmlPath);
    //     console.log(__dirname);
    //     console.log(req.url);

    //     const fileStream = fs.createReadStream(htmlPath, "utf-8");
    //     res.writeHead(200, { "Content-Type": "text/html" });
    //     fileStream.pipe(res);
  } else if (req.url.match(".css$")) {
    const cssPath = path2.join(__dirname, req.url);
    console.log(cssPath);
    console.log("Ssssssssss");
    const fileStream = fs.createReadStream(cssPath, "utf-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);
  }
  //////////////////////////////////////////
  // we are here if request is not for home page
  //////////////////////////////////////////
  else if (pathName === "/message") {
    const body = [];
    req.on("data", (chunk) => {
      // collect chunks and append them to body array
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      try {
        // we get here when all the data has been received (all chunks)
        console.log(body); // encrypted data
        console.log("No more data");
        // now:
        // 1. decode request data and save it in file
        // 2. send the same data to FE
        const obj = JSON.parse(body); //object from JSON

        // do something with JSON
        console.log(obj);

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
});

server.listen(3000);
