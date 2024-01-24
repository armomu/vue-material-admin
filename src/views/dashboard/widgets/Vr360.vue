<template>
    <div class="vr360">
        <canvas id="vr360" height="365" ref="canvasDom"></canvas>
        <v-dialog v-model="loading" :scrim="false" width="200px" persistent>
            <v-card color="primary">
                <v-card-text>
                    Loading model...
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <div class="tips">
            <span>Mobile device supports gyroscope </span>
            <v-btn
                variant="text"
                icon="mdi-fullscreen"
                color="rgba(255, 255, 255, 0.8)"
                @click="onFullscreen"
            ></v-btn>
        </div>
    </div>
</template>
<script setup lang="ts">
import { shallowRef, ref, onMounted } from 'vue';
import * as BABYLON from '@babylonjs/core';

const canvasDom = shallowRef<HTMLCanvasElement>();
const loading = ref(true);
const isFullscreen = ref(false);
onMounted(() => {
    const engine = new BABYLON.Engine(canvasDom.value!, true);
    const scene = new BABYLON.Scene(engine);
    // This creates and positions a device orientation camera
    const camera = new BABYLON.DeviceOrientationCamera(
        'DevOr_camera',
        new BABYLON.Vector3(0, -2, 0),
        scene
    );

    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(-2.98, -2.84, 3.32));

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
    loading.value = false;
    dome.imageMode = BABYLON.PhotoDome.MODE_SIDEBYSIDE;
    engine.runRenderLoop(() => {
        scene.render();
    });
    // camera.rotationQuaternion = new BABYLON.Quaternion();
    scene.onAfterRenderCameraObservable.add(() => {
        // 自转逻辑
        // console.log(camera.target);
    });
    window.addEventListener('resize', () => {
        engine.resize();
    });
    document.addEventListener('fullscreenchange', (e) => {
        if (isFullscreen.value) {
            isFullscreen.value = false;
        }
    });
});

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
        text-align: center;
        background: rgba(0, 0, 0, 0.2);
        color: rgba(255, 255, 255, 0.8);
        padding: 0 12px;
    }
}
#vr360 {
    position: absolute;
    width: 100%;
    height: 100%;
    // height: 365px;
}
</style>
