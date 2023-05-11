import * as BABYLON from '@babylonjs/core';

export class CharacterController {
    public inputMap: InputMap;
    public mesh!: BABYLON.AbstractMesh;
    public meshContent!: BABYLON.AssetContainer;
    public scene!: BABYLON.Scene;
    public camera!: BABYLON.ArcRotateCamera;
    public fps = 60;

    constructor(
        _meshContent: BABYLON.AssetContainer,
        _camera: BABYLON.ArcRotateCamera,
        _scene: BABYLON.Scene
    ) {
        this.mesh = _meshContent.meshes[0];
        this.meshContent = _meshContent;
        this.scene = _scene;
        this.camera = _camera;
        _camera.parent = this.mesh;
        _scene.actionManager = new BABYLON.ActionManager(_scene);
        this.inputMap = {};
        _scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
                // console.log(evt.sourceEvent.key);
                this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
            })
        );
        _scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
                // console.log(evt.sourceEvent.key);
                this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === 'keydown';
            })
        );
        _scene.onBeforeRenderObservable.add(() => {
            this.updateFromKeyboard();
        });
        _scene.onAfterCameraRenderObservable.add(() => {
            console.log(this.camera.target);
            console.log(this.mesh.position);
            // console.log(this.camera.position);
        });
    }

    private updateFromKeyboard(): void {
        if (this.inputMap['w']) {
            this.mesh.position.z = this.mesh.position.z + 3 / 60;
            // const targetPosition = this.mesh.getAbsolutePosition();
            // this.camera.target = this.mesh.position;
            // 将相机移动到物体位置
            // this.camera.setPosition(targetPosition);
            // this.camera.setPosition(
            //     new BABYLON.Vector3(
            //         this.camera.position.x,
            //         this.camera.position.y,
            //         this.camera.position.z + 3 / 60
            //     )
            // );
            // this.camera.setPosition()
        }
        if (this.inputMap['s']) {
            this.mesh.position.z = this.mesh.position.z - 3 / 60;
        }
    }
}

interface InputMap {
    [key: string]: boolean;
}
