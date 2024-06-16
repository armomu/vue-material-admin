<template>
    <div class="editor_wrap">
        <div class="oreo-editor" id="oreoEditor">
            <!-- <v-sheet class="editor-head d-flex">
        </v-sheet> -->
            <v-sheet class="layers" id="layers">
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
                    <BasicWidget :data="oreoApp.widgets.value" @draging="oreoApp.onDraging" />
                </v-card>
            </v-sheet>
            <!-- <canvas class="left_ruler" ref="leftRulerEle" /> -->
            <div
                class="work-area"
                @contextmenu.prevent="() => {}"
                @pointerdown.prevent.stop="oreoApp.onMouseDown"
                @pointermove.prevent.stop="oreoApp.onMouseMove"
                @pointerup.prevent.stop="oreoApp.onMouseUp"
            >
                <Layout
                    :data="oreoApp.appDom.value"
                    @on-dragover="oreoApp.onDragover"
                    @on-drop="oreoApp.onDrop"
                    @on-active="oreoApp.onVirtualDom"
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
                <v-btn variant="text" icon="mdi-credit-card-scan-outline" size="small" />

                <v-btn variant="text" icon="mdi-reply" size="small" />
                <v-btn variant="text" icon="mdi-share" size="small" />
            </v-card>
            <v-sheet class="customizes_wrap" @contextmenu.prevent="() => {}">
                <Customize :data="oreoApp.curDom.value" />
            </v-sheet>
        </div>
    </div>
</template>
<script lang="ts" setup>
import './css.scss';
import BasicWidget from './widgets/BasicWidget.vue';
import Customize from './widgets/Customize.vue';
import Layout from './widgets/Layout.vue';
import useOreoApp from './hooks/useOreoApp';
import { useUndoRedo } from './hooks/useUndoRedo';
import { useRuler } from './hooks/useRuler';
const oreoApp = useOreoApp();

// const { useUrState, onUndo, onRedo, appChange } = useUndoRedo(oreoApp.appDom);
const { leftRulerEle, topRulerEle } = useRuler();
</script>
