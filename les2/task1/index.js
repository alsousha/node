'use strict';
const fs = require('fs');
const textIn = fs.readFileSync('./text/input.txt', 'utf-8');
console.log(textIn);
const textOut = `the text was: ${textIn}`;
console.log(textOut);
fs.writeFileSync('./text/output.txt', textOut);
