import { Component, useState } from "react";
import "./Sidebar.css";
import axios from "axios";
import Point from "./Point.jsx";



class Sidebar extends Component {
  async getAllPoints() {
    const response = await axios.get("http://localhost:8080/api/points", {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);

    // return response.data.map((p) =>
    //     <Point key = {p.id} name = "PointOne" id={1} x={1} y={1} z={1}/>
    // );
    return (<Point name = "Hello"/>);
  }
  async addPoint() {
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
        <h2>Points</h2>
        {this.getAllPoints()}
        {/*<Point name = "PointOne" id={1} x={1} y={1} z={1}/>*/}
      </div>
    );
  }
}

export default Sidebar;
