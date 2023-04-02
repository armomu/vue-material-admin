<template>
    <div class="camera_Follow_page" ref="wrapNodeDom">
        <canvas id="camera_Follow" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { onMounted, onBeforeUnmount, shallowRef } from 'vue';

const nodeDom = shallowRef<HTMLCanvasElement>();
const wrapNodeDom = shallowRef<HTMLDivElement>();
var scene = new THREE.Scene();
var renderer: THREE.WebGLRenderer;
var camera: THREE.PerspectiveCamera;
var clock = new THREE.Clock();
var mixer: THREE.AnimationMixer;
var controls: OrbitControls;
const loader = new GLTFLoader();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var model: THREE.Group;

var animateID = 0;

const animate = () => {
    controls.update();
    const delta = clock.getDelta();
    mixer.update(delta);
    modelMove();
    renderer.render(scene, camera);
    camera.lookAt(model.position);
    animateID = requestAnimationFrame(animate);
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
};

var floorMesh: THREE.Mesh;

const keydown = {
    keyW: false,
    keyS: false,
    keyA: false,
    keyD: false,
};
var curAnimation: THREE.AnimationAction;
var animations: THREE.AnimationClip[];
enum actions {
    Dance,
    Death,
    Idle,
    Jump,
    No,
    Punch,
    Running,
    Sitting,
    Standing,
    ThumbsUp,
    Walking,
    WalkJump,
    Wave,
    Yes,
}

function init() {
    renderer = new THREE.WebGLRenderer({ canvas: nodeDom.value, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    camera = new THREE.PerspectiveCamera(
        45,
        renderer.domElement.clientWidth! / renderer.domElement.clientHeight!,
        0.25,
        100
    );
    camera.position.set(0, 30, 40);
    // camera.lookAt(0, 1, 0);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);

    floorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    floorMesh.rotation.x = -Math.PI / 2;
    scene.add(floorMesh);

    var axesHelper = new THREE.AxesHelper(15);
    scene.add(axesHelper);
    const grid = new THREE.GridHelper(50, 50, 0x000000, 0x000000);
    scene.add(grid);
    loader.load('/RobotExpressive/RobotExpressive.glb', function (gltf) {
        model = gltf.scene;
        animations = gltf.animations;
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        curAnimation = mixer.clipAction(animations[actions.Walking]);
        curAnimation.clampWhenFinished = true;
        curAnimation.play();
        //
        animate();
        wrapNodeDom.value?.addEventListener('pointermove', onPointerMove);
        wrapNodeDom.value?.addEventListener('click', onPointerClick);
        document.addEventListener('keydown', onKeydown);
        document.addEventListener('keyup', onKeyUp);
    });
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.update();
}

const onKeydown = (e: KeyboardEvent) => {
    switch (e.code) {
        case 'KeyW':
            keydown.keyW = true;
            break;
        case 'KeyS':
            keydown.keyS = true;
            break;
        case 'KeyA':
            keydown.keyA = true;
            break;
        case 'KeyD':
            keydown.keyD = true;
            break;
        default:
            break;
    }
};

const onKeyUp = (e: KeyboardEvent) => {
    switch (e.code) {
        case 'KeyW':
            keydown.keyW = false;
            break;
        case 'KeyS':
            keydown.keyS = false;
            break;
        case 'KeyA':
            keydown.keyA = false;
            break;
        case 'KeyD':
            keydown.keyD = false;
            break;
        default:
            break;
    }
    console.log(e.code);
};

const modelMove = () => {
    if (keydown.keyW) {
        model.position.z += 0.05;
    }
    if (keydown.keyS) {
        model.position.z -= 0.05;
    }
    if (keydown.keyD) {
        model.position.x += 0.05;
    }
    if (keydown.keyA) {
        model.position.x -= 0.05;
    }
    // curAnimation.halt(0);
    // switch () {
    //     case 'KeyW':
    //         keydown.keyW = true;
    //         break;
    //     case 'KeyS':
    //         keydown.keyS = true;
    //         break;
    //     case 'KeyA':
    //         keydown.keyA = true;
    //         break;
    //     case 'KeyD':
    //         keydown.keyD = true;
    //         break;
    //     default:
    //         break;
    // }
};

function onPointerMove(event: MouseEvent) {
    // pointer.set(
    //     (event.clientX / window.innerWidth) * 2 - 1,
    //     -(event.clientY / window.innerHeight) * 2 + 1
    // );
    // const intersects = raycaster.intersectObject(floorMesh);
    // if (intersects.length > 0) {
    //     const position = intersects[0].point;
    //     console.log('Clicked position:', position);
    // }
}
function onPointerClick(event: MouseEvent | any) {
    console.log(event);
    pointer.set(
        (event.layerX / renderer.domElement.clientWidth!) * 2 - 1,
        -(event.layerY / renderer.domElement.clientHeight!) * 2 + 1
    );
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(floorMesh);
    if (intersects.length > 0) {
        const intersect = intersects[0];
        model.position.copy(intersect.point);

        // rollOverMesh.position.copy(intersect.point).add(intersect?.face!.normal);
        // rollOverMesh.position.divideScalar(2).floor().multiplyScalar(2).addScalar(1);
    }
}

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasPixelWidth = canvas.width / window.devicePixelRatio;
    var canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }
    return needResize;
}

const clear = () => {
    cancelAnimationFrame(animateID);
    renderer.dispose();
    scene.clear();
    camera.clear();
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('click', onPointerClick);
};
onMounted(init);
onBeforeUnmount(clear);
</script>
<style scoped lang="scss">
.camera_Follow_page {
    position: relative;
}

#camera_Follow {
    width: 100%;
    height: calc(100vh - 124px);
}
</style>
