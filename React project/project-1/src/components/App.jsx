import React from "react";
import Login from "./Login.jsx";
// import * as heading from "./Heading";
// import List from "./List";

var isloggedin=false;

function logged(){
  if(isloggedin){
    return <h1>Hello</h1>;
  }else{
    return <Login />
  }
}

function App() {
  return <div className="container">{logged()}</div>;
}

export default App;