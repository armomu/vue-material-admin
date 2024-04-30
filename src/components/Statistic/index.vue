<template>
    <v-card class="tjjj pa-4">
        <div class="d-flex jsb">
            <div class="text-h6">Statistics</div>
            <v-icon icon="mdi-dots-horizontal" />
        </div>
        <div class="d-flex than-label mt-2">
            <v-icon
                v-if="up"
                size="small"
                class="than-text"
                :class="{ 'than-text-green': !up }"
                icon="mdi-arrow-up-bold"
            />
            <v-icon
                v-else
                size="small"
                class="than-text"
                :class="{ 'than-text-green': !up }"
                icon="mdi-arrow-down-bold"
            />
            <div
                class="than-text"
                :class="{ 'than-text-green': !up }"
                style="font-size: 15px; font-weight: 500"
            >
                20
            </div>
            <div
                class="than-text"
                :class="{ 'than-text-green': !up }"
                style="font-size: 15px; font-weight: 500"
            >
                %
            </div>
            <div class="ml-1">than last month</div>
        </div>
        <div class="d-flex jsb mt-5">
            <div class="text-h4">{{ value }}</div>
            <VueApexCharts
                type="area"
                height="60"
                width="160"
                :options="chartOptions"
                :series="series"
            ></VueApexCharts>
        </div>
    </v-card>
</template>
<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts';
import { computed } from 'vue';
import { useMainStore } from '@/stores/useMainStore';
// import * as TWEEN from '@tweenjs/tween.js';

const mainStore = useMainStore();
const props = withDefaults(
    defineProps<{
        chartData?: any;
        chartColor?: string;
        up?: boolean;
        value?: string;
    }>(),
    {
        chartData: [47, 23, 42, 30, 47, 75, 65],
        up: true,
        value: '2,524',
    }
);
const chartOptions = computed(() => {
    return {
        chart: {
            type: 'area',
            width: 160,
            height: 60,
            sparkline: {
                enabled: true,
            },
        },
        tooltip: {
            fixed: {
                enabled: false,
            },
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: function () {
                        return '';
                    },
                },
            },
            marker: {
                show: false,
            },
        },
        colors: [props.chartColor ? props.chartColor : mainStore.settings.primary],
    };
});
const series = computed(() => {
    return [
        {
            data: props.chartData,
        },
    ];
});
</script>
<style lang="scss">
.tjjj {
    .than-text {
        font-weight: 900;
        color: #f44336;
        &.than-text-green {
            color: #4caf50;
        }
    }
    .text-h4 {
        font-weight: 900;
        font-family: Helvetica, Arial, sans-serif;
    }
}
</style>
@/stores/useMainStore
