const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
//app.listen(port);

app.get("/", (req, res) => {
  console.log("user hit the resource");
  res.status(200).send("Home Page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About Page");
});
//respond to post request
app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});

//callback is executed, once the app starts listening to specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
