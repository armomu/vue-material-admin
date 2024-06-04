<template>
    <v-card
        class="contextmenu"
        v-if="visible"
        :style="{
            left: left + 'px',
            top: top + 'px',
        }"
    >
        <div class="layout_min_wrap">
            <div class="layout_min_item">隐藏</div>
            <div class="layout_min_item">删除</div>
            <div class="layout_min_item">下一层</div>
            <div class="layout_min_item">上一层</div>
        </div>
    </v-card>
</template>
<script lang="ts" setup>
import { computed, type Ref } from 'vue';
import type { VirtualDom } from '../hooks/useMain';

withDefaults(
    defineProps<{
        visible: boolean;
        left: number;
        top: number;
    }>(),
    {}
);
</script>
<style lang="scss">
.contextmenu {
    position: fixed;
    left: 200px;
    top: 300px;
    z-index: 999;
    .layout_min_item {
        line-height: 36px;
        height: 36px;
        padding: 0 16px;
        cursor: pointer;
        &:hover {
            background-color: var(--grid);
        }
    }
}
</style>
