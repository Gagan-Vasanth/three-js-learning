import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // orbit controls are used to control the entire object which is running on the browser

const scene = new THREE.Scene();

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

const orbitcontrols = new OrbitControls(camera, renderer.domElement);
orbitcontrols.addEventListener('change', render); // this render will be called to make the object iteracted when the animate function is stopped


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
  render(); // you can remove the render here if you want. But it is a good practice to call the render from here.
}

// function animate() { // we can call this animate method to animate the cube created
//   requestAnimationFrame(animate); // this ia browser inbuilt function to take the new animate function that will repaint the system in the time span.
//   // usaually this method will be called 60 times per second in the modern browsers and will be paused when the user in another tab or hidden to 
//     // decrease the load on the CPU and battery life

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   render(); // on every update of the objects position we have to renderer the object.
// }

function render() {
  renderer.render(scene, camera);
}

// animate();
render();
