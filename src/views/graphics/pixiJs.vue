<template>
    <div class="pixijs" ref="pixiDom"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted } from 'vue';
import * as PIXI from 'pixi.js';
import { Button } from '@pixi/ui';

const pixiDom = shallowRef<HTMLDivElement>();
const init = async () => {
    const app = new PIXI.Application({
        width: 1024,
        height: 580,
    });
    pixiDom.value?.appendChild(app.view as any);
    addSceneBackground(app);
    await loadFishFlock(app);
    await addBottomBar(app);
    loadAnimatedSprite('/fishcatcher/cannon/cannon6/', 'cannon600', 7, app).then((sprite) => {
        sprite.animationSpeed = 0.5;
        sprite.x = app.screen.width / 2 + 42;
        sprite.y = app.screen.height;
        sprite.anchor.set(0.5, 1);
        sprite.scale.set(0.7);
        // app.stage.interactive = true;
        app.stage.eventMode = 'dynamic';
        app.stage.addChild(sprite);
        app.stage.on('pointermove', (event) => {
            const radian = Math.atan2(event.globalY - sprite.y, event.globalX - sprite.x);
            sprite.rotation = Math.PI / 2 - Math.abs(radian);
        });
        app.stage.on('pointerdown', () => {
            sprite.play();
        });
        sprite.onLoop = () => {
            // 停止动画
            sprite.stop();
        };
    });
    return Promise.resolve(app);
};

const addBottomBar = async (app: PIXI.Application) => {
    const bottomBar = loadSprite('/fishcatcher/img/bottom-bar.png', app);
    bottomBar.y = 580 - 34;
    const button = new Button();

    button.onPress.connect(() => console.log('Button pressed!'));
    return Promise.resolve();
};
const addSceneBackground = (app: PIXI.Application) => {
    const background = PIXI.Sprite.from(import.meta.env.BASE_URL + '/fishcatcher/img/BG01.png');
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);
};

const loadSprite = (
    filePath: string,
    app: PIXI.Application,
    add = true,
    x = app.screen.width / 2,
    y = app.screen.height / 2,
    anchor = 0.5
) => {
    const sprite = PIXI.Sprite.from(import.meta.env.BASE_URL + filePath);
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.set(anchor);
    add && app.stage.addChild(sprite);
    return sprite;
};

const loadFishFlock = async (app: PIXI.Application) => {
    const container = new PIXI.Container();
    app.stage.addChild(container);
    const arr: PIXI.AnimatedSprite[] = [];
    const fish = await loadAnimatedSprite(
        '/fishcatcher/fishimg/fish5/live/',
        'fish5_live00',
        30,
        app
    );
    const numCopies = 3;
    for (let i = 0; i < numCopies; i++) {
        const sprite_ = new PIXI.AnimatedSprite(fish.textures);
        sprite_.anchor.set(0.5);
        sprite_.play();
        sprite_.position.set((i % 5) * 100, 0);
        sprite_.animationSpeed = 0.08;
        container.addChild(sprite_);
    }
    container.y = app.screen.height / 2;
    container.x = 30;
    // 精灵原始位置为A点，随机点击点位置为B点，AB两点直角交叉点为C点
    const data = {
        b_x: 0,
        b_y: 0,
        a2b_l: 0, // 边的长度
        c_x: 0,
        c_y: 0,
        b2c_l: 0, //
        a2c_l: 0, // a到c的长度,
        speed_x: 0,
        speed_y: 0,
        direction: 0,
    };
    app.ticker.add((delta) => {
        switch (data.direction) {
            case Direction.LeftUp:
                container.x -= data.speed_x * delta;
                container.y -= data.speed_y * delta;
                break;
            case Direction.LeftDown:
                container.x -= data.speed_x * delta;
                container.y += data.speed_y * delta;
                break;
            case Direction.RightUp:
                container.x += data.speed_x * delta;
                container.y -= data.speed_y * delta;
                break;
            case Direction.RightDown:
                container.x += data.speed_x * delta;
                container.y += data.speed_y * delta;
                break;
        }
    });
    app.stage.on('pointerdown', (event) => {
        const radian = Math.atan2(event.globalY - container.y, event.globalX - container.x);
        container.rotation = radian;

        // 鼠标点击坐标
        data.b_x = event.globalX;
        data.b_y = event.globalY;
        // c点坐标
        data.c_x = event.globalX;
        data.c_y = container.y;
        data.b2c_l = Math.abs(data.c_y - event.globalY);
        data.a2c_l = Math.abs(data.c_x - container.x);
        data.a2b_l = Math.abs(data.b2c_l + data.a2c_l);
        data.speed_x = data.a2c_l / data.a2b_l;
        data.speed_y = data.b2c_l / data.a2b_l;
        // 右上
        if (event.globalX > container.x && event.globalY < container.y) {
            data.direction = Direction.RightUp;
        }
        // 右下
        if (event.globalX > container.x && event.globalY > container.y) {
            data.direction = Direction.RightDown;
        }
        // 左下
        if (event.globalX < container.x && event.globalY > container.y) {
            data.direction = Direction.LeftDown;
        }
        if (event.globalX < container.x && event.globalY < container.y) {
            data.direction = Direction.LeftUp;
        }
    });
    return Promise.resolve(arr);
};
enum Direction {
    LeftUp,
    RightUp,
    LeftDown,
    RightDown,
}
/**
 * 加载本地动画精灵图集
 * @param localPath 本地路径 import.meta.env.BASE_URL + `${localPath}${name}.png
 * @param fileName 文件名称
 * @param app PIXI.Application
 * @param num 图集数量
 * @param add 是否添加到场景
 * @param mcswspj 命名是否是0001格式，默认true, 否则是
 * @param animationSpeed 动画速度
 */
const loadAnimatedSprite = async (
    localPath: string,
    fileName: string,
    num: number,
    app: PIXI.Application,
    add = false,
    animationSpeed = 0.1,
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
        const res = PIXI.Texture.from(import.meta.env.BASE_URL + `${localPath}${name}.png`);
        textures.push(res);
    }
    const sprite = new PIXI.AnimatedSprite(textures);
    sprite.anchor.set(0.5);
    sprite.animationSpeed = animationSpeed;
    sprite.play();
    if (add) {
        app.stage.addChild(sprite);
    }
    return Promise.resolve(sprite);
};
let _app: PIXI.Application;
onMounted(async () => {
    _app = await init();
});
onUnmounted(() => {
    _app?.destroy();
});

function random() {
    const result = Math.random() * (1024 - 1) + 1;
    const result2 = Math.random() * (580 - 1) + 1;

    return {};
}
random();
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
