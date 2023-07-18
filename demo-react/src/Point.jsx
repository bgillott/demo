import React, { useState, useEffect } from "react";
import "./Point.css";
import axios from "axios";

function Point(props){
    return (
      <div className={"point"}>
          {/*<p>name: {props.name}</p>*/}
            <div className={"bot"}>
                <p>Point ID: {props.id}</p>
                <button className={"del"} onClick={() => props.deletePoint(props.id)}> X </button>
            </div>
          <p>{"("+ props.x.toFixed(5) + ",  " + props.y.toFixed(5) + ",  " + props.z.toFixed(5) +")"}</p>

      </div>
    );
}
export default Point;