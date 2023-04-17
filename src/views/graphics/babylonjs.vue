<template>
    <div class="babylon">
        <canvas id="canvas" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF'

const nodeDom = shallowRef<HTMLCanvasElement>();
let engine: BABYLON.Engine;

const init = () => {
    engine = new BABYLON.Engine(nodeDom.value!, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera(
        'Camera',
        Math.PI / 2,
        Math.PI / 2,
        2,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(nodeDom.value!, true);

    // Add lights to the scene
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    var helper = new BABYLON.LightHelper(light);
    helper.attachToMesh(light);

    // 将光源和辅助器添加到场景中
    scene.addLight(light);
    // const light2 = new BABYLON.PointLight('light2', new BABYLON.Vector3(0, 1, -1), scene);

    // Add and manipulate meshes in the scene
    // const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {}, scene);
    engine.runRenderLoop(function () {
        scene.render();
    });
    BABYLON.SceneLoader.Append('/medieval_fantasy_book/', 'scene.gltf', scene, function (scene) {
        // Create a default arc rotate camera and light.
        scene.createDefaultCameraOrLight(true, true, true);
        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        // scene.activeCamera.alpha += Math.PI;
    });

    // BABYLON.SceneLoader.ImportMesh(
    //     '',
    //     'http://storage.ckudz.com/',
    //     '20230417172103_medieval_fantasy_book.glb?e=1997083263&token=6p-iHOSmyL95FPwRy4pd3OXJFLFxCp0JnSqDqF0_:1Ru25OV0NwrcQD4AeikJ__cuBbg=',

    //     scene,
    //     function (meshes) {
    //         scene.createDefaultCameraOrLight(true, true, true);
    //         scene.createDefaultEnvironment();
    //     }
    // );
};
nodeDom.value?.addEventListener('resize', function () {
    engine.resize();
});
window.addEventListener('resize', function () {
    engine.resize();
});
onMounted(init);
</script>
<style scoped lang="scss">
.babylon {
    position: relative;
}

#canvas {
    width: 100%;
    height: var(--content-height);
}
</style>
