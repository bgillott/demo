import "./Canvas.css";

import React, {useEffect, useRef, useState} from "react";
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import Point from "./Point.jsx";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera;

let loaded = false;
// let objpath = '/src/assets/dragon.obj';
let objpath = '/src/assets/hood_fixed.obj';
let spherelist = [];

function Canvas({points, addPoint}) {

    useEffect(() => {
        if(!loaded) {
            sceneUp();
            // drawPoints();
            loaded = true;
        }
    });

    function sceneUp() {
      console.log("UseEffect starting 3js setup");
      const WIDTH = 700;
      const HEIGHT = 700;

      let canvas = document.getElementById("meshCanvas");
      canvas.style.backgroundColor = 'Lightgreen';

      camera = new THREE.PerspectiveCamera(
          50,
          canvas.clientWidth / canvas.clientHeight,
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


      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
      ambientLight.castShadow = true;
      scene.add(ambientLight);

      const spotLight = new THREE.SpotLight(0xffffff, .8);
      spotLight.castShadow = true;
      spotLight.position.set(100, 500, 100);
      scene.add(spotLight);

      const controls = new OrbitControls(camera, renderer.domElement)
      // const stats = Stats();
      // document.body.appendChild(stats.dom);

      const loader = new OBJLoader();

      loader.load(
            objpath,
            function ( object ) {
                let mesh = object.children[0];
                scene.add(mesh);
                // console.log(mesh);
                fitCameraToObject(camera, mesh, 1.25, controls);
            },
            // called when loading is in progresses
            function ( xhr ) {
                // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
                console.log( error );
            }
      );

      const animate = () => {
          // stats.update();
          controls.update();
          // boxMesh.rotation.y += .005;
          renderer.render(scene, camera);
          window.requestAnimationFrame(animate);
      };

      animate();
    }

    useEffect(()=>{
        console.log('Points have changed');
        console.log(points);


        spherelist.map((s) =>(
            scene.remove(s)
        ))
        spherelist = [];

        const geometry = new THREE.SphereGeometry( 5, 16, 8);
        const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );


        function addeach(p){
            const sphere = new THREE.Mesh( geometry, material );
            sphere.position.set(p.x, p.y, p.z);

            spherelist.push(sphere);
        }

        points.map((p) => (
            addeach(p)
        ))

        spherelist.map((s)=> (
                scene.add(s)
            )
        )


    },[points]);


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

    const fitCameraToObject = function ( camera, mesh, offset, controls ) {
        offset = offset || 1.25;
        const boundingBox = new THREE.Box3();

        mesh.geometry.computeBoundingBox();
        boundingBox.copy( mesh.geometry.boundingBox ).applyMatrix4( mesh.matrixWorld );
        // console.log(boundingBox);

        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        // console.log(center);

        const size = new THREE.Vector3();
        boundingBox.getSize(size);
        // console.log(size);

        // get the max side of the bounding box (fits to width OR height as needed )
        const maxDim = Math.max( size.x, size.y, size.z );
        const fov = camera.fov * ( Math.PI / 180 );
        let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );

        cameraZ *= offset; // zoom out a little so that objects don't fill the screen

        camera.position.z = cameraZ;

        const minZ = boundingBox.min.z;
        const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;

        camera.far = cameraToFarEdge * 3;
        camera.updateProjectionMatrix();

        if ( controls ) {
            // set camera to rotate around center of loaded object
            controls.target = center;

            // prevent camera from zooming out far enough to create far plane cutoff
            controls.maxDistance = cameraToFarEdge * 2;
            controls.saveState();
        } else {

            camera.lookAt( center )
        }
    }

    return (
      <div id={"container"} className={"container"}>
          <canvas id={"meshCanvas"} className={"meshCanvas"} onDoubleClick={canvasClicked}/>
      </div>
    );
}

export default Canvas;
