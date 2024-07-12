import { h, defineComponent, computed, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useMainStore } from '@/stores/useMainStore';

const ChartArea = defineComponent({
    name: 'ChartArea',
    setup() {
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
                        // format: 'dd/MM/yy HH:mm',
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
                    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
            };
        });
        const series = ref([
            {
                name: 'Kwh',
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ]);
        return () =>
            h(VueApexCharts, {
                height: '100%',
                type: 'area',
                // @ts-ignore
                options: chartOptions,
                series,
            });
    },
});
const _default = ChartArea;
export { _default as default };
