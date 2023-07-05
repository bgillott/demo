import "./Canvas.css";

import {useEffect, useRef, useState} from "react";
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
// import obj from "/Users/whiteout-bengillott/Desktop/Data/OBJ/teapot.obj";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera;

function Canvas({addPoint}) {

  //SETUP FOR 3JS
  useEffect(() => {
    console.log("UseEffect starting 3js setup");
    const WIDTH = 500;
    const HEIGHT = 500;

    let canvas = document.getElementById("meshCanvas");
    canvas.style.backgroundColor = 'Lightgreen';

    camera = new THREE.PerspectiveCamera(
      50,
        canvas.clientWidth/canvas.clientHeight,
      1,
      1000
    );
    camera.position.z = 96;

    let renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    })
    renderer.setSize(WIDTH, HEIGHT);
    document.getElementById("container").appendChild(renderer.domElement);


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);



    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // scene.add(boxMesh);

    const loader = new OBJLoader();
    loader.load(
        // resource URL
        '/src/assets/dragon.obj',
        // called when resource is loaded
        function ( object ) {
            scene.add(object);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
    function ( error ) {
            console.log( 'An error happened' );
        }
    );


    const controls = new OrbitControls(camera, renderer.domElement)
    // const stats = Stats();
    // document.body.appendChild(stats.dom);

    const animate = () => {
      // stats.update();
      controls.update();
      // boxMesh.rotation.y += .005;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();
  }, [])

  function canvasClicked(e){
      let raycaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();

      const canvas = document.getElementById("meshCanvas");

      mouse.x = ((e.clientX - canvas.getBoundingClientRect().x) / canvas.clientWidth) * 2 - 1;
      mouse.y = - ((e.clientY - canvas.getBoundingClientRect().y) / canvas.clientHeight) * 2 + 1;
      console.log("Mouse X:" + mouse.x + " Y:" + mouse.y);

      raycaster.setFromCamera( mouse, camera );

      let intersects = raycaster.intersectObjects( scene.children );

      if ( intersects.length > 0 ) {
        //if there are intersections - take the first one and add it
        let point = intersects[0].point;
        addPoint(point.x, point.y, point.z);
      }
  }

  return (
      <div id={"container"} className={"container"}>
        <canvas id={"meshCanvas"} className={"meshCanvas"} onClick={canvasClicked}/>
      </div>
  );
}

export default Canvas;
