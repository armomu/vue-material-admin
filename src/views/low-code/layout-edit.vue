<template>
    <div class="low_code_page">
        <v-card class="widgets">
            <v-text-field
                label="Search Wigets"
                variant="outlined"
                density="compact"
                prepend-inner-icon="mdi-magnify"
                class="ma-4"
                hide-details
            ></v-text-field>
            <v-list v-model:opened="data.open" nav>
                <v-list-group v-for="item in data.widgets" :key="item.name" :value="item.name">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            :prepend-icon="item.icon"
                            :title="item.name"
                        ></v-list-item>
                    </template>
                    <div class="chart_s">
                        <div
                            v-for="row in item.items"
                            :key="row.name"
                            class="item"
                            draggable="true"
                        >
                            <v-icon :icon="row.icon" size="50" />
                            <!-- <div>{{ row.name }}</div> -->
                        </div>
                    </div>
                </v-list-group>
            </v-list>
        </v-card>
        <div class="work_area">
            <div class="work_content">
                <div
                    class="scale_wrap"
                    :style="{
                        transform: `scale(${scaleState.slider / 100})`,
                    }"
                    @dragover="onDragover"
                    @drop="onDragEnd"
                >
                    <dragTool
                        v-for="(item, key) in data.layouts"
                        :key="key"
                        @change="resize(item)"
                        :options="item"
                    >
                        <component :is="components[item.widget]" />
                    </dragTool>
                </div>
            </div>
        </div>
        <v-card class="column_tools">
            <v-tooltip text="Preview">
                <template v-slot:activator="{ props }">
                    <v-btn variant="text" icon="mdi-play-circle" v-bind="props" />
                </template>
            </v-tooltip>

            <v-btn variant="text" icon="mdi-grid" color="primary">
                <v-icon size="small"></v-icon>
            </v-btn>
            <v-btn variant="text" icon="mdi-hand-back-right-outline">
                <v-icon size="small"></v-icon>
            </v-btn>
            <!-- <v-btn variant="text" icon="mdi-mouse" color="primary">
                <v-icon size="small"></v-icon>
            </v-btn> -->

            <v-slider
                v-model="scaleState.slider"
                color="primary"
                :step="1"
                class="slider"
                :max="200"
                :min="25"
                density="compact"
                direction="vertical"
                hide-details
            >
                <template v-slot:append>
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <div style="width: 56px; text-align: center" v-bind="props">
                                {{ scaleState.slider }}%
                            </div>
                        </template>
                        <v-list class="h_a_menu">
                            <v-list-item
                                v-for="item in scaleState.sliderStep"
                                :key="item"
                                @click="onScale(item)"
                            >
                                <v-list-item-title>{{ item }}%</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
            </v-slider>
        </v-card>
        <div class="tool_area">
            <v-card class="widget_tools"></v-card>
            <v-card class="widget_layouts" title="Layer">
                <div class="layout_min_wrap">
                    <vuedraggable v-model="data.layouts" item-key="index">
                        <template #item="{ element, index }">
                            <div
                                class="layout_min_item d-flex jsb"
                                :key="index"
                                :class="{
                                    active: element.active,
                                }"
                                @click="onMinLayout(element)"
                            >
                                <div class="title">
                                    {{ element.widget }}
                                </div>
                                <div class="icons">
                                    <v-icon icon="mdi-eye" />
                                    <v-icon icon="mdi-delete" />
                                </div>
                            </div>
                        </template>
                    </vuedraggable>
                </div>
            </v-card>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import ChartArea from './widgets/chart-area.vue';
import dragTool from './widgets/drag-tool.vue';
import { useDrapToolStore } from '@/stores/drapTool';
import vuedraggable from 'vuedraggable';
const { onSetDrapXy } = useDrapToolStore();
const scaleState = reactive({
    slider: 100,
    sliderStep: [50, 100, 150],
});

const onScale = (val: number) => {
    scaleState.slider = val;
};
interface Data {
    open: string[];
    widgets: {
        name: string;
        icon: string;
        items: any[];
    }[];
    layouts: {
        active: boolean;
        width: number;
        height: number;
        top: number;
        left: number;
        widget: any;
    }[];
}
const components = {
    ChartArea: ChartArea,
};
const data = reactive<Data>({
    open: ['Charts'],
    widgets: [
        {
            name: 'Widgets',
            icon: 'mdi-auto-fix',
            items: [],
        },
        {
            name: 'Charts',
            icon: 'mdi-chart-areaspline',
            items: [
                {
                    name: 'Line',
                    icon: 'mdi-chart-line',
                },
                {
                    name: 'Area',
                    icon: 'mdi-chart-areaspline-variant',
                },
                {
                    name: 'column',
                    icon: 'mdi-chart-bar',
                },
                {
                    name: 'Bubble',
                    icon: 'mdi-chart-scatter-plot',
                },
                {
                    name: 'TreeMap',
                    icon: 'mdi-chart-tree',
                },
                {
                    name: 'Pie',
                    icon: 'mdi-chart-pie',
                },
                {
                    name: 'RadialBar',
                    icon: 'mdi-chart-donut-variant',
                },
            ],
        },
        {
            name: 'Form Inputs',
            icon: 'mdi-form-select',
            items: [],
        },
        {
            name: '3D Model',
            icon: 'mdi-unity',
            items: [],
        },
    ],
    layouts: [],
});

const testH = ref(100);

const resize = (e) => {
    testH.value = e.height;
    console.log(e);
    // console.log(data.layouts);
};
const onDragover = (e: DragEvent) => {
    e.preventDefault();
};
const onMinLayout = (e) => {
    e.active = !e.active;
};

const onDragEnd = (e: DragEvent) => {
    e.preventDefault();
    const obj = {
        active: true,
        widget: 'ChartArea',
        width: 300,
        height: 160,
        top: e.offsetY,
        left: e.offsetX,
    };
    onSetDrapXy(e.offsetX, e.offsetY);
    data.layouts.push(obj);
};
</script>
