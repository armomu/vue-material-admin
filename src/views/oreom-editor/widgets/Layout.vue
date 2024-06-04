<template>
    <v-sheet class="work_content" @dragover="onDragover" @drop="onDrop">
        <Resizeble
            v-for="(item, key) in props.data"
            :key="key"
            :data="item"
            v-model:active="item.active"
            v-model:width="item.styles.width"
            v-model:height="item.styles.height"
            v-model:top="item.styles.top"
            v-model:left="item.styles.left"
            @snapLine="onSnapLine"
            @mouser="openMenu"
        >
            <!-- @snapLine="onSnapLine"
                        @contextmenu.prevent.native="openMenu" -->
            <!-- <component :is="chartKeys[item.widget]" /> -->
        </Resizeble>
        <!--辅助线-->
        <span
            class="ref-line v-line"
            v-for="item in snapLine.vLine"
            :key="item.id"
            v-show="item.display"
            :style="{ left: item.position, top: item.origin, height: item.lineLength }"
        />
        <span
            class="ref-line h-line"
            v-for="item in snapLine.hLine"
            :key="item.id"
            v-show="item.display"
            :style="{ top: item.position, left: item.origin, width: item.lineLength }"
        />
        <MouseMenu :visible="contextmenu.visible" :top="contextmenu.top" :left="contextmenu.left" />
    </v-sheet>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import type { VirtualDom } from '../hooks/useMain';
import Resizeble from './Resizeble.vue';
import MouseMenu from './MouseMenu.vue';

const emit = defineEmits(['onDragover', 'onDrop']);

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

const props = withDefaults(
    defineProps<{
        data: VirtualDom[];
    }>(),
    {}
);
const onDragover = (e: DragEvent) => {
    emit('onDragover', e);
};
const onDrop = (e: DragEvent) => {
    emit('onDrop', e);
};

const contextmenu = reactive({
    visible: false,
    top: 0,
    left: 0,
});

const hideMenu = () => {
    contextmenu.visible = false;
    // document.body.removeEventListener();
};
const openMenu = (e: PointerEvent) => {
    e.preventDefault();
    contextmenu.left = e.clientX;
    contextmenu.top = e.clientY;
    contextmenu.visible = true;
    document.body.addEventListener('click', hideMenu);
};

interface SnapLine {
    display: boolean;
    id: number;
    lineLength: string;
    origin: string;
    position: string;
}
</script>
