//get data (JSON) from Front, processing in Back and send back to Front

"use strict";

const http = require("http");
const fs = require("fs");
const url = require("url");

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
  }
  //////////////////////////////////////////
  // we are here if request is not for home page
  //////////////////////////////////////////
  if (pathName === "/message") {
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

        fs.appendFileSync("message.txt", JSON.stringify(obj));

        // write back to FE
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
      } catch (error) {
        console.error(error.message);
      }
    });
  }
});

server.listen(3000);
