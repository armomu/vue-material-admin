<template>
    <div class="babylon">
        <canvas id="canvas" ref="nodeDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import * as BABYLON from '@babylonjs/core';
import * as cannon from 'cannon-es';
import '@babylonjs/loaders/glTF';
window.CANNON = cannon;

const nodeDom = shallowRef<HTMLCanvasElement>();
let engine: BABYLON.Engine;

const init = () => {
    engine = new BABYLON.Engine(nodeDom.value!, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
    // Add a camera to the scene and attach it to the canvas
    // const camera_ = new BABYLON.FollowCamera('FollowCamera', new BABYLON.Vector3(0, 0, 0), scene);
    // camera_.attachControl(true);
    const camera = new BABYLON.ArcRotateCamera(
        'Camera',
        Math.PI / 2,
        Math.PI / 2,
        2,
        BABYLON.Vector3.Zero(),
        scene
    );

    camera.attachControl(nodeDom.value!, true);
    // camera.lowerRadiusLimit = 6;
    // camera.upperRadiusLimit = 80;
    // camera.useAutoRotationBehavior = true;
    camera.setPosition(new BABYLON.Vector3(0, 50, -30));
    // Add lights to the scene
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(0, 1, 0);
    light.groundColor = new BABYLON.Color3(1, 1, 1);

    BABYLON.SceneLoader.LoadAssetContainer(
        '/medieval_fantasy_book/',
        'medieval_fantasy_book.glb',
        scene,
        function (container) {
            const [meshe] = container.meshes;
            meshe.physicsImpostor = new BABYLON.PhysicsImpostor(
                meshe,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 0, friction: 0.5, restitution: 0.7 },
                scene
            );

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
            const [a, b, idle, d] = container.animationGroups;
            // a.pause();
            // idle.play(true);
            // container.addAllToScene();
            const model = container.meshes[0];
            model.position.y = 5;
            // var physicsRoot = makePhysicsObject(model, scene, 0.2)
            container.addAllToScene();
        }
    );
    engine.runRenderLoop(function () {
        scene.render();
    });
    scene.onReadyObservable.addOnce(function () {
        // scene.stopAllAnimations();
    });
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
