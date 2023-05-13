import * as BABYLON from '@babylonjs/core';
import type { IPhysicsEngine } from '@babylonjs/core/Physics/IPhysicsEngine';

enum animatstate {
    Idle = 2,
    Jump = 3,
    Running = 6,
    Walking = 10,
    WalkJump = 11,
}

export class CharacterController {
    public inputMap: InputMap = {};
    public player!: BABYLON.AbstractMesh;
    public meshContent!: BABYLON.AssetContainer;
    public scene!: BABYLON.Scene;
    public camera!: BABYLON.ArcRotateCamera;
    public fps = 60;
    public speed = 0.1;
    public raycastResult = new BABYLON.PhysicsRaycastResult();
    public physEngine: BABYLON.Nullable<IPhysicsEngine>;
    public pickingRay!: BABYLON.Ray;
    public curAnimation!: BABYLON.AnimationGroup;

    constructor(
        _meshContent: BABYLON.AssetContainer,
        _camera: BABYLON.ArcRotateCamera,
        _scene: BABYLON.Scene
    ) {
        this.scene = _scene;
        this.camera = _camera;
        this.initPlayer(_meshContent);
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
                console.log(evt.sourceEvent.key, '按下');
                this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
                this.curAnimation?.pause();
            })
        );
        this.physEngine = this.scene.getPhysicsEngine();
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
                console.log(evt.sourceEvent.key, '抬起');
                this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
                this.curAnimation?.stop();
                this.curAnimation = _meshContent.animationGroups[animatstate.Idle];
                this.curAnimation.play(true);
                // if() {}
            })
        );
        this.scene.onBeforeRenderObservable.add(() => {
            this.updateFromKeyboard();
        });
        this.scene.onAfterCameraRenderObservable.add(() => {
            this.lookAtCamera();
        });
    }

    private initPlayer(_meshContent: BABYLON.AssetContainer) {
        this.meshContent = _meshContent;
        this.player = _meshContent.meshes[0];
        console.log(_meshContent);
        _meshContent.animationGroups[0].pause();
        this.curAnimation = _meshContent.animationGroups[animatstate.Idle];
        this.curAnimation.play(true);
        this.camera.setTarget(this.player);
        // this.lookAtCamera();
    }

    public addRay(start = new BABYLON.Vector3(0, 1, 0), end = new BABYLON.Vector3(0, -1, 0)) {
        console.log(start, end);
        const pickingRay = new BABYLON.Ray(start, end);
        const rayHelper = new BABYLON.RayHelper(pickingRay);
        rayHelper.show(this.scene);
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
        this.updateWS();
        if (this.inputMap['a']) {
            this.player.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI / 8 / 10);
        }
        if (this.inputMap['d']) {
            this.player.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 8 / 10);
        }
        if (this.inputMap['Shift'] || this.inputMap['shift']) {
            this.speed = 0.2;
        } else {
            this.speed = 0.1;
        }
        if (this.inputMap[' ']) {
            this.curAnimation = this.meshContent.animationGroups[animatstate.WalkJump];
            this.curAnimation.play();
        }
    }
    private updateWS() {
        const cameraForwardRayPosition = this.camera.getForwardRay().direction;
        const cx = cameraForwardRayPosition.x * this.speed;
        const cz = cameraForwardRayPosition.z * this.speed;
        const newPosition = this.player.position.add(new BABYLON.Vector3(cx, 0, cz));

        if (this.inputMap['w'] || this.inputMap['W']) {
            this.lookAtCamera();
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
                if (this.inputMap['Shift']) {
                    this.curAnimation = this.meshContent.animationGroups[animatstate.Running];
                    this.curAnimation.play(true);
                } else {
                    this.curAnimation = this.meshContent.animationGroups[animatstate.Walking];
                    this.curAnimation.play(true);
                }
            }
        }
        if (this.inputMap['s'] || this.inputMap['S']) {
            this.player.position = this.player.position.add(new BABYLON.Vector3(-cx, 0, -cz));
        }
    }
}

interface InputMap {
    [key: string]: boolean;
}
