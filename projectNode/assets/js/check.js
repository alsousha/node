export const checkLoginValue = function (textResponse, username, password) {
  //add checks for login and password !!!
  return checkInputsNotEmpty(username, password, textResponse);
};

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

//func gets several inputs to check
export const checkInputsNotEmpty = function (textResponse, ...values) {
  for (let val of values) {
    if (val == "") {
      textResponse = "All fields must be filled. Try again!";
      printResponse(".response", textResponse, "fail");
      return false;
    }
  }
  return true;
};

export const checkPhone = function (str) {
  return str.length === 8 && Number.isInteger(Number(str)) && /^\d+$/.test(str);
};

export const checkStr = function (str) {
  return /^[a-zA-Z]+$/.test(str);
};
export const printResponse = function (parentElem, text, className) {
  document.querySelector(parentElem).innerHTML = `
    <span class="${className}">${text}</span>
    `;
};
export const checkNotNullInput = function (inputElem) {
  return inputElem.value;
};
export const checkStudentValue = function () {
  //write check func!!!
  return true;
};