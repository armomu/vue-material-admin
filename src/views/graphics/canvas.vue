<template>
    <div class="camera_Follow_page" ref="wrapNodeDom">
        <v-dialog v-model="loading" :scrim="false" width="200px" persistent>
            <v-card color="primary">
                <v-card-text>
                    Loading model...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <canvas id="camera_Follow" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import THREEx from '@/utils/KeyboardState';
import { onMounted, onBeforeUnmount, shallowRef } from 'vue';
const loading = ref(true);
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
    renderer.render(scene, camera);
    controls.update();
    const delta = clock.getDelta();
    mixer.update(delta);
    modelRun(delta);
    // console.log(camera.position);
    // controls.target = model.position;
    animateID = requestAnimationFrame(animate);
};

var floorMesh: THREE.Mesh;

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

const keyboard = new THREEx.KeyboardState();
const modelRun = (delta: number) => {
    const moveDistance = 10 * delta;
    const rotateAngle = (Math.PI / 2) * delta;
    if (keyboard.pressed('down')) {
        model.rotateOnAxis(new THREE.Vector3(0.1, 0, 0), rotateAngle);
    }
    if (keyboard.pressed('up')) {
        model.rotateOnAxis(new THREE.Vector3(0.1, 0, 0), -rotateAngle);
    }
    // if (keyboard.pressed('left')) {
    //     model.translateX(-moveDistance);
    // }
    // if (keyboard.pressed('right')) {
    //     model.translateX(moveDistance);
    // }

    if (keyboard.pressed('w')) {
        model.translateZ(moveDistance);
        //
    }
    if (keyboard.pressed('s')) {
        model.translateZ(-moveDistance);
        //
    }
    if (keyboard.pressed('a')) {
        model.rotateOnAxis(new THREE.Vector3(0, 0.5, 0), rotateAngle);
    }
    if (keyboard.pressed('d')) {
        model.rotateOnAxis(new THREE.Vector3(0, 0.5, 0), -rotateAngle);
    }

    const relativeCameraOffset = new THREE.Vector3(0, 10, -20);

    const cameraOffset = relativeCameraOffset.applyMatrix4(model.matrixWorld);

    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;

    controls.target = model.position;
};

function init() {
    renderer = new THREE.WebGLRenderer({ canvas: nodeDom.value, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    camera = new THREE.PerspectiveCamera(
        50,
        renderer.domElement.clientWidth! / renderer.domElement.clientHeight!
    );
    camera.position.set(0, 10, -10);
    // camera.lookAt(0, 1, 0);
    controls = new OrbitControls(camera, renderer.domElement);

    controls.enablePan = false;
    controls.enableDamping = true;

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
    // loader.load('/city.glb', function (gltf) {
    //     gltf.scene.position.y = -14.1;
    //     gltf.scene.scale.set(1.8, 1.8, 1.8);
    //     scene.add(gltf.scene);
    //     animate();
    // });
    loader.load('/RobotExpressive/RobotExpressive.glb', function (gltf) {
        model = gltf.scene;
        animations = gltf.animations;
        console.log(animations);
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        curAnimation = mixer.clipAction(animations[actions.Walking]);
        curAnimation.clampWhenFinished = true;
        curAnimation.play();
        animate();
    });
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
