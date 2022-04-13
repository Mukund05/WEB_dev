//install JSDOM  using >npm install jsdom
//jsdom is load to use DOM same like in browser
let minimist= require("minimist");
let fs=require("fs");
let jsdom=require("jsdom");     //give all the properties from jsdom to jsdom 
let input=minimist(process.argv);

fs.readFile(input.source,"utf-8",function(err,data){
    let dom=new jsdom.JSDOM(data);              //take JSDOM function from jsdom and assignd to dom
    let document = dom.window.document;         //dom is wast in which window is for acceing in a windows through document to access any specified docs

    let desc=document.querySelectorAll("div.match-info > div.description "); 
    //we will get all dom of desciption whose parent dom is match info by queryselectorall in description 
    for(let i=0;i<desc.length;i++){
            console.log(desc[i].textContent
                );       //show all the data got in desc from query file as a text
            //if you don't use text content then it will show like a html which is difficult to understand
    }
})

