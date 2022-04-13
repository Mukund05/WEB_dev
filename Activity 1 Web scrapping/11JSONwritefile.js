let minimist= require("minimist");
let fs=require("fs");
let input=minimist(process.argv);

//create a object similar like match
let team=[
    {
        team:"india",
        rank:1 ,
        match:[
            {
                vs:"australia",
                result:"win"
            },
            {
                vs:"england",
                result:"win"
            }
        ]
    },
    {
        team:"australia",
        rank:2,
        match:[
            {
                vs:"india",
                ressult:"loss"
            },{
                vs:"england",
                result:"won"
            }
        ]
    },
    {
        team:"england",
        rank:3,
        match:[
            {
                vs:"india",
                result:"loss",
            },
            {
                vs:"australia",
                result:"won"
            }
        ]
    }
]
//now as json can only used to access it cannot writeable in anyformat so first convert it to jso 
let json=JSON.stringify(team);
//now we can write these json file to any where as it is a string now by the help of stringfy
fs.writeFileSync(input.dest,json,"utf-8");
