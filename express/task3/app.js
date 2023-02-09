const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

// const data = require('./data.json')
const data = JSON.parse(fs.readFileSync(__dirname + "/data.json"));

//respond to get request
app.get("/", (req, res) => {
  //res.send(JSON.stringify(data))
  res.status(200).json(data);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
