<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
    <div class="oreom-editor">
        <v-card class="widgets_area"><BasicWidget :data="widgets" /></v-card>
        <div class="works_area">
            <div class="work_content">
                <LayerTree v-model:items="appTree" @tap="onTap" />
                <!-- <Nested :items="list" /> -->
            </div>
        </div>

        <div class="column_tools">
            <v-btn variant="text" icon="mdi-play-circle" size="small" />
            <v-btn variant="text" icon="mdi-hand-back-right-outline" size="small" />
            <v-btn variant="text" icon="mdi-reply" size="small" />
            <v-btn variant="text" icon="mdi-share" size="small" />
        </div>
        <!-- <v-card class="tools_area">
            <div class="widget_layouts" title="Layers">
                <div class="layout_min_wrap"></div>
            </div>
        </v-card> -->
        <v-card
            class="contextmenu"
            v-if="contextmenu.visible"
            :style="{
                left: contextmenu.left + 'px',
                top: contextmenu.top + 'px',
            }"
        >
            <div class="layout_min_wrap">
                <div class="layout_min_item">隐藏</div>
                <div class="layout_min_item">删除</div>
                <div class="layout_min_item">下一层</div>
                <div class="layout_min_item">上一层</div>
            </div>
        </v-card>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import './css.scss';
import LayerTree from './widgets/LayerTree.vue';
import { useMain } from './hooks/useMain';
import Nested from './widgets/Nested.vue';
import BasicWidget from './widgets/BasicWidget.vue';
const { appTree, widgets, onDrag, onOver } = useMain();
const contextmenu = reactive({
    left: 0,
    top: 0,
    visible: false,
});
const hideMenu = () => {
    contextmenu.visible = false;
};
const openMenu = (e: PointerEvent) => {
    e.preventDefault();
    contextmenu.left = e.clientX;
    contextmenu.top = e.clientY;
    contextmenu.visible = true;
    document.body.addEventListener('click', hideMenu);
};

const list = ref([
    {
        name: 'task 1',
        id: 1,
        items: [
            {
                name: 'task 2',
                id: 2,
                items: [],
            },
        ],
    },
    {
        name: 'task 3',
        id: 3,
        items: [
            {
                name: 'task 4',
                id: 4,
                items: [],
            },
        ],
    },
    {
        name: 'task 5',
        id: 5,
        items: [],
    },
]);
const onTap = (e: AppTree) => {
    console.log(e);
    // e.items.push({
    //     name: 'task 6',
    //     id: 6,
    //     items: [],
    // });
};
</script>
