import React, { useState, useEffect } from "react";
import "./Point.css";
import axios from "axios";

function Point(props){
    return (
      <div className={"point"}>
          {/*<p>name: {props.name}</p>*/}
          <p>id: {props.id}</p>
          <p>{"("+ props.x + ", " + props.y + ", " + props.z +")"}</p>
          <button onClick={() => props.deletePoint(props.id)}> X </button>
      </div>
    );
}
export default Point;