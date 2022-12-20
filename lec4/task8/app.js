const {readFile, writeFile } = require ('fs').promises
console.log('start');
const start = async() =>{
    try{
        const first = await readFile(__dirname+'/text/first.txt', 'utf8')
        const second = await readFile(__dirname+'/text/second.txt', 'utf8')
        await writeFile(
            __dirname+'/text/result.txt',  
            `THIS IS AWESOME : ${first} ${second}`,
            {flag: 'a'},
        )
        console.log(first, second);
    }catch(error){
        console.log(error);
    }
    
}
start()
console.log('code end');