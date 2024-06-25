import * as THREE from 'three'
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import {Vector3} from "three"
import {GUI} from 'https://cdn.skypack.dev/dat.gui'

let gui_container = document.getElementById("gui_container")
let gui = new GUI({ autoPlace: false });
gui.domElement.id = 'gui';
gui_container.appendChild(gui.domElement);

let folder1 = gui.addFolder('Godzilla Rotate');
let folder11 = gui.addFolder("Godzilla Direction");
let folder2 = gui.addFolder('Moon Rotate')
let folder21 = gui.addFolder("Moon Direction");
let folder3 = gui.addFolder('SpotLight')


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const scene  = new THREE.Scene();
const sceneDiv = document.getElementById('scene');
renderer.setSize(sceneDiv.clientWidth, sceneDiv.clientHeight);
sceneDiv.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight,
  0.1, 100);
const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true
control.autoRotate = false
control.enablePan = true
control.minDistance = 2
control.maxDistance = 50
control.minPolarAngle = 0.5
control.maxPolarAngle = 1.5
control.target = new Vector3(0, 1, 0)
control.update()


const width = sceneDiv.clientWidth;
const height = sceneDiv.clientHeight;
camera.aspect = width / height;
camera.updateProjectionMatrix();
renderer.setSize(width, height);

camera.position.set(5,4,5);
camera.lookAt(0,0,0);


const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI/2);
const groundMaterial = new THREE.MeshBasicMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add( groundMesh );

// Adding lights
const ambientLight = new THREE.AmbientLight(0x404040, 6); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set(12, 9, 0)
directionalLight.castShadow = true;
scene.add( directionalLight );

const spotlight = new THREE.SpotLight(0xeeeeee, 2000, 0, 0.2, 0.2);
spotlight.position.set(2.5, 5, 100);
spotlight.castShadow = true;
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;
spotlight.shadow.camera.near = 1;
spotlight.shadow.camera.far = 10;
spotlight.shadow.focus = 1;
scene.add(spotlight);


// Ground Plane with Texture
const planeSize = 40;
const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);

const loader = new GLTFLoader();
let model_godzilla, model_night_city, model_bridge, model_ocean, model_moon;


loader.load("asset/models/seaWave/scene.gltf", gltf => {
  model_ocean = gltf.scene;
  model_ocean.scale.set(0.02, 0.02, 0.02);
  model_ocean.position.set(0, 0.02, 0);
  //scene.add(model_ocean);
  checkAllModelsLoaded();
})

loader.load('asset/models/godzilla/scene.gltf', (gltf) => {
  model_godzilla = gltf.scene;
  model_godzilla.scale.set(3, 3, 3)
  model_godzilla.position.set(-5, 0.023, 0)
  folder1.add(model_godzilla.rotation, 'x', 0, Math.PI);
  folder1.add(model_godzilla.rotation, 'y', 0, Math.PI);
  folder1.add(model_godzilla.rotation, 'z', 0, Math.PI);

  folder11.add(model_godzilla.position, 'x', 0, 10);
  folder11.add(model_godzilla.position, 'y', 0, 10);
  folder11.add(model_godzilla.position, 'z', 0, 10);
  model_godzilla.rotation.y = Math.PI / 2

  // Add LOD object to the scene
  scene.add(model_godzilla);
});
loader.load("asset/models/LANightCity/scene.gltf", (gltf) => {
  model_night_city = gltf.scene;
  model_night_city.scale.set(0.4, 0.4, 0.4)
  model_night_city.rotation.y = Math.PI / 10;
  model_night_city.position.set(4, 0.5, -6)
  scene.add(model_night_city);
})

loader.load("asset/models/brooklynBridge/scene.gltf", gltf => {
  model_bridge = gltf.scene;
  model_bridge.scale.set(0.3, 0.3, 0.3);
  model_bridge.rotation.y = Math.PI / 2 + Math.PI / 15;
  model_bridge.position.set(4, 0.56, 5.3)
  scene.add(model_bridge);
})

loader.load("asset/models/moon/scene.gltf", gltf => {
  model_moon = gltf.scene;
  model_moon.scale.set(0.0005, 0.0005, 0.0005);
  model_moon.position.set(12, 9, 0)

  folder2.add(model_moon.rotation, 'x', 0, Math.PI / 2);
  folder2.add(model_moon.rotation, 'y', 0, Math.PI / 2);
  folder2.add(model_moon.rotation, 'z', 0, Math.PI / 2);

  folder21.add(model_moon.position, 'x', 0, 10);
  folder21.add(model_moon.position, 'y', 0, 10);
  folder21.add(model_moon.position, 'z', 0, 10);

  scene.add(model_moon);
})

// folder3.add(spotlight.intensity, 'intensity', 0, 20000);

let folder31 = gui.addFolder("SpotLight Direction");
folder31.add(spotlight.position, 'x', 0, 100);
folder31.add(spotlight.position, 'y', 0, 100);
folder31.add(spotlight.position, 'z', 0, 100);

folder1.open();
folder11.open();
folder2.open();
folder21.open();
folder3.open();

loader.load(
  'asset/models/skybox/scene.gltf',
  function (gltf) {
      const skybox = gltf.scene;

      // Scale the skybox to fit around the entire scene
      const scale = 40;
      skybox.scale.set(scale, scale, scale);

      // Ensure the skybox is rendered as a background
      skybox.children.forEach((child) => {
          if (child.material) {
              child.material.side = THREE.BackSide;
              child.material.depthWrite = false;
              child.material.depthTest = false;
          }
      });

      scene.add(skybox);
  },
  undefined,
  function (error) {
      console.error('An error occurred while loading the skybox:', error);
  }
);


// Ensure both models are loaded
function checkAllModelsLoaded() {
  if (model_ocean) {
      populateGround();
  }
}

// Procedurally populate the ground plane
function populateGround() {
  const gridSize = 20; // Each cell will be 1x1 if the ground is 10x10

  for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
          if ((i + j) % 4 === 0){
            //const rand = Math.random();
            // const clone = rand < 0.8 ? model_building_small.clone(true) : model_building_big.clone(true);
            const clone = model_ocean.clone(true);

            // Scale the model to fit within each cell
            clone.scale.set(0.2, 0.2, 0.2); // Adjust as needed

            // Positioning within the cell
            const posX = (i - gridSize / 2) + 0.5; // Center each model within the cell
            const posZ = (j - gridSize / 2) + 0.5;
            clone.position.set(posX, 0.23, posZ);

            scene.add(clone);
            }
      }
  }
}


function animate() {
    requestAnimationFrame( animate );
    //animateParticles();
    control.update();
    renderer.render(scene, camera);
}
animate();
