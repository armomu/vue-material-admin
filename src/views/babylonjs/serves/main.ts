import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import HavokPhysics from '@babylonjs/havok';
import { ThirdPersonController } from './thirdPersonController';
import { useLoading } from '../widgets/loading';
export class BabylonScene {
    public engine!: BABYLON.Engine;
    public scene!: BABYLON.Scene;
    public camera!: BABYLON.ArcRotateCamera;
    public physicsPlugin!: BABYLON.HavokPlugin;
    public shadowGenerator!: BABYLON.ShadowGenerator;
    public axesViewer!: BABYLON.AxesViewer;
    public physicsViewer!: BABYLON.PhysicsViewer;
    public characterController!: ThirdPersonController;
    public LoadingStore = useLoading();
    constructor(_canvas: HTMLCanvasElement) {
        // const a = new BABYLON.Vector3(-63.033409118652344, 0.14467144012451172, 68.64418029785156);
        // const b = new BABYLON.Vector3(-63.033409118652344, 0.14467144012451172, 68.49132537841797);
        // console.log(a.subtractFromFloats(b.x, b.y, b.z));
        // console.log(a.addInPlaceFromFloats);
        this.main(_canvas);
    }
    private async main(canvas: HTMLCanvasElement) {
        // this.LoadingStore.onShow();
        const havokPlugin = await HavokPhysics();
        this.engine = new BABYLON.Engine(canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        // this.scene.useRightHandedSystem = true;
        this.scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
            import.meta.env.BASE_URL + '/textures/environment.dds',
            this.scene
        );
        this.scene.createDefaultSkybox(this.scene.environmentTexture);
        this.physicsPlugin = new BABYLON.HavokPlugin(true, havokPlugin);
        this.scene.enablePhysics(undefined, this.physicsPlugin);
        this.physicsViewer = new BABYLON.PhysicsViewer();
        this.addCamera(canvas);
        // this.addGround();
        // this.loadGltf();
        this.addLight();
        // this.addAxesViewer();
        // this.addSkybox();
        // this.onTestMap();
        this.onCollisionMap();
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    public onCollisionMap() {
        this.LoadingStore.onShow(1);
        this.addGround();
        // 创建楼梯的参数
        const stepWidth = 4; // 每个步骤的宽度
        const stepHeight = 1; // 每个步骤的高度
        const stepDepth = 2; // 每个步骤的深度
        const numSteps = 7; // 楼梯的步骤数量
        // 创建步骤的循环
        for (let i = 0; i < numSteps; i++) {
            // 计算当前步骤的位置
            const stepPosition = new BABYLON.Vector3(0, i * stepHeight, i * stepDepth);

            // 创建当前步骤的立方体
            const step = BABYLON.MeshBuilder.CreateBox(
                'step' + i,
                { width: stepWidth, height: stepHeight, depth: stepDepth },
                this.scene
            );
            step.position = stepPosition;
            step.receiveShadows = true;
            this.shadowGenerator.addShadowCaster(step);
            this.addPhysicsAggregate(step);
        }

        // 创建斜坡的几何形状
        const slope = BABYLON.MeshBuilder.CreateBox(
            'slope',
            { width: 4, height: 0.1, depth: 12 },
            this.scene
        );
        const slope25 = BABYLON.MeshBuilder.CreateBox(
            'slope',
            { width: 4, height: 0.1, depth: 16 },
            this.scene
        );
        slope.receiveShadows = true;
        slope25.receiveShadows = true;
        this.shadowGenerator.addShadowCaster(slope);
        this.shadowGenerator.addShadowCaster(slope25);
        // 设置斜坡的旋转角度
        slope.rotation.x = BABYLON.Tools.ToRadians(-35); // 绕 X 轴旋转
        slope.position = new BABYLON.Vector3(6, 2.6, 7.16);
        slope.material = this.randomColorMaterial();

        slope25.rotation.x = BABYLON.Tools.ToRadians(-25); // 绕 X 轴旋转
        slope25.position = new BABYLON.Vector3(12, 2.6, 4.7);
        this.addPhysicsAggregate(slope);
        this.addPhysicsAggregate(slope25);

        // 二楼
        const erlou = BABYLON.MeshBuilder.CreateBox(
            'slope2',
            { width: 30, height: 0.1, depth: 30 },
            this.scene
        );
        erlou.position.z = 17 + 10;
        erlou.position.y = 6;

        const pbr = new BABYLON.PBRMaterial('pbr', this.scene);
        pbr.metallic = 0.0;
        pbr.roughness = 0;
        pbr.subSurface.isRefractionEnabled = true;
        pbr.subSurface.indexOfRefraction = 1.8;
        erlou.material = pbr;
        erlou.receiveShadows = true;
        this.shadowGenerator.addShadowCaster(erlou);
        this.addPhysicsAggregate(erlou);

        // 创建传送带
        const conveyor = BABYLON.MeshBuilder.CreateBox(
            'conveyor',
            { width: 20, height: 0.01, depth: 4 },
            this.scene
        );
        conveyor.receiveShadows = true;
        conveyor.position = new BABYLON.Vector3(-5, 0.005, -8);
        const conveyorPhys = this.addPhysicsAggregate(conveyor);
        conveyorPhys.body.setMotionType(1);

        // 电梯
        const box = BABYLON.MeshBuilder.CreateBox(
            'conveyor',
            { width: 12, height: 0.01, depth: 4 },
            this.scene
        );
        box.receiveShadows = true;
        this.shadowGenerator.addShadowCaster(box);
        box.position = new BABYLON.Vector3(-9, 0.005, 9);
        const boxPhys = this.addPhysicsAggregate(box);
        boxPhys.body.setMotionType(1);

        const boxVelocity = new BABYLON.Vector3(0, -2, 0);
        const conveyorVelocity = new BABYLON.Vector3(2, 0, 0);
        this.scene.onBeforeRenderObservable.add(() => {
            if (conveyor.position.x < -10) {
                conveyorVelocity.x = 2;
            }
            if (conveyor.position.x > 10) {
                conveyorVelocity.x = -2;
            }
            if (box.position.y < 0.2) {
                boxVelocity.y = 2;
            }
            if (box.position.y > 7.1) {
                boxVelocity.y = -2;
            }
            boxPhys.body.setLinearVelocity(boxVelocity);
            conveyorPhys.body.setLinearVelocity(conveyorVelocity);
        });
        this.loadPlayer();
    }

    public async onTestMap() {
        const res = await this.loadAsset('/', 'collision-world.glb');
        res.animationGroups.forEach((item) => {
            item.speedRatio = 0.5;
            item.play(true);
        });
        res.meshes.forEach((meshe, index) => {
            if (index === 0) {
                return;
            }
            // const aggregateBody = new BABYLON.PhysicsAggregate(
            //     meshe,
            //     BABYLON.PhysicsShapeType.MESH,
            //     { mass: 0, friction: 0.5 },
            //     this.scene
            // );
            meshe.receiveShadows = true;
            this.shadowGenerator.addShadowCaster(meshe);
            // meshe.material = this.randomColorMaterial();
            if (meshe.physicsBody) {
                // this.physicsViewer.showBody(meshe.physicsBody);
            }
        });
        const [mesheRoot] = res.meshes;

        // test_map.checkCollisions = true;
        // this.shadowGenerator.addShadowCaster(test_map);
        // const aggregateBody = new BABYLON.PhysicsAggregate(
        //     test_map,
        //     BABYLON.PhysicsShapeType.BOX,
        //     { mass: 0, friction: 0.5 },
        //     this.scene
        // );
        console.log('add map');
        res.addAllToScene();
        if (mesheRoot.physicsBody) {
            this.physicsViewer.showBody(mesheRoot.physicsBody);
        }
        // this.loadPlayer();
        // this.onMoveWithCollisions();
        // this.pgTest();

        const raycastResult = new BABYLON.PhysicsRaycastResult();
        const physEngine = this.scene.getPhysicsEngine();

        const pickingRay = new BABYLON.Ray(
            new BABYLON.Vector3(0, 0.1, 0),
            new BABYLON.Vector3(0, -1, 0),
            10
        );
        const rayHelper = new BABYLON.RayHelper(pickingRay);
        rayHelper.show(this.scene);

        const start = new BABYLON.Vector3(0, 0.15, 0);

        const end = new BABYLON.Vector3(0, start.y - 0.16, 0);
        (physEngine as any).raycastToRef(start, end, raycastResult);
        // console.log(raycastResult, 'hasHit');
        console.log(raycastResult.hasHit, 'hasHit');
    }
    private async loadPlayer() {
        const zombieRes = await this.loadAsset('/textures/', 'zombie-girl.glb', () => {
            this.onProgress(50, 10);
        });
        zombieRes.addAllToScene();
        const container = await this.loadAsset('/textures/', 'x-bot.glb', () => {
            this.onProgress(100, 3);
        });
        const [mesheRoot] = container.meshes;
        mesheRoot.receiveShadows = true;
        this.shadowGenerator.addShadowCaster(mesheRoot);
        container.addAllToScene();
        this.characterController = new ThirdPersonController(container, this.camera, this.scene);

        // this.physicsViewer.showBody(this.characterController.physPlayer.body);
        this.LoadingStore.onShow(100);
        setTimeout(() => {
            this.addRandomBox();
            this.LoadingStore.onHide();
        }, 200);
    }

    private addCamera(canvas: HTMLCanvasElement) {
        this.camera = new BABYLON.ArcRotateCamera(
            'arcCamera1',
            0,
            0,
            6,
            BABYLON.Vector3.Zero(),
            this.scene
        );
        // this.scene.createPickingRayToRef;
        // this.camera.rotation = new BABYLON.Vector3(0, 0, 0);
        this.camera.attachControl(canvas, false);
        const cam2 = new BABYLON.ArcRotateCamera(
            'cam2',
            0.2,
            Math.PI / 2.5,
            25,
            BABYLON.Vector3.Zero(),
            this.scene
        );
        cam2.viewport = new BABYLON.Viewport(0.75, 0.75, 0.25, 0.25);
        this.scene?.activeCameras?.push(cam2);
        this.scene?.activeCameras?.push(this.camera);

        // this.camera.setPosition(new BABYLON.Vector3(19.94, 8.14, -9.26));
        this.camera.setPosition(new BABYLON.Vector3(0, 8.14, -9.26));
        // this.camera.checkCollisions = true;
        // this.camera.collisionRadius = new BABYLON.Vector3(1, 1, 1);
        this.camera.lowerRadiusLimit = 3; // 最小缩放;
        // this.camera.upperRadiusLimit = 8; // 最大缩放

        // 锁定鼠标指针
        const isLocked = false;
        this.scene.onPointerDown = () => {
            if (!isLocked) {
                canvas.requestPointerLock =
                    canvas.requestPointerLock ||
                    canvas.msRequestPointerLock ||
                    canvas.mozRequestPointerLock ||
                    canvas.webkitRequestPointerLock ||
                    false;
                if (canvas.requestPointerLock) {
                    // isLocked = true;
                    canvas.requestPointerLock();
                }
            }
        };
    }

    private addLight() {
        // 环境光
        const hemisphericLight = new BABYLON.HemisphericLight(
            'hemisphericLight',
            new BABYLON.Vector3(0, 30, 0),
            this.scene
        );
        hemisphericLight.intensity = 0.1;

        const lightDirection = new BABYLON.Vector3(0, -1, 0);
        const light = new BABYLON.DirectionalLight('DirectionalLight', lightDirection, this.scene);
        light.position = new BABYLON.Vector3(0, 20, 6);
        light.intensity = 0.5;
        this.shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
        // this.shadowGenerator.useKernelBlur = true;
        // this.shadowGenerator.blurKernel = 200;
        this.shadowGenerator.useBlurExponentialShadowMap = true;

        this.shadowGenerator.setDarkness(0.5);
        this.shadowGenerator.filter = BABYLON.ShadowGenerator.FILTER_PCF;
        // this.addLigthHelper(light, lightDirection);
    }

    public loadAsset(
        rootUrl: string,
        sceneFilename: string,
        callback?: (event: BABYLON.ISceneLoaderProgressEvent) => void
    ): Promise<BABYLON.AssetContainer> {
        return new Promise((resolve, reject) => {
            BABYLON.SceneLoader.LoadAssetContainer(
                import.meta.env.BASE_URL + rootUrl,
                sceneFilename,
                this.scene,
                (container) => {
                    resolve(container);
                },
                (evt) => {
                    callback && callback(evt);
                },
                () => {
                    reject(null);
                }
            );
        });
    }

    /**
     * 更新加载进度
     * @param max 总进度当前最大值
     * @param pros 当前给总进度增加多少🈯值
     */
    private onProgress(max: number, pros: number) {
        if (this.LoadingStore.pct < max) {
            this.LoadingStore.onShow(this.LoadingStore.pct + pros);
        }
    }

    private addAxesViewer() {
        const rayX = new BABYLON.Ray(
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(1, 0, 0),
            3000
        );
        const rayXHelper = new BABYLON.RayHelper(rayX);
        rayXHelper.show(this.scene, new BABYLON.Color3(255, 0, 0));
        const rayY = new BABYLON.Ray(
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 1, 0),
            3000
        );
        const rayYHelper = new BABYLON.RayHelper(rayY);
        rayYHelper.show(this.scene, new BABYLON.Color3(0, 255, 0));
        const rayZ = new BABYLON.Ray(
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 0, 1),
            3000
        );
        const rayZHelper = new BABYLON.RayHelper(rayZ);
        rayZHelper.show(this.scene, new BABYLON.Color3(0, 0, 255));
    }

    public addLigthHelper(light: BABYLON.Light, lightDirection: BABYLON.Vector3) {
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, this.scene);
        const p = light.getAbsolutePosition();
        const lightRay = new BABYLON.Ray(p, lightDirection, 30);
        const rayHelper = new BABYLON.RayHelper(lightRay);
        rayHelper.show(this.scene, new BABYLON.Color3(0, 255, 0));
        sphere.position = p;
    }

    public randomColorMaterial() {
        // 随机生成一个颜色值
        const num = Math.floor(Math.random() * 16777215).toString(16);
        const randomColor = BABYLON.Color3.FromHexString('#' + num);
        const material = new BABYLON.StandardMaterial('material_' + num, this.scene);
        material.diffuseColor = randomColor;
        return material;
    }

    public addRandomBox() {
        for (let i = 0; i < 30; i++) {
            const pbr = new BABYLON.PBRMaterial('pbr', this.scene);

            pbr.metallic = 0.0;
            pbr.roughness = 0;

            pbr.subSurface.isRefractionEnabled = true;
            pbr.subSurface.indexOfRefraction = 1.8;

            // 使用 MeshBuilder 创建一个立方体，并将它的材质设置为上一步中创建的材质
            let box!: BABYLON.Mesh;
            const key = Math.floor(Math.random() * 6 + 1);
            switch (key) {
                case 1:
                    box = BABYLON.MeshBuilder.CreateSphere(
                        BABYLON.PhysicsShapeType.SPHERE + '',
                        {},
                        this.scene
                    );
                    break;
                case 2:
                    box = BABYLON.MeshBuilder.CreateCapsule(
                        BABYLON.PhysicsShapeType.CAPSULE + '',
                        {},
                        this.scene
                    );
                    break;
                case 3:
                    box = BABYLON.MeshBuilder.CreateCylinder(
                        BABYLON.PhysicsShapeType.CYLINDER + '',
                        {},
                        this.scene
                    );
                    break;
                case 4:
                    box = BABYLON.MeshBuilder.CreateTorus(
                        BABYLON.PhysicsShapeType.BOX + '',
                        {},
                        this.scene
                    );
                    break;
                case 5:
                    box = BABYLON.MeshBuilder.CreateTiledBox(
                        BABYLON.PhysicsShapeType.BOX + '',
                        {},
                        this.scene
                    );
                    break;
                case 6:
                    box = BABYLON.MeshBuilder.CreateBox(
                        BABYLON.PhysicsShapeType.BOX + '',
                        { size: 1 },
                        this.scene
                    );
            }

            box.material = pbr;
            // 将立方体的位置设置为随机位置
            box.position.x = Math.random() * 10 - 6;
            box.position.y = Math.random() * 30 + 10;
            box.position.z = Math.random() * 10 + 1;
            new BABYLON.PhysicsAggregate(box, parseInt(box.name), { mass: 100 }, this.scene);
            this.shadowGenerator && this.shadowGenerator.addShadowCaster(box);
            if (box.physicsBody) {
                // this.physicsViewer.showBody(box.physicsBody);
            }
        }
    }

    public addSkybox() {
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 20000 }, this.scene);
        sphere.infiniteDistance = true;
        const sphereMaterial = new BABYLON.StandardMaterial('sphereMaterial', this.scene);
        sphereMaterial.emissiveTexture = new BABYLON.Texture(
            import.meta.env.BASE_URL + '/skybox.png',
            this.scene
        );
        sphereMaterial.emissiveTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        sphereMaterial.backFaceCulling = false;
        sphereMaterial.disableLighting = true;
        sphere.material = sphereMaterial;
    }

    public dispose() {
        // this.scene?.actionManager?.dispose();
        this.scene?.dispose();
        this.engine?.dispose();
        // this.camera?.dispose();
        // this.physicsPlugin?.dispose();
    }

    private addGround() {
        const ground = BABYLON.MeshBuilder.CreateGround(
            'ground',
            { width: 100, height: 100 },
            this.scene
        );
        const material = new BABYLON.StandardMaterial('material', this.scene);
        material.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);
        ground.material = material;
        ground.checkCollisions = true;
        ground.receiveShadows = true;
        // ground.position.y = -0.01;
        ground.position.z = 15;
        console.log(ground.position.y);
        this.addPhysicsAggregate(ground);
    }

    private addPhysicsAggregate(meshe: BABYLON.TransformNode) {
        const res = new BABYLON.PhysicsAggregate(
            meshe,
            BABYLON.PhysicsShapeType.BOX,
            { mass: 0, friction: 0.5 },
            this.scene
        );
        // this.physicsViewer.showBody(res.body);
        return res;
    }
}
