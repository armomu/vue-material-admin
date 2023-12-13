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
                <span class="text-h1">{{ airData.temperature }}&deg;</span
                ><span class="text-h3">c</span>
            </div>
            <div>Centigrade</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted, reactive } from 'vue';
import { Application, Graphics, Color } from 'pixi.js';
const pixiDom = shallowRef<HTMLDivElement>();
const screen = {
    width: 340,
    height: 320,
};
const airData = reactive({
    temperature: 16,
    cursorPointer: false,
});
let app!: Application;
onMounted(async () => {
    const _app = new Application({
        width: screen.width,
        height: screen.height,
        antialias: true, // 开启抗锯齿
        // background: new Color('ffffff'),
        background: new Color('212121'),
    });
    app = _app;
    // Enable interactivity!
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    pixiDom.value?.appendChild(app.view as any);

    const centerX = screen.width / 2;
    const centerY = screen.height / 2 + 20;
    const radius = 140;
    const graphics = new Graphics();
    graphics.lineStyle(22, new Color('121212'), 1, 1);
    // arc(cx, cy, 半径，开始点的角度，结束点的角度)
    graphics.arc(centerX, centerY, radius - 11, Math.PI - Math.PI / 4, Math.PI * 2 + Math.PI / 4);
    graphics.endFill();
    app.stage.addChild(graphics);

    graphics.lineStyle(0, new Color('121212'), 1, 1);
    graphics.beginFill(new Color('7f85f9'));
    graphics.endFill();

    const startX = centerX + radius * Math.cos(Math.PI - Math.PI / 4); // x 弧度的余弦值
    const startY = centerY + radius * Math.sin(Math.PI - Math.PI / 4); // y 弧度的正弦值

    // 开始修饰圆点
    graphics.beginFill(new Color('7f85f9'));
    graphics.drawCircle(startX, startY, 11);
    graphics.endFill();
    // 结束修饰圆点
    graphics.beginFill(new Color('121212'));
    graphics.drawCircle(
        centerX + radius * -Math.cos(Math.PI - Math.PI / 4),
        centerY + radius * -Math.cos(Math.PI - Math.PI / 4),
        11
    );
    graphics.endFill();

    const temperaturegraphics = new Graphics();
    app.stage.addChild(temperaturegraphics);

    // 控制器圆点
    const smallCircle = new Graphics();

    const smallCircleRadius = 11;
    smallCircle.drawRect(
        smallCircleRadius / 2,
        smallCircleRadius / 2,
        smallCircleRadius,
        smallCircleRadius
    );

    //
    smallCircle.lineStyle(5, new Color('b4b8fc'), 1, 1);
    smallCircle.beginFill(new Color('7f85f9'));
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
    app.stage.on('pointermove', (e) => {
        if (dragging) {
            const position = e.global;
            const dx = position.x - centerX;
            const dy = position.y - centerY;

            const angle = Math.atan2(dy, dx);
            const y = centerY + radius * Math.sin(angle);
            if (y > startY) return;
            smallCircle.x = centerX + radius * Math.cos(angle);
            smallCircle.y = y;
            temperaturegraphics.clear();
            temperaturegraphics.lineStyle(22, new Color('7f85f9'), 1, 1);
            temperaturegraphics.arc(centerX, centerY, radius - 11, Math.PI - Math.PI / 4, angle);
            temperaturegraphics.endFill();
            const degrees = angle * (180 / Math.PI);
            let res = 0;
            if (degrees > 90 && degrees <= 180) {
                res = degrees - 135;
                if (degrees === 0) {
                    res = 45;
                }
            }
            if (degrees < 0) {
                res = degrees + 180 + 45;
            }
            if (!res && degrees < 46) {
                res = 180 + 45 + degrees;
            }
            airData.temperature = 16 + parseInt((res / 12.27).toFixed());
        }
    });
    app.stage.on('pointerup', () => {
        dragging = false;
    });
});
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
