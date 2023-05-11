import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import HavokPhysics from '@babylonjs/havok';
import { CharacterController } from './characterController';

export class Player {
    public canvas!: HTMLCanvasElement;
    public engine!: BABYLON.Engine;
    public scene!: BABYLON.Scene;
    public camera!: BABYLON.ArcRotateCamera;
    public physicsPlugin!: BABYLON.HavokPlugin;
    public raycastResult!: BABYLON.PhysicsRaycastResult;
    public Robot!: BABYLON.AbstractMesh;
    public shadowGenerator!: BABYLON.ShadowGenerator;
    public axesViewer!: BABYLON.AxesViewer;

    constructor(_canvas: HTMLCanvasElement) {
        this.canvas = _canvas;
        this.main();
    }
    private async main() {
        const havokPlugin = await HavokPhysics();
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);

        this.scene.clearColor = new BABYLON.Color4(136 / 255, 227 / 255, 254 / 255, 1);
        this.physicsPlugin = new BABYLON.HavokPlugin(true, havokPlugin);
        this.scene.enablePhysics(null, this.physicsPlugin);

        this.camera = new BABYLON.ArcRotateCamera(
            'Camera',
            Math.PI / 2,
            Math.PI / 2,
            2,
            BABYLON.Vector3.Zero(),
            this.scene
        );
        this.camera.attachControl(this.canvas, true);
        this.camera.setPosition(new BABYLON.Vector3(5, 75, 25));
        this.axesViewer = new BABYLON.AxesViewer(this.scene, 20);
        const cam2 = new BABYLON.ArcRotateCamera(
            'cam2',
            0.2,
            Math.PI / 2.5,
            25,
            BABYLON.Vector3.Zero(),
            this.scene
        );
        cam2.viewport = new BABYLON.Viewport(0.75, 0.75, 0.25, 0.25);
        this.scene.activeCameras?.push(cam2);
        this.scene.activeCameras?.push(this.camera);

        this.scene.cameraToUseForPointers = this.camera;
        // Add lights to the scene
        new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), this.scene);
        const light = new BABYLON.PointLight(
            'sparklight',
            new BABYLON.Vector3(0, 0, 0),
            this.scene
        );
        light.diffuse = new BABYLON.Color3(
            0.08627450980392157,
            0.10980392156862745,
            0.15294117647058825
        );
        light.intensity = 35;
        light.radius = 1;

        this.shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        this.shadowGenerator.darkness = 0.4;

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        this.addBook();
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    private addBook() {
        BABYLON.SceneLoader.LoadAssetContainer(
            `${import.meta.env.BASE_URL}/medieval_fantasy_book/`,
            'medieval_fantasy_book.glb',
            this.scene,
            (container) => {
                console.log('addBook');
                container.addAllToScene();
                container.meshes.forEach((meshe) => {
                    new BABYLON.PhysicsAggregate(
                        meshe,
                        BABYLON.PhysicsShapeType.MESH,
                        { mass: 0 },
                        this.scene
                    );
                });
                this.addRobotExpressive();
            }
        );
    }

    private addRobotExpressive() {
        BABYLON.SceneLoader.LoadAssetContainer(
            '/RobotExpressive/',
            'RobotExpressive.glb',
            this.scene,
            (container) => {
                this.Robot = container.meshes[0];
                container.addAllToScene();
                new CharacterController(container, this.camera, this.scene);
                const localAxes = new BABYLON.AxesViewer(this.scene, 1);
                // 创建XYZ轴辅助
                localAxes.xAxis.parent = this.Robot;
                localAxes.yAxis.parent = this.Robot;
                localAxes.zAxis.parent = this.Robot;
                this.camera.lockedTarget = this.Robot;
                // const rotationQuaternion = this.Robot.rotationQuaternion;
            }
        );
    }

    public addRandomBox() {
        for (let i = 0; i < 10; i++) {
            // 随机生成一个颜色值
            const randomColor = BABYLON.Color3.FromHexString(
                '#' + Math.floor(Math.random() * 16777215).toString(16)
            );

            // 创建一个新的材质，并设置它的 diffuseColor 属性为随机颜色值
            const material = new BABYLON.StandardMaterial('material_' + i, this.scene);
            material.diffuseColor = randomColor;

            // 使用 MeshBuilder 创建一个立方体，并将它的材质设置为上一步中创建的材质
            const box = BABYLON.MeshBuilder.CreateBox('box_' + i, { size: 4 }, this.scene);
            box.material = material;

            // 将立方体的位置设置为随机位置
            box.position.x = Math.random() * 10 + 5;
            box.position.y = Math.random() * 10 + 50;
            box.position.z = Math.random() * 10 + 5;
            new BABYLON.PhysicsAggregate(
                box,
                BABYLON.PhysicsShapeType.BOX,
                { mass: 1 },
                this.scene
            );
        }
        // const viewer = new BABYLON.PhysicsViewer();
        // scene.meshes.forEach((item) => {
        //     if (item.physicsBody) {
        //         viewer.showBody(item.physicsBody);
        //     }
        // });
    }

    public dispose() {
        this.engine?.dispose();
        this.scene?.dispose();
        this.camera?.dispose();
        this.physicsPlugin?.dispose();
    }
}
