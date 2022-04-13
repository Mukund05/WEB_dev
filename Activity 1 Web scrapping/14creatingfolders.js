//creating folder of different names
let minimist=require("minimist");
let fs=require("fs");
let input=minimist(process.argv);

let path=require("path");   //to get path of directory

let jsonfile=fs.readFileSync(input.source,"utf-8");
let jsofile=JSON.parse(jsonfile);

for(let i=0;i<jsofile.length;i++){
    let foldername=path.join(input.dest,jsofile[i].team);   //it will create name of folder and where to save
                            //wheretosave  //file name
    fs.mkdirSync(foldername);
    //crete folder

}
