import * as BABYLON from '@babylonjs/core';
import type { IPhysicsEngine } from '@babylonjs/core/Physics/IPhysicsEngine';

enum animatstate {
    Idle = 0,
    Jump = 8,
    Running = 12,
    Walking = 11,
    // Idle = 2,
    // Jump = 3,
    // Running = 6,
    // Walking = 10,
}
export class CharacterController {
    private inputMap: InputMap = {};
    private player!: BABYLON.AbstractMesh;
    public meshContent!: BABYLON.AssetContainer;
    private scene!: BABYLON.Scene;
    private camera!: BABYLON.ArcRotateCamera;
    public fpx = 0;
    private speed = 12;
    private raycastResult = new BABYLON.PhysicsRaycastResult();
    private physEngine: BABYLON.Nullable<IPhysicsEngine>;
    public curAnimation!: BABYLON.AnimationGroup;
    public animatstate!: animatstate;
    // 锁定物体朝向相机
    private lock = false;

    constructor(
        _meshContent: BABYLON.AssetContainer,
        _camera: BABYLON.ArcRotateCamera,
        _scene: BABYLON.Scene,
        _enum: any
    ) {
        this.scene = _scene;
        this.camera = _camera;
        this.animatstate = _enum;
        this.initPlayer(_meshContent);
        const engine = _scene.getEngine();
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
                this.inputMap[evt.sourceEvent.code] = evt.sourceEvent.type === 'keydown';
                this.curAnimation?.pause();
            })
        );
        this.physEngine = this.scene.getPhysicsEngine();
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
                console.log(evt.sourceEvent.code, '抬起');
                this.inputMap[evt.sourceEvent.code] = evt.sourceEvent.type === 'keydown';
                this.curAnimation?.stop();
                this.curAnimation = _meshContent.animationGroups[animatstate.Idle];
                this.curAnimation.play(true);
            })
        );
        this.scene.onBeforeRenderObservable.add(() => {
            this.fpx = engine.getFps();
            this.updateFromKeyboard();
            // console.log(_scene.getEngine().getFps());
        });
        this.scene.onAfterCameraRenderObservable.add(() => {
            // this.lookAtCamera();
            // this.lookAtCamera();
            if (this.inputMap['KeyW']) {
                // this.lookAtCamera();
            }

            this.getPlayerDirection(this.player);
            // console.log('物体的朝向为：' + direction, this.player.position.toString());
        });
    }

    private initPlayer(_meshContent: BABYLON.AssetContainer) {
        this.meshContent = _meshContent;
        this.player = _meshContent.meshes[0];
        _meshContent.animationGroups[0].pause();
        this.curAnimation = _meshContent.animationGroups[animatstate.Idle];
        _meshContent.animationGroups[animatstate.Walking].speedRatio = 2;
        this.curAnimation.play(true);
        this.camera.setTarget(this.player);
        this.player.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 4);
        this.player.rotation.y = 5;
        // this.addHelper();
        // const d = this.getPlayerDirection(this.player);
        // console.log(d);
        // this.addHelper();
        // this.lookAtCamera();
        // this.player.translate(BABYLON.Axis.Z, 2, BABYLON.Space.WORLD);
    }

    private getPlayerDirection(mesh: BABYLON.TransformNode) {
        const forward = BABYLON.Vector3.TransformCoordinates(
            new BABYLON.Vector3(0, 0, 1),
            mesh.getWorldMatrix()
        );

        let direction = forward.subtract(mesh.position);
        direction = BABYLON.Vector3.Normalize(direction);

        const ray = new BABYLON.Ray(mesh.position, direction, 3);
        const rayHelper = new BABYLON.RayHelper(ray);
        rayHelper.show(this.scene);
        return direction;
    }

    public addRay(start = new BABYLON.Vector3(0, 0, 0), end = new BABYLON.Vector3(0, 0, 1)) {
        const ray = new BABYLON.Ray(start, end, 3);
        const rayHelper = new BABYLON.RayHelper(ray);
        rayHelper.show(this.scene);
        const endPosition = ray.origin.add(ray.direction.scale(ray.length));
        console.log(endPosition);
    }

    public lookAtCamera() {
        const cameraForwardRayPosition = this.camera.getForwardRay().direction;
        const cameraForwardRayPositionWithoutY = new BABYLON.Vector3(
            -cameraForwardRayPosition.x,
            0,
            -cameraForwardRayPosition.z
        );
        this.player.lookAt(this.player.position.add(cameraForwardRayPositionWithoutY), 0, 0, 0);
    }

    private updateFromKeyboard(): void {
        if (this.inputMap['KeyW']) {
            this.onKeyW();
        }
        if (this.inputMap['KeyS']) {
            this.onKeyW(false);
        }
        if (this.inputMap['KeyA']) {
            // this.player.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI / 8 / 10);
        }
        if (this.inputMap['KeyD']) {
            // this.player.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 8 / 10);
        }
        if (this.inputMap['ShiftLeft']) {
            this.speed = 24;
        } else {
            this.speed = 12;
        }
        if (this.inputMap['Space']) {
            this.curAnimation = this.meshContent.animationGroups[animatstate.Jump];
            this.curAnimation.play();
        }
    }

    private onKeyS() {
        const cameraForwardRayPosition = this.camera.getForwardRay().direction;
        const cx = cameraForwardRayPosition.x * this.speed;
        const cz = cameraForwardRayPosition.z * this.speed;
        this.player.position = this.player.position.add(new BABYLON.Vector3(-cx, 0, -cz));
    }

    private getSpeed() {
        return this.speed / this.fpx;
    }

    private onKeyW(w = true) {
        const speed = this.getSpeed();
        if (w && this.player.scaling.x > 0) {
            this.player.scaling = new BABYLON.Vector3(
                -this.player.scaling.x,
                this.player.scaling.y,
                -this.player.scaling.z
            );
        }
        if (!w && this.player.scaling.x < 0) {
            this.player.scaling = new BABYLON.Vector3(
                this.player.scaling.x - this.player.scaling.x * 2,
                this.player.scaling.y,
                this.player.scaling.z - this.player.scaling.z * 2
            );
        }
        // 以相机朝向 z轴
        // const cameraForwardRayPosition = this.camera.getForwardRay().direction;
        // const cx = cameraForwardRayPosition.x * this.speed;
        // const cz = cameraForwardRayPosition.z * this.speed;
        // const newPosition = this.player.position.add(
        //     new BABYLON.Vector3(w ? cx : -cx, 0, w ? cz : -cz)
        // );
        const newPosition = this.player.position.add(new BABYLON.Vector3(0, 0, w ? speed : -speed));

        // this.lookAtCamer a();
        const start = new BABYLON.Vector3(newPosition.x, newPosition.y + 2, newPosition.z);
        const end = new BABYLON.Vector3(newPosition.x, newPosition.y - 100, newPosition.z);
        this.physEngine?.raycastToRef(start, end, this.raycastResult);
        if (this.raycastResult?.hasHit) {
            const res = new BABYLON.Vector3(
                newPosition.x,
                this.raycastResult?.hitPointWorld.y,
                newPosition.z
            );
            this.player.position = res;
            if (this.inputMap['ShiftLeft']) {
                this.curAnimation = this.meshContent.animationGroups[animatstate.Running];
                this.curAnimation.play(true);
            } else {
                this.curAnimation = this.meshContent.animationGroups[animatstate.Walking];
                this.curAnimation.play(true);
            }
        }
    }

    private addHelper() {
        // const cylinder = BABYLON.MeshBuilder.CreateSphere(
        //     'Egg',
        //     { diameterX: 0.62, diameterY: 0.8, diameterZ: 0.6 },
        //     this.scene
        // );
        const cone = BABYLON.MeshBuilder.CreateCylinder(
            'dummyCamera',
            { diameterTop: 0.01, diameterBottom: 0.2, height: 0.2 },
            this.scene
        );
        // cone.rotation.x = Math.PI / 2;
        this.player.parent = cone;
        // this.player.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 4);

        const localAxes = new BABYLON.AxesViewer(this.scene, 1);
        localAxes.xAxis.parent = cone;
        localAxes.yAxis.parent = cone;
        localAxes.zAxis.parent = cone;
    }
}

interface InputMap {
    [key: string]: boolean;
}
