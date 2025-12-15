<template>
    <div class="thermostat">
        <svg
            ref="svgRef"
            shape-rendering="crispEdges"
            class="thermostat-svg"
            :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
        >
            <defs>
                <linearGradient id="active-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color: #4dd0e1; stop-opacity: 1" />
                    <stop offset="100%" style="stop-color: #4db6ac; stop-opacity: 1" />
                </linearGradient>
            </defs>
            <path
                :d="backgroundArcPath"
                :stroke="style.inactiveStroke"
                :stroke-width="style.strokeWidth"
                stroke-linecap="round"
                fill="none"
                style="pointer-events: none"
            />

            <path
                :d="backgroundInnerArcPath"
                stroke="#dcdcdc"
                stroke-width="1"
                stroke-linecap="round"
                fill="none"
                style="pointer-events: none"
            />

            <path
                :d="activeArcPath"
                stroke="url(#active-gradient)"
                :stroke-width="style.strokeWidth"
                stroke-linecap="round"
                fill="none"
                style="pointer-events: none"
            />
            <circle
                :cx="handlePosition.x"
                :cy="handlePosition.y"
                :r="style.handleRadius"
                :fill="style.handleFill"
                stroke="#e0e0e0"
                :stroke-width="style.handleStrokeWidth + 4"
                style="cursor: pointer; pointer-events: all"
            />

            <circle
                :cx="handlePosition.x"
                :cy="handlePosition.y"
                :r="style.handleRadius"
                :fill="style.handleFill"
                :stroke="style.handleStroke"
                :stroke-width="style.handleStrokeWidth"
                style="cursor: pointer; pointer-events: all"
                @mousedown.prevent="startDrag"
                @touchstart.prevent="startDrag"
            />
        </svg>

        <div class="thermostat-ui">
            <div class="label-min">{{ min }}°</div>
            <div class="label-max">{{ max }}°</div>
            <div class="temperature-display">{{ Math.round(modelValue) }}°</div>
            <!-- <div class="control-button minus" @click="decrement">
                <span>-</span>
            </div>
            <div class="control-button plus" @click="increment">
                <span>+</span>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';

// --- Props, Emits, Styles, and Core Computeds (与上一版相同) ---
const props = withDefaults(
    defineProps<{
        modelValue: number;
        min?: number;
        max?: number;
    }>(),
    {
        min: 15,
        max: 32,
    }
);
const emit = defineEmits<{
    'update:modelValue': [value: number];
}>();
const viewBoxSize = 200;
const center = viewBoxSize / 2;
const radius = 75;
const startAngleDeg = -135;
const endAngleDeg = 135;
const totalAngleDeg = endAngleDeg - startAngleDeg;
const style = {
    strokeWidth: 8,
    inactiveStroke: '#e0e0e0',
    handleRadius: 8,
    handleFill: '#ffffff',
    handleStroke: '#e0e0e0',
    handleStrokeWidth: 1,
};
const svgRef = ref<SVGElement | null>(null);
const isDragging = ref(false);
const degreesToRadians = (deg: number) => deg * (Math.PI / 180);
const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = degreesToRadians(angleInDegrees - 90);
    return { x: centerX + r * Math.cos(angleInRadians), y: centerY + r * Math.sin(angleInRadians) };
};
const valueToAngle = computed(() => {
    const percentage = (props.modelValue - props.min) / (props.max - props.min);
    const clampedPercentage = Math.max(0, Math.min(1, percentage));
    return startAngleDeg + clampedPercentage * totalAngleDeg;
});
const describeArc = (x: number, y: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};
const activeArcPath = computed(() =>
    describeArc(center, center, radius, startAngleDeg, valueToAngle.value)
);
const backgroundArcPath = computed(() =>
    describeArc(center, center, radius, startAngleDeg, endAngleDeg)
);
const backgroundInnerArcPath = computed(() =>
    describeArc(center, center, radius - 8, startAngleDeg, endAngleDeg)
);
const handlePosition = computed(() => polarToCartesian(center, center, radius, valueToAngle.value));
const updateValueFromCoordinates = (clientX: number, clientY: number) => {
    if (!svgRef.value) return;
    const { left, top, width, height } = svgRef.value.getBoundingClientRect();
    const svgX = clientX - left;
    const svgY = clientY - top;
    const viewBoxX = (svgX / width) * viewBoxSize;
    const viewBoxY = (svgY / height) * viewBoxSize;
    const deltaX = viewBoxX - center;
    const deltaY = viewBoxY - center;

    // 计算相对于中心的角度
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    // 调整角度以匹配 startAngleDeg (-135°) 到 endAngleDeg (135°)
    // 确保角度在 -135° 到 135° 的范围内
    if (angle > 180) {
        angle -= 360; // 将角度从 [180, 360] 转换为 [-180, 0]
    }

    // 钳制角度到 startAngleDeg 和 endAngleDeg
    const clampedAngle = Math.max(startAngleDeg, Math.min(endAngleDeg, angle));

    // 计算新的温度值
    const percent = (clampedAngle - startAngleDeg) / totalAngleDeg;
    const newValue = Math.round(props.min + percent * (props.max - props.min));

    // 仅在值发生变化时触发更新
    if (newValue !== props.modelValue) {
        emit('update:modelValue', newValue);
    }
};
const increment = () => emit('update:modelValue', Math.min(props.max, props.modelValue + 1));
const decrement = () => emit('update:modelValue', Math.max(props.min, props.modelValue - 1));

// --- BUG FIX: 重构事件处理逻辑 ---

const onDrag = (event: MouseEvent | TouchEvent) => {
    // 统一处理 mousemove 和 touchmove
    const touch = (event as TouchEvent).touches?.[0];
    const clientX = touch ? touch.clientX : (event as MouseEvent).clientX;
    const clientY = touch ? touch.clientY : (event as MouseEvent).clientY;
    updateValueFromCoordinates(clientX, clientY);
};

const stopDrag = () => {
    isDragging.value = false;
    // 从 window 移除监听器，以停止监听并防止内存泄漏
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('touchend', stopDrag);
};

const startDrag = (event: MouseEvent | TouchEvent) => {
    isDragging.value = true;
    // 将 move 和 up/end 事件监听器添加到 window
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', onDrag, { passive: true });
    window.addEventListener('touchend', stopDrag);
};

// BUG FIX: 增加 onUnmounted 钩子，确保组件卸载时清除所有 window 监听器
onUnmounted(() => {
    stopDrag();
});
</script>

<style lang="scss" scoped>
/* 样式与上一版完全相同 */
.thermostat {
    position: relative;
    width: 300px;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    touch-action: none;
    margin: 20px auto 0 auto;
    .thermostat-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 276px;
        z-index: 1;
    }
    .thermostat-ui {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
        pointer-events: none;
        .temperature-display {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 70px;
            font-weight: bold;
        }
        .control-button {
            position: absolute;
            width: 40px;
            height: 40px;
            backdrop-filter: blur(3px);
            background: linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.1));
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            cursor: pointer;
            pointer-events: all;
            transition: background-color 0.2s;
        }
        .minus {
            bottom: 0;
            left: 20%;
        }
        .plus {
            bottom: 0;
            right: 20%;
        }
        .label-min,
        .label-max {
            position: absolute;
            font-size: 16px;
        }
        .label-min {
            bottom: 20%;
            left: 10%;
        }
        .label-max {
            bottom: 20%;
            right: 10%;
        }
    }
}
</style>
