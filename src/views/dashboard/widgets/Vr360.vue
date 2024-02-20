<template>
    <div class="vr360" id="PhotoDome">
        <canvas id="vr360" height="365" ref="canvasDom"></canvas>
        <div class="tips">
            <v-icon icon="mdi-panorama-variant-outline" />
            <span> Mobile device supports gyroscope</span>
            <v-btn
                variant="text"
                icon="mdi-fullscreen"
                color="rgba(255, 255, 255, 0.8)"
                @click="onFullscreen"
            ></v-btn>
        </div>
        <div v-if="loading" class="photo_loading">
            <v-card color="primary">
                <v-card-text>
                    Loading...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue';
import * as BABYLON from '@babylonjs/core';
import { useMainStore } from '@/stores/appMain';
const canvasDom = shallowRef<HTMLCanvasElement>();
const isFullscreen = ref(false);
const loading = ref(true);
const mainStore = useMainStore();
onMounted(() => {
    const engine = new BABYLON.Engine(canvasDom.value!, true);
    const scene = new BABYLON.Scene(engine);

    let camera: BABYLON.DeviceOrientationCamera | BABYLON.ArcRotateCamera;
    if (mainStore.isMobile) {
        camera = new BABYLON.DeviceOrientationCamera(
            'DevOr_camera',
            new BABYLON.Vector3(0, -2, 0),
            scene
        );
    } else {
        camera = new BABYLON.ArcRotateCamera(
            'arcCamera1',
            -2.79,
            -1.62,
            1.82,
            new BABYLON.Vector3(0, -2, 0),
            scene
        );
    }
    // This targets the camera to scene origin
    if (mainStore.isMobile) {
        camera.setTarget(new BABYLON.Vector3(-2.98, -2.84, 3.32));
    } else {
        camera.position = new BABYLON.Vector3(667, 98, -301);
    }

    // This attaches the camera to the canvas
    camera.attachControl(canvasDom.value!, true);
    const dome = new BABYLON.PhotoDome(
        'testdome',
        import.meta.env.BASE_URL + '/textures/full.jpg',
        {
            resolution: 32,
            size: 600,
        },
        scene
    );
    dome.imageMode = BABYLON.PhotoDome.MODE_SIDEBYSIDE;
    engine.runRenderLoop(() => {
        scene.render();
    });

    dome.onReady = () => {
        loading.value = false;
        if (!mainStore.isMobile) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cameraPositionAnimation(new BABYLON.Vector3(63, 10, -61), camera, 'position', scene);
        }
    };
    // camera.rotationQuaternion = new BABYLON.Quaternion();
    scene.onAfterRenderObservable.add(() => {
        // 自转逻辑
        if (!mainStore.isMobile && loading.value === false) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            camera.alpha -= 0.001;
        }
    });
    window.addEventListener('resize', () => {
        engine.resize();
    });
    document.addEventListener('fullscreenchange', () => {
        if (isFullscreen.value) {
            isFullscreen.value = false;
        }
    });
});

function cameraPositionAnimation(
    value: BABYLON.Vector3,
    mesh: BABYLON.AbstractMesh | BABYLON.ArcRotateCamera,
    targetProperty = 'position',
    scene: BABYLON.Scene,
    frame = 120
) {
    return new Promise<void>((resolve) => {
        const animation = new BABYLON.Animation(
            'cameraAnimation',
            targetProperty,
            60,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
            true
        );
        const keys = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        keys.push({ frame: 0, value: mesh[targetProperty] });
        keys.push({ frame: frame, value: value });

        animation.setKeys(keys);
        mesh.animations.push(animation);
        scene.beginAnimation(mesh, 0, frame, false, 1, () => {
            resolve();
        });
    });
}

const onFullscreen = () => {
    const element = document.getElementById('vr360')!;
    if (element.requestFullscreen) {
        element.requestFullscreen();
        setTimeout(() => {
            isFullscreen.value = true;
        }, 200);
    }
};
</script>
<style lang="scss">
.vr360 {
    position: relative;
    width: 100%;
    height: 365px;
    .fullscreen_btn {
        position: absolute;
        right: 6px;
        bottom: 6px;
        z-index: 2;
    }
    .photo_loading {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
.vr360 {
    position: relative;
    width: 100%;
    height: 365px;
    .fullscreen {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
    }
    .fullscreen_btn {
        position: absolute;
        right: 6px;
        bottom: 6px;
        z-index: 2;
    }
    .tips {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        line-height: 40px;
        text-align: right;
        // background: rgba(0, 0, 0, 0.2);
        color: rgba(255, 255, 255, 0.8);
        padding: 0 0px;
    }
}
#vr360 {
    position: absolute;
    width: 100%;
    height: 100%;
    // height: 365px;
}
</style>
