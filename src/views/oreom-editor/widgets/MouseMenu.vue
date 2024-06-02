<template>
    <v-card
        class="contextmenu"
        v-if="contextmenu.visible"
        :style="{
            left: contextmenu.left + 'px',
            top: contextmenu.top + 'px',
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
        data?: Ref<VirtualDom>;
    }>(),
    {}
);
</script>
