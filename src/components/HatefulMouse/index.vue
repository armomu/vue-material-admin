<template>
    <div ref="hatefulMouseDom" class="hateful-mouse" :style="styles"></div>
</template>
<script lang="ts" setup>
import { computed, shallowRef, onMounted } from 'vue';
import { useAppStore } from '@/stores/useAppStore';
const mainStore = useAppStore();

const styles = computed(() => {
    return {
        display: mainStore.settings.hatefulMouseVisible ? 'block' : 'none',
    };
});

const hatefulMouseDom = shallowRef<HTMLElement>();

// 位置弹簧和阻尼参数
const positionSpringConstant = 0.03; // 弹簧常数 (k) - 越大越硬
const positionDampingFactor = 0.85; // 阻尼系数 (d) - 越小阻尼越大，越稳定

// 缩放弹簧和阻尼参数
const scaleSpringConstant = 0.1;
const scaleDampingFactor = 0.8;
const minScale = 0.7; // 移动时的最小缩放比例
const stopDelay = 100; // 鼠标停止移动后多久恢复原大小 (毫秒)

// 圆的状态
let circleX = window.innerWidth / 2;
let circleY = window.innerHeight / 2;
let velocityX = 0;
let velocityY = 0;

let scale = 1;
let scaleVelocity = 0;
let targetScale = 1;

// 鼠标目标位置和移动状态
let targetX = circleX;
let targetY = circleY;
let isMoving = false;
let movementTimeout: NodeJS.Timeout | undefined = undefined;

const event = (e: MouseEvent) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!isMoving) {
        isMoving = true;
        targetScale = minScale;
    }

    clearTimeout(movementTimeout);
    movementTimeout = setTimeout(() => {
        isMoving = false;
        targetScale = 1;
    }, stopDelay);
};

function animate() {
    // 计算位置弹簧力
    const forceX = (targetX - circleX) * positionSpringConstant;
    const forceY = (targetY - circleY) * positionSpringConstant;

    // 更新位置速度（考虑阻尼）
    velocityX += forceX;
    velocityY += forceY;
    velocityX *= positionDampingFactor;
    velocityY *= positionDampingFactor;

    // 更新圆的位置
    circleX += velocityX;
    circleY += velocityY;

    // 计算缩放弹簧力
    const scaleForce = (targetScale - scale) * scaleSpringConstant;

    // 更新缩放速度（考虑阻尼）
    scaleVelocity += scaleForce;
    scaleVelocity *= scaleDampingFactor;

    // 更新缩放比例
    scale += scaleVelocity;
    // 应用位置和缩放到DOM元素
    if (hatefulMouseDom.value) {
        hatefulMouseDom.value.style.left = `${circleX}px`;
        hatefulMouseDom.value.style.top = `${circleY}px`;
        hatefulMouseDom.value.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    // 请求下一帧动画
    requestAnimationFrame(animate);
}

onMounted(() => {
    document.addEventListener('mousemove', event);
    animate();
});
</script>
<style lang="scss">
.hateful-mouse {
    position: fixed;
    width: 100px;
    height: 100px;
    z-index: 999999;
    border-radius: 50%;
    transform-origin: center center; /* 设置缩放中心 */
    transform: translate(-50%, -50%) scale(1); /* 初始缩放 */
    pointer-events: none; /* 确保鼠标事件穿透圆到body */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    backdrop-filter: invert(1) grayscale(1);
}
</style>
