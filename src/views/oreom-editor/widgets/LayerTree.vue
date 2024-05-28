<template>
    <TreeItem v-for="item in props.data" :key="item.id" :data="item" @ondrop="onDrop">
        <LayerTree :data="item.items" @ondrop="onDrop" @over="onDragover" />
    </TreeItem>
</template>
<script lang="ts" setup>
import TreeItem from './TreeItem.vue';
import type { AppTree } from '../hooks/useMain';

const props = withDefaults(
    defineProps<{
        data: AppTree[];
    }>(),
    {}
);
const emit = defineEmits(['over', 'ondrop']);

const onDragover = (e: DragEvent, obj: AppTree) => {
    emit('over', e, obj);
};

const onDrop = (e: DragEvent, obj: AppTree) => {
    emit('ondrop', e, obj);
};
</script>
