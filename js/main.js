// import * as THREE from 'three'
// import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
// import {OrbitControls} from "three/addons/controls/OrbitControls.js"
// import {Vector3} from "three"
// import {GUI} from 'https://cdn.skypack.dev/dat.gui'
//
// let gui_container = document.getElementById("gui_container")
// let gui = new GUI({ autoPlace: false });
// gui.domElement.id = 'gui';
// gui_container.appendChild(gui.domElement);
//
// let folder1 = gui.addFolder('Godzilla Rotate');
// let folder11 = gui.addFolder("Godzilla Direction");
// let folder2 = gui.addFolder('Moon Rotate')
// let folder21 = gui.addFolder("Moon Direction");
// let folder3 = gui.addFolder('SpotLight')
//
//
// const renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.outputColorSpace = THREE.SRGBColorSpace;
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x000000);
// renderer.setPixelRatio(window.devicePixelRatio);
//
// document.body.appendChild(renderer.domElement);
//
// const scene  = new THREE.Scene();
// const sceneDiv = document.getElementById('scene');
// renderer.setSize(sceneDiv.clientWidth, sceneDiv.clientHeight);
// sceneDiv.appendChild(renderer.domElement);
//
// const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight,
//   0.1, 100);
// const control = new OrbitControls(camera, renderer.domElement)
// control.enableDamping = true
// control.autoRotate = false
// control.enablePan = true
// control.minDistance = 2
// control.maxDistance = 50
// control.minPolarAngle = 0.5
// control.maxPolarAngle = 1.5
// control.target = new Vector3(0, 1, 0)
// control.update()
//
//
// const width = sceneDiv.clientWidth;
// const height = sceneDiv.clientHeight;
// camera.aspect = width / height;
// camera.updateProjectionMatrix();
// renderer.setSize(width, height);
//
// camera.position.set(5,4,5);
// camera.lookAt(0,0,0);
//
//
// const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
// groundGeometry.rotateX(-Math.PI/2);
// const groundMaterial = new THREE.MeshBasicMaterial({
//   color: 0x555555,
//   side: THREE.DoubleSide
// });
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// scene.add( groundMesh );
//
// // Adding lights
// const ambientLight = new THREE.AmbientLight(0x404040, 6); // Soft white light
// scene.add(ambientLight);
//
// const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
// directionalLight.position.set(12, 9, 0)
// directionalLight.castShadow = true;
// scene.add( directionalLight );
//
// const spotlight = new THREE.SpotLight(0xeeeeee, 2000, 0, 0.2, 0.2);
// spotlight.position.set(2.5, 5, 100);
// spotlight.castShadow = true;
// spotlight.shadow.mapSize.width = 1024;
// spotlight.shadow.mapSize.height = 1024;
// spotlight.shadow.camera.near = 1;
// spotlight.shadow.camera.far = 10;
// spotlight.shadow.focus = 1;
// scene.add(spotlight);
//
//
// // Ground Plane with Texture
// const planeSize = 40;
// const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
//
// const loader = new GLTFLoader();
// let model_godzilla, model_night_city, model_bridge, model_ocean, model_moon;
//
//
// loader.load("asset/models/seaWave/scene.gltf", gltf => {
//   model_ocean = gltf.scene;
//   model_ocean.scale.set(0.02, 0.02, 0.02);
//   model_ocean.position.set(0, 0.02, 0);
//   //scene.add(model_ocean);
//   checkAllModelsLoaded();
// })
//
// loader.load('asset/models/godzilla/scene.gltf', (gltf) => {
//   model_godzilla = gltf.scene;
//   model_godzilla.scale.set(3, 3, 3)
//   model_godzilla.position.set(-5, 0.023, 0)
//   folder1.add(model_godzilla.rotation, 'x', 0, Math.PI);
//   folder1.add(model_godzilla.rotation, 'y', 0, Math.PI);
//   folder1.add(model_godzilla.rotation, 'z', 0, Math.PI);
//
//   folder11.add(model_godzilla.position, 'x', 0, 10);
//   folder11.add(model_godzilla.position, 'y', 0, 10);
//   folder11.add(model_godzilla.position, 'z', 0, 10);
//   model_godzilla.rotation.y = Math.PI / 2
//
//   // Add LOD object to the scene
//   scene.add(model_godzilla);
// });
// loader.load("asset/models/LANightCity/scene.gltf", (gltf) => {
//   model_night_city = gltf.scene;
//   model_night_city.scale.set(0.4, 0.4, 0.4)
//   model_night_city.rotation.y = Math.PI / 10;
//   model_night_city.position.set(4, 0.5, -6)
//   scene.add(model_night_city);
// })
//
// loader.load("asset/models/brooklynBridge/scene.gltf", gltf => {
//   model_bridge = gltf.scene;
//   model_bridge.scale.set(0.3, 0.3, 0.3);
//   model_bridge.rotation.y = Math.PI / 2 + Math.PI / 15;
//   model_bridge.position.set(4, 0.56, 5.3)
//   scene.add(model_bridge);
// })
//
// loader.load("asset/models/moon/scene.gltf", gltf => {
//   model_moon = gltf.scene;
//   model_moon.scale.set(0.0005, 0.0005, 0.0005);
//   model_moon.position.set(12, 9, 0)
//
//   folder2.add(model_moon.rotation, 'x', 0, Math.PI / 2);
//   folder2.add(model_moon.rotation, 'y', 0, Math.PI / 2);
//   folder2.add(model_moon.rotation, 'z', 0, Math.PI / 2);
//
//   folder21.add(model_moon.position, 'x', 0, 10);
//   folder21.add(model_moon.position, 'y', 0, 10);
//   folder21.add(model_moon.position, 'z', 0, 10);
//
//   scene.add(model_moon);
// })
//
// // folder3.add(spotlight.intensity, 'intensity', 0, 20000);
//
// let folder31 = gui.addFolder("SpotLight Direction");
// folder31.add(spotlight.position, 'x', 0, 100);
// folder31.add(spotlight.position, 'y', 0, 100);
// folder31.add(spotlight.position, 'z', 0, 100);
//
// folder1.open();
// folder11.open();
// folder2.open();
// folder21.open();
// folder3.open();
//
// loader.load(
//   'asset/models/skybox/scene.gltf',
//   function (gltf) {
//       const skybox = gltf.scene;
//
//       // Scale the skybox to fit around the entire scene
//       const scale = 40;
//       skybox.scale.set(scale, scale, scale);
//
//       // Ensure the skybox is rendered as a background
//       skybox.children.forEach((child) => {
//           if (child.material) {
//               child.material.side = THREE.BackSide;
//               child.material.depthWrite = false;
//               child.material.depthTest = false;
//           }
//       });
//
//       scene.add(skybox);
//   },
//   undefined,
//   function (error) {
//       console.error('An error occurred while loading the skybox:', error);
//   }
// );
//
//
// // Ensure both models are loaded
// function checkAllModelsLoaded() {
//   if (model_ocean) {
//       populateGround();
//   }
// }
//
// // Procedurally populate the ground plane
// function populateGround() {
//   const gridSize = 20; // Each cell will be 1x1 if the ground is 10x10
//
//   for (let i = 0; i < gridSize; i++) {
//       for (let j = 0; j < gridSize; j++) {
//           if ((i + j) % 4 === 0){
//             //const rand = Math.random();
//             // const clone = rand < 0.8 ? model_building_small.clone(true) : model_building_big.clone(true);
//             const clone = model_ocean.clone(true);
//
//             // Scale the model to fit within each cell
//             clone.scale.set(0.2, 0.2, 0.2); // Adjust as needed
//
//             // Positioning within the cell
//             const posX = (i - gridSize / 2) + 0.5; // Center each model within the cell
//             const posZ = (j - gridSize / 2) + 0.5;
//             clone.position.set(posX, 0.23, posZ);
//
//             scene.add(clone);
//             }
//       }
//   }
// }
//
//
// function animate() {
//     requestAnimationFrame( animate );
//     //animateParticles();
//     control.update();
//     renderer.render(scene, camera);
// }
// animate();

