/*
print pattern like aacc. to input
if n=5
*
* *
* * *
* * * *
* * * * *
*/

let k=process.argv;
let n=parseInt(k[2]);

for(let i=1; i<=n;i++){
   let star="";                         //create a blank string 
    for(let m=1;m<=i;m++){
        
        star=star+"*\t";                //store a * and tab every time m loop work
    }
    console.log(star);                  // print the whole string and it will come to new line automatically
    
}