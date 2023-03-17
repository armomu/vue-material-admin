<template>
    <VueApexCharts height="100%" type="bubble" :options="chartOptions" :series="series" />
</template>
<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores/appMain';

const mainStore = useMainStore();
const generateData = (baseval: any, count: any, yrange: any) => {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([x, y, z]);
        baseval += 86400000;
        i++;
    }
    return series;
};

const chartOptions = computed(() => {
    return {
        chart: {
            id: 'vuechart-bubble',
            type: 'bubble',
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
            x: {
                // format: 'dd/MM/yy HH:mm',
                show: false,
            },
            marker: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            opacity: 0.8,
        },
        xaxis: {
            tickAmount: 12,
            type: 'category',
        },
        yaxis: {
            max: 70,
        },
    };
});
const series = ref([
    {
        name: 'Bubble1',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
        }),
    },
    {
        name: 'Bubble2',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
        }),
    },
    {
        name: 'Bubble3',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
        }),
    },
    {
        name: 'Bubble4',
        data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
        }),
    },
]);
</script>
