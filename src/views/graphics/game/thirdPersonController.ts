import * as BABYLON from '@babylonjs/core';
import type { IPhysicsEngine } from '@babylonjs/core/Physics/IPhysicsEngine';

enum animationEnum {
    Idle = 0,
    Walking = 1,
    Jump = 2,
    Running = 3,
}
export class ThirdPersonController {
    private inputMap: InputMap = {};
    private player!: BABYLON.AbstractMesh;
    private meshContent!: BABYLON.AssetContainer;
    private scene!: BABYLON.Scene;
    private camera!: BABYLON.ArcRotateCamera;
    private fps = 0;
    private speed = 12;
    private raycastResult = new BABYLON.PhysicsRaycastResult();
    private physEngine: BABYLON.Nullable<IPhysicsEngine>;
    private curAnimation!: BABYLON.AnimationGroup;

    /**
     * 创建第三人称角色控制器
     * @param _meshContent
     * @param _camera
     * @param _scene
     * @param _enum
     * @returns ThirdPersonController
     */
    constructor(
        _meshContent: BABYLON.AssetContainer,
        _camera: BABYLON.ArcRotateCamera,
        _scene: BABYLON.Scene
    ) {
        this.scene = _scene;
        this.camera = _camera;
        this.initPlayer(_meshContent);
        const engine = _scene.getEngine();
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
                this.inputMap[evt.sourceEvent.code] = evt.sourceEvent.type === 'keydown';
            })
        );
        this.physEngine = this.scene.getPhysicsEngine();
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
                this.inputMap[evt.sourceEvent.code] = evt.sourceEvent.type === 'keydown';
                this.updateFromKeyboardKeyup(evt.sourceEvent.code);
            })
        );

        this.scene.onBeforeRenderObservable.add(() => {
            this.fps = engine.getFps();
            this.updateFromKeyboardKeydown();
        });
        this.scene.onAfterCameraRenderObservable.add(() => {
            if (this.inputMap['KeyW']) {
            }
        });
    }

    private initPlayer(_meshContent: BABYLON.AssetContainer) {
        this.meshContent = _meshContent;
        this.player = _meshContent.meshes[0];
        this.player.scaling = new BABYLON.Vector3(-0.3, 0.3, -0.3);
        this.curAnimation = _meshContent.animationGroups[animationEnum.Idle];
        this.curAnimation.play(true);
        this.camera.setTarget(this.player);
        this.lookAtCamera();
    }

    private updateFromKeyboardKeydown(): void {
        if (this.inputMap['KeyW']) {
            this.onWalking();
            // this.lookAtCamera();
        }
        if (this.inputMap['KeyS']) {
            this.onWalking();
        }
        if (this.inputMap['KeyA']) {
            // this.player.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
        }
        if (this.inputMap['KeyD']) {
            // this.player.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
        }
        if (this.inputMap['Space']) {
            this.playAnimation(animationEnum.Jump, false);
        }
        this.onRotate();
    }

    private updateFromKeyboardKeyup(keyCode: string) {
        if (keyCode === 'KeyW' || keyCode === 'KeyS') {
            this.stopAnimation(animationEnum.Running);
            this.curAnimation.stop();
        }
    }
    private playerRotate = 0;
    private onRotate() {
        let speed = this.getSpeed(2);
        if (this.inputMap['KeyW']) {
            if (this.playerRotate > 0 && this.playerRotate <= 180) {
                this.playerRotate = this.playerRotate - speed;
                this.player.rotate(new BABYLON.Vector3(0, 1, 0), -(speed / 180) * Math.PI);
            } else if (this.playerRotate >= 180 && this.playerRotate <= 360) {
                this.playerRotate = this.playerRotate + speed;
                this.player.rotate(new BABYLON.Vector3(0, 1, 0), (speed / 180) * Math.PI);
            } else {
                this.playerRotate = 0;
                // this.lookAtCamera();
            }
        }
        if (this.inputMap['KeyS']) {
            if (this.playerRotate < 180) {
                const res = this.playerRotate + speed;
                if (res > 180) {
                    speed = res - 180;
                    this.playerRotate = 180;
                } else {
                    this.playerRotate = res;
                }
                this.player.rotate(new BABYLON.Vector3(0, 1, 0), (speed / 180) * Math.PI);
            } else if (this.playerRotate > 180) {
                this.playerRotate = this.playerRotate - speed;
                this.player.rotate(new BABYLON.Vector3(0, 1, 0), -(speed / 180) * Math.PI);
            }
        }
        if (this.inputMap['KeyA']) {
        }
        if (this.inputMap['KeyD']) {
            // this.player.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
        }
        console.log(this.playerRotate);
    }

    /**
     * 每一帧的速率
     * @param type 1行走速度 2转向角度
     * @returns number
     */
    private getSpeed(type = 1) {
        let res = 0;
        switch (type) {
            case 2:
                // 1秒旋转360度
                res = 360 / this.fps;
                break;

            default:
                res = this.speed / this.fps;
        }
        return res;
    }

    private onWalking() {
        const speed = this.getSpeed();
        const cameraForwardRayPosition = this.camera.getForwardRay().direction;
        const cx = cameraForwardRayPosition.x * speed;
        const cz = cameraForwardRayPosition.z * speed;
        const newPosition = this.player.position.add(
            new BABYLON.Vector3(
                this.inputMap['KeyW'] ? cx : -cx,
                0,
                this.inputMap['KeyW'] ? cz : -cz
            )
        );
        const start = new BABYLON.Vector3(newPosition.x, newPosition.y + 2, newPosition.z);
        const end = new BABYLON.Vector3(newPosition.x, newPosition.y - 100, newPosition.z);
        this.physEngine?.raycastToRef(start, end, this.raycastResult);
        this.playAnimation(animationEnum.Running);
        if (this.raycastResult?.hasHit) {
            const res = new BABYLON.Vector3(
                newPosition.x,
                this.raycastResult?.hitPointWorld.y,
                newPosition.z
            );
            this.player.position = res;
            return true;
        } else {
            return false;
        }
    }
    private playAnimation(key: number, loop = true) {
        if (this.curAnimation.name === this.meshContent.animationGroups[key]?.name) {
            return;
        }
        this.curAnimation.pause();
        this.curAnimation = this.meshContent.animationGroups[key];
        this.curAnimation.play(loop);
    }

    private stopAnimation(key: number) {
        this.meshContent.animationGroups[key]?.stop();
    }

    private newPosition() {
        const forward = BABYLON.Vector3.TransformCoordinates(
            new BABYLON.Vector3(0, 0, 1),
            this.player.getWorldMatrix()
        );

        let direction = forward.subtract(this.player.position);
        direction = BABYLON.Vector3.Normalize(direction);
        const speed = this.getSpeed();
        const ray = new BABYLON.Ray(this.player.position, direction, speed);
        const endPosition = ray.origin.add(ray.direction.scale(ray.length));
        return endPosition;
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
}

interface InputMap {
    [key: string]: boolean;
}
