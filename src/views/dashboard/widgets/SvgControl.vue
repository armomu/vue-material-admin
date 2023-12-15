<template>
    <div class="circle_wrap">
        <svg class="svg_circle">
            <circle
                cx="170"
                cy="170"
                r="150"
                transform="rotate(145,170,170)"
                stroke-dasharray="655, 10000"
                fill="none"
                stroke-width="20"
                stroke="rgb(var(--theme-background))"
                stroke-linecap="round"
            />
            <circle
                cx="170"
                cy="170"
                r="150"
                class="circle2 circle4"
                transform="rotate(145,170,170)"
                :stroke-dasharray="`${circles.value * 21.833}, 10000`"
                fill="none"
                stroke-width="20"
                stroke="#7f85f9"
                stroke-linecap="round"
            />
            <circle
                cx="170"
                cy="170"
                r="150"
                :transform="`rotate(${circles.angle},170,170)`"
                stroke-dasharray="0, 10000"
                fill="none"
                stroke-width="30"
                stroke="#b4b8fc"
                stroke-linecap="round"
                style="cursor: pointer"
            />
            <circle
                cx="170"
                cy="170"
                r="150"
                :transform="`rotate(${circles.angle},170,170)`"
                ref="svgCircleDom"
                stroke-dasharray="0, 10000"
                fill="none"
                stroke-width="20"
                stroke="#7f85f9"
                stroke-linecap="round"
                style="cursor: pointer"
            />
        </svg>
        <div class="deg">
            <div>
                <span class="text-h1">{{ circles.value }}&deg;</span><span class="text-h3">c</span>
            </div>
            <div>Centigrade</div>
        </div>
    </div>
    <div class="ac_btns d-flex jsb">
        <v-btn icon="mdi-minus" variant="tonal" size="small" @click="onReduce"> </v-btn>
        <v-btn icon="mdi-plus" variant="tonal" size="small" @click="onAdd"> </v-btn>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';

const svgCircleDom = ref<HTMLDivElement | null>(null);
const circles = reactive({
    icon: 'snowflake',
    angle: 145,
    value: 0,
});
const onAdd = () => {
    circles.angle = circles.angle + 8.33;
    circles.value = circles.value + 1;
    console.log(circles);
};
const onReduce = () => {
    circles.angle = circles.angle - 8.33;
    circles.value = circles.value - 1;
};
const add = setInterval(() => {
    if (circles.value > 20) {
        clearInterval(add);
    }
    circles.angle = circles.angle + 8.33;
    circles.value = circles.value + 1;
}, 100);
</script>
<style scoped lang="scss">
.circle_wrap {
    width: 340px;
    margin: 0 auto;
    position: relative;
    height: 280px;
    overflow: hidden;
    .deg {
        width: 340px;
        text-align: center;
        position: absolute;
        z-index: 2;
        top: 110px;
    }
    circle {
        transition: all 0.1s;
    }
    .svg_circle {
        width: 340px;
        height: 280px;
        margin: 0 auto;
    }
}
.ac_btns {
    width: 234px;
    margin: 0 auto;
}
</style>
