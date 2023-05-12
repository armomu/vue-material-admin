import * as BABYLON from '@babylonjs/core';
import type { IPhysicsEngine } from '@babylonjs/core/Physics/IPhysicsEngine';

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

    constructor(
        _meshContent: BABYLON.AssetContainer,
        _camera: BABYLON.ArcRotateCamera,
        _scene: BABYLON.Scene
    ) {
        this.meshContent = _meshContent;
        this.player = _meshContent.meshes[0];
        console.log(_meshContent);
        this.scene = _scene;
        this.camera = _camera;
        this.camera.setTarget(this.player);
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
                // console.log(evt.sourceEvent.key);
                this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
            })
        );
        this.physEngine = this.scene.getPhysicsEngine();
        this.addRay();
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
                // console.log(evt.sourceEvent.key);
                this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
            })
        );
        this.scene.onBeforeRenderObservable.add(() => {
            this.updateFromKeyboard();
        });
        this.scene.onAfterCameraRenderObservable.add(() => {
            // this.lookAtCamera();
        });
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
        this.update();
        if (this.inputMap['a']) {
            this.player.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI / 8 / 10);
        }
        if (this.inputMap['d']) {
            this.player.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 8 / 10);
        }
    }
    private update() {
        const cameraForwardRayPosition = this.camera.getForwardRay().direction;
        const cx = cameraForwardRayPosition.x * this.speed;
        const cz = cameraForwardRayPosition.z * this.speed;
        const newPosition = this.player.position.add(new BABYLON.Vector3(cx, 0, cz));

        if (this.inputMap['w']) {
            const start = new BABYLON.Vector3(newPosition.x, newPosition.y + 5, newPosition.z);
            const end = new BABYLON.Vector3(newPosition.x, newPosition.y - 100, newPosition.z);
            this.physEngine?.raycastToRef(start, end, this.raycastResult);
            if (this.raycastResult?.hasHit) {
                console.log(this.raycastResult);
                const res = new BABYLON.Vector3(
                    newPosition.x,
                    this.raycastResult?.hitPointWorld.y,
                    newPosition.z
                );
                this.player.position = res;
            }
        }
        if (this.inputMap['s']) {
            this.player.position = this.player.position.add(new BABYLON.Vector3(-cx, 0, -cz));
        }
    }
}

interface InputMap {
    [key: string]: boolean;
}
