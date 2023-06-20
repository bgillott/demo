import React, {useEffect, useState} from "react";
import "./Sidebar.css";
import axios from "axios";
import Point from "./Point.jsx";

function Sidebar() {
  const [points, setPoints] = useState([]);

  const getAllPoints = async () => {
    const { data } = await axios.get(
        "http://localhost:8080/api/points",
        {
          headers: { "Content-Type": "application/json" },
        }
    );
    const points = data;

    setPoints(points);
    // console.log(points);
  };

  useEffect(() => {
    getAllPoints();
  }, []);


  return (
    <div className={"sidebar"}>
      <h2>Points</h2>
      <div>
        {points.map((p) => (
            <Point key={p.id} id ={p.id} name={p.title} x={p.x} y={p.y} z={p.z}/>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

// async addPoint() {
//   const response = await axios.post(
//     "http://localhost:8080/api/point",
//     { title: "BrowserPoint", x: 1, y: 2, z: 3 },
//     { headers: { "Content-Type": "application/json" } }
//   );
//   console.log(response.data);
// }