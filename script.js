import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
const canvas = document.querySelector("#main-canvas");
const scoretext = document.querySelector('#score');
const accuracytext = document.querySelector('#accuracy');

if(canvas == false){
  console.log("no canvas");
}


const textLoader = new THREE.TextureLoader();

//texture packs

const lowwallText= textLoader.load("./assets/img/Tiles107_1K-JPG/Tiles107_1K-JPG_Color.jpg");
lowwallText.wrapS = THREE.RepeatWrapping;
lowwallText.wrapT = THREE.RepeatWrapping;
lowwallText.repeat.set(5,0.7);

//floor text
const floortextu = textLoader.load("./assets/img/Tiles141_1K-JPG/Tiles141_1K-JPG_Color.jpg");
floortextu.wrapS = THREE.RepeatWrapping;
floortextu.wrapT = THREE.RepeatWrapping;
floortextu.repeat.set(2, 2);

//upper wall
const upwallte = textLoader.load("./assets/img/Tiles107_1K-JPG/Tiles107_1K-JPG_Color.jpg");
upwallte.wrapS = THREE.RepeatWrapping;
upwallte.wrapT = THREE.RepeatWrapping;
upwallte.repeat.set(5, 2)

//target
const targettext = textLoader.load("./assets/img/Texturelabs_Metal_254S.jpg");

//side walls text
const sidewalls = textLoader.load("./assets/img/Tiles107_1K-JPG/Tiles107_1K-JPG_Color.jpg");
sidewalls.wrapS = THREE.RepeatWrapping;
sidewalls.wrapT = THREE.RepeatWrapping;
sidewalls.repeat.set(5, 2.7)

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x3a3f47);
scene.fog = new THREE.Fog(0x3a3f47, 25, 70);

//material
const floortex = new THREE.MeshStandardMaterial({
  map: floortextu,
  roughnessMap: textLoader.load("./assets/img/Tiles141_1K-JPG/Tiles141_1K-JPG_Roughness.jpg"),
  normalMap: textLoader.load("./assets/img/Tiles141_1K-JPG/Tiles141_1K-JPG_NormalGL.jpg")

});

const lWalltex = new THREE.MeshStandardMaterial({

  map: lowwallText,
   roughnessMap: textLoader.load("./assets/img/Tiles107_1K-JPG/Tiles107_1K-JPG_Roughness.jpg"),
  normalMap: textLoader.load("./assets/img/Tiles107_1K-JPG/Tiles107_1K-JPG_NormalGL.jpg")
});
const uWalltex = new THREE.MeshStandardMaterial({

  map: upwallte,
  roughnessMap: textLoader.load("./assets/img/Tiles107_1K-JPG/Tiles107_1K-JPG_Roughness.jpg"),
  normalMap: textLoader.load("./assets/img/Tiles107_1K-JPG/Tiles107_1K-JPG_NormalGL.jpg")
});

const ttex = new THREE.MeshStandardMaterial({
  color: 0x767676,
  roughness: 0.7,
  metalness: 0.1
});

const sideWalls = new THREE.MeshStandardMaterial({

  map: sidewalls,
   roughnessMap: textLoader.load("./assets/img/Tiles107_1K-JPG/Tiles107_1K-JPG_Roughness.jpg"),
  normalMap: textLoader.load("./assets/img/Tiles107_1K-JPG/Tiles107_1K-JPG_NormalGL.jpg")
})



const arena = new THREE.Group();

scene.add(arena);



// Upperwall
const uwallGeo = new THREE.BoxGeometry(30, 12, 1);
const uwall = new THREE.Mesh(uwallGeo, uWalltex);
uwall.position.set(0, 10.1, -14.5);
arena.add(uwall);

const floorGeo = new THREE.BoxGeometry(32, 1, 30);
const floor = new THREE.Mesh(floorGeo, floortex);
floor.position.set(0, -0.5, 0);
arena.add(floor);

const lowerWallGeo = new THREE.BoxGeometry(30, 4.2, 6);
const lowerWall = new THREE.Mesh(lowerWallGeo, lWalltex);
lowerWall.position.set(0, 2, -11);
arena.add(lowerWall);

const sideWallGeo = new THREE.BoxGeometry(1, 16, 30);

const leftWall = new THREE.Mesh(sideWallGeo, sideWalls);
leftWall.position.set(-15, 8, 0);
arena.add(leftWall);

const rightWall = new THREE.Mesh(sideWallGeo, sideWalls);
rightWall.position.set(15, 8, 0);
arena.add(rightWall);

const roofGeo = new THREE.BoxGeometry(32, 1, 9);
const roof = new THREE.Mesh(roofGeo, ttex);
roof.position.set(0, 15, -9);
arena.add(roof);
// roof.castShadow = true;

const block1 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.5, 3), ttex);
block1.position.set(-12.5, 1, -6.5);
arena.add(block1);

const block2 = new THREE.Mesh(new THREE.BoxGeometry(5, 4, 2.5), ttex);
block2.position.set(10.5, 1, -6.5);
arena.add(block2);

arena.traverse((obj) => {
  if (obj.isMesh) {
    obj.castShadow = (obj !== roof);
    obj.receiveShadow = true;
  }
});

