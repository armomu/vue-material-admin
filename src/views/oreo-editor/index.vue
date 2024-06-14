<template>
    <div class="oreo-editor">
        <!-- <v-sheet class="editor-head d-flex">
        </v-sheet> -->
        <v-sheet class="layers">
            <a-collapse
                :default-active-key="['1', '2']"
                :bordered="false"
                :show-expand-icon="false"
                expand-icon-position="right"
            >
                <a-collapse-item header="Layers" key="1"> </a-collapse-item>
                <a-collapse-item header="Pages" key="2"> </a-collapse-item>
            </a-collapse>

            <v-card class="tools pa-1">
                <BasicWidget :data="widgets" @draging="onDraging" />
            </v-card>
        </v-sheet>
        <canvas class="top_ruler" ref="topRulerEle" />
        <!-- <canvas class="left_ruler" ref="leftRulerEle" /> -->
        <div class="work-area" @contextmenu.prevent="() => {}">
            <Layout
                :data="appDom"
                @on-dragover="onDragover"
                @on-drop="onDrop"
                @on-active="onVirtualDom"
            />
        </div>
        <v-card class="helper pa-1">
            <!-- <v-tooltip text="Finish Editing" location="top">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="text" icon="mdi-play-circle" size="small" />
                </template>
            </v-tooltip> -->
            <v-btn variant="text" icon="mdi-mouse-left-click-outline" size="small" />
            <v-btn variant="text" icon="mdi-hand-back-left-outline" size="small" />

            <v-btn
                variant="text"
                icon="mdi-reply"
                size="small"
                @click="onUndo"
                :disabled="useUrState.disabledUndo"
            />
            <v-btn
                variant="text"
                icon="mdi-share"
                size="small"
                @click="onRedo"
                :disabled="useUrState.disabledRedo"
            />
        </v-card>
        <v-sheet class="customizes" @contextmenu.prevent="() => {}">
            <Customize :data="curDom" />
        </v-sheet>
    </div>
</template>
<script lang="ts" setup>
import './css.scss';
import BasicWidget from './widgets/BasicWidget.vue';
import Customize from './widgets/Customize.vue';
import Layout from './widgets/Layout.vue';
import { useOreoApp } from './hooks/useOreoApp';
import { useUndoRedo } from './hooks/useUndoRedo';
import { useRuler } from './hooks/useRuler';
const { appDom, widgets, curDom, onDraging, onDragover, onDrop, onVirtualDom } = useOreoApp();

const { useUrState, onUndo, onRedo, appChange } = useUndoRedo(appDom);
const { leftRulerEle, topRulerEle } = useRuler();
</script>
