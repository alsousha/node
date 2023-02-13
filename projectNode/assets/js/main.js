"use strict";

import * as check from "./check.js";
import * as fFunc from "./func.js";
const btn_login = document.getElementById("BtnLogin");
const add_student = document.getElementById("addStudent");
const btn_exit = document.getElementById("Exit");
let textResponse;

if (btn_login != null) {
  btn_login.addEventListener("click", function (event) {
    event.preventDefault();
    //get inputs
    const username = document.querySelector("#UserName");
    const password = document.querySelector("#Password");

    const dataUser = {
      username: username.value.trim(),
      password: password.value.trim(),
    };
    if (
      check.checkLoginValue(textResponse, dataUser.username, dataUser.password)
    ) {
      //send data to server
      fetch("login", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser), //send data
      })
        .then(function (res) {
          return res.json();
        })
        .then((res) => {
          if (res.isUserExist) {
            textResponse = "Login success!";
            check.printResponse(".response", textResponse, "success");
            window.location.href = "templates/main.html"; //redirect to main page
          } else {
            textResponse = "Incorrect username or password! Try again";
            check.printResponse(".response", textResponse, "fail");
          }
        })
        .catch((err) => {
          textResponse = "Uuups. we have some problem with server. Try latter!";
          check.printResponse(".response", textResponse, "fail");
          console.log(err);
        });
    }
  });
}
if (add_student != null) {
  add_student.addEventListener("click", function (event) {
    event.preventDefault();
    //get inputs
    const studentName = document.querySelector("#studentName");
    const studentLastName = document.querySelector("#studentLastName");
    const studentAge = document.querySelector("#studentAge");
    const studentUser = {
      studentName:
        studentName.value.trim().charAt(0).toUpperCase() +
        studentName.value.trim().slice(1),
      studentLastName:
        studentLastName.value.trim().charAt(0).toUpperCase() +
        studentLastName.value.trim().slice(1),
      studentAge:
        studentAge.value.trim().charAt(0).toUpperCase() +
        studentAge.value.trim().slice(1),
    };
    if (
      check.checkStudentValue(
        textResponse,
        studentUser.studentLastName,
        studentUser.studentName,
        studentUser.studentAge,
        3,
        100
      )
    ) {
      //send data to server
      fetch("addStudent", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentUser), //send data
      })
        .then(function (res) {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res[0].isAddSuccess) {
            textResponse = "Addeding success!";
            check.printResponse(".response", textResponse, "success");
            fFunc.showClass(res);
            studentName.value = "";
            studentLastName.value = "";
            studentAge.value = "";
          } else {
            textResponse = "Incorrect data of student! Try again!";
            check.printResponse(".response", textResponse, "fail");
          }
        })
        .catch((err) => {
          textResponse = "Uuups. we have some problem with server. Try latter!";
          check.printResponse(".response", textResponse, "fail");
          console.log(err);
        });
    }
  });
}
if (btn_exit != null) {
  btn_exit.addEventListener("click", function (e) {
    e.preventDefault();
    fetch("exit", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "",
      },
      body: JSON.stringify(),
    })
      .then(function (res) {
        return res.json();
      })
      .then((res) => {
        window.location.href = "/"; //redirect to main page
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
const sPath = window.location.pathname;
const sPage = sPath.substring(sPath.lastIndexOf("/") + 1);
//check what page loaded
if (sPage == "class.html") {
  //call fucn ready() after loaded page
  document.addEventListener("DOMContentLoaded", fFunc.ready);
}
if (sPage == "main.html") {
  fetch("gallery", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      //'Content-Type': 'application/json'
      "Content-Type": "",
    },
    body: JSON.stringify(),
  })
    .then((res) => res.json())
    .then((res) => {
      document.addEventListener(
        "DOMContentLoaded",
        fFunc.buildLibrary(res, ".gallery")
      );
    });
}
