<template>
    <div class="pixijs" ref="pixiDom"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted } from 'vue';
import * as PIXI from 'pixi.js';
const pixiDom = shallowRef<HTMLDivElement>();
const screen = { width: 1024, height: 580 };
let app: PIXI.Application;
onMounted(async () => {
    app = new PIXI.Application({ width: screen.width, height: screen.height });
    addSceneBackground();
    app.stage.eventMode = 'dynamic';
    pixiDom.value?.appendChild(app.view as any);
    addFishSprite();
    addCannon();
});
onUnmounted(() => {
    app?.destroy();
});
const addSceneBackground = () => {
    const background = PIXI.Sprite.from(import.meta.env.BASE_URL + '/fishcatcher/img/BG01.png');
    background.width = screen.width;
    background.height = screen.height;
    app.stage.addChild(background);
};
const addFishSprite = async (key = '5', num = 30) => {
    const fish = await loadAnimatedSprite(
        `/fishcatcher/fishimg/fish${key}/live/`,
        `fish${key}_live00`,
        num,
        true
    );
    fish.animationSpeed = 0.1;
    fish.play();
    fish.x = 0;
    fish.y = 0;
    // 假如随机的点位是 x: 800, y: 400;
    const endPoint = { x: 800, y: 400 };
    const radian = Math.atan2(endPoint.y - fish.y, endPoint.x - fish.x);
    fish.rotation = radian;
    app.ticker.add((delta) => {
        fish.x += (800 / 1200) * delta;
        fish.y += (400 / 1200) * delta;
    });
};
const addCannon = async () => {
    const cannon = await loadAnimatedSprite('/fishcatcher/cannon/cannon6/', 'cannon600', 7, true);
    // 设置原点在底部中间
    cannon.anchor.set(0.5, 1);
    cannon.scale.set(0.5);
    cannon.animationSpeed = 0.8;
    // 设置炮台在场景设置原点在底部中间
    cannon.x = screen.width / 2;
    cannon.y = screen.height;
    cannon.onLoop = () => {
        cannon.stop();
    };
    app.stage.on('pointermove', (event) => {
        const radian = Math.atan2(event.globalY - cannon.y, event.globalX - cannon.x);
        cannon.rotation = Math.PI / 2 - Math.abs(radian);
    });
    // 子弹精灵
    const bullet = await loadAnimatedSprite('/fishcatcher/bullet/bullet6/', 'bullet600', 9, true);
    let run = false;
    let speed_x = 0;
    let speed_y = 0;
    app.stage.on('pointerdown', async (event) => {
        cannon.play();
        bullet.position = cannon.position;
        bullet.rotation = cannon.rotation + 0;
        // 用点击的坐标和炮台的坐标获取直角的位置
        const c_x = event.globalX;
        const c_y = cannon.y;
        // 点击的点到直角点的距离
        const b2c_l = Math.abs(c_y - event.globalY);
        // 炮台的坐标到直角的坐标的距离
        let a2c_l = 0;
        if (event.globalX > bullet.x) {
            a2c_l = c_x - cannon.x;
        } else {
            a2c_l = cannon.x - c_x;
        }
        // 直角三角形斜边长
        const a2b_l = Math.abs(b2c_l + a2c_l);
        // 速度比例 = 直角边的轴 / 斜边长 * 增加多少速度
        const _speed_x = (a2c_l / a2b_l) * 30;
        const _speed_y = (b2c_l / a2b_l) * 30;
        speed_y = -_speed_y;
        // 判断为右上
        if (event.globalX > bullet.x && event.globalY < bullet.y) {
            speed_x = _speed_x;
        }
        // 判断为左上
        if (event.globalX < bullet.x && event.globalY < bullet.y) {
            speed_x = -_speed_x;
        }
        run = true;
    });
    app.ticker.add((delta) => {
        if (run) {
            bullet.x += speed_x * delta;
            bullet.y += speed_y * delta;
        }
        if (bullet.y < 0) {
            run = false;
        }
    });
};
/** * 加载本地动画精灵图集
 * * @param localPath 本地路径 import.meta.env.BASE_URL + `${localPath}${name}.png
 * * @param fileName 文件名称
 * * @param num 图集数量
 * * @param add 是否添加到场景
 * * @param mcswspj 命名是否是0001格式，默认true, 否则是
 * */
const loadAnimatedSprite = async (
    localPath: string,
    fileName: string,
    num: number,
    add = false,
    mcswspj = true
): Promise<PIXI.AnimatedSprite> => {
    const textures: PIXI.Texture[] = [];
    for (let i = 0; i < num; i++) {
        let name = '';
        if (mcswspj) {
            name = i < 9 ? `${fileName}0${i + 1}` : `${fileName}${i + 1}`;
        } else {
            name = `${fileName}${i + 1}`;
        }
        const res = await PIXI.Texture.from(import.meta.env.BASE_URL + `${localPath}${name}.png`);
        textures.push(res);
    }
    const sprite = new PIXI.AnimatedSprite(textures);
    sprite.anchor.set(0.5);
    sprite.zIndex = 1;
    if (add) {
        app.stage.addChild(sprite);
    }
    return Promise.resolve(sprite);
};
</script>
<style scoped lang="scss">
.pixijs {
    position: relative;
    min-height: var(--content-height);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
}
</style>
