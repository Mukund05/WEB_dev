import React, { useState } from "react";

function App() {
  let time=new Date().toLocaleTimeString();
  const [count, setCount] = useState(time);

  function increase() {
    const newtime=new Date().toLocaleTimeString();
    setCount(newtime);
  }
  // setInterval(increase(),1000);

  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={increase}>GET TIME</button>
    </div>
  );
}

export default App;
