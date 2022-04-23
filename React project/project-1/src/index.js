import React from "react";
import ReactDOM from "react-dom";
// import App from "./components/App";

function Card(props) {
  return (<div>
      <h1>{props.name}</h1>
      <img src={props.imga} alt="king" />
      <p>{props.tel}</p>
      <p>{props.email}</p>
  </div>);
}
ReactDOM.render
    (<div>
        <h1>
            Contact List
        </h1>
        <Card 
            name="Virat Kohli"
            imga="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Virat_Kohli.jpg/220px-Virat_Kohli.jpg"
            tel="+1234567890"
            email="V.kohli@gmail.com"
        />
        <Card 
            name="jos the boss"
            imga="https://www.cricbuzz.com/a/img/v1/152x152/i1/c170980/jos-buttler.jpg"
            tel="+9999888783"
            email="josthebosh@mail.in"
        />
    </div>, 
document.getElementById("root"));
