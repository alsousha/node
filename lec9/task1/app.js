"use strict";
const fs = require("fs");

//top level code
setTimeout(() => console.log("Timer 1 end"), 0);
fs.readFile(
  "text1.txt",
  //call back func -> in event loop
  () => {
    setTimeout(() => console.log("Timer 2 end"), 0);
    setTimeout(() => console.log("Timer 3 end"), 2000);

    //when you want to execute some piece of code async, but as soon as possiblem one option is to use the setImmediate() func provided by Node.js:
    //it is similar to setTimeout() callback with a 0ms delay, but will be executed beforesetTimeout
    setImmediate(() => console.log("Immediate end"), 0);
    console.log("IO 1 completed");
  }
);
console.log("end");
