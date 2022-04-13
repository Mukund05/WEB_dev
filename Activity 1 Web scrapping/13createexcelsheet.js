//need to install a module for excel which is excel4node
let minimist = require("minimist");
let fs = require("fs");
let excel = require("excel4node");

let input=minimist(process.argv);

let teamJSON=fs.readFileSync(input.source,"utf-8");     //read file and give to teamJSON it is in JSON format convert to jso
let team=JSON.parse(teamJSON);                          //convert to jso from json

let excelfile=new excel.Workbook();     //create a new excel workbook and save it to excelfile
for(let i=0;i<team.length;i++){
    let sheet=excelfile.addWorksheet(team[i].team);  //create multiple worksheet of name get from jso file team name
    sheet.cell(1,1).string("Rank");
    sheet.cell(1,2).number(team[i].rank);
    
    sheet.cell(2,1).string("VS");
    sheet.cell(2,2).string("RESULT");
    for(let j=0;j<team[i].match.length;j++){
        sheet.cell(j+3,1).string(team[i].match[j].vs);
        sheet.cell(j+3,2).string(team[i].match[j].result);
    }
}
excelfile.write(input.dest);