import { h, ref, type Ref } from 'vue';
import ChartArea from '../widgets/charts/ChartArea.vue';
import { type VirtualDom } from './useOreoApp';

export const useAddChart = (appDom: Ref<VirtualDom[]>, curDom: Ref<VirtualDom>) => {
    const chartState = ref({
        dialogVisible: false,
    });

    // 这里应该是弹出一个很多种类型的组件供选择
    const onShowChartDialog = () => {
        chartState.value.dialogVisible = true;
    };

    const onAddChart = () => {
        // 假如这里是从页面用户输入的配置
        // 需要在VirtualDom增加options
        const option = {
            x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            y: [31, 40, 28, 51, 42, 109, 100],
        };
        curDom.value.component = () => h(ChartArea, { ...option });
        chartState.value.dialogVisible = false;
    };
    return {
        chartState,
        onShowChartDialog,
        onAddChart,
    };
};
