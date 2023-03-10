<template>
    <VueDragResize
        :isActive="_active"
        :w="_width"
        :h="_height"
        :x="_left"
        :y="_top"
        @resizestop="resize"
        @dragstop="resize"
        @activated="onActivated"
        @deactivated="onDeactivated"
    >
        <slot />
        <div>w{{ width }} h{{ height }} l{{ left }} t{{ top }}</div>
    </VueDragResize>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import VueDragResize from 'vue3-drag-resize';
// import { useDrapToolStore } from '@/stores/drapTool';
// const { position } = useDrapToolStore();

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

const onActivated = () => {
    emit('update:active', true);
};
const onDeactivated = () => {
    emit('update:active', false);
};

// const _options = computed(() => props.options);
// const _options = computed(() => props.options);
// const obj = {
//     x: parseInt(position.x - props.options.width / 2 + ''),
//     y: parseInt(position.y - props.options.height / 2 + ''),
// };
// const resize = (e: any) => {
//     _options.value.width = e.width;
//     _options.value.height = e.height;
//     _options.value.top = e.top;
//     _options.value.left = e.left;
//     emit('change', e);
// };

// const onActivated = () => {
//     _options.value.active = true;
// };
// const onDeactivated = () => {
//     _options.value.active = false;
// };
</script>
