'use strict'
const fs = require('fs')
const path = require('path')
const dirPath = path.join(__dirname, '/text')
const textIn = fs.readFileSync(`${dirPath}/input.txt`,'utf-8')
const textOut = `the text was: ${textIn}`
console.log(textOut);
fs.writeFileSync(__dirname +'/text/textOut.txt', textOut)