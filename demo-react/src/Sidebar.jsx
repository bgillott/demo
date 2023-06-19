import { Component, useState } from "react";
import "./Sidebar.css";
import axios from "axios";

class Sidebar extends Component {
  async get() {
    const response = await axios.get("http://localhost:8080/api/points", {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);
  }
  async post() {
    const response = await axios.post(
      "http://localhost:8080/api/point",
      { title: "BrowserPoint", x: 1, y: 2, z: 3 },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(response.data);
  }

  render() {
    return (
      <div className={"sidebar"}>
        <h2>Points!</h2>
        <div>
          <p>name: Point1</p>
          <p>id: 0</p>
          <p>124.9, 189.4, 67.1</p>
          <button onClick={this.get}> get </button>
          <button onClick={this.post}> post </button>
        </div>
      </div>
    );
  }
}
export default Sidebar;
