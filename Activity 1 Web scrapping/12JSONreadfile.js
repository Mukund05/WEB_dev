//read an json file from source 
let minimist =require("minimist");
let fs =require("fs");
let input=minimist(process.argv);

fs.readFile(input.dest,"utf-8",function(err,data){
    if(err){
        console.log("error occur");
    }if(data){
        let string=JSON.parse(data);    //JSON.parse(); used to convert the json to jso format to manipulate with readed json file
        console.log(string[2].match[0].vs);  //now you can manipulate the file and do whatever whant to do
    }
})

//jso 
//if you want to save the jso convert these to json with the help of stringify
//iif you want to manipulate the json convert it to jso using JSON.parse();