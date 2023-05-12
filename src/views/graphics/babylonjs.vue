<template>
    <div class="babylon">
        <canvas id="canvas" ref="canvasDom"></canvas>
        <v-card style="position: absolute; right: 10px; top: 10px">
            <v-btn size="small" color="primary" @click="get1"> 位置 </v-btn>
            <v-btn size="small" color="primary" @click="get2"> 朝向 </v-btn>
            <!-- <v-btn size="small" color="primary" @click="playerApp.addRandomBox">丢下箱子</v-btn> -->
            <v-btn size="small" color="primary" @click="addRay">丢下箱子</v-btn>
        </v-card>
    </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { Player } from './game/player';

const canvasDom = shallowRef<HTMLCanvasElement>();

let playerApp: Player;
function get1() {
    console.log(playerApp.Robot.position);
}
function get2() {
    console.log(playerApp.Robot.rotate);
}
function addRay() {
    playerApp.characterController.addRay();
}

const rayFun = () => {
    // const pickingRay = new BABYLON.Ray(
    //     new BABYLON.Vector3(0, 10, 0),
    //     new BABYLON.Vector3(0, -1, 0)
    // );
    // const rayHelper = new BABYLON.RayHelper(pickingRay);
    // rayHelper.show(scene);
    // const raycastResult = new BABYLON.PhysicsRaycastResult();
    // const physEngine = scene.getPhysicsEngine();
    // scene.onPointerMove = (evt, pickInfo) => {
    //     let hit = false;
    //     let hitPos = null;
    //     scene.createPickingRayToRef(scene.pointerX, scene.pointerY, null, pickingRay, camera);
    //     console.log(pickingRay.origin?.toString());
    //     physEngine?.raycastToRef(pickingRay.origin, pickingRay.origin, raycastResult);
    //     hit = raycastResult.hasHit;
    //     hitPos = raycastResult.hitPointWorld;
    //     // console.log('hit', `${hit}`, hitPos?.toString());
    //     if (hit) {
    //         indicatorPoint.isVisible = true;
    //         indicatorPoint.position.copyFrom(hitPos);
    //     }
    // };
};

onMounted(() => {
    playerApp = new Player(canvasDom.value!);
});
onBeforeUnmount(() => {
    playerApp.dispose();
});
</script>
<style scoped lang="scss">
.babylon {
    position: relative;
}

#canvas {
    width: 100%;
    height: var(--content-height);
}
</style>
