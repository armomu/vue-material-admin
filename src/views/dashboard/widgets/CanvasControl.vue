<template>
    <div
        class="air_canvas_wrap"
        ref="pixiDom"
        :class="{
            cursorPointer: airData.cursorPointer,
        }"
    >
        <div class="deg">
            <div>
                <span class="text-h1 pl-4">{{ airVal }}&deg;</span>
            </div>
            <div>Centigrade</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted, reactive, watch, computed } from 'vue';
import { Application, Graphics, Color } from 'pixi.js';
import { useMainStore } from '@/stores/useMainStore';
// import * as TWEEN from '@tweenjs/tween.js';

const mainStore = useMainStore();

const props = withDefaults(
    defineProps<{
        value: number;
    }>(),
    {}
);

const emits = defineEmits<{
    change: [id: number];
    'update:value': [val: number];
}>();

const dark = computed(() => {
    return mainStore.theme === 'dark';
});

const primary_ = computed(() => {
    return mainStore.settings.primary;
});

// 这里不知道咋写了，父级组件更新数据或者这个组件更新数据，都会同时触发get或者watch
// 同时触发了就意味着无法检测到这个值的变化是当前组件触发的还是父级组件触发的
// 所以这里用一个变量来存储当前组件的值，如果这个值和当前组件的值不一样，就说明是父级组件触发的
let keepOld = 16;
const airVal = computed({
    get: () => {
        let val = props.value;
        if (val < 16) {
            val = 16;
        }
        if (val > 38) {
            val = 38;
        }
        if (keepOld !== val) {
            airValToAngle(val);
        }
        return val;
    },
    set: (val: number) => {
        keepOld = val;
        emits('update:value', val);
    },
});
const pixiDom = shallowRef<HTMLDivElement>();
const screen = {
    width: 340,
    height: 320,
    background: 'ffffff',
    d_color: '121212', // 底部圆圈颜色
    color: new Color(mainStore.settings.primary),
};
const airData = reactive({
    temperature: 16,
    cursorPointer: false,
});

const centerX = screen.width / 2;
const centerY = screen.height / 2 + 20;
const radius = 140;
let app: Application;
let temperatureGraphics = new Graphics();
// 控制器圆点
let smallCircle = new Graphics();

function airValToAngle(_airVal: number) {
    // 根据温度值画出圆对应的值
    const val = (_airVal - 16) * 12.27;
    let angleVal = 0;
    if (val > 45 && val < 225) {
        // 28 -1.3507322590952495 'angle' -77.391257698329
        // 对应下方的角度
        // if (degrees < 0) {
        //      res = degrees + 180 + 45;
        // }
        const degrees = 225 - val;
        angleVal = -degrees * (Math.PI / 180);
    }

    if (val > 0 && val < 46) {
        // 19 2.898145169667197 'angle' 166.0514866381563
        const degrees = 135 + val;
        angleVal = degrees * (Math.PI / 180);
    }
    if (val > 225) {
        // 37 angle 0.5222393899400497 degrees 29.92211293905171
        const degrees = val - 225 + 0.8;
        angleVal = degrees * (Math.PI / 180);
    }
    setTemperature(angleVal);
    return angleVal;
}

// let tween: TWEEN.Tween<{ angle: number }>;
// 因为这个圆圈不是线性的值 所以动画过渡就不搞了
// 也不是不能搞，就是太麻烦了 艹
// function setAngleAnmi() {
//     if (keepOld === airVal.value) {
//         return;
//     }
//     const oldAngle = airValToAngle(keepOld);
//     const curAngle = airValToAngle(airVal.value);
//     console.log('oldAngle', oldAngle, 'curAngle', curAngle);
//     tween = new TWEEN.Tween({ angle: oldAngle })
//         .to({ angle: curAngle }, 500)
//         .easing(TWEEN.Easing.Quadratic.Out)
//         .onUpdate((obj) => {
//             setTemperature(obj.angle);
//         })
//         .start();
// }
// function animate(time: number) {
//     tween?.update(time);
//     requestAnimationFrame(animate);
// }
// requestAnimationFrame(animate);

// 画出对应值的圆
const setTemperature = (_angleVal: number) => {
    temperatureGraphics.clear();
    temperatureGraphics.lineStyle(22, screen.color, 1, 1);
    temperatureGraphics.arc(centerX, centerY, radius - 11, Math.PI - Math.PI / 4, _angleVal);
    temperatureGraphics.endFill();
    const y = centerY + radius * Math.sin(_angleVal);
    smallCircle.x = centerX + radius * Math.cos(_angleVal);
    smallCircle.y = y;
};

