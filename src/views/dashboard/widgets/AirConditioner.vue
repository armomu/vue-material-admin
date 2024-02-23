<template>
    <v-card title="Air Conditioner" class="air_conditioner">
        <PixiCanvas v-model:value="value" />
        <div class="d-flex jsb btn_tool" style="width: 350px; margin: 26px auto 10px auto">
            <div class="item">
                <v-btn variant="tonal" color="primary" icon="">
                    <v-icon icon="mdi-snowflake" />
                </v-btn>
                <div class="btnname mt-2">Auto Mode</div>
                <div class="btnnv">Power On</div>
            </div>
            <div class="item" @click="onAdd">
                <v-btn variant="tonal" icon="">
                    <v-icon icon="mdi-weather-dust" />
                </v-btn>
                <div class="btnname mt-2">Fan Speed</div>
                <div class="btnnv">2 Level • Off</div>
            </div>
            <div class="item" @click="onSub">
                <v-btn variant="tonal" icon="">
                    <v-icon icon="mdi-clock-outline" />
                </v-btn>
                <div class="btnname mt-2">Timer</div>
                <div class="btnnv">none</div>
            </div>
        </div>
    </v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import PixiCanvas from './CanvasControl.vue';

const value = ref(26);
const onAdd = () => {
    value.value++;
};
const onSub = () => {
    value.value--;
};
</script>
<style scoped lang="scss">
.air_conditioner {
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
}
</style>