const renderer = new THREE.WebGLRenderer({

    canvas: canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;



scene.background = new THREE.Color(0x4a515c);
scene.fog = new THREE.Fog(0x4a515c, 20, 60)

// const ambientLight = new THREE.AmbientLight(0xdde3eb, 2.1);
// scene.add(ambientLight);

const roomLight = new THREE.HemisphereLight(0xffffff, 0x444455, 1.8);
scene.add(roomLight);

const sunlight = new THREE.DirectionalLight(0xffffff, 2.2);
sunlight.position.set(1, 42, 34);
sunlight.castShadow = true;

sunlight.shadow.mapSize.width = 4096;
sunlight.shadow.mapSize.height = 4096;
sunlight.shadow.radius = 3;
sunlight.shadow.camera.near = 0.5;
sunlight.shadow.camera.far = 60;
sunlight.shadow.camera.left = -20;
sunlight.shadow.camera.right = 20;
sunlight.shadow.camera.top = 20;
sunlight.shadow.camera.bottom = -20;
sunlight.shadow.bias = -0.0003;
scene.add(sunlight);



const fpsElemenet = document.querySelector('#fps-counter span')
let frameCount = 0;
let lastTime = performance.now();


function camFOV(){

  //im using the formula vfov = 2xarctan(tan(hfov/2)/a )
  const hFovRad = (103 * Math.PI) / 180;
  const aspect = window.innerWidth / window.innerHeight;
  const vFovRad = 2 * Math.atan(Math.tan(hFovRad / 2) / aspect);
  return (vFovRad * 180)/Math.PI;
}

const cam = new THREE.PerspectiveCamera(
  camFOV(),
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

cam.position.set(0, 5.5, 5)


window.addEventListener('resize', () => {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.fov = camFOV();
    cam.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

function reqAnimeFrame(){
  frameCount++;
  const currentTime = performance.now();
  if(currentTime - lastTime >= 1000){
    const fps = Math.round((frameCount*1000) / (currentTime - lastTime));
    fpsElemenet.textContent = fps;
    frameCount = 0;
    lastTime = currentTime;
  }
  renderer.render(scene, cam);
  setTimeout(reqAnimeFrame, 0);
}

reqAnimeFrame();


let isLocked = false;
let yaw = 0; 
let pitch = 0; 

cam.lookAt(0, 5.5, -8)

let sensi = 0.36;
let sensitivity = sensi * (0.07 * (Math.PI / 180));

canvas.addEventListener('click', () => {
    if(!isLocked){
        canvas.requestPointerLock();
    } else{
      shoot();
    }
});


document.addEventListener('pointerlockchange', () => {
    isLocked = document.pointerLockElement == canvas;
});


document.addEventListener('mousemove', (event)=>{
    if(!isLocked) return;

    const movementX =event.movementX || 0;
    const movementY = event.movementY || 0;

    yaw -= movementX * sensitivity;
    pitch -= movementY * sensitivity;

    const maxPitch = Math.PI / 2 - 0.005;
    pitch = Math.max(-maxPitch, Math.min(maxPitch, pitch));

    cam.rotation.set(pitch, yaw, 0, 'YXZ')
});

const targetGeometry = new THREE.SphereGeometry(0.7, 32, 32);

const targetMaterial = new THREE.MeshStandardMaterial({
  // color: 0x00f5ff,
  map: targettext,
  roughness: 0.03,
  metalness: 0.95,
  emissive: 0x005566,
  emissiveIntensity: 0.12
});

const gridSlots = [];
const COLS = 4;
const ROWS = 3;
const SPACING = 2.2;

const startX = -((COLS - 1) * SPACING) / 2;
const startY = 5.5 - ((ROWS - 1) * SPACING) / 2; 

for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    gridSlots.push({
      x: startX + c * SPACING,
      y: startY + r * SPACING,
      z: -7.5,
      occupied: false
    });
  }
}

const activeTargets = [];
const MAX_TARGETS = 3;

function spawnTarget() {
  const availableSlots = gridSlots.filter(slot => !slot.occupied);
  if (availableSlots.length === 0) return;

  const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
  randomSlot.occupied = true;

  const target = new THREE.Mesh(targetGeometry, targetMaterial);
  target.position.set(randomSlot.x, randomSlot.y, randomSlot.z);

  target.userData.slot = randomSlot;

  target.castShadow = true;
  target.receiveShadow = true;

  scene.add(target);
  activeTargets.push(target);
}

for (let i = 0; i < MAX_TARGETS; i++) {
  spawnTarget();
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function killfx(){
  if(audioCtx.state == 'suspended'){
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(600, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.08);

}


const raycaster = new THREE.Raycaster();
const screenCenter = new THREE.Vector2(0, 0);
let score = 0;
let shotsFired = 0;
let shotsHit = 0;


function shoot(){
  shotsFired++;
  raycaster.setFromCamera(screenCenter, cam);
  const intersects = raycaster.intersectObjects(activeTargets);
  if(intersects.length > 0) {
    shotsHit++;
    score = score + 1;
    killfx();
    const hitTarget = intersects[0].object;
    if(hitTarget.userData.slot){

      hitTarget.userData.slot.occupied = false;
    }

    scene.remove(hitTarget);

    const index = activeTargets.indexOf(hitTarget);
    if(index > -1){
      activeTargets.splice(index, 1);
    
      }
    spawnTarget();
  }
  const accuracy = Math.round((shotsHit / shotsFired) * 100);

  scoretext.textContent = score;
  accuracytext.textContent = `${accuracy}%`;
}