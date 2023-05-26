<template>
    <div class="babylon">
        <canvas id="canvas" ref="canvasDom"></canvas>
        <v-card style="position: absolute; right: 10px; top: 10px">
            <!-- <v-btn size="small" color="primary" @click="get1"> 位置 </v-btn> -->
            <!-- <v-btn size="small" color="primary" @click="get2"> 朝向 </v-btn> -->
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
    // console.log(playerApp.Robot.position);
}
function get2() {
    // console.log(playerApp.Robot.rotate);
}
function addRay() {
    playerApp.addRandomBox();
}
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
