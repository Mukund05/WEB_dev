//install pdf-lib to create pdf and edit it
let minimist=require("minimist");
let path=require("path");
let fs=require("fs");
let input=minimist(process.argv);
let pdf=require("pdf-lib");

let teamjson=fs.readFileSync(input.source,"utf-8");
let teamjso=JSON.parse(teamjson);
fs.mkdirSync(input.dest);

for(let i=0;i<teamjso.length;i++){
    let teamPath=path.join(input.dest,teamjso[i].team);
    fs.mkdirSync(teamPath);
    for(let j=0;j<teamjso[i].match.length;j++){

        let matchfilename=path.join(teamPath,teamjso[i].match[j].vs+".pdf");
        
        createpdf(teamjso[i].team,teamjso[i].match[j],matchfilename);
        
    }
}
function createpdf(teamname,teammatch,matchfilepath){
    let t1=teamname;
    let t2=teammatch.vs;
    let result=t1+" "+teammatch.result;

    let byteofpdf=fs.readFileSync("template.pdf");
    let originalpdf=pdf.PDFDocument.load(byteofpdf);
    originalpdf.then(function(pdfdoc){
        let page=pdfdoc.getPage(0);

        page.drawText(t1,{
            x:320,
            y:750,
            size:14
        });
        page.drawText(t2,{
            x:320,
            y:700,
            size:14
        });
        page.drawText(result,{
            x:320,
            y:650,
            size:14
        })
        let finalpdf=pdfdoc.save();
        finalpdf.then(function(data){
            fs.writeFileSync(matchfilepath,data);
        })
    })
}
