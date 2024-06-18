<template>
    <div class="editor_wrap">
        <div class="oreo-editor" id="oreoEditor">
            <v-sheet class="layers" id="layers" @contextmenu.prevent="() => {}">
                <a-collapse
                    :default-active-key="['1', '2']"
                    :bordered="false"
                    :show-expand-icon="false"
                    expand-icon-position="right"
                >
                    <a-collapse-item header="Layers" key="1"> </a-collapse-item>
                    <a-collapse-item header="Pages" key="2"> </a-collapse-item>
                </a-collapse>

                <v-card class="tools pa-1 rounded-xl">
                    <BasicWidget :data="oreoApp.widgets.value" @draging="oreoApp.onDraging" />
                </v-card>
            </v-sheet>
            <div
                class="work-area"
                id="workArea"
                @contextmenu.prevent="() => {}"
                @pointerdown.stop="oreoApp.onPointerDown"
                @pointermove.stop="oreoApp.onPointerMove"
                @pointerup.stop="oreoApp.onPointerUp"
            >
                <Layout
                    :data="oreoApp.appDom.value"
                    @on-dragover="oreoApp.onDragover"
                    @on-drop="oreoApp.onDrop"
                    @on-active="oreoApp.onVirtualDom"
                />
                <div
                    v-if="oreoApp.boxSelect.visible"
                    class="boxSelectHelper"
                    :style="oreoApp.boxSelect"
                ></div>
            </div>
            <v-card class="helper pa-1 rounded-xl">
                <v-btn
                    variant="text"
                    icon="mdi-navigation-outline"
                    size="x-small"
                    style="transform: rotate(-35deg)"
                />
                <v-btn variant="text" icon="mdi-group" size="x-small" />
                <v-btn variant="text" icon="mdi-hand-back-left-outline" size="x-small" />

                <v-btn variant="text" icon="mdi-reply" size="x-small" />
                <v-btn variant="text" icon="mdi-share" size="x-small" />
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
const oreoApp = useOreoApp();
</script>
