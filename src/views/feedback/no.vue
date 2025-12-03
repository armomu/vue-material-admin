<template>
    <div class="no404">
        <liquid-glass>
            <div class="pa-8">
                <div class="title">Not found</div>
                <span>404</span>
            </div>
        </liquid-glass>
    </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.no404 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--content-height);
    text-align: center;
    .title {
        font-size: 50px;
    }
    span {
        font-size: 30px;
    }
}
</style>
