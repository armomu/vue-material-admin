<template>
    <div class="camera_Follow_page">
        <canvas id="camera_Follow" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { reactive, onMounted, onBeforeUnmount, shallowRef } from 'vue';

const nodeDom = shallowRef<HTMLCanvasElement>();
var scene = new THREE.Scene();
var renderer: THREE.WebGLRenderer;
var camera: THREE.PerspectiveCamera;
var clock = new THREE.Clock();
var mixer: THREE.AnimationMixer;
var controls: OrbitControls;
const loader = new GLTFLoader();

var model: THREE.Group;

var animateID = 0;

const animate = () => {
    renderer.render(scene, camera);
    controls.update();
    const delta = clock.getDelta();
    mixer.update(delta);
    // console.log(camera.position);
    animateID = requestAnimationFrame(animate);
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
};
function init() {
    renderer = new THREE.WebGLRenderer({ canvas: nodeDom.value, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    camera = new THREE.PerspectiveCamera(
        45,
        nodeDom.value?.offsetWidth! / nodeDom.value?.offsetHeight!,
        0.25,
        100
    );
    camera.position.set(1.26, 16, -40);
    camera.lookAt(0, 2, 0);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);

    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);
    loader.load('/RobotExpressive/RobotExpressive.glb', function (gltf) {
        model = gltf.scene;
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        const animation = mixer.clipAction(gltf.animations[2]);
        animation.clampWhenFinished = true;
        // animation.loop = THREE.LoopOnce;
        animation.play();
        // createGUI(model, gltf.animations);
        console.log(gltf.animations);
        animate();
    });
    controls = new OrbitControls(camera, renderer.domElement);

    controls.target.set(0, 0, 0);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.update();
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
