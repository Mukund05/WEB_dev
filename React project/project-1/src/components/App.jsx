import React from "react";
import * as heading from "./Heading";
import List from "./List";

function App() {
  return (
    <div>
      <h1>{heading.HEeading()}</h1>
      <h1>{heading.head()}</h1>
      <List />
    </div>
  );
}
export default App;
