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
    try {
      let data = fs.readFileSync(__dirname + "/assets/data/students.json");
      dataList = JSON.parse(data);
      dataList.push({
        name: studentName,
        lastname: studentLastName,
        age: studentAge,
      });
      dataList = JSON.stringify(dataList);
      fs.writeFileSync(__dirname + "/assets/data/students.json", dataList);
      studentAddeded = true;
    } catch (error) {
      console.log("Some problem with read/write file");
      dataList = null;
    }
    return dataList;
  },
  delStudent: function (studentLastName) {
    let dataList = {};
    try {
      let data = fs.readFileSync(__dirname + "/assets/data/students.json");
      dataList = JSON.parse(data);

      let dataListAfterDelete = [];
      for (let i in dataList) {
        if (dataList[i].lastname != studentLastName) {
          dataListAfterDelete.push(dataList[i]);
          dataList[0].isSuccess = true;
        }
      }
      //   console.log("delete");
      //   console.log(dataListAfterDelete);
      dataList = JSON.stringify(dataListAfterDelete);
      fs.writeFileSync(__dirname + "/assets/data/students.json", dataList);
    } catch (error) {
      console.log("Some problem with read/write file");
      dataList = null;
    }
    return dataList;
  },
  editStudent: function (
    dataList,
    originalDataStudent,
    studentName,
    studentLastName,
    studentAge
  ) {
    // let dataList = {};
    try {
      let data = fs.readFileSync(__dirname + "/assets/data/students.json");
      //dataList = JSON.parse(data);
      for (let i in dataList) {
        if (
          dataList[i].lastname === originalDataStudent.lastname &&
          dataList[i].name === originalDataStudent.name &&
          dataList[i].age === originalDataStudent.age
        ) {
          (dataList[i].lastname = studentLastName),
            (dataList[i].name = studentName),
            (dataList[i].age = studentAge);
        }
      }
      //   console.log("after edit");
      //   console.log(dataList);
      dataList = JSON.stringify(dataList);
      fs.writeFileSync(__dirname + "/assets/data/students.json", dataList);
    } catch (error) {
      console.log("Some problem with read/write file");
    }
    return dataList;
  },
};
