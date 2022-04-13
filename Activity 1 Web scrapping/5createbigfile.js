//create a big file using append
//input >node .\5createbigfile.js --n=1000 --dest=big.data

let minimist=require("minimist");
let fs=require("fs");

let input=minimist(process.argv);
let array=[];
for(let i=0;i<input.n;i++){
    array.push(i);                                  //add every no in array to create a valid file with element
}
let text=array.join("\n");                          //join array element and store in string text
fs.writeFileSync(input.dest,text,"utf-8");          //everything in the string store in output folder from text in utf format
fs.appendFileSync(input.dest,text,"utf-8");         //rewrite same thing in output folder
fs.appendFileSync(input.dest,text,"utf-8");         //rewrite same thing in output folder
fs.appendFileSync(input.dest,text,"utf-8");         //rewrite same thing in output folder