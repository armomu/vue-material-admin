<template>
    <div ref="hatefulMouseDom" class="hateful-mouse" :style="styles"></div>
</template>
<script lang="ts" setup>
import { computed, shallowRef, onMounted, getCurrentInstance } from 'vue';
import { useAppStore } from '@/stores/useAppStore';

const mainStore = useAppStore();

const $curWidgets = getCurrentInstance();

const styles = computed(() => {
    return {
        display: mainStore.settings.hatefulMouseVisible ? 'block' : 'none',
    };
});

const hatefulMouseDom = shallowRef<HTMLElement>();

const stopDelay = 100; // 鼠标停止移动后多久恢复原大小 (毫秒)

// 圆的状态
let circleX = window.innerWidth / 2;
let circleY = window.innerHeight / 2;
let velocityX = 0;
let velocityY = 0;

let scale = 1;
let scaleVelocity = 0;
let targetScale = 1;

const minScale = 0.42; // 移动时的最小缩放比例
// 鼠标目标位置和移动状态
let targetX = circleX;
let targetY = circleY;
let isMouseover = false;
let movementTimeout: NodeJS.Timeout | undefined = undefined;

const event = (e: MouseEvent) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (hatefulMouseDom.value) {
        hatefulMouseDom.value.style.opacity = '1';
    }
};

const mouseoverEvent = () => {
    clearTimeout(movementTimeout);
    if (!isMouseover) {
        isMouseover = true;
        targetScale = minScale;
    }
};
const mouseoutEvent = () => {
    clearTimeout(movementTimeout);
    movementTimeout = setTimeout(() => {
        isMouseover = false;
        targetScale = 1;
    }, stopDelay);
};

const allDoms: Element[] = [];
const addEvent = () => {
    allDoms.forEach((div) => {
        div.removeEventListener('mouseover', mouseoverEvent);
        div.removeEventListener('mouseout', mouseoutEvent);
    });
    // 想要变小的元素
    const keys = ['v-selection-control', 'input', 'button', 'a'];
    keys.forEach((name) => {
        const all = document.querySelectorAll(name);
        for (let i = 0; i < all.length; i++) {
            all[i].addEventListener('mouseover', mouseoverEvent);
            all[i].addEventListener('mouseout', mouseoutEvent);
            allDoms.push(all[i]);
        }
    });
};

// 进入到下一个页面需要重新添加所有元素的 mouseover 和 mouseout 事件
$curWidgets?.proxy?.$router.afterEach(() => {
    setTimeout(addEvent, 2000);
});

let lastTime = performance.now();

function animate(currentTime = 0) {
    if (!currentTime) {
        return requestAnimationFrame(animate);
    }

    const deltaTime = currentTime - lastTime;
    const fps = 1000 / deltaTime;
    // 位置弹簧和阻尼参数
    const positionSpringConstant = (0.03 * fps) / 1000; // 弹簧常数 (k) - 越大越硬
    const positionDampingFactor = ((fps > 60 ? 0.5 : 0.861) * fps) / 1000; // 阻尼系数 (d) - 越小阻尼越大，越稳定

    // 缩放弹簧和阻尼参数
    const scaleSpringConstant = (0.1 * fps) / 1000;
    const scaleDampingFactor = (0.8 * fps) / 1000;

    const speed = positionSpringConstant * deltaTime;
    lastTime = currentTime;

    // 计算位置弹簧力
    const forceX = (targetX - circleX) * speed;
    const forceY = (targetY - circleY) * speed;

    // 更新位置速度（考虑阻尼）
    velocityX += forceX;
    velocityY += forceY;
    velocityX *= positionDampingFactor * deltaTime;
    velocityY *= positionDampingFactor * deltaTime;

    // 更新圆的位置
    circleX += velocityX;
    circleY += velocityY;

    // 计算缩放弹簧力
    const scaleForce = (targetScale - scale) * (scaleSpringConstant * deltaTime);

    // 更新缩放速度（考虑阻尼）
    scaleVelocity += scaleForce;
    scaleVelocity *= scaleDampingFactor * deltaTime;

    // 更新缩放比例
    scale += scaleVelocity;
    if (hatefulMouseDom.value) {
        hatefulMouseDom.value.style.left = `${circleX}px`;
        hatefulMouseDom.value.style.top = `${circleY}px`;
        hatefulMouseDom.value.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    requestAnimationFrame(animate);
}
onMounted(() => {
    document.addEventListener('mousemove', event);
    animate();
    setTimeout(addEvent, 1000);
});
</script>
<style lang="scss">
.hateful-mouse {
    position: fixed;
    left: -50px;
    top: -50px;
    width: 100px;
    height: 100px;
    z-index: 999999;
    border-radius: 50%;
    opacity: 0;
    transform-origin: center center; /* 设置缩放中心 */
    transform: translate(-50%, -50%) scale(1); /* 初始缩放 */
    pointer-events: none; /* 确保鼠标事件穿透圆到body */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    backdrop-filter: invert(1) grayscale(1);
}
</style>
