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
                        @snapLine="onSnapLine"
                        @mouser="mouseMenu.openMenu"
                        @activated="oreoApp.onVirtualDom"
                        @dragging="oreoApp.onVirtualGroupDragging"
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
                        :visible="mouseMenu.menuState.value.visible"
                        :top="mouseMenu.menuState.value.top"
                        :left="mouseMenu.menuState.value.left"
                    />
                </v-sheet>
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
                <Customize :data="oreoApp.curDom.value" :align="alignFun" />
            </v-sheet>
        </div>
    </div>
</template>
<script lang="ts" setup>
import './css.scss';
import { reactive } from 'vue';
import BasicWidget from './widgets/BasicWidget.vue';
import Customize from './widgets/Customize.vue';
// import Layout from './widgets/Layout.vue';
import Resizeble from './widgets/Resizeble.vue';
import MouseMenu from './widgets/MouseMenu.vue';
import useOreoApp from './hooks/useOreoApp';
import { useMouseMenu } from './hooks/useMouseMenu';
import { useAlign } from './hooks/useAlign';
const oreoApp = useOreoApp();

const mouseMenu = useMouseMenu();
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
