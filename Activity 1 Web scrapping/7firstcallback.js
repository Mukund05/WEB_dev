let minimist =require("minimist");
let fs=require("fs");
let input=minimist(process.argv);

function isprime(i){
    let ifprime=true;
    for(let k=2;k<i;k++){
        if(i%k==0){
            ifprime==false;
            break;
        }
    }
    return ifprime;
}
//task 1 start in better way
let t1=Date.now();
console.log("task 1 is starting at: ",t1%100000);
fs.readFile(input.source,function(goterror,gotdata){           //read in parallel way and let below code run as well
    let t2=Date.now();
    console.log("task 1 finished now: ",t2%100000);
    console.log(t2-t1);
});
//task 1 end

//task 2 start
let t3=Date.now();
console.log("task 2 sarted at: ",t3%100000); 
let arr=[];
for(let i=1;i<input.n;i++){
    let ifprime=isprime(i);
    if(ifprime==true){
        arr.push(i);
    }
}
let t4=Date.now();
console.log("task 2 is finished at: ",t4%100000);
console.log(t4-t3);
