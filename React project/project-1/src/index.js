import React from "react";
import ReactDOM from "react-dom";

const time=new Date();
const colorStyle={
  color:""
}

var greeting="morning";
if(time.getHours()>6 && time.getHours()<12){
  greeting="morning";
  colorStyle.color='red';
}else if(time.getHours()>12 && time.getHours()<18){
  greeting="afternoon";
  colorStyle.color='green';
}else{
  greeting="night";
  colorStyle.color='blue';
}

ReactDOM.render(
  <div>
    <h1 className="greet" style={colorStyle}>{"Good"+" "+greeting}</h1>
  </div>,
  document.getElementById("root")
);
