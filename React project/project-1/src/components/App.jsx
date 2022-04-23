import React from "react";
// import * as heading from "./Heading";
// import List from "./List";

function App() {
  return (
      <div className="card">
        <div className="top">
          <h2 className="name">Virat Kohli</h2>
          <img className="circle-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Virat_Kohli.jpg/220px-Virat_Kohli.jpg" alt="Cricketer" />
        </div>
        <div className="bottom">
          <p className="info" >Telephone no: +1234567890</p>
          <p className="info" >mail : vk12@mail.com</p>
        </div>
      </div>
  );
}
export default App;