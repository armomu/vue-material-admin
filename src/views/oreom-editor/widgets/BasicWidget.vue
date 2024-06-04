<template>
    <v-btn
        v-for="item in props.data"
        :key="item.id"
        variant="text"
        :icon="item.content.icon"
        size="small"
        draggable="true"
        @dragstart="onDragstart(item)"
    >
        <v-icon :icon="item.content.icon"></v-icon>
        <v-tooltip activator="parent" location="end">{{ item.type }}</v-tooltip>
    </v-btn>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import type { VirtualDom } from '../hooks/useMain';

import { cloneDeep } from 'lodash';

const emit = defineEmits(['draging']);

const props = withDefaults(
    defineProps<{
        data: VirtualDom[];
    }>(),
    {}
);

const onDragstart = (e: VirtualDom) => {
    console.log(e);
    emit('draging', cloneDeep(e));
};
</script>
