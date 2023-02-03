<template>
    <div>
        <v-dialog v-model="loading" :scrim="false" width="200px" persistent>
            <v-card color="primary">
                <v-card-text>
                    Loading...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <canvas id="threejs" ref="canvasDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { ref, reactive, onMounted } from 'vue';
// import seraphineGltf from '/seraphine/scene.gltf';
// import seraphinePng from '/seraphine/textures/Mat_cwfyfr1_userboy17.bmp_diffuse.png';
import LittlestTokyo from '/littlest_yokyo/LittlestTokyo.glb';
// import sea_keep_lonely_watcher from '/sea_keep_lonely_watcher/sea_keep_lonely_watcher.glb';

const canvasDom = ref<HTMLCanvasElement>();
const loading = ref(true);
const scene = new THREE.Scene();
var renderer: THREE.WebGLRenderer;
var pmremGenerator: THREE.PMREMGenerator;
scene.background = new THREE.Color('#f7fafc');

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
var controls: OrbitControls;
let mixer: THREE.AnimationMixer;

const clock = new THREE.Clock();

function animate() {
    renderer.render(scene, camera);
    const delta = clock.getDelta();
    mixer.update(delta);
    controls.update();
    requestAnimationFrame(animate);
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
}

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/vue-material-admin/draco/gltf/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load(LittlestTokyo, (gltf) => {
    const model = gltf.scene;
    // model.traverse((o) => {
    //     console.log(o);
    //     // const material = new THREE.MeshBasicMaterial({
    //     //     opacity: 1,
    //     // });
    //     // o.material = material;
    //     // o.material.opacity = 1;
    //     // o.dep = 1;
    //     // const arrs = ['Sky_Sky_0', 'Sky', 'Sea'];
    //     // if (arrs.includes(o.name)) {
    //     //     o.visible = false;
    //     // }
    //     if (o.type === 'Object3D') {
    //         o.children.forEach((obj) => {
    //             obj.renderOrder = 1;
    //         });
    //     }
    // });
    model.position.set(1, 1, 0);
    model.scale.set(0.01, 0.01, 0.01);
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();
    animate();
    // loading.value = false;
});

//           const gltfLoader = new GLTFLoader();
// gltfLoader.load(seraphineGltf, (gltf) => {
//     const model = gltf.scene;
//     // 遍历模型每部分
//     model.traverse((o) => {
//         console.log(o);
//         // 将图片作为纹理加载
//         const explosionTexture = new THREE.TextureLoader().load(seraphinePng);
//         // 调整纹理图的方向
//         explosionTexture.flipY = false;
//         // 将纹理图生成基础网格材质(MeshBasicMaterial)
//         const material = new THREE.MeshBasicMaterial({
//             map: explosionTexture,
//         });
//         // 给模型每部分上材质
//         o.material = material;
//     });
//     scene.add(model);
// });

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

onMounted(() => {
    renderer = new THREE.WebGLRenderer({ canvas: canvasDom.value, antialias: true });
    controls = new OrbitControls(camera, renderer.domElement);
    // camera.position.set(20, 0, 60);
    // controls.target.set(0, 1, 0);
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    camera.position.set(5, 2, 8);
    controls.target.set(0, 0.5, 0);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.update();
    // animate();
});
</script>
<style scoped lang="scss">
#threejs {
    width: 100%;
    height: calc(100vh - 124px);
}
</style>
