import { h, defineComponent, computed, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useMainStore } from '@/stores/useMainStore';

const ChartRadiaBar = defineComponent({
    name: 'ChartRadiaBar',
    setup() {
        const mainStore = useMainStore();
        const chartOptions = computed(() => {
            return {
                chart: {
                    id: 'vuechart-treemap',
                    type: 'treemap',
                    toolbar: {
                        show: false,
                    },
                },
                theme: {
                    mode: mainStore.theme, // light
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
                legend: {
                    show: false,
                },
            };
        });
        const series = ref([
            {
                data: [
                    {
                        x: 'New Delhi',
                        y: 218,
                    },
                    {
                        x: 'Kolkata',
                        y: 149,
                    },
                    {
                        x: 'Mumbai',
                        y: 184,
                    },
                    {
                        x: 'Ahmedabad',
                        y: 55,
                    },
                    {
                        x: 'Bangaluru',
                        y: 84,
                    },
                    {
                        x: 'Pune',
                        y: 31,
                    },
                    {
                        x: 'Chennai',
                        y: 70,
                    },
                    {
                        x: 'Jaipur',
                        y: 30,
                    },
                    {
                        x: 'Surat',
                        y: 44,
                    },
                    {
                        x: 'Hyderabad',
                        y: 68,
                    },
                    {
                        x: 'Lucknow',
                        y: 28,
                    },
                    {
                        x: 'Indore',
                        y: 19,
                    },
                    {
                        x: 'Kanpur',
                        y: 29,
                    },
                ],
            },
        ]);
        return () =>
            h(VueApexCharts, {
                height: '100%',
                type: 'radialBar',
                // @ts-ignore
                options: chartOptions,
                series,
            });
    },
});
const _default = ChartRadiaBar;
export { _default as default };
