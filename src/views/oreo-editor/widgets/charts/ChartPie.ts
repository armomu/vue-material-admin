import { h, defineComponent, computed, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useMainStore } from '@/stores/useMainStore';

const ChartPie = defineComponent({
    name: 'ChartPie',
    setup() {
        const mainStore = useMainStore();
        const chartOptions = computed(() => {
            return {
                chart: {
                    id: 'vuechart-pie',
                    type: 'pie',
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
                // legend: {
                //     show: false,
                // },
                labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    },
                ],
                dataLabels: {
                    enabled: true,
                    // formatter: function (val, opts) {
                    //     console.log(opts);
                    //     return val;
                    // },
                },
            };
        });
        const series = ref([44, 55, 13, 43, 22]);
        return () =>
            h(VueApexCharts, {
                height: '100%',
                type: 'pie',
                // @ts-ignore
                options: chartOptions,
                series,
            });
    },
});
const _default = ChartPie;
export { _default as default };
