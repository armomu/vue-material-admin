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
                    <a-collapse-item header="Pages" key="2"> </a-collapse-item>
                    <a-collapse-item header="Layers" key="1">
                        <LayerThree
                            :data="oreoApp.appDom.value"
                            @select="oreoApp.onLayerTreeNode"
                        />
                    </a-collapse-item>
                </a-collapse>

                <v-card class="tools pa-1 rounded-xl">
                    <BasicWidget
                        :data="oreoApp.widgets.value"
                        @draging="oreoApp.onDraging"
                        @addimg="oreoApp.onAddImage"
                    />
                </v-card>
            </v-sheet>
            <div
                :ref="oreoApp.workAreaDomRef"
                class="work-area"
                id="workArea"
                @contextmenu.prevent="() => {}"
                @pointerdown.stop="oreoApp.onPointerDown"
                @pointermove.stop="oreoApp.onPointerMove"
                @pointerup.stop="oreoApp.onPointerUp"
                @scroll="oreoApp.onWorkAreaScroll"
                :class="{
                    cursorText: oreoApp.mouseMode.value.text,
                    cursorCross: oreoApp.mouseMode.value.draRact,
                    cursorGrab: oreoApp.mouseMode.value.hand,
                }"
            >
                <!-- <Layout
                    :data="oreoApp.appDom"
                    @on-dragover="oreoApp.onDragover"
                    @on-drop="oreoApp.onDrop"
                    @on-active="oreoApp.onVirtualDom"
                    @on-dragging="oreoApp.onVirtualGroupDragging"
                /> -->
                <v-sheet
                    class="work_content"
                    id="work_content"
                    @dragover="oreoApp.onDragover"
                    @drop="oreoApp.onDrop"
                >
                    <Resizeble
                        v-for="(item, key) in oreoApp.appDom.value"
                        :key="key"
                        :data="item"
                        v-model:active="item.active"
                        v-model:width="item.styles.width"
                        v-model:height="item.styles.height"
                        v-model:top="item.styles.top"
                        v-model:left="item.styles.left"
                        :disable="oreoApp.disableDraResize.value"
                        @snapLine="onSnapLine"
                        @mouser="oreoApp.openMenu"
                        @activated="oreoApp.onVirtualDom"
                        @dragging="oreoApp.onVirtualGroupDragging"
                        @blur="oreoApp.onBlur"
                        @input="oreoApp.onInput"
                        @enter="oreoApp.onEnter"
                        @changing="oreoApp.onResizeChange"
                    >
                        <!-- @snapLine="onSnapLine"
                        @contextmenu.prevent.native="openMenu" -->
                        <!-- <component :is="chartKeys[item.widget]" /> -->
                    </Resizeble>
                    <!--辅助线-->
                    <div>
                        <span
                            class="ref-line v-line"
                            v-for="item in snapLine.vLine"
                            :key="item.id"
                            v-show="item.display"
                            :style="{
                                left: item.position,
                                top: item.origin,
                                height: item.lineLength,
                            }"
                        />
                        <span
                            class="ref-line h-line"
                            v-for="item in snapLine.hLine"
                            :key="item.id"
                            v-show="item.display"
                            :style="{
                                top: item.position,
                                left: item.origin,
                                width: item.lineLength,
                            }"
                        />
                    </div>
                    <MouseMenu
                        :data="oreoApp.appDom.value"
                        :visible="oreoApp.menuState.value.visible"
                        :top="oreoApp.menuState.value.top"
                        :left="oreoApp.menuState.value.left"
                        :actions="oreoApp.meneActions"
                    />
                </v-sheet>
                <div
                    v-if="oreoApp.boxSelectState.value.visible"
                    class="boxSelectHelper"
                    :style="oreoApp.boxSelectState.value"
                ></div>
            </div>
            <!-- 添加图片 -->
            <input
                :ref="oreoApp.imageFileRef"
                hidden
                accept="image/*"
                type="file"
                @change="oreoApp.onAddImage"
            />
            <v-card class="helper pa-1 rounded-xl">
                <v-btn
                    variant="text"
                    icon="mdi-navigation-outline"
                    size="x-small"
                    style="transform: rotate(-35deg)"
                    :color="oreoApp.mouseMode.value.boxSelect ? 'primary' : undefined"
                    @click="oreoApp.onMouseMode('boxSelect')"
                />
                <v-btn
                    variant="text"
                    icon="mdi-card-outline"
                    size="x-small"
                    :color="oreoApp.mouseMode.value.draRact ? 'primary' : undefined"
                    @click="oreoApp.onMouseMode('draRact')"
                />
                <v-btn
                    variant="text"
                    icon="mdi-format-color-text"
                    size="x-small"
                    :color="oreoApp.mouseMode.value.text ? 'primary' : undefined"
                    @click="oreoApp.onMouseMode('text')"
                />
                <v-btn
                    variant="text"
                    icon="mdi-hand-back-left-outline"
                    size="x-small"
                    :color="oreoApp.mouseMode.value.hand ? 'primary' : undefined"
                    @click="oreoApp.onMouseMode('hand')"
                />
                <v-btn variant="text" icon="mdi-code-json" size="x-small" @click="() => { oreoApp.jsonViewerVisible.value = true }" />
                <v-btn variant="text" icon="mdi-check-bold" size="x-small" />
                <v-btn variant="text" icon="mdi-reply" size="x-small" />
                <v-btn variant="text" icon="mdi-share" size="x-small" />
            </v-card>
            <v-sheet class="customizes_wrap" @contextmenu.prevent="() => {}">
                <Customize :data="oreoApp.curDom.value" :align="alignFun" />
            </v-sheet>
        </div>
        <a-drawer v-model:visible="oreoApp.jsonViewerVisible.value" placement="top" height="70vh">
            <template #title> Json Viewer </template>
            <JsonViewer
            v-if="oreoApp.jsonViewerVisible"
                :value="oreoApp.appDom"
                :expand-depth="5"
                copyable

            ></JsonViewer>
        </a-drawer>
    </div>
</template>
<script lang="ts" setup>
import './css.scss';
import { reactive } from 'vue';
// @ts-ignore
import JsonViewer from 'vue-json-viewer';
import BasicWidget from './widgets/BasicWidget.vue';
import Customize from './widgets/Customize.vue';
// import Layout from './widgets/Layout.vue';
import LayerThree from './widgets/LayerThree.vue';
import Resizeble from './widgets/Resizeble.vue';
import MouseMenu from './widgets/MouseMenu.vue';
import useOreoApp from './hooks/useOreoApp';
import { useAlign } from './hooks/useAlign';
const oreoApp = useOreoApp();

// const mouseMenu = useMouseMenu();
const alignFun = useAlign(oreoApp.appDom.value);

const snapLine = reactive<{
    vLine: SnapLine[];
    hLine: SnapLine[];
}>({
    vLine: [],
    hLine: [],
});
const onSnapLine = (arr: SnapLine[][]) => {
    const [vLine, hLine] = arr;
    snapLine.vLine = vLine;
    snapLine.hLine = hLine;
};

interface SnapLine {
    display: boolean;
    id: number;
    lineLength: string;
    origin: string;
    position: string;
}
</script>
