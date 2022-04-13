//timer 
//node ./16timer.js --n=10 --d=100

let minimist=require("minimist");
let input=minimist(process.argv);

let count=input.n;                          //how many time to interval execute
let time=input.d;                           //time interval to start the function reagain in milisec

let id=setInterval(function(){              //
    console.log(count+"tus to go");         //print count no
    count--;                                //decrese count
    if(count==0){                           //if count reaches 0 
        console.log("timeout");             //print timeout
        clearInterval(id);                  //clear the timing same like break function
    }
},time)                                     