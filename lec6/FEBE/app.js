"use strict";
//Bogdanov Alsu 333988939
//Barak Tsach 300096245
const http = require("http");
const fs = require("fs");
const url = require("url");

const home = fs.readFileSync(`${__dirname}/templates/index.html`);

function checkNum(num) {
  return !(num === "" || isNaN(num) || !Number.isInteger(num));
}

// create server
const server = http.createServer((req, res) => {
  let pathName = req.url;
  const path = url.parse(pathName, true);
  // path before query
  pathName = path.pathname;
  const query = path.query;
  // form method
  const method = req.method;
  if (pathName === "/") {
    res.setHeader("Content-Type", "text/html");
    // write html file to the client and complete the request (return)
    return res.end(home);
  }
  if (pathName === "/result") {
    if (method === "POST") {
      const body = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString(); //
        //console.log(parsedBody); //x_num=4&y_num=7

        //get x
        const formData = parsedBody.split("&"); //[x_num=4, y_num=7]
        const x_num_data = formData[0]; //x_num=4
        const val = formData[0].split("="); //[x_num; 4]
        const x_num = Number(val[1]); //4

        //get y
        const y_num = Number(formData[1].split("=")[1]);
        if (checkNum(x_num) && checkNum(y_num)) {
          console.log(`sum = ${x_num + y_num}`);
          console.log(`minus = ${x_num - y_num}`);
          console.log(`multi = ${x_num * y_num}`);

          if (y_num != 0) console.log(`div = ${x_num / y_num}`);
          else console.log("Error! we can't to div on 0");
        } else {
          console.log("You need to input numerical only");
        }
      });
    }
    // redirection for both forms to home page
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.writeHead(302, { Location: "/" });
    return res.end();
  }
  // invalid url
  res.writeHead(404, {
    "Content-TYpe": "text/html",
  });
  res.end("<h1>Page not found</h1>");
});

server.listen(3000);
