export const checkLoginValue = function (textResponse, username, password) {
  //add checks for login and password !!!
  return checkInputsNotEmpty(textResponse, username, password);
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
  if (Number.isInteger(Number(num)) && /^\d+$/.test(num) && num>=minVal && num <= maxVal) {
    return true
  }else{
    textResponse = "Number value isn't correct";
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
export const checkStudentValue = function (textResponse, studentLastName, studentName, studentAge, minVal, maxVal) {
  return checkInputsNotEmpty(textResponse, studentLastName, studentName, studentAge) && checkInt(textResponse, studentAge, minVal, maxVal)&& checkStrLetterOnly(textResponse, studentLastName, studentName);
};