"use strict";

import * as check from "./check.js";
const btn_form = document.getElementById("BtnForm");
const btn_login = document.getElementById("BtnLogin");
const add_student = document.getElementById("addStudent");

let textResponse;
if (btn_form != null) {
  btn_form.addEventListener("click", (event) => {
    event.preventDefault();

    //get inputs
    const name = document.querySelector("#userName");
    const lastName = document.querySelector("#userLastName");
    const phone = document.querySelector("#userPhone");

    const dataUsers = {
      name: name.value.trim(),
      lastName: lastName.value.trim(),
      phone: phone.value.trim(),
    };
    if (checkFormValue(dataUsers)) {
      fetch("formReq", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUsers), //send data
      })
        .then(function (res) {
          return res.json();
        })
        .then((res) => {
          textResponse = "Your data saved!";
          printResponse(".response", textResponse, "success");
        })
        .catch((err) => {
          textResponse = "Your data failed! Try again later";
          printResponse(".response", textResponse, "fail");
          console.log(err);
        });
    }
  });
}
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
      studentName: studentName.value.trim(),
      studentLastName: studentLastName.value.trim(),
      studentPhone: studentAge.value.trim(),
    };
    if (
      check.checkStudentValue(
        studentUser.studentName,
        studentUser.studentLastName,
        studentUser.studentAge
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
          if (res[0].isAddSuccess) {
            textResponse = "Addeding success!";
            check.printResponse(".response", textResponse, "success");
            const lis = res.map((el) => {
              return `
				  <li><div class="student">${el.name}-${el.lastname}-${el.age}</div></li>
				`;
            });

            document.querySelector(".students__wrap").innerHTML = `
			  <ol>${lis.join("")}</ol>
			  `;
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
