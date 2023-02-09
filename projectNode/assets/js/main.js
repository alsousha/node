"use strict";

// const check = require("./check");
// let val = check.hello();
// console.log(val);
import * as check from "./check.js";

// const greet_scaler = greet("Scaler");

// console.log(greet_scaler); // Hello, Scaler
// console.log(message); // How you doing?

/////////////////

// const greet = require("./check");
// greet();
// const greet = require("./check");
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
    if(check.checkLoginValue(textResponse, dataUser.username, dataUser.password)){
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
          textResponse = "Login success!";
          check.printResponse(".response", textResponse, "success");
        })
        .catch((err) => {
          textResponse = "Incorrect username or password! Try again";
          check.printResponse(".response", textResponse, "fail");
          console.log(err);
        });
    }
  });
}