import * as THREE from 'three'
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import {Vector3} from "three"

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
control.minDistance = 0
control.maxDistance = 100
control.minPolarAngle = 0.5
control.maxPolarAngle = 1.5
control.target = new Vector3(0, 1, 0)
control.update()


const width = sceneDiv.clientWidth;
const height = sceneDiv.clientHeight;
camera.aspect = width / height;
camera.updateProjectionMatrix();
renderer.setSize(width, height);





var isMoving_godzilla = true;
var isMoving_obj2 = false;
var isMoving_obj3 = false;;
var isMoving_light = false;
var light_brightness;

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

const spotlight = new THREE.SpotLight(0xeeeeee, 20000, 0, 0.2, 0.2);
spotlight.position.set(2.5, 5, 100);
spotlight.castShadow = true;
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;
spotlight.shadow.camera.near = 1;
spotlight.shadow.camera.far = 10;
spotlight.shadow.focus = 1;
scene.add(spotlight);


// Ground Plane with Texture
const planeSize = 36;

const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);

// Load texture
const textureLoader = new THREE.TextureLoader();
textureLoader.load('asset/textures/sea.png', function(texture) {
  // Set texture wrapping to repeat
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // Set the number of times the texture should repeat
  texture.repeat.set(20, 20); // Adjust these values as needed

  const planeMaterial = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = Math.PI / 2;
  // Adjust the Z position of the plane to avoid Z-fighting
  plane.position.y = 0.02;

  // Add plane to the scene
  scene.add(plane);
});

