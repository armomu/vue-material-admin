<template>
    <canvas id="threejs2" ref="nodeDom"></canvas>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { ref, onBeforeUnmount, onMounted } from 'vue';
import fullImage from '@/assets/webgl/full.webp';

const nodeDom = ref<HTMLCanvasElement>();
var scene = new THREE.Scene();
var renderer: THREE.WebGLRenderer;
var camera: THREE.PerspectiveCamera;
// var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
var controls: OrbitControls;
// var pmremGenerator: THREE.PMREMGenerator;
const animate = () => {
    renderer.render(scene, camera);
    controls.update();
    // console.log(camera.position);
    requestAnimationFrame(animate);
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
    var grid = new THREE.GridHelper(24, 24, 0xff0000, 0x444444);
    scene.add(grid);

    const sphereGeometry = new THREE.SphereGeometry(16, 50, 50);
    const texture = new THREE.TextureLoader().load(fullImage);
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
    sphereGeometry.scale(16, 16, -16);
    const qiu = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(qiu);

    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(30, 10, 5);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.update();
    animate();
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
onMounted(init);
onBeforeUnmount(() => {
    console.log();
});
</script>
<style scoped lang="scss">
#threejs2 {
    width: 100%;
    height: calc(100vh - 124px);
}
</style>
