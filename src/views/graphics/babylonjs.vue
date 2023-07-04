<template>
    <div class="babylon">
        <canvas id="canvas" ref="canvasDom"></canvas>
        <v-card ref="GLBenchDom" style="position: absolute; right: 10px; top: 10px">
            <!-- <div>fps: {{ fps }}</div> -->
            <v-btn size="small" color="primary" @click="addRay">丢下箱子</v-btn>
        </v-card>
        <div ref="GLBenchDom" style="position: absolute; left: 10px; top: 10px; width: 120px"></div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { Player } from './game/player';

const canvasDom = shallowRef<HTMLCanvasElement>();
const GLBenchDom = shallowRef<HTMLDivElement>();

let playerApp: Player;

function addRay() {
    playerApp.addRandomBox();
}

onMounted(() => {
    playerApp = new Player(canvasDom.value!, GLBenchDom.value);
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
