<template>
    <div class="helper">
        <v-btn
            variant="text"
            icon="mdi-navigation-outline"
            size="x-small"
            style="transform: rotate(-35deg)"
            :color="oreoApp.mouseMode.value.boxSelect ? 'primary' : undefined"
            @click="oreoApp.onMouseMode('boxSelect')"
        />
        <v-btn
            variant="text"
            icon="mdi-card-outline"
            size="x-small"
            :color="oreoApp.mouseMode.value.draRact ? 'primary' : undefined"
            @click="oreoApp.onMouseMode('draRact')"
        />
        <v-btn
            variant="text"
            icon="mdi-format-color-text"
            size="x-small"
            :color="oreoApp.mouseMode.value.text ? 'primary' : undefined"
            @click="oreoApp.onMouseMode('text')"
        />
        <v-btn
            variant="text"
            icon="mdi-image-outline"
            size="x-small"
            :color="oreoApp.mouseMode.value.image ? 'primary' : undefined"
            @click="oreoApp.onFileRefClick"
        />
        <v-btn
            variant="text"
            icon="mdi-emoticon-outline"
            size="x-small"
            @click="oreoApp.onShowIconDialog"
        />
        <v-btn
            variant="text"
            icon="mdi-hand-back-left-outline"
            size="x-small"
            :color="oreoApp.mouseMode.value.hand ? 'primary' : undefined"
            @click="oreoApp.onMouseMode('hand')"
        />
        <v-btn
            variant="text"
            icon="mdi-code-json"
            size="x-small"
            @click="
                () => {
                    oreoApp.jsonViewerVisible.value = true;
                }
            "
        />
        <!-- <v-btn variant="text" icon="mdi-reply" size="x-small" />
                <v-btn variant="text" icon="mdi-share" size="x-small" />
                <v-btn variant="text" icon="mdi-check-bold" size="x-small" /> -->
    </div>
</template>
<script lang="ts" setup>
import type { VirtualDom } from '../hooks/useOreoApp';
import { cloneDeep } from 'lodash';

const emit = defineEmits(['draging', 'addimg']);

const props = withDefaults(
    defineProps<{
        data: VirtualDom[];
        action: string;
    }>(),
    {}
);

const onDragstart = (e: VirtualDom) => {
    emit('draging', cloneDeep(e));
};
</script>
