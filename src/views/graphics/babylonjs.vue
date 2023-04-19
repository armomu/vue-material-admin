<template>
    <div class="babylon">
        <canvas id="canvas" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

const nodeDom = shallowRef<HTMLCanvasElement>();
let engine: BABYLON.Engine;

const init = () => {
    engine = new BABYLON.Engine(nodeDom.value!, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    // Add a camera to the scene and attach it to the canvas
    const camera_ = new BABYLON.FollowCamera('FollowCamera', new BABYLON.Vector3(0, 0, 0), scene);
    camera_.attachControl(true);
    // const camera = new BABYLON.ArcRotateCamera(
    //     'Camera',
    //     Math.PI / 2,
    //     Math.PI / 2,
    //     2,
    //     BABYLON.Vector3.Zero(),
    //     scene
    // );

    // camera.attachControl(nodeDom.value!, true);
    // camera.lowerRadiusLimit = 6;
    // camera.upperRadiusLimit = 80;
    // camera.useAutoRotationBehavior = true;
    // camera.setPosition(new BABYLON.Vector3(0, 50, -200));
    // Add lights to the scene
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(0, 1, 0);
    light.groundColor = new BABYLON.Color3(1, 1, 1);

    engine.runRenderLoop(function () {
        scene.render();
    });
    BABYLON.SceneLoader.LoadAssetContainer(
        '/medieval_fantasy_book/',
        'medieval_fantasy_book.glb',
        scene,
        function (container) {
            // console.log(meshes);
            // var materials = container.materials;
            container.addAllToScene();
        }
    );
    BABYLON.SceneLoader.LoadAssetContainer(
        '/RobotExpressive/',
        'RobotExpressive.glb',
        scene,
        function (container) {
            const [meshe] = container.meshes;
            // meshe.rotation.x = Math.PI / 2;
            // camera_.attachControl(true);
            camera_.lockedTarget = meshe;
            camera_.position.y = -40;
            container.addAllToScene();
        }
    );
    // BABYLON.SceneLoader.Load('/medieval_fantasy_book/', 'medieval_fantasy_book.glb', engine, function (scene) {
    //     console.log(scene)
    //     // 模型加载完成后执行的代码
    // });
    // const loader = BABYLON.SceneLoader.Append('/medieval_fantasy_book/', 'medieval_fantasy_book.glb', scene, function (_scene) {
    //     // Create a default arc rotate camera and light.
    //     _scene.createDefaultCameraOrLight(true, true, true);
    //     // The default camera looks at the back of the asset.
    //     // Rotate the camera by 180 degrees to the front of the asset.
    //     // _scene.activeCamera.alpha += Math.PI;
    // });
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
