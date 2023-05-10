<template>
    <div class="babylon">
        <canvas id="canvas" ref="canvasDom"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef, onBeforeUnmount } from 'vue';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import HavokPhysics from '@babylonjs/havok';

const canvasDom = shallowRef<HTMLCanvasElement>();
let engine: BABYLON.Engine;
let scene: BABYLON.Scene;
let camera: BABYLON.ArcRotateCamera;
let physicsPlugin: BABYLON.HavokPlugin;

const init = async () => {
    const havokPlugin = await HavokPhysics();
    engine = new BABYLON.Engine(canvasDom.value!, true);
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(136 / 255, 227 / 255, 254 / 255, 1);
    physicsPlugin = new BABYLON.HavokPlugin(true, havokPlugin);
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
    camera.setPosition(new BABYLON.Vector3(5, 75, -150));
    // Add lights to the scene
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.intensity = 2;

    scene.onAfterRenderCameraObservable.add(() => {
        // console.log(camera.position);
    });
    // addBook();
    // addForestHouse();
    // addRobotExpressive();
    addGround();
    // addBox();
    addSphere();
    scene.onReadyObservable.addOnce(function () {
        // scene.stopAllAnimations();
    });
    // observer.observe(canvasDom.value as any);
    engine.runRenderLoop(function () {
        scene.render();
    });
    // 监听键盘事件
    scene.onKeyboardObservable.add(function (eventData) {
        if (eventData.type !== BABYLON.KeyboardEventTypes.KEYDOWN) return;
        switch (eventData.event.keyCode) {
            case 87: // W键
                sphere.physicsBody?.applyForce(
                    new BABYLON.Vector3(0, 100, 0),
                    sphere.getAbsolutePosition()
                );
                break;
            case 83: // S键
                sphere.physicsBody?.applyForce(
                    new BABYLON.Vector3(0, -100, 0),
                    sphere.getAbsolutePosition()
                );
                break;
            case 65: // A键
                sphere.physicsBody?.applyForce(
                    new BABYLON.Vector3(-100, 0, 0),
                    sphere.getAbsolutePosition()
                );
                break;
            case 68: // D键
                // 执行向右移动操作
                sphere.physicsBody?.applyForce(
                    new BABYLON.Vector3(100, 0, 0),
                    sphere.getAbsolutePosition()
                );
                break;
        }
    });
    scene.onPointerDown = function (evt, pickResult) {
        // 如果用户点击了地面，则获取点击位置的世界坐标
        if (pickResult.hit) {
            const position = pickResult.pickedPoint;
            console.log('Clicked position: ', position);
        }
    };
};

const addBox = () => {
    // const viewer = new BABYLON.PhysicsViewer();
    for (let i = 0; i < 10; i++) {
        // 随机生成一个颜色值
        const randomColor = BABYLON.Color3.FromHexString(
            '#' + Math.floor(Math.random() * 16777215).toString(16)
        );

        // 创建一个新的材质，并设置它的 diffuseColor 属性为随机颜色值
        const material = new BABYLON.StandardMaterial('material_' + i, scene);
        material.diffuseColor = randomColor;

        // 使用 MeshBuilder 创建一个立方体，并将它的材质设置为上一步中创建的材质
        const box = BABYLON.MeshBuilder.CreateBox('box_' + i, { size: 4 }, scene);
        box.material = material;

        // 将立方体的位置设置为随机位置
        box.position.x = Math.random() * 10 + 5;
        box.position.y = Math.random() * 10 + 50;
        box.position.z = Math.random() * 10 + 5;
        const groundAggregate = new BABYLON.PhysicsAggregate(
            box,
            BABYLON.PhysicsShapeType.BOX,
            { mass: 100 },
            scene
        );

        if (box.physicsBody) {
            // box.physicsImpostor
            // viewer.showBody(box.physicsBody);
        }
    }
    const viewer = new BABYLON.PhysicsViewer();
    scene.meshes.forEach((item) => {
        if (item.physicsBody) {
            viewer.showBody(item.physicsBody);
        }
    });
};

