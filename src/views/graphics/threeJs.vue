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
        <v-dialog v-model="loading" :scrim="false" width="200px" persistent>
            <v-card color="primary">
                <v-card-text>
                    Loading model...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
// import THREEx from '@/utils/KeyboardState';
import { reactive, onMounted, onBeforeUnmount, shallowRef, ref } from 'vue';
const loading = ref(true);
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
        // gltf.scene.scale.set(0.1, 0.1, 0.1);
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
const scene = new THREE.Scene();
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
const loader = new GLTFLoader();
const clock = new THREE.Clock();
let mixer: THREE.AnimationMixer;
const textureLoader = new THREE.TextureLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(`${import.meta.env.BASE_URL}/draco/`);
loader.setDRACOLoader(dracoLoader);

// var stats: Stats;
let pmremGenerator: THREE.PMREMGenerator;
let animateID = 0;
let model: THREE.Group;
const animate = () => {
    renderer.render(scene, camera);
    controls.update();
    const delta = clock.getDelta();
    mixer.update(delta);
    // modelRun(delta);
    animateID = requestAnimationFrame(animate);
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
};
let curAnimation: THREE.AnimationAction;
let animations: THREE.AnimationClip[];
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

// const keyboard = new THREEx.KeyboardState();
const modelRun = (delta: number) => {
    const moveDistance = 10 * delta;
    const rotateAngle = (Math.PI / 2) * delta;
    if (keyboard.pressed('down')) {
        model.rotateOnAxis(new THREE.Vector3(0.1, 0, 0), rotateAngle);
        upCamera();
    }
    if (keyboard.pressed('up')) {
        model.rotateOnAxis(new THREE.Vector3(0.1, 0, 0), -rotateAngle);
        upCamera();
    }

    if (keyboard.pressed('w')) {
        model.translateZ(moveDistance);
        upCamera();
    }
    if (keyboard.pressed('s')) {
        model.translateZ(-moveDistance);
        upCamera();
    }
    if (keyboard.pressed('a')) {
        model.rotateOnAxis(new THREE.Vector3(0, 0.5, 0), rotateAngle);
        upCamera();
    }
    if (keyboard.pressed('d')) {
        model.rotateOnAxis(new THREE.Vector3(0, 0.5, 0), -rotateAngle);
        upCamera();
    }
};

const upCamera = () => {
    const relativeCameraOffset = new THREE.Vector3(0, 10, -25);

    const cameraOffset = relativeCameraOffset.applyMatrix4(model.matrixWorld);

    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;

    controls.target = model.position;
};
function init() {
    renderer = new THREE.WebGLRenderer({ canvas: nodeDom.value, antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    camera = new THREE.PerspectiveCamera(
        50,
        renderer.domElement.clientWidth / renderer.domElement.clientHeight
    );
    camera.position.set(0, 10, 25);

    const axesHelper = new THREE.AxesHelper(15);
    scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(10, 30);
    gridHelper.position.set(0, 0.001, 0);
    scene.add(gridHelper);

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

    loader.load('/vue-material-admin/RobotExpressive/RobotExpressive.glb', function (gltf) {
        model = gltf.scene;
        animations = gltf.animations;
        console.log(animations);
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        curAnimation = mixer.clipAction(animations[actions.Walking]);
        curAnimation.clampWhenFinished = true;
        curAnimation.play();
        loading.value = false;
        animate();
    });
}

// function onPointerClick(event: MouseEvent | any) {
//     pointer.set(
//         (event.layerX / renderer.domElement.clientWidth!) * 2 - 1,
//         -(event.layerY / renderer.domElement.clientHeight!) * 2 + 1
//     );
//     raycaster.setFromCamera(pointer, camera);
//     const intersects = raycaster.intersectObject(floorMesh);
//     if (intersects.length > 0) {
//         const intersect = intersects[0];
//         model.position.copy(intersect.point);
//     }
// }

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
