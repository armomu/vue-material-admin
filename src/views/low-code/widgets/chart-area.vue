<template>
    <VueApexCharts height="100%" type="area" :options="chartOptions" :series="series" />
</template>
<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores/appMain';

const props = withDefaults(
    defineProps<{
        height?: string | number;
    }>(),
    {}
);
const mainStore = useMainStore();
const chartOptions = computed(() => {
    return {
        chart: {
            id: 'vuechart-example',
            height: props.height,
            // sparkline: {
            //     enabled: true,
            // },
            type: 'area',
            toolbar: {
                show: false,
            },
        },
        theme: {
            mode: mainStore.theme, // light
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'string',
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        tooltip: {
            x: {
                // format: 'dd/MM/yy HH:mm',
                show: false,
            },
            marker: {
                show: false,
            },
        },
    };
});
const series = ref([
    {
        name: 'Kwh',
        data: [31, 40, 28, 51, 42, 109, 100],
    },
]);
</script>
