<template>
    <div class="babylon pl-4 pt-5">
        <div class="text-h4">Babylon.js 第三人称角色控制器，行走、跳跃、碰撞检测(有bug)</div>
        <div style="cursor: pointer" class="text-h4 pt-5" @click="to">Demo链接点这里</div>
    </div>
</template>
<script setup lang="ts">
const to = () => {
    window.open('http://chenhuajie.gitee.io/coconut');
};
</script>
<style scoped lang="scss">
.babylon {
    width: 100%;
    height: var(--content-height);
}
</style>
