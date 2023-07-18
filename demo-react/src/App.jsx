import {React, useEffect, useState} from "react";
import "./App.css";
import axios from "axios";
import Sidebar from "./Sidebar.jsx";
import Canvas from "./Canvas.jsx";

function App() {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        getAllPoints();
    }, []);

    const getAllPoints = async () => {
        const { data } = await axios.get(
            "http://localhost:8080/api/points",
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        const points = data;

        setPoints(points);
    };

    async function addPoint(x, y, z) {
        const response = await axios.post(
            "http://localhost:8080/api/point",
            { title: "Point", x: x, y: y, z: z},
            { headers: { "Content-Type": "application/json" } }
        );

        getAllPoints();
    }

    const deletePoint = async (id) => {
        const { data } = await axios.delete(
            "http://localhost:8080/api/point/" + id,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        const ret = data;
        getAllPoints();
    };

  return (
    <div className={"app"}>
      <h1>Mesh Viewer</h1>
      <div className={"bot"}>
        <Sidebar points={points} deletePoint={deletePoint}/>
        <Canvas addPoint={addPoint} points={points}/>
      </div>
    </div>
  );
}

export default App;
