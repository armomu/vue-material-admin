<template>
    <div ref="wrapDom" style="position: relative">
        <canvas id="threejs2" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import fullImage from '@/assets/webgl/full.jpeg';

const nodeDom = ref<HTMLCanvasElement>();
const wrapDom = ref<HTMLCanvasElement>();
const scene = new THREE.Scene();
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;

let pmremGenerator: THREE.PMREMGenerator;
let animateID = 0;
const animate = () => {
    renderer.render(scene, camera);
    controls.update();
    animateID = requestAnimationFrame(animate);
    // TWEEN.update();
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
    const sphereGeometry = new THREE.SphereGeometry(16, 50, 50);
    sphereGeometry.scale(16, 16, -16);
    const texture = new THREE.TextureLoader().load(fullImage);
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    renderer.outputEncoding = THREE.sRGBEncoding;
    pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(150, 40, 10);
    controls.target.set(0, 0, 0);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.update();
    animate();
}

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const canvasPixelWidth = canvas.width / window.devicePixelRatio;
    const canvasPixelHeight = canvas.height / window.devicePixelRatio;

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
