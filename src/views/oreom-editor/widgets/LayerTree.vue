<template>
    <VueDraggableNext
        v-model="data"
        tag="div"
        :group="{ name: 'people' }"
        class="dragArea"
        @change="onEnd"
    >
        <TreeItem v-for="item in data" :data="item" :key="item.id" @tap="onClick">
            <LayerTree v-model:items="item.items" @tap="onClick" @change="onEnd" />
        </TreeItem>
    </VueDraggableNext>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { VirtualDom } from '../hooks/useMain';
import TreeItem from './TreeItem.vue';
import { VueDraggableNext } from 'vue-draggable-next';

const props = withDefaults(
    defineProps<{
        items: VirtualDom[];
    }>(),
    {}
);

const emit = defineEmits(['tap', 'update:items', 'change']);

const data = computed({
    get() {
        return props.items;
    },
    set(val) {
        emit('update:items', val);
    },
});

const onClick = (e: VirtualDom) => {
    emit('tap', e);
};

const onEnd = (/** Event*/ evt, /** Event*/ originalEvent) => {
    emit('change', evt, originalEvent);
};
</script>
