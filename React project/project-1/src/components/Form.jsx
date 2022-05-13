import React from "react";

function Form(props) {
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      {props.isuser?null:<input type="password" placeholder="Confirm Password" />}
      <button type="submit">{!props.isuser?"Submit":"Login"}</button>
    </form>
  );
}

export default Form;
