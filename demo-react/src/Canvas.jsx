import "./Canvas.css";

import {useEffect} from "react";
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

function Canvas({addPoint}) {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera();
  let renderer = new THREE.WebGLRenderer();
  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  //SETUP FOR 3JS
  useEffect(() => {
    const WIDTH = 500;
    const HEIGHT = 500;

    scene = new THREE.Scene();
    let canvas = document.getElementById("meshCanvas");
    canvas.style.backgroundColor = 'Lightgreen';

    camera = new THREE.PerspectiveCamera(
      50,
        canvas.clientWidth/canvas.clientHeight,
      1,
      1000
    );
    camera.position.z = 96;

    console.log("Got width of canvas as " + canvas.clientWidth);
    console.log("Got height of canvas as " + canvas.clientHeight);

    renderer = new THREE.WebGLRenderer({
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
    scene.add(boxMesh);

    // const controls = new OrbitControls(camera, renderer.domElement)
    // const stats = Stats();
    // document.body.appendChild(stats.dom);

    const animate = () => {
      // stats.update();
      // controls.update();
      boxMesh.rotation.y += .005;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();
  }, [])

  function canvasClicked(e){
      const canvas = document.getElementById("meshCanvas");
      mouse.x = ((e.clientX - canvas.getBoundingClientRect().x) / canvas.clientWidth) * 2 - 1;
      mouse.y = - ((e.clientY - canvas.getBoundingClientRect().y) / canvas.clientHeight) * 2 + 1;
      console.log("Mouse X:" + mouse.x + " Y:" + mouse.y);

      raycaster.setFromCamera( mouse, camera );

      const intersects = raycaster.intersectObjects( scene.children );

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
