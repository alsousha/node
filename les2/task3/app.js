'use strict';
console.log(__dirname);
console.log(__filename);
let i=0;
//to finish!!!!!!
const interval = setInterval(()=>{
    i++
    console.log(i)
    if(i===5) clearInterval(interval);
    else console.log('hello!');
}, 1000);

