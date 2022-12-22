"use strict";
//Bogdanov Alsu 333988939
//Barak Tsach 300096245
const fs = require("fs");
const path = require("path");
const url = require("url");
const { createServer } = require("./functions.js");

let is_file_exists = false;
let text_data;

//read file
try {
  text_data = fs.readFileSync(
    path.join(__dirname, "assets", "text.txt"),
    "utf-8"
  );
  is_file_exists = true;
  console.log("end readFile");
} catch (error) {
  console.log("File not found");
}

if (is_file_exists) {
  const text_data_arr = text_data.split("\r\n");

  // create server
  createServer(text_data_arr);
}
