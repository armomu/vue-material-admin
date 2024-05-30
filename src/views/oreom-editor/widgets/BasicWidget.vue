<template>
    <VueDraggableNext :list="data" tag="div" class="dragArea">
        <div v-for="item in props.data" :key="item.id" class="item">
            <v-icon :icon="'mdi-' + item.icon"></v-icon>
        </div>
    </VueDraggableNext>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { AppTree } from '../hooks/useMain';
import { VueDraggableNext } from 'vue-draggable-next';

const props = withDefaults(
    defineProps<{
        data: AppTree[];
    }>(),
    {}
);
</script>
