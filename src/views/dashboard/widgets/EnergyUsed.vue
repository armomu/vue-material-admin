<template>
    <v-card class="energy_used" title="Energy Used">
        <VueApexCharts
            :height="props.height"
            type="area"
            :options="chartOptions"
            :series="series"
        />
    </v-card>
</template>
<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores/appMain';

const props = withDefaults(
    defineProps<{
        height?: string | number;
    }>(),
    {
        height: 308,
    }
);
const mainStore = useMainStore();
const chartOptions = computed(() => {
    return {
        chart: {
            id: 'vuechart-example',
            height: 310,
            // sparkline: {
            //     enabled: true,
            // },
            type: 'area',
            toolbar: {
                show: false,
            },
        },
        grid: {
            borderColor: '#efefef',
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
        colors: [mainStore.settings.primary],
    };
});
const series = ref([
    {
        name: 'Kwh',
        data: [31, 40, 28, 51, 42, 109, 100],
    },
]);
</script>
<style lang="scss">
.energy_used {
    .apexcharts-svg {
        width: 100% !important;
        height: 310px;
    }
}
</style>
