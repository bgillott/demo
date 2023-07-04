import React from "react";
import "./Sidebar.css";
import Point from "./Point.jsx";

function Sidebar({points, deletePoint}) {
  return (
    <div className={"sidebar"}>
        <h2>Points</h2>
            {points.map((p) => (
                <Point key={p.id} id ={p.id} name={p.title} x={p.x} y={p.y} z={p.z} deletePoint={deletePoint}/>
            ))}
    </div>
  );
}

export default Sidebar;