const addGround = () => {
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, scene);
    const ground_material = new BABYLON.StandardMaterial('gm');
    ground_material.diffuseColor = BABYLON.Color3.Gray();
    ground.material = ground_material;
    // Create a static box shape.
    // ground.position.y = 10;
    const groundAggregate = new BABYLON.PhysicsAggregate(
        ground,
        BABYLON.PhysicsShapeType.BOX,
        { mass: 0 },
        scene
    );
};

const addForestHouse = () => {
    BABYLON.SceneLoader.LoadAssetContainer(
        import.meta.env.BASE_URL,
        'forest_house.glb',
        scene,
        function (container) {
            // const [meshe1] = container.meshes;
            // meshe1.position.y = 5;
            container.addAllToScene();
            container.meshes.forEach((meshe) => {
                new BABYLON.PhysicsAggregate(
                    meshe,
                    BABYLON.PhysicsShapeType.BOX,
                    { mass: 0 },
                    scene
                );
            });
            // addSphere();
        }
    );
};

const addBook = () => {
    BABYLON.SceneLoader.LoadAssetContainer(
        `${import.meta.env.BASE_URL}/medieval_fantasy_book/`,
        'medieval_fantasy_book.glb',
        scene,
        function (container) {
            const [meshe1] = container.meshes;
            // meshe1.position.y = 5;
            container.addAllToScene();
            container.meshes.forEach((meshe) => {
                new BABYLON.PhysicsAggregate(
                    meshe,
                    BABYLON.PhysicsShapeType.MESH,
                    { mass: 0 },
                    scene
                );
            });
            addBox();
            // addSphere();
            // const viewer = new BABYLON.PhysicsViewer();
            // scene.meshes.forEach((item) => {
            //     if (item.physicsBody) {
            //         viewer.showBody(item.physicsBody);
            //     }
            // });
        }
    );
};
const addCity = () => {
    BABYLON.SceneLoader.LoadAssetContainer(
        import.meta.env.BASE_URL,
        'city.glb',
        scene,
        function (container) {
            container.addAllToScene();
            container.meshes.forEach((meshe) => {
                new BABYLON.PhysicsAggregate(
                    meshe,
                    BABYLON.PhysicsShapeType.MESH,
                    { mass: 0 },
                    scene
                );
            });
            addSphere();
        }
    );
};
const addRobotExpressive = () => {
    BABYLON.SceneLoader.LoadAssetContainer(
        '/RobotExpressive/',
        'RobotExpressive.glb',
        scene,
        function (container) {
            // const [a, b, idle, d] = container.animationGroups;
            // idle.play(true);
            const [model] = container.meshes;
            model.position.y = 5;
            container.meshes.forEach((meshe) => {
                new BABYLON.PhysicsAggregate(
                    meshe,
                    BABYLON.PhysicsShapeType.MESH,
                    { mass: 0 },
                    scene
                );
            });
            container.addAllToScene();
        }
    );
};
let sphere: BABYLON.Mesh;
const addSphere = () => {
    sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 10;
    sphere.position.x = -11;
    sphere.position.z = -26;
    const sphereAggregate = new BABYLON.PhysicsAggregate(
        sphere,
        BABYLON.PhysicsShapeType.SPHERE,
        { mass: 1 },
        scene
    );
    sphere.physicsBody?.applyForce;
    sphere.getAbsolutePivotPoint;
    // camera.parent = sphere;
    camera.lockedTarget = sphere;
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
const getHavokPhysics = () => {
    let index = 0;
    const timer = (resolve: any, reject: any) => {
        setTimeout(() => {
            index++;
            if (index > 200) {
                reject && reject(false);
            }
            // eslint-disable-next-line no-undef
            if (!globalThis.HK) {
                timer(resolve, reject);
            } else {
                // eslint-disable-next-line no-undef
                resolve && resolve(globalThis.HK);
            }
        }, 100);
    };
    return new Promise((resolve, reject) => {
        timer(resolve, reject);
    });
};
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
