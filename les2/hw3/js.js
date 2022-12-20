'use strict';
//Bogdanov Alsu 333988939
//Barak Tsach 300096245

//summ zero elems into arr
let arr = [2,5,3,0,4,0,34,0]
let sumZero = 0;

//if item of array is 0 -> sumZero++
arr.forEach(function(item, i){
    sumZero += (item === 0) ? 1 : 0
})
console.log("Count zero elements: " + sumZero);

