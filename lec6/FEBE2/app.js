'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { readFile } = require('fs/promises');
const { resolve } = require('path');
const { rejects } = require('assert');
let is_file_exists = false;
let text_data;

function searchStrInArr(str, arr){
   let isEquals = arr.find(item => item.localeCompare(str)==0) //return item if exists or undefined
   return(isEquals!== undefined)
}

function createServer(text_data_arr){
    const home = fs.readFileSync(`${__dirname}/templates/index.html`);
    const server = http.createServer((req, res) => {
        let pathName = req.url;
        const path = url.parse(pathName, true);
        pathName = path.pathname;
        const query = path.query;
        const method = req.method;
        
        if (pathName === '/') {
        res.setHeader('Content-Type', 'text/html');
        // write html file to the client and complete the request (return)
        return res.end(home);
        }
        
        if (pathName === '/search') {
        if (method === 'POST') {
            const body = [];
            req.on('data', chunk => {
            body.push(chunk); 
            });
            req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); //
            //console.log(parsedBody); //str_to_search=qwer
        
            //get str
            const str_to_search = parsedBody.split('=')[1].replaceAll("+"," "); 
            console.log(`String "${str_to_search}" exists in file: ${searchStrInArr(str_to_search, text_data_arr)}`);
            });
        }
        // redirection to home page
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.writeHead(302, { Location: '/' });
        return res.end();
        }
        // invalid url
        res.writeHead(404, {
        'Content-TYpe': 'text/html',
        });
        res.end('<h1>Page not found</h1>');
    });
        
    server.listen(3000);
}
const start = async() =>{
    try{
        //read file
        text_data = await readFile(
            path.join(__dirname, 'assets', 'text.txt'),
            'utf-8'
        )
        is_file_exists = true;
    }catch(error){
        console.log("File not found");
    }
    
    if(is_file_exists){
        const text_data_arr = text_data.split('\r\n');        

        // create server
        createServer(text_data_arr)
    }
}
//start().then(console.log("res: "+is_file_exists))
start()



//read file
// fs.readFile(
//     path.join(__dirname, 'assets', 'text.txt'),
//     'utf-8',
//     (err, data)=>{ 
//         if(err)   
//             console.log("Error. File not found");
//         else{
//             text_data = data;
//             is_file_exists = true;
//             //console.log(is_file_exists);
//             if(is_file_exists){
//               const text_data_arr = text_data.split('\r\n');
//               console.log(text_data_arr);
//               const home = fs.readFileSync(`${__dirname}/templates/index.html`);
          
//               // create server
//               const server = http.createServer((req, res) => {
//                 let pathName = req.url;
//                 const path = url.parse(pathName, true);
//                 pathName = path.pathname;
//                 const query = path.query;
//                 const method = req.method;
              
//                 if (pathName === '/') {
//                   res.setHeader('Content-Type', 'text/html');
//                   // write html file to the client and complete the request (return)
//                   return res.end(home);
//                 }
              
//                 if (pathName === '/search') {
//                  if (method === 'POST') {
//                     const body = [];
//                     req.on('data', chunk => {
//                       body.push(chunk); 
//                     });
//                     req.on('end', () => {
//                       const parsedBody = Buffer.concat(body).toString(); //

//                       //console.log(parsedBody); //str_to_search=qwer
              
//                       //get str
//                       const str_to_search = parsedBody.split('=')[1]; 
//                       console.log(str_to_search.replace("+"," "));
//                       console.log("String exists in file: " + searchStrInArr(str_to_search.replaceAll("+"," "), text_data_arr));
//                       //console.log(searchStrInArr(str_to_search.replace("+"," "), text_data_arr));
//                     });
//                   }
//                   // redirection for both forms to home page
//                   res.statusCode = 302;
//                   res.setHeader('Location', '/');
//                   res.writeHead(302, { Location: '/' });
//                   return res.end();
//                 }
//                 // invalid url
//                 res.writeHead(404, {
//                   'Content-TYpe': 'text/html',
//                 });
//                 res.end('<h1>Page not found</h1>');
//               });
              
//               server.listen(3000);
//           }
            
//         }
//     }
// )
//const {readFile } = require ('fs').promises




//start()
//console.log(is_file_exists);