const init = async () => {
    const nodes = pixiDom.value?.childNodes;
    if (nodes && (nodes?.length || 0) > 1) {
        app?.destroy();
        pixiDom.value?.removeChild(nodes[nodes?.length - 1]);
        temperatureGraphics = new Graphics();
        smallCircle = new Graphics();
    }
    screen.color = new Color(mainStore.settings.primary);
    if (dark.value) {
        screen.background = '212121';
        screen.d_color = '121212';
    } else {
        screen.background = 'ffffff';
        screen.d_color = 'eef2f6';
    }

    const _app = new Application({
        width: screen.width,
        height: screen.height,
        antialias: true, // 开启抗锯齿
        background: new Color(screen.background),
    });
    app = _app;
    // Enable interactivity!
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    pixiDom.value?.appendChild(app.view as any);

    const graphics = new Graphics();
    graphics.lineStyle(22, new Color(screen.d_color), 1, 1);
    // arc(cx, cy, 半径，开始点的角度，结束点的角度)
    graphics.arc(centerX, centerY, radius - 11, Math.PI - Math.PI / 4, Math.PI * 2 + Math.PI / 4);
    graphics.endFill();
    app.stage.addChild(graphics);

    graphics.lineStyle(0, new Color(screen.d_color), 1, 1);
    graphics.beginFill(screen.color);
    graphics.endFill();

    const startX = centerX + radius * Math.cos(Math.PI - Math.PI / 4); // x 弧度的余弦值
    const startY = centerY + radius * Math.sin(Math.PI - Math.PI / 4); // y 弧度的正弦值

    // 开始修饰圆点
    graphics.beginFill(screen.color);
    graphics.drawCircle(startX, startY, 11);
    graphics.endFill();
    // 结束修饰圆点
    graphics.beginFill(new Color(screen.d_color));
    graphics.drawCircle(
        centerX + radius * -Math.cos(Math.PI - Math.PI / 4),
        centerY + radius * -Math.cos(Math.PI - Math.PI / 4),
        11
    );
    graphics.endFill();

    app.stage.addChild(temperatureGraphics);

    const smallCircleRadius = 11;
    smallCircle.drawRect(
        smallCircleRadius / 2,
        smallCircleRadius / 2,
        smallCircleRadius,
        smallCircleRadius
    );
    //
    smallCircle.lineStyle(5, screen.color, 0.7, 1);
    smallCircle.beginFill(screen.color);
    smallCircle.drawCircle(0, 0, smallCircleRadius);
    smallCircle.endFill();
    // 控制器圆点位置
    smallCircle.position.x = startX;
    smallCircle.position.y = startY;
    app.stage.addChild(smallCircle);

    let dragging = false;
    smallCircle.eventMode = 'static';
    smallCircle.on('pointerdown', () => {
        dragging = true;
    });
    smallCircle.on('pointerenter', () => {
        airData.cursorPointer = true;
    });
    smallCircle.on('pointerleave', () => {
        airData.cursorPointer = false;
    });
    // airValToAngle(airVal.value);
    airValToAngle(airVal.value);
    app.stage.on('pointermove', (e) => {
        if (dragging) {
            const position = e.global;
            const dx = position.x - centerX;
            const dy = position.y - centerY;
            // 得到点击控制点于圆心的角度
            const angle = Math.atan2(dy, dx);

            const y = centerY + radius * Math.sin(angle);
            if (y > startY) return;
            setTemperature(angle);
            const degrees = angle * (180 / Math.PI);
            // 转换成视觉从真实角度 视觉角度从左下角135度(js度数开始点为顺时针3点钟位置)开始 到右下角45度结束
            // 360 - 90 = 270度 温度区间22度 270 / 22 = 12.27
            // js是顺时针从0度3点钟位置开始，我把它转换成8点钟位置开始，8点钟位置是js的135度
            let res = 0;
            if (degrees === 0) {
                res = 45;
            }
            // 滑动圆点左下方的角度
            if (degrees > 90 && degrees <= 180) {
                res = degrees - 135;
            }
            // 上半圆 上半圆角度是负数所以视觉真实角度为 -degrees + 180 + 45
            if (degrees < 0) {
                res = degrees + 180 + 45;
            }
            // 右下角 满的180度上半圆加左下角45度
            if (!res && degrees < 46) {
                res = 180 + 45 + degrees;
            }
            airVal.value = 16 + parseInt((res / 12.27).toFixed());
        }
    });
    app.stage.on('pointerup', () => {
        dragging = false;
    });
};

watch(dark, init);
watch(primary_, init);
onMounted(init);
onUnmounted(() => {
    app?.destroy();
});
</script>
<style scoped lang="scss">
.air_canvas_wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 300px;
    &.cursorPointer {
        cursor: pointer;
    }
    .deg {
        width: 340px;
        text-align: center;
        position: absolute;
        z-index: 2;
        top: 120px;
        pointer-events: none;
    }
}
</style>
@/stores/useMainStore
