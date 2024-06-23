import * as THREE from 'three'
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import {Vector3} from "three"

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

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
control.target = new Vector3(0, 5, 0)
control.update()


camera.position.set(13,4,13);
camera.lookAt(5,6,5);

const groundGeometry = new THREE.PlaneGeometry(400, 400);
const groundMaterial = new THREE.MeshPhongMaterial( {
  color: 0xcbcbcb,
  depthWrite: false,
  side: THREE.DoubleSide
} )
const mesh = new THREE.Mesh( groundGeometry, groundMaterial);
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add( mesh );

const spotLight = new THREE.SpotLight(0xffffff, 150, 70, 0.64, 1);
spotLight.position.set(3, 12, 7);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 10;
spotLight.shadow.focus = 1;
scene.add(spotLight);

const loader = new GLTFLoader().setPath('/godzilla/');
loader.load('scene.gltf', (gltf) => {
  const godzilla = gltf.scene;
  godzilla.position.set( 0, 0, 0 );
  godzilla.scale.set(4, 4, 4)
  scene.add(godzilla);
  godzilla.traverse( function ( object ) {

    if ( object.isMesh ) object.castShadow = true;

  } );
});



function animate() {
    requestAnimationFrame( animate );
    control.update()
    renderer.render(scene, camera);
}
animate();
