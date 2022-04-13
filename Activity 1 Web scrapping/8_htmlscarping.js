//we are going to scrap everything from given url and store in a file by axios module
//npm install axios
let minimist= require("minimist");          //giving all properties of minimist to minimist name string 
let axios=require("axios");                 //giving all properties of axios to axios name string 
let fs=require("fs");                       //giving all properties of fileSystem(fs) to fs name string 

let input=minimist(process.argv);           //all input go through minimist 

let download=axios.get(input.url);          //promise that all data from url store in download

download.then(function(response){           //promise is done is taken succesfully redirect data to function response
    let html=response.data;                 //store all that data in html string
    fs.writeFileSync(input.dest,html,"utf-8");          //write that data into the destionation folder in utf-8 lang. and take destination folder from input
}).catch(function(error){                   //if promise failed then give error to function error
    console.log("error is coming.");        //print that error is coming
})