const loader = new GLTFLoader();
let model_godzilla, city, model_heli, model_moon, bridge;

loader.load('asset/models/godzilla/scene.gltf', (gltf) => {
  model_godzilla = gltf.scene;
  model_godzilla.scale.set(1.5, 1.5, 1.5)
  model_godzilla.rotation.y = Math.PI

  // Add LOD object to the scene
  scene.add(model_godzilla);
});

loader.load('asset/models/brooklynBridge/scene.gltf', (gltf) => {
  bridge = gltf.scene;
  bridge.scale.set(5, 1, 1)
  bridge.position.set(3,-0.1,3)
  bridge.rotation.y = Math.PI

  // Add LOD object to the scene
  scene.add(bridge);
});

loader.load('asset/models/heli/scene.gltf', gltf => {
  model_heli = gltf.scene;
  model_heli.scale.set(0.4, 0.4, 0.4)
  model_heli.position.set(2, 4, 2);
  scene.add(model_heli);

});


loader.load('asset/models/LANightCity/scene.gltf', gltf => {
  city = gltf.scene;
  checkAllModelsLoaded();
});
loader.load("asset/models/moon/scene.gltf", gltf => {
  model_moon = gltf.scene;
  model_moon.scale.set(0.0005, 0.0005, 0.0005);
  model_moon.position.set(12, 9, 0)
  scene.add(model_moon);
})

