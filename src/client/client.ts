import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // orbit controls are used to control the entire object which is running on the browser

// to show the stats to check the usability of your bwoser CPU and memory. You need to enable stats and this is only required
// in development

import Stats from "three/examples/jsm/libs/stats.module";

import { GUI } from "lil-gui";
import { AxesHelper } from "three";

const scene = new THREE.Scene();
scene.add(new AxesHelper(5));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.2,
  1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* 
just write your orbit controls method with a new operator and 
pass the camera and dom element that you want to control at UI
*/

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

const stats = new Stats();
document.body.appendChild(stats.dom);

// add GUI for interacting with the models that we attach to in the UI

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube"); // create a new folder and add the object to it
const cubeRotationFolder = cubeFolder.addFolder("Rotation");
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 3); // added rotation of the cube
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 3);
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 3);
cubeRotationFolder.open();

const cubePositionFolder = cubeFolder.addFolder("Position");
cubePositionFolder.add(cube.position, 'x', -10, 10, 0.1);
cubePositionFolder.add(cube.position, "y", -10, 10, 0.1);
cubePositionFolder.add(cube.position, "z", -10, 10, 0.1);
cubePositionFolder.open();

const cubeScaleFolder = cubeFolder.addFolder("Scale");
cubeScaleFolder.add(cube.scale, "x", -5, 10);
cubeScaleFolder.add(cube.scale, "y", -5, 10);
cubeScaleFolder.add(cube.scale, "z", -5, 10);
cubeScaleFolder.open();

const cameraFolder = gui.addFolder("camera");
cameraFolder.add(camera.position, "z", 0, 10); // added position of the cube
gui.open();

function animate() {
  requestAnimationFrame(animate);

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
