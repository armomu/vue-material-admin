<template>
    <v-card title="Air Conditioner" class="elevation-0 air_conditioner">
        <PixiCanvas />
        <div class="d-flex jsb mt-5 btn_tool" style="width: 350px; margin: 0 auto">
            <div class="item">
                <v-btn variant="tonal" color="primary" rounded="pill" size="large"
                    ><v-icon icon="mdi-snowflake"
                /></v-btn>
                <div class="btnname mt-2">Auto Mode</div>
                <div class="btnnv">Power On</div>
            </div>
            <div class="item">
                <v-btn variant="tonal" rounded="pill" size="large">
                    <v-icon icon="mdi-weather-dust" />
                </v-btn>
                <div class="btnname mt-2">Fan Speed</div>
                <div class="btnnv">2 Level • Off</div>
            </div>
            <div class="item">
                <v-btn variant="tonal" rounded="pill" size="large">
                    <v-icon icon="mdi-clock-outline" />
                </v-btn>
                <div class="btnname mt-2">Timer</div>
                <div class="btnnv">none</div>
            </div>
        </div>
    </v-card>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted, reactive } from 'vue';
import { Application, Graphics, Color } from 'pixi.js';
import PixiCanvas from './CanvasControl.vue';
// import SvgControl from './SvgControl.vue';
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
    graphics.lineStyle(26, new Color('121212'), 1, 1);
    // arc(cx, cy, 半径，开始点的角度，结束点的角度)
    graphics.arc(centerX, centerY, radius - 13, Math.PI - Math.PI / 4, Math.PI * 2 + Math.PI / 4);
    graphics.endFill();
    app.stage.addChild(graphics);

    graphics.lineStyle(0, new Color('121212'), 1, 1);
    graphics.beginFill(new Color('7f85f9'));
    graphics.endFill();

    const startX = centerX + radius * Math.cos(Math.PI - Math.PI / 4); // x 弧度的余弦值
    const startY = centerY + radius * Math.sin(Math.PI - Math.PI / 4); // y 弧度的正弦值
    // 开始修饰圆点
    graphics.beginFill(new Color('121212'));
    graphics.drawCircle(startX, startY, 13);
    graphics.endFill();
    // 结束修饰圆点
    graphics.beginFill(new Color('121212'));
    graphics.drawCircle(
        centerX + radius * -Math.cos(Math.PI - Math.PI / 4),
        centerY + radius * -Math.cos(Math.PI - Math.PI / 4),
        13
    );
    graphics.endFill();

    const smallCircle = new Graphics();

    const smallCircleRadius = 14;
    smallCircle.drawRect(
        smallCircleRadius / 2,
        smallCircleRadius / 2,
        smallCircleRadius,
        smallCircleRadius
    );

    smallCircle.lineStyle(5, new Color('b4b8fc'), 1, 1);
    smallCircle.beginFill(new Color('7f85f9'));
    smallCircle.drawCircle(0, 0, smallCircleRadius);
    smallCircle.endFill();

    smallCircle.position.x = startX;
    smallCircle.position.y = startY;
    app.stage.addChild(smallCircle);

    let dragging = false;
    smallCircle.eventMode = 'static';
    smallCircle.on('pointerdown', (e) => {
        dragging = true;
    });
    smallCircle.on('pointerenter', (e) => {
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
.air_conditioner {
    .btn_tool {
        padding-bottom: 14px;
        .item {
            text-align: center;
            .btnname {
                font-weight: 700;
            }
            .btnnv {
                color: #999;
                font-size: 12px;
            }
        }
    }
}
</style>
