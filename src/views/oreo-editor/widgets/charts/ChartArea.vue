<template>
    <VueApexCharts height="100%" type="area" :options="chartOptions" :series="series" />
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useMainStore } from '@/stores/useMainStore';

const props = withDefaults(
    defineProps<{
        x: string[];
        y: number[];
    }>(),
    {
        x: () => {
            return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        },
        y: () => {
            return [31, 40, 28, 51, 42, 109, 100];
        },
    }
);

const mainStore = useMainStore();
const chartOptions = computed(() => {
    return {
        chart: {
            id: 'vuechart-example',
            type: 'area',
            toolbar: {
                show: false,
            },
        },
        grid: {
            borderColor: 'transparent',
        },
        theme: {
            mode: mainStore.theme,
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            x: {
                show: false,
            },
            marker: {
                show: false,
            },
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'string',
            categories: props.x,
        },
    };
});

const series = computed(() => {
    return [
        {
            name: 'Kwh',
            data: props.y,
        },
    ];
});
</script>
