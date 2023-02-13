"use strict";
//Bogdanov Alsu 333988939
//Barak Tsach 300096245

const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const sFunc = require("./server_functions.js");
let isUserAuth;
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
  pathName = pathUrl.pathname;
  //   console.log("pathname" + pathName);

  let file = path.join(
    __dirname,
    reqpath.replace(/\/$/, "/templates/index.html")
  );
  let type = mime[path.extname(file).slice(1)] || "text/plain";
  // form method
  const method = req.method;

  if (pathName === "/login") {
    if (method === "POST") {
      const body = [];
      let obj = {};
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      req.on("end", () => {
        const parsedBody = Buffer.concat(body); //{"username":"%s","password":"%s"}
        const userDataJson = JSON.parse(parsedBody);
        const usernameForSearch = userDataJson.username;
        const passwordForSearch = userDataJson.password;
        const isUserExist = sFunc.searchUser(
          usernameForSearch,
          passwordForSearch
        );
        obj.isUserExist = isUserExist;
        isUserAuth = isUserExist;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
      });
    }
  } else if (pathName === "/templates/exit") {
    if (method === "POST") {
      const body = [];
      let obj = {};
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      req.on("end", () => {
        const parsedBody = Buffer.concat(body); //{"username":"%s","password":"%s"}
        // const userDataJson = JSON.parse(parsedBody);
        // const usernameForSearch = userDataJson.username;
        // const passwordForSearch = userDataJson.password;
        // const isUserExist = sFunc.searchUser(
        //   usernameForSearch,
        //   passwordForSearch
        // );
        // obj.isUserExist = isUserExist;
        isUserAuth = false;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
      });
    }
  } else if (pathName === "/templates/students") {
    let data;
    try {
      data = fs.readFileSync(__dirname + "/assets/data/students.json");
    } catch (error) {
      console.log("File not found or wrong file structure");
    }
    let dataList = JSON.parse(data);
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      try {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(dataList));
      } catch (error) {
        console.error(error.message);
      }
    });
  } else if (pathName === "/templates/gallery") {
    let data;
    try {
      data = fs.readFileSync(__dirname + "/assets/data/gallery.json");
    } catch (error) {
      console.log("File not found or wrong file structure");
    }
    let dataList = JSON.parse(data);
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      try {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(dataList));
      } catch (error) {
        console.error(error.message);
      }
    });
  } else if (pathName === "/templates/addStudent") {
    if (method === "POST") {
      const body = [];
      req.on("data", (chunk) => {
        body.push(chunk);
      });
      req.on("end", () => {
        let data;
        try {
          data = fs.readFileSync(__dirname + "/assets/data/students.json");
        } catch (error) {
          console.log("File not found or wrong file structure");
        }

        let dataList = JSON.parse(data);
        const parsedBody = Buffer.concat(body); //{"username":"%s","password":"%s"}
        const userDataJson = JSON.parse(parsedBody);
        const studentName = userDataJson.studentName;
        const studentLastName = userDataJson.studentLastName;
        const studentAge = userDataJson.studentAge;
        const dataListAfterAddeded = sFunc.addStudent(
          dataList,
          studentName,
          studentLastName,
          studentAge
        );
        let dataListAfterAddededObj = JSON.parse(dataListAfterAddeded);
        dataListAfterAddededObj[0].isAddSuccess = dataListAfterAddeded !== null;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(dataListAfterAddededObj));
        //res.end(dataList);
      });
      //console.log("RRR" + isUserAuth);
    }
  } else {
    if (!isUserAuth) {
      //console.log("user not auth");
      if (
        reqpath === "/templates/class.html" ||
        reqpath == "/templates/main.html"
      ) {
        reqpath = "/templates/index";
        file = path.join(__dirname, reqpath);
      }
    } else {
      //show main page if user auth
      file = path.join(
        __dirname,
        reqpath.replace(/\/$/, "/templates/main.html")
      );
    }
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
