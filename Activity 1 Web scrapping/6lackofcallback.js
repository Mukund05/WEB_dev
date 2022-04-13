//without callback task are assigned serial wise

let minimist=require("minimist");
let fs=require("fs");

let input=minimist(process.argv);
function prime(i){
    let ifprime=true;
    for(let div=2;div<i;i++){
        if(i%div==0){
            ifprime==false;
            break;
        }
    }
    return ifprime;
}

//task 1 starting
let t1=Date.now();
console.log("task 1 is starting now: ",t1%100000);
let readed =fs.readFileSync(input.source,"utf-8");      //reading task take more time as it is used by hard disk
let t2=Date.now();
console.log("task 1 is finished now: ",t2%100000);
console.log(t2-t1);         //total time in between task 1 from starting to ending
//task 1 finished now

//task 2 starting now
let t3=Date.now();
console.log("task 2 is starting now: ",t3%100000);
let arr=[];
for(let i=0;i<input.n;i++){             //computing prime is using cpu power and it will more faster
    let ifprime=prime(i);
    if(ifprime==true){
        arr.push(i);
    }
}

let t4=Date.now();
console.log("task 2 is finished at: ",t4%100000);
console.log(t4-t3);         //total time in between task2 from starting to ending

