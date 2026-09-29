import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
const canvas = document.querySelector("#main-canvas");
const scoreElement = document.querySelector('#score');
const accuracyElement = document.querySelector('#accuracy');

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x87ceeb);
// scene.fog = new THREE.Fog(0x87ceeb, 20, 90)
scene.background = new THREE.Color(0x3a3f47);
scene.fog = new THREE.Fog(0x3a3f47, 25, 70);

//old materials
// const wallMat = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
//   roughness: 0.85,
//   metalness: 0.05
// });
// const floorMat = new THREE.MeshStandardMaterial({
//   color: 0x8a929e,
//   roughness: 0.85,
//   metalness: 0.05
// });
// const ledgeMat = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
//   roughness: 0.6,
//   metalness: 0.15
// });

const floorMat = new THREE.MeshStandardMaterial({
  color: 0xf2f2f2,
  roughness: 0.7,
  metalness: 0.05
});
const lowerWallMat = new THREE.MeshStandardMaterial({
  color: 0xdddddd,
  roughness: 0.85,
  metalness: 0.05
});
const upperWallMat = new THREE.MeshStandardMaterial({
  color: 0xf2f2f2,
  roughness: 0.9,
  metalness: 0.05
});
const trimMat = new THREE.MeshStandardMaterial({
  color: 0x767676,
  roughness: 0.7,
  metalness: 0.1
});
// 1. CREATE AND ADD THE ARENA GROUP FIRST
const arenaGroup = new THREE.Group();
scene.add(arenaGroup);

// Floor
const floorGeo = new THREE.BoxGeometry(32, 1, 30);
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.position.set(0, -0.5, 0);
arenaGroup.add(floor);

// Lower main wall
const lowerWallGeo = new THREE.BoxGeometry(30, 8, 1);
const lowerWall = new THREE.Mesh(lowerWallGeo, lowerWallMat);
lowerWall.position.set(0, 4, -8);
arenaGroup.add(lowerWall);

// // Wall ledge trim
// const ledgeGeo = new THREE.BoxGeometry(30, 0.4, 1.2);
// const ledge = new THREE.Mesh(ledgeGeo, trimMat);
// ledge.position.set(0, 8.2, -8);
// arenaGroup.add(ledge);

// Upper wall
const upperWallGeo = new THREE.BoxGeometry(30, 8, 1);
const upperWall = new THREE.Mesh(upperWallGeo, upperWallMat);
upperWall.position.set(0, 12, -9.2);
arenaGroup.add(upperWall);

// Left wall (negative X) & Right wall (positive X)
const sideWallGeo = new THREE.BoxGeometry(1, 16, 30);

const leftWall = new THREE.Mesh(sideWallGeo, lowerWallMat);
leftWall.position.set(-15, 8, 0);
arenaGroup.add(leftWall);

const rightWall = new THREE.Mesh(sideWallGeo, lowerWallMat);
rightWall.position.set(15, 8, 0);
arenaGroup.add(rightWall);

// Roof
const roofGeo = new THREE.BoxGeometry(32, 1, 9);
const roof = new THREE.Mesh(roofGeo, trimMat);
roof.position.set(0, 15, -6);
arenaGroup.add(roof);
roof.castShadow = true;

// Right concrete blocks
const block1 = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.5, 3), trimMat);
block1.position.set(12.5, 1.25, -6.5);
arenaGroup.add(block1);

const block2 = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2.5), trimMat);
block2.position.set(10.5, 1, -6.5);
arenaGroup.add(block2);