loader.load(
  'asset/models/skybox/scene.gltf',
  function (gltf) {
    const skybox = gltf.scene;

    // Scale the skybox to fit around the entire scene
    const scale = 30;
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
  if (city) {
    populateGround();
  }
}

function getDimensions(object){
  // Create a new Box3 instance
  const box = new THREE.Box3();

  // Compute the bounding box of the object
  box.setFromObject(object);

  // Get the minimum and maximum coordinates of the bounding box
  const min = box.min;
  const max = box.max;

  // Calculate the dimensions on the x-y plane (width and height)
  const width = max.x - min.x;
  const height = max.y - min.y;
  return width, height
}



// Procedurally populate the ground plane
function populateGround() {
  const gridSize = 36; // Each cell will be 1x1 if the ground is 10x10
  const cityScale = 0.2;
  for (let i = 0; i < gridSize; i+=4) {
    for (let j = 0; j < gridSize; j+=4) {
      if ( ((j > gridSize / 4)&&(j < 3 * gridSize / 4)) && ((i < gridSize / 4) || (i > 3 * gridSize /4)) ){
        const clone = city.clone(true);
        clone.scale.set(cityScale , cityScale , cityScale );
        // Positioning within the cell
        const posX = (i - gridSize / 2) + 2 * cityScale; // Center each model within the cell
        const posZ = (j - gridSize / 2) + 2 * cityScale;
        clone.position.set(posX, 0.04, posZ+1);

        clone.rotation.y = Math.PI / 8;
        scene.add(clone);
        const rand = Math.random();

      }
    }
  }
}


const clock = new THREE.Clock();

let particleSystem;
const particleSystems = [];

// Function to create explosion particles
function createExplosion(location, particleCount = 40, ttl = 5) {
  const particleGeometry = new THREE.BufferGeometry();
  const particles = new Float32Array(particleCount * 3); // Position data

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    particles[i3] = location.x;
    particles[i3 + 1] = location.y;
    particles[i3 + 2] = location.z;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xff0000, // Red color
    size: 0.1,
    transparent: true,
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  particleSystem.ttl = ttl; // Set time-to-live property
  particleSystems.push(particleSystem);
  scene.add(particleSystem);
}

// Animate explosion particles
function animateParticles() {
  const delta = clock.getDelta();

  for (let i = particleSystems.length - 1; i >= 0; i--) {
    const particleSystem = particleSystems[i];
    const particles = particleSystem.geometry.attributes.position.array;

    // Update each particle's position
    for (let j = 0; j < particles.length; j += 3) {
      particles[j] += (Math.random() - 0.5) * delta * 10;
      particles[j + 1] += (Math.random() - 0.5) * delta * 10;
      particles[j + 2] += (Math.random() - 0.5) * delta * 10;
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;

    // Decrease TTL and remove if expired
    particleSystem.ttl -= delta;
    if (particleSystem.ttl <= 0) {
      scene.remove(particleSystem);
      particleSystems.splice(i, 1);
    }
  }
}

// controls
const godzilla_move_button = document.getElementById('godzilla-move-button');
const obj2_move_button = document.getElementById('obj2-move-button');
const obj3_move_button = document.getElementById('obj3-move-button');
const light_move_button = document.getElementById('light-move-button');
const light_brightness_range = document.getElementById('light-brightness-range');

// add event listeners
godzilla_move_button.addEventListener('click', () => {
  isMoving_godzilla = true;
  isMoving_obj2 = false;
  isMoving_obj3 = false;;
  isMoving_light = false;
});

// add event listeners
obj2_move_button.addEventListener('click', () => {
  isMoving_godzilla = false;
  isMoving_obj2 = true;
  isMoving_obj3 = false;;
  isMoving_light = false;
});

// add event listeners
obj3_move_button.addEventListener('click', () => {
  isMoving_godzilla = false;
  isMoving_obj2 = false;
  isMoving_obj3 = true;;
  isMoving_light = false;
});

// add event listeners
light_move_button.addEventListener('click', () => {
  isMoving_godzilla = false;
  isMoving_obj2 = false;
  isMoving_obj3 = false;;
  isMoving_light = true;
});

light_brightness_range.addEventListener('input', () => {
  spotlight.intensity = parseFloat(light_brightness_range.value);
});

// Add event listener for keyboard input
document.addEventListener('keydown', onDocumentKeyDown, false);

// Handle window resize
window.addEventListener('resize', () => {
  const width = sceneDiv.clientWidth;
  const height = sceneDiv.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});


const moveSpeed = 0.1;
const rotateSpeed = 0.02;

function onDocumentKeyDown(event) {
  let model;
  if (isMoving_godzilla){
    model = model_godzilla;
  }
  else if (isMoving_obj2){
    model = model_obj2;
  }
  else if (isMoving_obj3){
    model = model_obj3;
  }
  else if (isMoving_light){
    model = spotlight;
    moveSpeed = 1
  }
  switch (event.key) {
    case 'w':
      model.position.z -= moveSpeed;
      if (isMoving_godzilla && (Math.random() < 0.2)){
        createExplosion(model.position)
      }
      break;
    case 's':
      model.position.z += moveSpeed;
      if (isMoving_godzilla && (Math.random() < 0.2)){
        createExplosion(model.position)
      }
      break;
    case 'a':
      model.position.x -= moveSpeed;
      if (isMoving_godzilla && (Math.random() < 0.2)){
        createExplosion(model.position)
      }
      break;
    case 'd':
      model.position.x += moveSpeed;
      if (isMoving_godzilla && (Math.random() < 0.2)){
        createExplosion(model.position)
      }
      break;
    case '1':
      model.rotation.x -= rotateSpeed;
      break;
    case '2':
      model.rotation.x += rotateSpeed;
      break;
    case '3':
      model.rotation.y -= rotateSpeed;
      break;
    case '4':
      model.rotation.y += rotateSpeed;
      break;
    case '5':
      model.rotation.z -= rotateSpeed;
      break;
    case '6':
      model.rotation.z += rotateSpeed;
      break;
  }
}



function animate() {
  requestAnimationFrame( animate );
  animateParticles();
  control.update();
  renderer.render(scene, camera);
}
animate();
