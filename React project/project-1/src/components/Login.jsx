import React from "react";
import Input from "./Input.jsx"; 

function login(){
    return (
        <form className="form">
      <Input type="text" placeholder="Enter your name"></Input>
      <Input type="password" placeholder="Enter password"></Input>
      <button type="SUBMIT">LOGIN</button>
    </form>
    );
}

export default login;