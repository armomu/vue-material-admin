<template>
    <v-card title="Air Conditioner" class="elevation-0 air_conditioner">
        <div class="circle_wrap">
            <svg class="svg_circle">
                <circle
                    cx="170"
                    cy="170"
                    r="150"
                    class="circle1"
                    transform="rotate(145,170,170)"
                    stroke-dasharray="655, 10000"
                />
                <circle
                    cx="170"
                    cy="170"
                    r="150"
                    class="circle2 circle4"
                    transform="rotate(145,170,170)"
                    :stroke-dasharray="`${circles.value * 21.833}, 10000`"
                />
                <circle
                    cx="170"
                    cy="170"
                    r="150"
                    class="circle3"
                    :transform="`rotate(${circles.angle},170,170)`"
                    stroke-dasharray="0, 10000"
                />
                <circle
                    cx="170"
                    cy="170"
                    r="150"
                    class="circle2"
                    :transform="`rotate(${circles.angle},170,170)`"
                    ref="svgCircleDom"
                    stroke-dasharray="0, 10000"
                />
            </svg>
            <div class="deg">
                <div>
                    <span class="text-h1">{{ circles.value }}&deg;</span
                    ><span class="text-h3">c</span>
                </div>
                <div>Centigrade</div>
            </div>
        </div>
        <div class="ac_btns d-flex jsb">
            <v-btn icon="mdi-minus" variant="tonal" size="small" @click="onReduce"> </v-btn>
            <v-btn icon="mdi-plus" variant="tonal" size="small" @click="onAdd"> </v-btn>
        </div>
        <div class="d-flex jsb mt-5 btn_tool" style="width: 350px; margin: 0 auto">
            <div class="item">
                <v-btn variant="tonal" color="primary" rounded="pill" size="large"
                    ><v-icon icon="mdi-snowflake"
                /></v-btn>
                <div class="btnname mt-2">Auto Mode</div>
                <div class="btnnv">Power On</div>
            </div>
            <div class="item">
                <v-btn variant="tonal" rounded="pill" size="large">
                    <v-icon icon="mdi-weather-dust" />
                </v-btn>
                <div class="btnname mt-2">Fan Speed</div>
                <div class="btnnv">2 Level • Off</div>
            </div>
            <div class="item">
                <v-btn variant="tonal" rounded="pill" size="large">
                    <v-icon icon="mdi-clock-outline" />
                </v-btn>
                <div class="btnname mt-2">Timer</div>
                <div class="btnnv">none</div>
            </div>
        </div>
    </v-card>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';

const svgCircleDom = ref<HTMLDivElement | null>(null);
const circles = reactive({
    icon: 'snowflake',
    angle: 145 + 175,
    value: 21,
});
const onAdd = () => {
    circles.angle = circles.angle + 8.33;
    circles.value = circles.value + 1;
};
const onReduce = () => {
    circles.angle = circles.angle - 8.33;
    circles.value = circles.value - 1;
};
</script>
<style scoped lang="scss">
.air_conditioner {
    .circle_wrap {
        width: 340px;
        margin: 0 auto;
        height: 280px;
        overflow: hidden;
        .deg {
            width: 340px;
            text-align: center;
            position: absolute;
            z-index: 2;
            top: 145px;
        }
        circle {
            transition: all 0.1s;
        }
        .svg_circle {
            width: 340px;
            height: 340px;
            margin: 0 auto;
        }
        .circle1 {
            fill: none;
            stroke-width: 20;
            // stroke: rgb(0, 0, 0);
            stroke: rgb(var(--theme-background));
            stroke-linecap: round;
        }

        .circle2 {
            fill: none;
            stroke-width: 20;
            stroke: #7f85f9;
            stroke-linecap: round;
        }
        .circle3 {
            fill: none;
            stroke-width: 30;
            stroke-linecap: round;
            stroke: #b4b8fc;
        }
        .circle4 {
            stroke: #7f85f9;
        }
    }
    .btn_tool {
        padding-bottom: 14px;
        .item {
            text-align: center;
            .btnname {
                font-weight: 700;
            }
            .btnnv {
                color: #999;
                font-size: 12px;
            }
        }
    }
    .ac_btns {
        width: 234px;
        margin: 0 auto;
    }
}
</style>
