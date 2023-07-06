export const checkLoginValue = function (textResponse, username, password) {
  return (
    checkLength(textResponse, 2, username, "UserName") &&
    checkLength(textResponse, 8, password, "Password") &&
    checkValLettersAndNumbers(textResponse, password, "Password") &&
    checkInputsNotEmpty(textResponse, username, password) &&
    checkMinOneDigit(textResponse, password, "Password") &&
    checkMinOneLetter(textResponse, password, "Password")
  );
};
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
export const checkInt = function (textResponse, num, minVal, maxVal) {
  if (
    Number.isInteger(Number(num)) &&
    /^\d+$/.test(num) &&
    num >= minVal &&
    num <= maxVal
  ) {
    return true;
  } else {
    textResponse = "Number value isn't correct";
    printResponse(".response", textResponse, "fail");
    return false;
  }
};
export const checkLength = function (textResponse, length, val, valName) {
  if (val.length >= length) {
    return true;
  } else {
    textResponse = `${valName} must be minimum ${length} chars`;
    printResponse(".response", textResponse, "fail");
    return false;
  }
};
export const checkValLettersAndNumbers = function (textResponse, str, valName) {
  if (/^\w+$/.test(str)) {
    return true;
  } else {
    textResponse = `${valName} must contain only digits and letters`;
    printResponse(".response", textResponse, "fail");
    return false;
  }
};
export const checkMinOneDigit = function (textResponse, password, valName) {
  if (/\d/.test(password)) {
    return true;
  } else {
    textResponse = `${valName} must contain least one digit`;
    printResponse(".response", textResponse, "fail");
    return false;
  }
};
export const checkMinOneLetter = function (textResponse, password, valName) {
  if (/\d/.test(password) && /[a-zA-Z]/.test(password)) {
    return true;
  } else {
    textResponse = `${valName} must contain at least one letter`;
    printResponse(".response", textResponse, "fail");
    return false;
  }
};
export const checkStrLetterOnly = function (textResponse, ...values) {
  for (let val of values) {
    if (!/^[a-zA-Z]+$/.test(val)) {
      textResponse = "Text value isn't correct, must have letters only";
      printResponse(".response", textResponse, "fail");
      return false;
    }
  }
  return true;
};
export const printResponse = function (parentElem, text, className) {
  document.querySelector(parentElem).innerHTML = `
    <span class="${className}">${text}</span>
    `;
};
export const checkNotNullInput = function (inputElem) {
  return inputElem.value;
};
export const checkStudentValue = function (
  textResponse,
  studentLastName,
  studentName,
  studentAge,
  minVal,
  maxVal
) {
  return (
    checkInputsNotEmpty(
      textResponse,
      studentLastName,
      studentName,
      studentAge
    ) &&
    checkInt(textResponse, studentAge, minVal, maxVal) &&
    checkStrLetterOnly(textResponse, studentLastName, studentName)
  );
};
