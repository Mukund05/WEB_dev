import React from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import List from "../noteslist"

function App() {
    return (
      <div>
        <Header />
        { List.map(notes =>(
          <Note 
            key={notes.key}
            title={notes.title}
            content={notes.content}
          />
        ))}
        <Footer />
      </div>
    );
  }
export default App;



