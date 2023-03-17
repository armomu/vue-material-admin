<template>
    <VueApexCharts height="100%" type="bar" :options="chartOptions" :series="series" />
</template>
<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores/appMain';

const mainStore = useMainStore();
const chartOptions = computed(() => {
    return {
        chart: {
            id: 'vuechart-bar',
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        theme: {
            mode: mainStore.theme, // light
        },
        grid: {
            borderColor: 'transparent',
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return '$ ' + val;
                },
            },
            x: {
                // format: 'dd/MM/yy HH:mm',
                show: false,
            },
            marker: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '85%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        legend: {
            position: 'top',
        },
        axisTicks: {
            show: false,
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        fill: {
            opacity: 1,
        },
    };
});
const series = ref([
    {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
]);
</script>
