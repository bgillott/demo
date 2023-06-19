import { React, useState } from "react";
import "./App.css";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
function App() {
  return (
    <div className={"app"}>
      <h1>Mesh Viewer</h1>
      <div className={"bot"}>
        <Sidebar />
        <div className={"viewer"}></div>
      </div>
    </div>
  );
}

export default App;