// Enable shadows (notice "traverse", no 'n')
arenaGroup.traverse((obj) => {
  if (obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});
// block1.castShadow = true;
// block2.castShadow = true;

// //room
// const arenaGroup = new THREE.Group();
// scene.add(arenaGroup);

// //floor
// const floorGeo = new THREE.BoxGeometry(32, 1, 26);
// const floor = new THREE.Mesh(floorGeo, floorMat);
// floor.position.set(0, -0.5, 0);
// arenaGroup.add(floor);

// //main wall
// const backWallGeo = new THREE.BoxGeometry(28, 14, 1);
// const backWall = new THREE.Mesh(backWallGeo, wallMat);
// backWall.position.set(0, 6.5, -10);
// arenaGroup.add(backWall)

// //left wall
// const leftWallGeo = new THREE.BoxGeometry(1, 14, 20);
// const leftWall = new THREE.Mesh(leftWallGeo, wallMat)
// leftWall.position.set(-14, 6.5, 1);
// arenaGroup.add(leftWall);

// //right wall
// const rightWallGeo = new THREE.BoxGeometry(1, 14, 20);
// const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
// rightWall.position.set(14, 6.5, 1);
// arenaGroup.add(rightWall);

// //roof
// const roofGeo = new THREE.BoxGeometry(29, 1, 10);
// const roof = new THREE.Mesh(roofGeo, wallMat);
// roof.position.set(0, 13.5, -6);
// arenaGroup.add(roof);

// //ground ledge
// const ledgeGeo = new THREE.BoxGeometry(28, 5, 4.5);
// const ledge = new THREE.Mesh(ledgeGeo, ledgeMat);
// ledge.position.set(0, 0.6, -10);
// arenaGroup.add(ledge);

// [floor, backWall, leftWall, rightWall, roof, ledge].forEach(mesh => {
//   mesh.castShadow = true;
//   mesh.receiveShadow = true;
// });

const renderer = new THREE.WebGLRenderer({

    canvas: canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


//rendering light and shadows realtime
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
// scene.background = new THREE.Color(0x8cb8ff);
// scene.fog = new THREE.Fog(0x8cb8ff, 25, 90);

scene.background = new THREE.Color(0x4a515c);
scene.fog = new THREE.Fog(0x4a515c, 20, 60)

const ambientLight = new THREE.AmbientLight(0xdde3eb, 1.1);
scene.add(ambientLight);
//sunliht
const sunlight = new THREE.DirectionalLight(0xffffff, 2.2);
sunlight.position.set(1, 42, 34);
sunlight.castShadow = true;

// sunlight.target.position.set(-0.5, 0, -7.5);
// scene.add(sunlight.target);

//shadow mapping res and all
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

//target shadow
// const target = new THREE.Mesh(targetGeometry, targetMaterial);
// targetGeometry.position.set(randomSlot.x, randomSlot.y, randomSlot.z);

// target.castShadow = true;
// target.receiveShadow = true;





//fps counter
const fpsElemenet = document.querySelector('#fps-counter span')
let frameCount = 0;
let lastTime = performance.now();

//VALORANT CAMERA FOV SETUP
function getValorantFOV(){
  const hFovRad = (103 * Math.PI) / 180;
  const aspect = window.innerWidth / window.innerHeight;
  const vFovRad = 2 * Math.atan(Math.tan(hFovRad / 2) / aspect);
  return (vFovRad * 180)/Math.PI;
}

const camera = new THREE.PerspectiveCamera(
  getValorantFOV(),
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 5.5, 5)
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 7.5, 9)
// camera.lookAt(0, 7.5, 9);




window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov = getValorantFOV();
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

//loop

// function animate(){
//     requestAnimationFrame(animate);

//     frameCount++;
//     const currentTime = performance.now();

//     if(currentTime - lastTime >= 1000){
//         const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
//         fpsElemenet.textContent = fps;
//         frameCount = 0;
//         lastTime = currentTime;
//     }


//     renderer.render(scene, camera);
// }

// animate()


function animateUncapped(){
  frameCount++;
  const currentTime = performance.now();
  if(currentTime - lastTime >= 1000){
    const fps = Math.round((frameCount*1000) / (currentTime - lastTime));
    fpsElemenet.textContent = fps;
    frameCount = 0;
    lastTime = currentTime;
  }
  renderer.render(scene, camera);
  setTimeout(animateUncapped, 0);
}

animateUncapped();

//enviroment
// const gridHelper = new THREE.GridHelper(50, 50, 0x4a90e2, 0xc0c8d8);
// gridHelper.position.y = 0;
// scene.add(gridHelper);

//wall

// const wallGeometry = new THREE.PlaneGeometry(30, 15);
// const wallMaterial = new THREE.MeshStandardMaterial({
//     color: 0xebedf2,
//     roughness: 0.8,
//     metalness: 0
// });
// const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
// backWall.position.set(0, 7.5, -8);
// scene.add(backWall);

//light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
// scene.add(ambientLight);

// //sunlight
// const sunlight = new THREE.DirectionalLight(0xffffff, 1.8);
// sunlight.position.set(10, 25, 12)
// scene.add(sunlight)

// const dirLight = new THREE.DirectionalLight(0xfdfca2, 1.3);
// dirLight.position.set(5, 12, 6);
// scene.add(dirLight);


//mouse control

let isLocked = false;
let yaw = 0; //left right angle radians
let pitch = 0; //up down angle in radians

camera.lookAt(0, 5.5, -8)

//sensitivity
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
    isLocked = document.pointerLockElement === canvas;
});

//raw mouse

document.addEventListener('mousemove', (event)=>{
    if(!isLocked) return;

    const movementX =event.movementX || 0;
    const movementY = event.movementY || 0;

    yaw -= movementX * sensitivity;
    pitch -= movementY * sensitivity;

    const maxPitch = Math.PI / 2 - 0.005;
    pitch = Math.max(-maxPitch, Math.min(maxPitch, pitch));

    camera.rotation.set(pitch, yaw, 0, 'YXZ')
});


// GRIDSHOT
const targetGeometry = new THREE.SphereGeometry(0.7, 32, 32);

const targetMaterial = new THREE.MeshStandardMaterial({
  color: 0x00f5ff,
  roughness: 0,
  metalness: 0.05,
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

// Initial spawn
for (let i = 0; i < MAX_TARGETS; i++) {
  spawnTarget();
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function hitSound(){
  if(audioCtx.state === 'suspended'){
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


//SHOOTING SYSTEM
const raycaster = new THREE.Raycaster();
const screenCenter = new THREE.Vector2(0, 0);

let score = 0;
let shotsFired = 0;
let shotsHit = 0;


function shoot(){
  shotsFired++;
  raycaster.setFromCamera(screenCenter, camera);
  const intersects = raycaster.intersectObjects(activeTargets);
  if(intersects.length > 0) {
    shotsHit++;
    score = score + 100;
    hitSound();
    const hitTarget = intersects[0].object;
    if(hitTarget.userData.slot){
      hitTarget.userData.slot.occupied = false;
    }

    scene.remove(hitTarget);
    hitTarget.geometry.dispose();

    const index = activeTargets.indexOf(hitTarget);
    if(index > -1){
      activeTargets.splice(index, 1);
      
    }
    spawnTarget();
  }
  const accuracy = Math.round((shotsHit / shotsFired) * 100);
  // console.log(`score: ${score} | Hits: ${shotsHit}/${shotsFired} | Accuracy: ${accuracy}%`);

  scoreElement.textContent = score;
  accuracyElement.textContent = `${accuracy}%`;
}