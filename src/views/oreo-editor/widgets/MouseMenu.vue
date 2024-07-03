<template>
    <v-card
        class="contextmenu"
        theme="dark"
        v-if="visible"
        :style="{
            left: left + 'px',
            top: top + 'px',
        }"
    >
        <div class="contextmenu_item" @click="actions.onMenuVisible">
            <div class="label">隐藏/显示</div>
            <div class="desc">Shift + Ctrl + H</div>
        </div>
        <div class="contextmenu_item" @click="actions.onMenuDelete">
            <div class="label">删除</div>
            <div class="desc">Delete</div>
        </div>
        <div class="contextmenu_item" @click="actions.onMenuLocked">
            <div class="label">锁定/解锁</div>
            <div class="desc">Shift + Ctrl + L</div>
        </div>
        <div class="contextmenu_item">
            <div class="label">复制</div>
            <div class="desc">Ctrl + C</div>
        </div>
        <div class="contextmenu_item">
            <div class="label">粘贴</div>
            <div class="desc">Ctrl + V</div>
        </div>
        <div class="contextmenu_item" @click="actions.onMenuGroup">
            <div class="label">组合</div>
            <div class="desc">Ctrl + G</div>
        </div>
        <div class="contextmenu_item" @click="actions.onMenuDisbandGroup">
            <div class="label">解除组合</div>
            <div class="desc">Shift + Ctrl + G</div>
        </div>
    </v-card>
</template>
<script lang="ts" setup>
import type { VirtualDom } from '../hooks/useOreoApp';
import type { MeneActions } from '../hooks/useMouseMenu';

withDefaults(
    defineProps<{
        data: VirtualDom[];
        visible: boolean;
        left: number;
        top: number;
        actions: MeneActions;
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
    padding: 4px;
    .contextmenu_item {
        line-height: 24px;
        height: 24px;
        padding: 0 12px;
        margin: 2px 0;
        font-size: 11px;
        width: 200px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        opacity: 0.8;
        &:hover {
            background-color: rgba(255, 255, 255, 0.15);
        }
    }
}
</style>
