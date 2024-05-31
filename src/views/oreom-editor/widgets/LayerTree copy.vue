<template>
    <VueDraggableNext v-model="data" tag="div" :group="{ name: 'g1' }" class="dragArea">
        <TreeItem v-for="item in data" :data="item" :key="item.id" @tap="onClick">
            <LayerTree v-model:items="item.items" @tap="onClick" />
        </TreeItem>
    </VueDraggableNext>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { AppTree } from '../hooks/useMain';
import TreeItem from './TreeItem.vue';
import { VueDraggableNext } from 'vue-draggable-next';

const props = withDefaults(
    defineProps<{
        items: AppTree[];
    }>(),
    {}
);

const emit = defineEmits(['tap', 'update:items']);

const data = computed({
    get() {
        return props.items;
    },
    set(val) {
        console.log('set');
        emit('update:items', val);
    },
});

const onClick = (e: AppTree) => {
    emit('tap', e);
};
</script>
<style scoped>
.dragArea {
    padding: 2px;
    min-height: 50px;
    outline: 1px dashed;
}
</style>
