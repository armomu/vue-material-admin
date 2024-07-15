<template>
    <div class="editor_wrap">
        <div class="oreo-editor" id="oreoEditor">
            <div class="layers" id="layers" @contextmenu.prevent="() => {}">
                <a-collapse
                    :default-active-key="['1', '2']"
                    :bordered="false"
                    :show-expand-icon="false"
                    expand-icon-position="right"
                >
                    <a-collapse-item header="Pages" key="2"> </a-collapse-item>
                    <a-collapse-item header="Layers" key="1">
                        <LayerTree
                            :data="oreoApp.appDom.value"
                            @select="oreoApp.onLayerTreeNode"
                            @del="oreoApp.onDelVirtualDom"
                        />
                    </a-collapse-item>
                </a-collapse>
                <div class="tools">
                    <BasicWidget
                        :data="oreoApp.widgets.value"
                        @draging="oreoApp.onDraging"
                        @addimg="oreoApp.onAddImage"
                    />
                </div>
            </div>
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
                <div
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
                        v-model:label="item.label"
                        :disable="oreoApp.disableDraResize.value"
                        @snapLine="oreoApp.onSnapLine"
                        @mouser="oreoApp.openMenu"
                        @activated="oreoApp.onVirtualDom"
                        @dragging="oreoApp.onVirtualDomDragging"
                        @blur="oreoApp.onBlur"
                        @input="oreoApp.onInput"
                        @enter="oreoApp.onEnter"
                        @resizing="oreoApp.onResize"
                    >
                    </Resizeble>
                    <SnapLine :data="oreoApp.snapLine" />
                    <MouseMenu
                        :data="oreoApp.appDom.value"
                        :visible="oreoApp.menuState.value.visible"
                        :top="oreoApp.menuState.value.top"
                        :left="oreoApp.menuState.value.left"
                        :actions="oreoApp.meneActions"
                    />
                </div>
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
            <div class="helper">
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
                    icon="mdi-emoticon-outline"
                    size="x-small"
                    @click="oreoApp.onShowIconDialog"
                />
                <v-btn
                    variant="text"
                    icon="mdi-hand-back-left-outline"
                    size="x-small"
                    :color="oreoApp.mouseMode.value.hand ? 'primary' : undefined"
                    @click="oreoApp.onMouseMode('hand')"
                />
                <v-btn
                    variant="text"
                    icon="mdi-code-json"
                    size="x-small"
                    @click="
                        () => {
                            oreoApp.jsonViewerVisible.value = true;
                        }
                    "
                />
                <v-btn variant="text" icon="mdi-reply" size="x-small" />
                <v-btn variant="text" icon="mdi-share" size="x-small" />
                <v-btn variant="text" icon="mdi-check-bold" size="x-small" />
            </div>
            <div class="customizes_wrap" @contextmenu.prevent="() => {}">
                <Customize :data="oreoApp.curDom.value" :align="oreoApp.align" />
            </div>
        </div>
        <a-drawer
            v-model:visible="oreoApp.jsonViewerVisible.value"
            placement="bottom"
            hide-cancel
            height="70vh"
        >
            <template #title> Json Viewer </template>
            <JsonViewer
                v-if="oreoApp.jsonViewerVisible"
                :value="oreoApp.appDom"
                :expand-depth="5"
                copyable
            ></JsonViewer>
        </a-drawer>
        <a-drawer
            v-model:visible="oreoApp.iconState.value.dialogVisible"
            placement="bottom"
            height="70vh"
            :footer="false"
            hide-cancel
        >
            <template #title> Material design icons </template>
            <div class="icon-wrap">
                <v-icon
                    v-for="item in oreoApp.iconState.value.list"
                    :key="item"
                    :icon="item"
                    @click="oreoApp.onAddIcon(item)"
                />
            </div>
        </a-drawer>
    </div>
</template>
<script lang="ts" setup>
import './styles/index.scss';
import BasicWidget from './widgets/BasicWidget.vue';
import Customize from './widgets/Customize.vue';
import LayerTree from './widgets/LayerTree.vue';
import Resizeble from './widgets/Resizeble.vue';
import MouseMenu from './widgets/MouseMenu.vue';
import SnapLine from './widgets/SnapLine.vue';
// @ts-ignore
import JsonViewer from 'vue-json-viewer';

import useOreoApp from './hooks/useOreoApp';
const oreoApp = useOreoApp();
</script>
