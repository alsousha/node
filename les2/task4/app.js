'use strict'
const fs = require('fs');
const path = require('path')

const dirPath = path.join(__dirname, '/text')
const textIn = fs.readFileSync(`${dirPath}/input.txt`, 'utf-8')
const arr = textIn.split('\r\n')
console.table(arr)

for(let i=0; i<arr.length;i++){
    const line = arr[i].split(' ')
    console.table(line)
}

const textOut = `the text was: ${textIn}`
fs.writeFileSync('./task4/text/output.txt', textOut)