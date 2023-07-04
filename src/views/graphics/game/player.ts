import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import HavokPhysics from '@babylonjs/havok';
import GLBench from 'gl-bench/dist/gl-bench.module';
export class Player {
    public engine!: BABYLON.Engine;
    public scene!: BABYLON.Scene;
    public camera!: BABYLON.ArcRotateCamera;
    public physicsPlugin!: BABYLON.HavokPlugin;
    public shadowGenerator!: BABYLON.ShadowGenerator;
    public axesViewer!: BABYLON.AxesViewer;
    public PhysicsViewer!: BABYLON.PhysicsViewer;

    constructor(_canvas: HTMLCanvasElement, _div?: HTMLDivElement) {
        this.main(_canvas, _div!);
    }
    private async main(canvas: HTMLCanvasElement, div: HTMLDivElement) {
        const havokPlugin = await HavokPhysics();
        this.engine = new BABYLON.Engine(canvas, true);
        this.scene = new BABYLON.Scene(this.engine);

        // this.scene.clearColor = new BABYLON.Color4(0, 0, 0);
        // this.scene.clearColor = new BABYLON.Color4(136 / 255, 227 / 255, 254 / 255, 1);
        this.physicsPlugin = new BABYLON.HavokPlugin(true, havokPlugin);
        this.scene.enablePhysics(null, this.physicsPlugin);
        this.PhysicsViewer = new BABYLON.PhysicsViewer();
        this.addCamera(canvas);
        // this.addGround();
        this.addLight();
        this.addSkybox();
        new BABYLON.AxesViewer(this.scene, 1);
        // 加载场景和角色控制器
        // this.loadAsset('/smier/', 'scene.gltf');
        // this.loadAsset('/smier/', 'scene.gltf');
        this.loadAsset('/medieval_fantasy_book/', 'medieval_fantasy_book.glb');
        this.loadAsset('/RobotExpressive/', 'RobotExpressive.glb', false);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
        this.addFpsMonitor(canvas, div);
    }

    public onAddTestBox() {
        const randomColor = BABYLON.Color3.FromHexString(
            '#' + Math.floor(Math.random() * 16777215).toString(16)
        );

        // 创建一个新的材质，并设置它的 diffuseColor 属性为随机颜色值
        const material = new BABYLON.StandardMaterial('material_a');
        material.diffuseColor = randomColor;

        // 使用 MeshBuilder 创建一个立方体，并将它的材质设置为上一步中创建的材质
        const box = BABYLON.MeshBuilder.CreateBox('box_a', { size: 2 }, this.scene);
        box.material = material;
        box.position.x = 4;
        // Math.PI = 180度角
        box.rotate(new BABYLON.Vector3(0, 1, 0), (180 / 180) * Math.PI);
        const av = new BABYLON.AxesViewer(this.scene, 3);
        av.xAxis.parent = box;
        av.yAxis.parent = box;
        av.zAxis.parent = box;
    }

    public addCamera(canvas: HTMLCanvasElement) {
        this.camera = new BABYLON.ArcRotateCamera(
            'arcCamera1',
            0,
            0,
            10,
            BABYLON.Vector3.Zero(),
            this.scene
        );
        this.camera.rotation = new BABYLON.Vector3(0, 0, 0);
        this.camera.attachControl(canvas, false);
        this.camera.setPosition(new BABYLON.Vector3(-15, 15, -9));
        // this.camera.checkCollisions = true;
        // this.camera.collisionRadius = new BABYLON.Vector3(1, 1, 1);

        // this.camera.applyGravity = true;
        this.camera.lowerRadiusLimit = -4; // 最小缩放;
        // this.camera.upperRadiusLimit = 15; // 最大缩放
    }

    // 性能面板
    public addFpsMonitor(canvas: HTMLCanvasElement, div: HTMLDivElement) {
        if (div) {
            const bench = new GLBench(canvas.getContext('webgl2'), {
                dom: div,
                trackGPU: true,
            });
            this.scene.onAfterRenderObservable.add(() => {
                bench.begin('first measure');
                bench.end('first measure');
                bench.nextFrame();
            });
        }
    }

