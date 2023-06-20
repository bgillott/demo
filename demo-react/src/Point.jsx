import React, { useState, useEffect } from "react";
import "./Point.css";
import axios from "axios";

function Point(props){

    const deletePoint = async (id) => {
        const { data } = await axios.delete(
            "http://localhost:8080/api/point",
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        const ret = data;
        // setPoints(points);
        console.log("Deleted");
        console.log(ret);
    };

    return (
      <div className={"point"}>
          <p>name: {props.name}</p>
          <p>id: {props.id}</p>
          <p>{"("+ props.x + ", " + props.y + ", " + props.z +")"}</p>
          <button onClick={() => deletePoint(props.id)}> X </button>
      </div>
    );
}
export default Point;