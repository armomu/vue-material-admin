<template>
    <VueDraggableNext
        :list="data"
        tag="div"
        class="dragArea"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="onClone"
    >
        <v-btn
            v-for="item in props.data"
            :key="item.id"
            variant="text"
            :icon="item.content.icon"
            size="small"
        >
            <v-icon :icon="item.content.icon"></v-icon>
            <v-tooltip activator="parent" location="end">{{ item.type }}</v-tooltip>
        </v-btn>
        <!-- <div v-for="item in props.data" :key="item.id" class="item">
            <v-icon :icon="item.content.icon"></v-icon>
            <v-tooltip activator="parent" location="end">{{ item.type }}</v-tooltip>
        </div> -->
    </VueDraggableNext>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { AppTree } from '../hooks/useMain';
import { VueDraggableNext } from 'vue-draggable-next';
import { beaseTree } from '../hooks/useMain';
import { cloneDeep } from 'lodash';
const props = withDefaults(
    defineProps<{
        data: AppTree[];
    }>(),
    {}
);
const onClone = (a: AppTree) => {
    return {
        ...cloneDeep(a),
        id: new Date().getTime(),
    };
};
</script>
