"use strict";

// const check = require("./check");
// let val = check.hello();
// console.log(val);
import * as gg from "./check.js";

// const greet_scaler = greet("Scaler");

// console.log(greet_scaler); // Hello, Scaler
// console.log(message); // How you doing?

/////////////////

// const greet = require("./check");
// greet();
// const greet = require("./check");
gg.greet();
///////////
const btn_form = document.getElementById("BtnForm");
const btn_login = document.getElementById("BtnLogin");

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
    if (checkLoginValue(dataUser.username, dataUser.password)) {
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
          textResponse = "Login success!";
          printResponse(".response", textResponse, "success");
        })
        .catch((err) => {
          textResponse = "Incorrect username or password! Try again";
          printResponse(".response", textResponse, "fail");
          console.log(err);
        });
    }
  });
}
function checkFormValue(dataUsers) {
  checkInputsNotEmpty(dataUsers.name, dataUsers.lastName, dataUsers.phone);
  //   if (
  //     dataUsers.name == "" ||
  //     dataUsers.lastName == "" ||
  //     dataUsers.phone == ""
  //   ) {
  //     textResponse = "All fields must be filled. Try again!";
  //     printResponse(".response", textResponse, "fail");
  //     return false;
  //   } else
  if (!checkStr(dataUsers.name) || !checkStr(dataUsers.lastName)) {
    textResponse = "Name and last name must be letter only. Try again!";
    printResponse(".response", textResponse, "fail");
    return false;
  } else if (!checkPhone(dataUsers.phone)) {
    textResponse = "Phone must contain 8 digits only. Try again!";
    printResponse(".response", textResponse, "fail");
    return false;
  } else return true;
}

function checkLoginValue(username, password) {
  console.log(checkInputsNotEmpty(username, password));
  return checkInputsNotEmpty(username, password);
}
function checkInputsNotEmpty(...values) {
  for (let val of values) {
    if (val == "") {
      textResponse = "All fields must be filled. Try again!";
      printResponse(".response", textResponse, "fail");
      return false;
    }
  }
  return true;
}
function checkPhone(str) {
  return str.length === 8 && Number.isInteger(Number(str)) && /^\d+$/.test(str);
}
function checkStr(str) {
  return /^[a-zA-Z]+$/.test(str);
}
function printResponse(parentElem, text, className) {
  document.querySelector(parentElem).innerHTML = `
    <span class="${className}">${text}</span>
    `;
}
function checkNotNullInput(inputElem) {
  return inputElem.value;
}
