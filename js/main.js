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
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,
  0.1, 100);

const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true
control.autoRotate = false
control.enablePan = false
control.minDistance = 5
control.maxDistance = 30
control.minPolarAngle = 0.5
control.maxPolarAngle = 1.5
control.target = new Vector3(0, 1, 0)
control.update()


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

const spotLight = new THREE.SpotLight(0xffffff, 90, 20, 0.63, 0.5);
spotLight.position.set(2.5, 5, 2.5);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 10;
spotLight.shadow.focus = 1;
scene.add(spotLight);

const loader = new GLTFLoader().setPath('/godzilla/');
loader.load('scene.gltf', (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set(1, 1, 1.9);
  scene.add(mesh);
});

function animate() {
    requestAnimationFrame( animate );
    control.update()
    renderer.render(scene, camera);
}
animate();
