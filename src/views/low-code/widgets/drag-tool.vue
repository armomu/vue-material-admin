<template>
    <VueDragResize
        :isActive="options.active"
        :w="options.width"
        :h="options.height"
        :x="obj.x"
        :y="obj.y"
        @resizestop="resize"
        @dragstop="resize"
        @activated="onActivated"
        @deactivated="onDeactivated"
    >
        <slot />
    </VueDragResize>
</template>
<script setup lang="ts">
import { options } from 'preact';
import { computed } from 'vue';
import VueDragResize from 'vue3-drag-resize';
import { useDrapToolStore } from '@/stores/drapTool';
const { position } = useDrapToolStore();

const props = withDefaults(
    defineProps<{
        options: {
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
const _options = computed(() => props.options);
const obj = {
    x: parseInt(position.x - props.options.width / 2 + ''),
    y: parseInt(position.y - props.options.height / 2 + ''),
};
const resize = (e: any) => {
    _options.value.width = e.width;
    _options.value.height = e.height;
    _options.value.top = e.top;
    _options.value.left = e.left;
    emit('change', e);
};

const onActivated = () => {
    _options.value.active = true;
};
const onDeactivated = () => {
    _options.value.active = false;
};
</script>
