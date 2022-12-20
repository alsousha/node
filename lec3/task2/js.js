//alsu bogdanov 333988939
//tsach barak 300096245

"use strict";
const fs = require("fs");
const allLines = [];
const filesName = ["f1.txt", "f2.txt", "f3.txt"];
let textArray = [];
filesName.forEach(function (file, i) {
  let text = fs.readFileSync(`${__dirname}/text/${file}`, "utf-8"); //get text from file
  textArray[i] = text.split("\r\n");
});

let allLinesByColumns = [];
//create array with data from files of dir text
for (let i = 0; i < filesName.length; i++) {
  let textInFile = fs.readFileSync(
    `${__dirname}/text/` + filesName[i],
    "utf-8"
  );
  allLines[i] = textInFile.split("\r\n");
}
//func revers array for 90 deg to right
function rotateRight(array) {
  var result = [];
  array.forEach(function (line, i) {
    line.forEach(function (elem, j, arr) {
      result[j] = result[j] || [];
      result[j][i] = elem;
    });
  });
  return result;
}
allLinesByColumns = rotateRight(allLines);
console.table(allLinesByColumns); //revers array
let result = "";
let i = 0;
let k = 1;
while (i < allLinesByColumns.length) {
  for (let l = 1; l <= k && i < allLinesByColumns.length; l++) {
    for (let j = 0; j < filesName.length; j++) {
      if (allLinesByColumns[i][j] !== undefined) {
        //check element if is not undefind
        result += allLinesByColumns[i][j] + " "; //add to res
      }
    }
    i++;
  }
  k++;
  result += "\r\n"; //new line
}
console.log(result);
fs.writeFileSync(__dirname + "/text/output.txt", result); //write new data in new file
