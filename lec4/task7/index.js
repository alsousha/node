'use strict'
const {readFile, writeFile} = require('fs')
console.log('start');
readFile(__dirname+'/text/first.txt', 'utf8', (err, result) =>{
    if(err){
        console.log(err);
        return
    }
    const first = result
    console.log(first);
    readFile(__dirname+'/text/second.txt', 'utf8', (err, result) =>{
        if(err){
            console.log(err);
            return
        }
        const second = result
        writeFile(
            __dirname + '/text/result-async.txt',
            `Here is the result : ${first}, ${second}`,
            (err, result)=>{
                if(err){
                    console.log(err);
                    return
                }
                console.log('done with this task');
            },
        )
    })
})
console.log('starting next task');