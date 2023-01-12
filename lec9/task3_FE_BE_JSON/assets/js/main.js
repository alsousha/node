'use strict';

const btn_form = document.getElementById('BtnForm');
let textResponse;

btn_form.addEventListener('click', (event)=>{
    event.preventDefault();

    //get inputs
    const name = document.querySelector('#userName');
    const lastName = document.querySelector('#userLastName');
    const phone = document.querySelector('#userPhone');
   
    const dataUsers = {
        'name': name.value.trim(),
        'lastName' : lastName.value.trim(),
        'phone' : phone.value.trim(),
    };
    if(checkFormValue(dataUsers)){
        fetch('formReq', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( dataUsers ), //send data
        })
        .then(function (res) {
            return res.json();
        })
        .then(res => { 
            textResponse = "Your data saved!";
            printResponse('.response', textResponse, "success");   
        })
        .catch(err =>{
            textResponse = "Your data failed! Try again";
            printResponse('.response', textResponse, "fail");
            console.log(err);
        } );
    }
})
function checkFormValue(dataUsers){
    if(dataUsers.name=='' || dataUsers.lastName=='' || dataUsers.phone==''){
        textResponse = 'All fields must be filled. Try again!'
        printResponse('.response', textResponse, "fail");
        return false;
    }else if(!checkStr(dataUsers.name) || !checkStr(dataUsers.lastName)){
        textResponse = 'Name and last name must be letter only. Try again!'
        printResponse('.response', textResponse, "fail");
        return false;
    }else if(!checkPhone(dataUsers.phone)){
        textResponse = 'Phone must contain 8 digits only. Try again!'
        printResponse('.response', textResponse, "fail");
        return false;
    }else return true;
}
function checkPhone(str) {
    return   str.length===8 && Number.isInteger(Number(str)) && /^\d+$/.test(str);
}
function checkStr(str) {
    return /^[a-zA-Z]+$/.test(str);
}
function printResponse(parentElem, text, className){
    document.querySelector( parentElem ).innerHTML = `
    <span class="${className}">${text}</span>
    `; 
}
function checkNotNullInput(inputElem) {
    return inputElem.value;
}