    public addLight() {
        // 环境光
        const hemisphericLight = new BABYLON.HemisphericLight(
            'hemisphericLight',
            new BABYLON.Vector3(0, 30, 0),
            this.scene
        );
        hemisphericLight.intensity = 0.8;
        const lightDirection = new BABYLON.Vector3(-3, -1, 0);
        const light = new BABYLON.SpotLight(
            'spotLight',
            new BABYLON.Vector3(30, 30, 0),
            lightDirection,
            Math.PI / 2,
            2,
            this.scene
        );
        light.intensity = 0.5;
        // 阴影 阴影会掉帧 不搞不搞
        // this.shadowGenerator = new BABYLON.ShadowGenerator(1024 * 10, light);
        // this.shadowGenerator.useContactHardeningShadow = true;
        // this.shadowGenerator.useBlurExponentialShadowMap = true;
        this.addLigthHelper(light, lightDirection);
    }

    public addLigthHelper(light: BABYLON.Light, lightDirection: BABYLON.Vector3) {
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, this.scene);
        const p = light.getAbsolutePosition();
        const lightRay = new BABYLON.Ray(p, lightDirection, 30);
        const rayHelper = new BABYLON.RayHelper(lightRay);
        rayHelper.show(this.scene);
        // sphere.position = new BABYLON.Vector3(p.x, p.y + 2, p.z);
        sphere.position = p;
    }

    public addGround() {
        const groundMtl = new BABYLON.StandardMaterial('groundMtl', this.scene);
        groundMtl.diffuseColor = BABYLON.Color3.Green();
        groundMtl.ambientColor = BABYLON.Color3.Gray();
        const ground = BABYLON.MeshBuilder.CreateGround(
            'ground',
            { width: 2000, height: 2000 },
            this.scene
        );
        // ground.material = groundMtl;
        // ground.receiveShadows = true;
        new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, this.scene);
    }

    private loadAsset(rootUrl: string, sceneFilename: string, ph = true) {
        BABYLON.SceneLoader.LoadAssetContainer(
            `${import.meta.env.BASE_URL}${rootUrl}`,
            sceneFilename,
            this.scene,
            (container) => {
                container.meshes.forEach((meshe) => {
                    if (ph) {
                        new BABYLON.PhysicsAggregate(
                            meshe,
                            BABYLON.PhysicsShapeType.MESH,
                            { mass: 0 },
                            this.scene
                        );
                    }
                });
                container.addToScene();
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
            const box = BABYLON.MeshBuilder.CreateBox('box_' + i, { size: 2 }, this.scene);
            box.material = material;

            // 将立方体的位置设置为随机位置
            box.position.x = Math.random() * 10 - 6;
            box.position.y = Math.random() * 10 + 5;
            box.position.z = Math.random() * 10 + 1;
            new BABYLON.PhysicsAggregate(
                box,
                BABYLON.PhysicsShapeType.BOX,
                { mass: 1 },
                this.scene
            );
            // this.shadowGenerator.addShadowCaster(box);
        }
    }

    public addSkybox() {
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 10000 }, this.scene);
        sphere.infiniteDistance = true;
        const sphereMaterial = new BABYLON.StandardMaterial('sphereMaterial', this.scene);
        sphereMaterial.emissiveTexture = new BABYLON.Texture(
            `${import.meta.env.BASE_URL}/skybox.png`,
            this.scene
        );
        sphereMaterial.emissiveTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        sphereMaterial.backFaceCulling = false;
        sphereMaterial.disableLighting = true;
        sphere.material = sphereMaterial;
    }

    public dispose() {
        this.engine?.dispose();
        this.scene?.actionManager?.dispose();
        this.scene?.dispose();
        this.camera?.dispose();
        this.physicsPlugin?.dispose();
    }
}
