<template>
    <DragResizeBle
        :active="_active"
        :w="_width"
        :h="_height"
        :x="_left"
        :y="_top"
        @activated="onActivated"
        @deactivated="onDeactivated"
        @resizestop="resize"
        @dragstop="resize"
        @refLineParams="getRefLineParams"
    >
        <slot />
    </DragResizeBle>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import DragResizeBle from '@/components/drag-resizeble/drag-resizeble.vue';

const props = withDefaults(
    defineProps<{
        active: boolean;
        width: number;
        height: number;
        top: number;
        left: number;
        options?: {
            active: boolean;
            width: number;
            height: number;
            top: number;
            left: number;
        };
    }>(),
    {}
);
const emit = defineEmits([
    'update:active',
    'update:width',
    'update:height',
    'update:top',
    'update:left',
    'change',
    'snapLine',
]);
const _active = computed(() => props.active);
const _width = computed(() => props.width);
const _height = computed(() => props.height);
const _top = computed(() => props.top);
const _left = computed(() => props.left);

const resize = (e: any) => {
    emit('update:width', e.width);
    emit('update:height', e.height);
    emit('update:top', e.top);
    emit('update:left', e.left);
    emit('change', e);
};

const getRefLineParams = (params: any) => {
    const { vLine, hLine } = params;
    let id = 0;
    const vs = vLine.map((item: any) => {
        item['id'] = ++id;
        return item;
    });
    const hl = hLine.map((item: any) => {
        item['id'] = ++id;
        return item;
    });
    emit('snapLine', [vs || [], hl || []]);
};
const onActivated = () => {
    emit('update:active', true);
};
const onDeactivated = () => {
    emit('update:active', false);
};
</script>
