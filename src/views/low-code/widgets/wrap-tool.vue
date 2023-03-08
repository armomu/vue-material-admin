<template>
    <div style="width: 100px; height: 100px; background: red; position: relative" v-drag />
</template>
<script setup lang="ts">
const vDrag = {
    mounted(el: HTMLBaseElement) {
        const dragBox = el; // 获取当前元素
        dragBox.onmousedown = (e) => {
            // 算出鼠标相对元素的位置
            const disX = e.clientX - dragBox.offsetLeft;
            const disY = e.clientY - dragBox.offsetTop;
            document.onmousemove = (e) => {
                // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                const left = e.clientX - disX;
                const top = e.clientY - disY;
                // 移动当前元素
                dragBox.style.left = left + 'px';
                dragBox.style.top = top + 'px';
            };
            document.onmouseup = (e) => {
                // 鼠标弹起来的时候不再移动
                document.onmousemove = null;
                // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
                document.onmouseup = null;
            };
        };
    },
};
</script>
<style scoped lang="scss">
.toolbar404 {
    width: 100%;
    background: none;
}
.no404 {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    img {
        height: 60vh;
        width: auto;
    }
}
</style>
