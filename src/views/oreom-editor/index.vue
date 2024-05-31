<template>
    <div class="oreom-editor">
        <div class="widgets_area"><BasicWidget :data="widgets" /></div>
        <div class="works_area">
            <div class="work_content">
                <LayerTree v-model:items="appTree" @tap="onTap" @update:items="appWatch" />
            </div>
        </div>

        <div class="column_tools mr-4">
            <v-tooltip text="Finish Editing" location="top">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="text" icon="mdi-play-circle" size="small" />
                </template>
            </v-tooltip>
            <v-tooltip text="Undo" location="top">
                <template v-slot:activator="{ props }">
                    <v-btn
                        v-bind="props"
                        variant="text"
                        icon="mdi-reply"
                        size="small"
                        @click="onUndo"
                    />
                </template>
            </v-tooltip>
            <v-tooltip text="Repdo" location="top">
                <template v-slot:activator="{ props }">
                    <v-btn
                        v-bind="props"
                        variant="text"
                        icon="mdi-share"
                        size="small"
                        @click="onRedo"
                    />
                </template>
            </v-tooltip>
        </div>
        <v-card class="tools_area"> </v-card>
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
import './css.scss';
import { reactive, ref } from 'vue';
import BasicWidget from './widgets/BasicWidget.vue';
import LayerTree from './widgets/LayerTree.vue';
import { useMain } from './hooks/useMain';
import { useUndoRedo } from './hooks/useUndoRedo';

const { appTree, widgets, onDrag, onOver } = useMain();

const { appWatch, onUndo, onRedo } = useUndoRedo(appTree);

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

const onTap = (e: AppTree) => {
    console.log(e);
    // e.items.push({
    //     name: 'task 6',
    //     id: 6,
    //     items: [],
    // });
};
</script>
