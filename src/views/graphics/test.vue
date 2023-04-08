<template>
    <div class="camera_Follow_page">
        <canvas id="canvas" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { OrbitControl } from 'oasis-engine-toolkit';
import { Camera, GLTFResource, WebGLEngine, Animator } from 'oasis-engine';
import type { Entity } from 'oasis-engine';
const nodeDom = shallowRef<HTMLCanvasElement>();
let engine: WebGLEngine;
let cameraEntity: Entity;
onMounted(() => {
    engine = new WebGLEngine('canvas');
    engine.canvas.resizeByClientSize();
    const rootEntity = engine.sceneManager.activeScene.createRootEntity();

    cameraEntity = rootEntity.createChild('camera');
    cameraEntity.addComponent(Camera);
    cameraEntity.transform.setPosition(3, 3, 3);
    const control = cameraEntity.addComponent(OrbitControl);
    // control.target.x = 5;
    // control.target.y = 5;
    // const control = cameraEntity.getComponent(OrbitControl);

    engine.sceneManager.activeScene.ambientLight.diffuseSolidColor.set(1, 1, 1, 1);

    engine.resourceManager
        // .load<GLTFResource>(
        //     'https://gw.alipayobjects.com/os/OasisHub/267000040/9994/%25E5%25BD%2592%25E6%25A1%25A3.gltf'
        // )
        .load<GLTFResource>('/vue-material-admin/RobotExpressive/RobotExpressive.glb')
        .then((gltf) => {
            rootEntity.addChild(gltf.defaultSceneRoot);
            const animator = gltf.defaultSceneRoot.getComponent(Animator);
            // console.log(gltf.animations);
            animator.play('Running');
        });

    engine.run();
});
</script>
<style scoped lang="scss">
.camera_Follow_page {
    position: relative;
}

#canvas {
    width: 100%;
    height: calc(100vh - 124px);
}
</style>
