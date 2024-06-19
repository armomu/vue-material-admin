<template>
    <v-sheet class="work_content" id="work_content" @dragover="onDragover" @drop="onDrop">
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
            @update:active="onActivated(item)"
            @dragging="onDragging"
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
        <MouseMenu
            :visible="mouseMenu.menuState.value.visible"
            :top="mouseMenu.menuState.value.top"
            :left="mouseMenu.menuState.value.left"
        />
    </v-sheet>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import type { VirtualDom } from '../hooks/useOreoApp';
import { useMouseMenu } from '../hooks/useMouseMenu';
import Resizeble from './Resizeble.vue';
import MouseMenu from './MouseMenu.vue';

const emit = defineEmits(['onDragover', 'onDrop', 'onActive', 'onDragging']);

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

const mouseMenu = useMouseMenu();

const onDragover = (e: DragEvent) => {
    emit('onDragover', e);
};
const onDrop = (e: DragEvent) => {
    emit('onDrop', e);
};
const onActivated = (val: VirtualDom) => {
    emit('onActive', val);
};
const onDragging = (val: object, item: VirtualDom) => {
    emit('onDragging', val, item);
};

interface SnapLine {
    display: boolean;
    id: number;
    lineLength: string;
    origin: string;
    position: string;
}
</script>
