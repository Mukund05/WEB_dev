//json-javascript object notation
//json use to saving data same like javascript object do

let minimist =require("minimist");
let input=minimist(process.argv);

let s={
    name: "mukund",
    age: 20
}  //s is a object and name & age is properties or data member of the object

// console.log(s.name);    //to access anything from object
// console.log(s.age);

let arrayofages=[20,21,22];
// console.log(arrayofages[0]);
// console.log(arrayofages[1]);
// console.log(arrayofages[2]);

let arrayofname=["mukund","satya","mohit"];
// console.log(arrayofname[0]);
// console.log(arrayofname[1]);
// console.log(arrayofname[2]);   
//as you see array can store data of same class like only integer or only string but object like s can store multiple

let arrayofobject=[
    {
        name:"mukund",
        age: 19
    },
    {
        name: "mohit",
        age:22
    },
    {
        name:"satya",
        age:20
    }
]
console.log(arrayofobject[0]); //can access all or 
        //or
console.log(arrayofobject[0].age); //can access anything specific propertities of object

