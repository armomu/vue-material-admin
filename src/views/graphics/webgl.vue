<template>
    <div ref="wrapDom" style="position: relative">
        <v-dialog v-model="loading" :scrim="false" width="200px" persistent>
            <v-card color="primary">
                <v-card-text>
                    Loading...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <canvas id="threejs2" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import * as TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
// import Stats from 'three/addons/libs/stats.module.js';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LittlestTokyo from '/littlest_yokyo/LittlestTokyo.glb';
import fullImage from '@/assets/webgl/full.jpeg';

const nodeDom = ref<HTMLCanvasElement>();
const wrapDom = ref<HTMLCanvasElement>();
const loading = ref(true);
var scene = new THREE.Scene();
var renderer: THREE.WebGLRenderer;
var camera: THREE.PerspectiveCamera;
var controls: OrbitControls;
let mixer: THREE.AnimationMixer;

const clock = new THREE.Clock();
// var stats: Stats;
var pmremGenerator: THREE.PMREMGenerator;
var animateID = 0;
const animate = () => {
    renderer.render(scene, camera);
    controls.update();
    const delta = clock.getDelta();
    mixer.update(delta);
    // stats.update();
    // console.log(camera.position);
    animateID = requestAnimationFrame(animate);
    TWEEN.update();
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
};
function init() {
    renderer = new THREE.WebGLRenderer({ canvas: nodeDom.value, antialias: true, alpha: true });
    camera = new THREE.PerspectiveCamera(
        50,
        nodeDom.value?.offsetWidth! / nodeDom.value?.offsetHeight!
    );
    var axesHelper = new THREE.AxesHelper(12);
    scene.add(axesHelper);
    // var grid = new THREE.GridHelper(24, 24, 0xff0000, 0x444444);
    // scene.add(grid);

    const sphereGeometry = new THREE.SphereGeometry(16, 50, 50);
    sphereGeometry.scale(16, 16, -16);
    const texture = new THREE.TextureLoader().load(fullImage);
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(`${import.meta.env.BASE_URL}/draco/`);

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(LittlestTokyo, (gltf) => {
        gltf.scene.position.set(1, 1, 0);
        gltf.scene.scale.set(0.03, 0.03, 0.03);
        scene.add(gltf.scene);
        mixer = new THREE.AnimationMixer(gltf.scene);
        mixer.clipAction(gltf.animations[0]).play();
        animate();
        loading.value = false;
        camera.position.set(410, 136, 68);
        onTest();
    });

    // const ambientLight = new THREE.AmbientLight('#ddffe9');
    // scene.add(ambientLight);

    // stats = new Stats();
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.top = '0px';
    // wrapDom.value?.appendChild(stats.domElement);
    renderer.outputEncoding = THREE.sRGBEncoding;
    pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    controls = new OrbitControls(camera, renderer.domElement);

    controls.target.set(0, 0, 0);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.update();
}
const onTest = () => {
    var tween = new TWEEN.Tween(camera.position)
        .to({ x: 25, y: 58, z: 181 })
        .to({ x: 1.3, y: 19, z: -62 });
    tween.start();
};
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
onMounted(init);
onBeforeUnmount(() => {
    close();
});
const close = () => {
    cancelAnimationFrame(animateID);
    renderer.dispose();
    scene.clear();
    camera.clear();
};
</script>
<style scoped lang="scss">
#threejs2 {
    width: 100%;
    height: calc(100vh - 124px);
}
</style>
