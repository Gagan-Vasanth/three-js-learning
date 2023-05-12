import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // orbit controls are used to control the entire object which is running on the browser

const scene = new THREE.Scene(); // we can create n number of scenes

// changing the background of the screen;
// scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75,
  1,
  0.1,
  10
);
camera.position.z = 2;

const camera2 = new THREE.OrthographicCamera(-2, 2, 2, -2);
camera2.position.x = 1;

camera2.lookAt(new THREE.Vector3(0, 0, 0));
const renderer = new THREE.WebGLRenderer();  // we have to create a renderer which will create a canvas tag in the index.html
renderer.setSize(400, 400);
document.body.appendChild(renderer.domElement);

const renderer2 = new THREE.WebGL1Renderer();
renderer2.setSize(300, 300);
document.body.appendChild(renderer2.domElement);

/* 
just write your orbit controls method with a new operator and 
pass the camera and dom element that you want to control at UI
*/

new OrbitControls(camera, renderer.domElement);
new OrbitControls(camera2, renderer2.domElement);


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

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  render();
}

function render() {
    renderer.render(scene, camera);
    renderer2.render(scene, camera2);
}

animate();
