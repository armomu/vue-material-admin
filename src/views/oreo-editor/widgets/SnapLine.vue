<template>
    <div>
        <span
            class="ref-line v-line"
            v-for="item in props.data.value.vLine"
            :key="item.id"
            v-show="item.display"
            :style="{
                left: item.position,
                top: item.origin,
                height: item.lineLength,
            }"
        />
        <span
            class="ref-line h-line"
            v-for="item in props.data.value.hLine"
            :key="item.id"
            v-show="item.display"
            :style="{
                top: item.position,
                left: item.origin,
                width: item.lineLength,
            }"
        />
    </div>
</template>
<script lang="ts" setup>
import { type Ref } from 'vue';
import type { SnapLine } from '../hooks/useSnapLine';
const props = withDefaults(
    defineProps<{
        data: Ref<{
            vLine: SnapLine[];
            hLine: SnapLine[];
        }>;
    }>(),
    {}
);
</script>
