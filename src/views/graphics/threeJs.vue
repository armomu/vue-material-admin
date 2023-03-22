<template>
    <div class="threejs_page">
        <v-card class="op" title="Upload Model & VR Panorama">
            <div class="ma-4">
                <v-file-input
                    show-size
                    counter
                    label="VR Panorama"
                    accept="image/*"
                    density="compact"
                    v-model="locaFiles.flulimg"
                    @update:model-value="imgFileChange"
                ></v-file-input>
                <v-file-input
                    show-size
                    counter
                    label="GLB Model"
                    accept=".glb"
                    density="compact"
                    v-model="locaFiles.glb"
                    @update:model-value="fileChange"
                ></v-file-input>
            </div>
        </v-card>
        <canvas id="threejs2" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { reactive, onMounted, onBeforeUnmount, shallowRef } from 'vue';

const locaFiles = reactive({
    glb: [],
    flulimg: [],
});

const imgFileChange = (val: File[]) => {
    const [file] = val;
    if (!file) return;
    const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
    sphereGeometry.scale(10, 10, -10);

    const texture = textureLoader.load(getObjectURL(file));
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
};

const fileChange = (val: File[]) => {
    const [file] = val;
    if (!file) return;
    loader.load(getObjectURL(file), (gltf) => {
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        scene.add(gltf.scene);
    });
};

const getObjectURL = (file: File) => {
    let url = '';
    if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    }
    return url;
};

const nodeDom = shallowRef<HTMLCanvasElement>();
var scene = new THREE.Scene();
var renderer: THREE.WebGLRenderer;
var camera: THREE.PerspectiveCamera;
var controls: OrbitControls;
const loader = new GLTFLoader();
// const FbxLoader = new FBXLoader();
const textureLoader = new THREE.TextureLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(`${import.meta.env.BASE_URL}/draco/`);
loader.setDRACOLoader(dracoLoader);

// var stats: Stats;
var pmremGenerator: THREE.PMREMGenerator;
var animateID = 0;
const animate = () => {
    renderer.render(scene, camera);
    controls.update();
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
    renderer.shadowMap.enabled = true;
    camera = new THREE.PerspectiveCamera(
        50,
        nodeDom.value?.offsetWidth! / nodeDom.value?.offsetHeight!
    );
    camera.position.set(0, 5, 25);

    var axesHelper = new THREE.AxesHelper(15);
    scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(10, 30);
    gridHelper.position.set(0, 0.001, 0);
    scene.add(gridHelper);

    // // 立方体
    // const cubeMtr = new THREE.MeshBasicMaterial({ color: new THREE.Color('#efefef') });
    // // cubeMtr.wireframe = true;
    // const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), cubeMtr);
    // cube.position.y = 0.5;
    // scene.add(cube);

    // 地板
    // const geometry = new THREE.PlaneGeometry(10, 10);
    // const material = new THREE.MeshBasicMaterial({
    //     color: 0xffffff,
    //     side: THREE.DoubleSide,
    // });
    // const plane = new THREE.Mesh(geometry, material);
    // plane.receiveShadow = true;
    // plane.castShadow = true;
    // plane.rotation.x = -0.5 * Math.PI;
    // scene.add(plane);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(8, 9, 0);
    directionalLight.castShadow = true;
    directionalLight.target = gridHelper;
    scene.add(directionalLight);

    const lightHelper = new THREE.DirectionalLightHelper(
        directionalLight,
        12,
        new THREE.Color('gray')
    );
    // lightHelper.castShadow = true;
    scene.add(lightHelper);

    const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    scene.add(helper);

    renderer.outputEncoding = THREE.sRGBEncoding;
    pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    controls = new OrbitControls(camera, renderer.domElement);
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
.threejs_page {
    position: relative;

    .op {
        width: 300px;
        position: absolute;
        right: 16px;
        top: 16px;
    }
}

#threejs2 {
    width: 100%;
    height: calc(100vh - 124px);
}
</style>
