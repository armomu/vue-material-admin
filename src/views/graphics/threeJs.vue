<template>
    <div>
        <canvas id="threejs" ref="canvasDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ref, reactive, onMounted } from 'vue';
import seraphineGltf from '@/assets/seraphine/scene.gltf';
import seraphinePng from '@/assets/seraphine/textures/Mat_cwfyfr1_userboy17.bmp_diffuse.png';

const canvasDom = ref<HTMLCanvasElement>(null);
const scene = new THREE.Scene();
var renderer: THREE.WebGLRenderer;
scene.background = new THREE.Color('#f7fafc');
const camera = new THREE.PerspectiveCamera(2, window.innerWidth / window.innerHeight, 0.5, 1000);
var controls: OrbitControls;
function animate() {
    renderer.render(scene, camera);
    // controls.enableDamping = true;
    controls.update();
    requestAnimationFrame(animate);
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
}
const gltfLoader = new GLTFLoader();
gltfLoader.load(seraphineGltf, (gltf) => {
    const model = gltf.scene;
    // 遍历模型每部分
    model.traverse((o) => {
        console.log(o);
        // 将图片作为纹理加载
        const explosionTexture = new THREE.TextureLoader().load(seraphinePng);
        // 调整纹理图的方向
        explosionTexture.flipY = false;
        // 将纹理图生成基础网格材质(MeshBasicMaterial)
        const material = new THREE.MeshBasicMaterial({
            map: explosionTexture,
        });
        // 给模型每部分上材质
        o.material = material;
    });
    scene.add(model);
});
function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasPixelWidth = canvas.width / window.devicePixelRatio;
    var canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

onMounted(() => {
    renderer = new THREE.WebGLRenderer({ canvas: canvasDom.value, antialias: true });
    controls = new OrbitControls(camera, renderer.domElement);
    // camera.position.set(0, 50, 100);
    camera.position.set(20, 0, 60);
    controls.target.set(0, 1, 0);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.update();
    animate();
});
</script>
<style scoped lang="scss">
#threejs {
    width: 100%;
    height: calc(100vh - 124px);
}
</style>
