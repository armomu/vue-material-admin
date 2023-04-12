<template>
    <div class="camera_Follow_page">
        <canvas id="canvas" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { OrbitControl } from 'oasis-engine-toolkit';
import {
    Camera,
    GLTFResource,
    WebGLEngine,
    Animator,
    Vector3,
    DirectLight,
    MeshRenderer,
    PrimitiveMesh,
    BlinnPhongMaterial,
} from 'oasis-engine';
import type { Entity, Texture2D } from 'oasis-engine';
import fullImage from '@/assets/webgl/full.jpeg';

const nodeDom = shallowRef<HTMLCanvasElement>();
let engine: WebGLEngine;
let cameraEntity: Entity;
const animate = () => {
    // console.log(cameraEntity.transform.position);
    requestAnimationFrame(animate);
};
onMounted(() => {
    engine = new WebGLEngine('canvas');
    engine.canvas.resizeByClientSize();
    const rootEntity = engine.sceneManager.activeScene.createRootEntity();

    cameraEntity = rootEntity.createChild('camera');
    const camera = cameraEntity.addComponent(Camera);
    cameraEntity.transform.setPosition(0, 0, 10);
    const control = cameraEntity.addComponent(OrbitControl);
    const lightEntity = rootEntity.createChild('DirectLight');
    const light = lightEntity.addComponent(DirectLight);
    light.intensity = 0.6;
    // const control = cameraEntity.getComponent(OrbitControl);

    // engine.sceneManager.activeScene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);

    // engine.resourceManager
    //     .load<GLTFResource>('/vue-material-admin/RobotExpressive/RobotExpressive.glb')
    //     .then((gltf) => {
    //         rootEntity.addChild(gltf.defaultSceneRoot);
    //         const aa = new Vector3(0, 0, -40);
    //         // gltf.defaultSceneRoot.transform.worldMatrix;
    //         gltf.defaultSceneRoot.transform.rotateByAxis;
    //         aa.transformToVec3(gltf.defaultSceneRoot.transform.worldMatrix);
    //         const animator = gltf.defaultSceneRoot.getComponent(Animator);

    //         // cameraEntity.transform.setPosition(0, 0, -40);
    //         // animator.play('Running');
    //     });

    // 创建球体
    engine.resourceManager
        .load<Texture2D>({
            url: fullImage,
            type: 'texture2d',
        })
        .then((texture) => {
            const entity = rootEntity.createChild('sphere');
            entity.transform.setPosition(0, 0, 0);
            // entity.transform.setScale(16, 16, -16);
            const renderer = entity.addComponent(MeshRenderer);
            renderer.mesh = PrimitiveMesh.createSphere(engine, 5, 50);
            const material = new BlinnPhongMaterial(engine);
            material.baseTexture = texture;
            renderer.setMaterial(material);
        });

    engine.run();
    animate();
});
</script>
<style scoped lang="scss">
.camera_Follow_page {
    position: relative;
}

#canvas {
    width: 100%;
    height: var(--content-height);
}
</style>
