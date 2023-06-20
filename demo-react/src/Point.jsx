import { Component } from "react";
import "./Point.css";
import axios from "axios";

class Point extends Component {
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
      <div className={"point"}>
          <p>name: {this.props.name}</p>
          <p>id: {this.props.id}</p>
          <p>{"("+ this.props.x + ", " + this.props.y + ", " + this.props.z +")"}</p>
          <button onClick={this.get}> get </button>
          <button onClick={this.post}> post </button>
      </div>
    );
  }
}
export default Point;
