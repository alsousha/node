const fs = require("fs");
const path = require("path");
module.exports = {
  searchUser: function (username, password) {
    var userAndPasswordPresent = false;
    //read file
    try {
      let data = fs.readFileSync(__dirname + "/assets/data/users.json");
      let dataList = JSON.parse(data);

      for (var i in dataList) {
        if (
          dataList[i].username === username &&
          dataList[i].password === password
        ) {
          userAndPasswordPresent = true;
        }
      }
    } catch (error) {
      console.log("File not found or wrong file structure");
    }
    return userAndPasswordPresent;
  },

  addStudent: function (dataList, studentName, studentLastName, studentAge) {
    let data = fs.readFileSync(__dirname + "/assets/data/students.json");
    dataList = JSON.parse(data);
    dataList.push({
      name: studentName,
      lastname: studentLastName,
      age: studentAge,
    });
    dataList = JSON.stringify(dataList);
    fs.writeFileSync(__dirname + "/assets/data/students.json", dataList);


   
    let userAndPasswordPresent = true;
    return userAndPasswordPresent;
  },
};
