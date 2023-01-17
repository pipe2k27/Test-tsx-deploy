import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Example from "./table";
import { interpolateAnswers } from "./InterploateAnswers";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={() => interpolateAnswers()}>Felipe perarnau</p>
        <Example />
      </header>
    </div>
  );
}

export default App;
