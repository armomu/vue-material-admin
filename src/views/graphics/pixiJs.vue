<template>
    <div class="pixijs" ref="pixiDom"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted } from 'vue';
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
        app.stage.interactive = true;
        app.stage.addChild(sprite);
        app.stage.on('pointermove', (event) => {
            // 计算鱼需要旋转的角度
            const radians = Math.atan2(event.global.y - sprite.y, event.global.x - sprite.x);
            // 将鱼旋转到目标角度
            sprite.rotation = Math.PI / 2 - Math.abs(radians);
        });
        app.stage.on('pointerdown', (event) => {
            sprite.play();
            // sprite2.x = event.globalX;
            // sprite2.y = event.globalY;
        });
        sprite.onLoop = () => {
            // 停止动画
            sprite.stop();
        };
    });
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
    const arr: PIXI.AnimatedSprite[] = [];
    const fish = await loadAnimatedSprite(
        '/fishcatcher/fishimg/fish5/live/',
        'fish5_live00',
        30,
        app
    );
    const numCopies = 5;
    for (let i = 0; i < numCopies; i++) {
        const copySprite = new PIXI.AnimatedSprite(fish.textures);
        copySprite.play();
        copySprite.position.set(200 + i * 100, 200);
        app.stage.addChild(copySprite);
    }
    return Promise.resolve(arr);
};

/**
 * 加载本地动画精灵图集
 * @param localPath 本地路径 import.meta.env.BASE_URL + `${localPath}${name}.png
 * @param fileName 文件名称
 * @param app PIXI.Application
 * @param num 图集数量
 * @param mcswspj 命名是否是0001格式，默认true, 否则是
 * @param animationSpeed 动画速度
 * @returns {Promise<PIXI.AnimatedSprite> }
 */
const loadAnimatedSprite = async (
    localPath: string,
    fileName: string,
    num: number,
    app: PIXI.Application,
    mcswspj = true,
    animationSpeed = 0.1,
    add = false
): Promise<PIXI.AnimatedSprite> => {
    const textures: PIXI.Texture[] = [];
    for (let i = 0; i < num; i++) {
        let name = '';
        if (mcswspj) {
            name = i < 9 ? `${fileName}0${i + 1}` : `${fileName}${i + 1}`;
        } else {
            name = `${fileName}${i + 1}`;
        }

        // PIXI.Assets.add(name, import.meta.env.BASE_URL + `${localPath}${name}.png`);
        const res = PIXI.Texture.from(import.meta.env.BASE_URL + `${localPath}${name}.png`);
        textures.push(res);
    }

    const sprite = new PIXI.AnimatedSprite(textures);
    sprite.x = app.screen.width * 0.25;
    sprite.y = app.screen.height / 2;
    sprite.anchor.set(0.5);
    sprite.animationSpeed = animationSpeed;
    sprite.play();
    if (add) {
        app.stage.addChild(sprite);
    }
    return Promise.resolve(sprite);
};

onMounted(init);
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
