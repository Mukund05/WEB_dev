let minimist=require("minimist");
let input=minimist(process.argv);

let fs=require("fs");       //inbuilt file system fs
let stext=fs.readFileSync(input.source,"utf-8");            //stext will read from input given reference to read file --source=t.txt

//let dtext=stext.toUpperCase();                      //store the modification of stext to upper case every variable

//fs.writeFileSync(input.dest,dtext,"utf-8");        //it will write a file name of given name in input to dest and write everything from dtext to that new file in utf-8 format



console.log(stext.toUpperCase());               //if you don't wish to create new file and just wanted to print the capitilize word use these

//input for console is >node file.js --source=newfile.txt 
//if you are writing as well then input >node file.js --source=newfile.txt  --dest=captilizewordfile.txt

