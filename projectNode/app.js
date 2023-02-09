"use strict";
//Bogdanov Alsu 333988939
//Barak Tsach 300096245

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
  console.log();

  //
  let file = path.join(
    __dirname,
    reqpath.replace(/\/$/, "/templates/index.html")
  );
  //
  //console.log("file" + file);

  let type = mime[path.extname(file).slice(1)] || "text/plain";
  // form method
  const method = req.method;

  if (pathName === "/templates/formReq") {
    if (method === "POST") {
      const body = [];
      let obj = {};
      req.on("data", (chunk) => {
        //console.log(chunk);//<Buffer 6d 65 73 73 61 67 65 …>
        body.push(chunk);
      });
      req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString(); //userName=aa&userLastName=a&userPhone=22
        //console.log(parsedBody);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
      });
    }
  } else if (pathName === "/login") {
    if (method === "POST") {
      const body = [];
      let obj = {};
      req.on("data", (chunk) => {
        //console.log(chunk);//<Buffer 6d 65 73 73 61 67 65 …>
        body.push(chunk);
      });
      req.on("end", () => {
        const parsedBody = Buffer.concat(body); //{"username":"%s","password":"%s"}
        const userDataJson = JSON.parse(parsedBody);
        const usernameForSearch = userDataJson.username;
        const passwordForSearch = userDataJson.password;
        const isUserExist = searchUser(usernameForSearch, passwordForSearch);
        obj.isUserExist = isUserExist;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
      });
    }
  } else if (pathName === "/templates/students") {
    let data = fs.readFileSync(__dirname + "/assets/data/students.json");
    let dataList = JSON.parse(data);
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      try {
        // console.log(body); // encrypted data
        // console.log("No more data");

        //const obj = JSON.parse(body); //object from JSON

        // do something with JSON
        //console.log(obj);

        //fs.appendFileSync("message.txt", JSON.stringify(obj));
        //fs.appendFileSync("student.json", JSON.stringify(obj));

        // write back to FE
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(dataList));
      } catch (error) {
        console.error(error.message);
      }
    });
  } else if (pathName === "/addStudent") {
    if (method === "POST") {
      const body = [];
      let obj = {};
      req.on("data", (chunk) => {
        //console.log(chunk);//<Buffer 6d 65 73 73 61 67 65 …>
        body.push(chunk);
      });
      req.on("end", () => {
        const parsedBody = Buffer.concat(body); //{"username":"%s","password":"%s"}
        const userDataJson = JSON.parse(parsedBody);
        const studentName = userDataJson.studentName;
        const studentLastName = userDataJson.studentLastName;
        const studentPhone = userDataJson.studentPhone;
        const isAddSuccess = addStudent(
          studentName,
          studentLastName,
          studentPhone
        );
        obj.isUserExist = isUserExist;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
      });
    }
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

server.listen(3000);

function searchUser(username, password) {
  let data = fs.readFileSync(__dirname + "/assets/data/users.json");
  let dataList = JSON.parse(data);

  var userAndPasswordPresent = false;
  for (var i in dataList) {
    if (
      dataList[i].username === username &&
      dataList[i].password === password
    ) {
      userAndPasswordPresent = true;
    }
  }
  return userAndPasswordPresent;
}

function addStudent(studentName, studentLastName, studentPhone) {
  let data = fs.readFileSync(__dirname + "/assets/data/users.json");
  let dataList = JSON.parse(data);

  var userAndPasswordPresent = false;
  for (var i in dataList) {
    if (
      dataList[i].username === username &&
      dataList[i].password === password
    ) {
      userAndPasswordPresent = true;
    }
  }
  return userAndPasswordPresent;
}
