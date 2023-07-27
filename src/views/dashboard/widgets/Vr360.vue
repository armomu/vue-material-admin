<template>
    <canvas id="vr360" height="365" ref="nodeDom"></canvas>
    <v-dialog v-model="loading" :scrim="false" width="200px" persistent>
        <v-card color="primary">
            <v-card-text>
                Loading model...
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { onMounted, onBeforeUnmount, shallowRef, ref } from 'vue';
import qj from '@/assets/webgl/full.jpeg';

const loading = ref(true);

const nodeDom = shallowRef<HTMLCanvasElement>();
const scene = new THREE.Scene();
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
const textureLoader = new THREE.TextureLoader();

let pmremGenerator: THREE.PMREMGenerator;

let animateID = 0;
let cameraDir = 1;

const animate = () => {
    renderer.render(scene, camera);
    controls.update();
    // if (camera.position.z > 6) {
    //     camera.position.z -= 0.03;
    // }
    // if (camera.position.y > 2) {
    //     camera.position.y -= 0.03;
    // }
    if (camera.position.x > 10) {
        cameraDir = 1;
    }
    if (camera.position.x < -10) {
        cameraDir = 0;
    }
    if (cameraDir) {
        camera.position.x -= 0.03;
    } else {
        camera.position.x += 0.03;
    }
    animateID = requestAnimationFrame(animate);
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
};
function init() {
    renderer = new THREE.WebGLRenderer({ canvas: nodeDom.value, antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    camera = new THREE.PerspectiveCamera(
        50,
        renderer.domElement.clientWidth / renderer.domElement.clientHeight
    );
    camera.position.set(0, 1, 4);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(8, 9, 0);
    scene.add(directionalLight);

    renderer.outputEncoding = THREE.sRGBEncoding;
    pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.update();

    const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
    sphereGeometry.scale(10, 10, -10);
    textureLoader.load(qj, (texture) => {
        const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);
        loading.value = false;
        animate();
    });
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
    cancelAnimationFrame(animateID);
    renderer.dispose();
    scene.clear();
    camera.clear();
    console.log('animateID', animateID);
});
</script>
<style lang="scss">
#vr360 {
    width: 100%;
    // height: 365px;
}
</style>
