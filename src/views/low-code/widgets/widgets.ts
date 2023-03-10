/* eslint-disable prettier/prettier */
import ChartArea from './chart-area.vue';
import ChartLine from './chart-line.vue';
import ChartColumn from './chart-column.vue';
import ChartBubble from './chart-bubble.vue';
import ChartTreemap from './chart-treemap.vue';
import ChartPie from './chart-pie.vue';
import ChartRadialBar from './chart-radial-bar.vue';

export const chartKeys: ChartKeys = {
    'ChartLine': ChartLine,
    'ChartArea': ChartArea,
    'ChartColumn': ChartColumn,
    'ChartBubble': ChartBubble,
    'ChartTreemap': ChartTreemap,
    'ChartPie': ChartPie,
    'ChartRadialBar': ChartRadialBar,
};

interface ChartKeys {
    [key: string]: any;
}
