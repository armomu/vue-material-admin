<template>
    <div class="babylon">
        <canvas id="canvas" ref="canvasDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef, onBeforeUnmount } from 'vue';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
// import * as cannon from 'cannon-es';
// window.CANNON = cannon;

const canvasDom = shallowRef<HTMLCanvasElement>();
let engine: BABYLON.Engine;
let scene: BABYLON.Scene;
let camera: BABYLON.ArcRotateCamera;
let physicsPlugin: BABYLON.HavokPlugin;

const init = async () => {
    engine = new BABYLON.Engine(canvasDom.value!, true);
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(137 / 255, 227 / 255, 254 / 255, 1);
    // eslint-disable-next-line no-undef
    physicsPlugin = new BABYLON.HavokPlugin(true, HK);
    scene.enablePhysics(null, physicsPlugin);
    camera = new BABYLON.ArcRotateCamera(
        'Camera',
        Math.PI / 2,
        Math.PI / 2,
        2,
        BABYLON.Vector3.Zero(),
        scene
    );

    camera.attachControl(canvasDom.value!, true);
    // camera.lowerRadiusLimit = 6;
    // camera.upperRadiusLimit = 80;
    // camera.useAutoRotationBehavior = true;
    // console.log(new BABYLON.Vector3(10, 50, 0));
    camera.setPosition(new BABYLON.Vector3(-43, 82, 95));
    // Add lights to the scene
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(0, 1, 0);
    light.groundColor = new BABYLON.Color3(1, 1, 1);
    light.intensity = 2;
    // const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap('gdhm', 'textures/heightMap.png', {
    //     width: 5,
    //     height: 5,
    //     subdivisions: 18,
    //     maxHeight: 1,
    // });
    // 创建地板模型
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, scene);

    // Create a static box shape.
    const groundAggregate = new BABYLON.PhysicsAggregate(
        ground,
        BABYLON.PhysicsShapeType.BOX,
        { mass: 0 },
        scene
    );
    ground.position.y = 2;
    const myMesh = await BABYLON.SceneLoader.ImportMeshAsync(
        '',
        '/medieval_fantasy_book/',
        'medieval_fantasy_book.glb',
        scene
    );

    // BABYLON.SceneLoader.LoadAssetContainer(
    //     '/medieval_fantasy_book/',
    //     'medieval_fantasy_book.glb',
    //     scene,
    //     function (container) {
    //         const [meshe] = container.meshes;
    //         meshe.position.y = 5;
    //         new BABYLON.PhysicsAggregate(meshe, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);
    //         container.addAllToScene();
    //     }
    // );
    BABYLON.SceneLoader.LoadAssetContainer(
        '/RobotExpressive/',
        'RobotExpressive.glb',
        scene,
        function (container) {
            // const [a, b, idle, d] = container.animationGroups;
            // idle.play(true);
            const [model] = container.meshes;
            model.position.y = 5;
            // model.position.x = -4;
            // model.position.z = 13;
            // const sphereAggregate = new BABYLON.PhysicsAggregate(
            //     model,
            //     BABYLON.PhysicsShapeType.SPHERE,
            //     { mass: 100 },
            //     scene
            // );
            // container.addAllToScene();
        }
    );
    engine.runRenderLoop(function () {
        scene.render();
        // animate();
    });
    scene.onReadyObservable.addOnce(function () {
        // scene.stopAllAnimations();
    });
};
const animate = () => {
    console.log(camera.position);
    requestAnimationFrame(animate);
};
window.addEventListener('resize', function () {
    engine?.resize();
});
onMounted(init);
onBeforeUnmount(() => {
    engine?.dispose();
    scene?.dispose();
    camera?.dispose();
    physicsPlugin?.dispose();
});
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
