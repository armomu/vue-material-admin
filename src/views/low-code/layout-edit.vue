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
            <v-list v-model:opened="data.open" nav id="first-element-introduction">
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
                            @dragend="onMenuDragend(row)"
                        >
                            <v-icon :icon="row.icon" size="50" />
                            <!-- <div>{{ row.name }}</div> -->
                        </div>
                    </div>
                </v-list-group>
            </v-list>
        </v-card>
        <div class="work_area">
            <div class="work_content" id="second-element-introduction">
                <div
                    class="scale_wrap"
                    :style="{
                        transform: `scale(${scaleState.slider / 100})`,
                    }"
                    @dragover="onDragover"
                    @drop="onDragEnd"
                >
                    <template v-for="(item, key) in data.layouts">
                        <dragTool
                            :key="key"
                            v-if="item.visible"
                            v-model:active="item.active"
                            v-model:width="item.width"
                            v-model:height="item.height"
                            v-model:top="item.top"
                            v-model:left="item.left"
                        >
                            <component :is="chartKeys[item.widget]" />
                        </dragTool>
                    </template>
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
            <v-card class="widget_layouts">
                <div class="layout_min_wrap">
                    <v-list-subheader>Layer</v-list-subheader>
                    <vuedraggable v-model="data.layouts" item-key="index">
                        <template #item="{ element, index }">
                            <div
                                class="layout_min_item d-flex jsb"
                                :key="index"
                                :class="{
                                    active: element.active,
                                }"
                                @click.stop="onMinLayout(element)"
                            >
                                <div class="title">
                                    {{ element.widget }}
                                </div>
                                <div class="icons">
                                    <v-icon
                                        :icon="element.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click.stop="
                                            () => {
                                                element.visible = !element.visible;
                                            }
                                        "
                                    />
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
import { reactive, onMounted } from 'vue';
import { chartKeys } from './widgets/widgets';
import dragTool from './widgets/drag-tool.vue';
import type { LeftMenuOptions, EditBoxOptions } from './hook/layout-edit';
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
const data = reactive<LeftMenuOptions>({
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
                    active: true,
                    widget: 'ChartLine',
                    width: 320,
                    height: 180,
                    top: 0,
                    left: 0,
                    visible: true,
                },
                {
                    name: 'Area',
                    icon: 'mdi-chart-areaspline-variant',
                    active: true,
                    widget: 'ChartArea',
                    width: 320,
                    height: 180,
                    top: 0,
                    left: 0,
                    visible: true,
                },
                {
                    name: 'column',
                    icon: 'mdi-chart-bar',
                    active: true,
                    widget: 'ChartColumn',
                    width: 300,
                    height: 160,
                    top: 0,
                    left: 0,
                    visible: true,
                },
                {
                    name: 'Bubble',
                    icon: 'mdi-chart-scatter-plot',
                    active: true,
                    widget: 'ChartBubble',
                    width: 300,
                    height: 160,
                    top: 0,
                    left: 0,
                    visible: true,
                },
                {
                    name: 'TreeMap',
                    icon: 'mdi-chart-tree',
                    active: true,
                    widget: 'ChartTreemap',
                    width: 300,
                    height: 160,
                    top: 0,
                    left: 0,
                    visible: true,
                },
                {
                    name: 'Pie',
                    icon: 'mdi-chart-pie',
                    active: true,
                    widget: 'ChartPie',
                    width: 300,
                    height: 160,
                    top: 0,
                    left: 0,
                    visible: true,
                },
                {
                    name: 'RadialBar',
                    icon: 'mdi-chart-donut-variant',
                    active: true,
                    widget: 'ChartRadialBar',
                    width: 300,
                    height: 160,
                    top: 0,
                    left: 0,
                    visible: true,
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
var DragingItem: EditBoxOptions;
const onMenuDragend = (e: EditBoxOptions) => {
    DragingItem = JSON.parse(JSON.stringify(e));
};
const onDragover = (e: DragEvent) => {
    e.preventDefault();
};
const onMinLayout = (e: EditBoxOptions) => {
    e.active = true;
};

const onDragEnd = (e: DragEvent) => {
    e.preventDefault();
    setTimeout(() => {
        DragingItem.top = e.offsetY;
        DragingItem.left = e.offsetX;
        data.layouts.push(DragingItem);
    }, 30);
};

// Start the introduction
onMounted(() => {
    // driver.start();
});
</script>
