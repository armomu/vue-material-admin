<template>
    <div class="pixijs" ref="pixiDom"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted } from 'vue';
import * as PIXI from 'pixi.js';
import _ from 'lodash';

const pixiDom = shallowRef<HTMLDivElement>();

const init = () => {
    const app = new PIXI.Application({
        width: 1024,
        height: 580,
    });
    pixiDom.value?.appendChild(app.view as any);
    addSceneBackground(app);
    loadAnimatedSprite('/fishcatcher/fishimg/fish10/live/', 'fish10_live00', 30, app).then(
        (sprite) => {
            sprite.animationSpeed = 0.06;
            app.stage.addChild(sprite);
        }
    );
    loadAnimatedSprite('/fishcatcher/cannon/cannon1/', 'cannon100', 7, app).then((sprite) => {
        // sprite.animationSpeed = 0.06;
        sprite.x = app.screen.width / 2;
        sprite.y = app.screen.height / 2;
        sprite.anchor.set(0.5);
        // app.stage.addChild(sprite);
    });
    const bottomBar = loadSprite('/fishcatcher/img/bottom-bar.png', app);
    bottomBar.y = 580 - 34;
};
const addSceneBackground = (app: PIXI.Application) => {
    const background = PIXI.Sprite.from(
        import.meta.env.BASE_URL + '/fishcatcher/img/game_bg_2_hd.jpg'
    );
    background.width = app.screen.width;
    background.height = app.screen.height;
    app.stage.addChild(background);
};

const loadSprite = (
    filePath: string,
    app: PIXI.Application,
    x = app.screen.width / 2,
    y = app.screen.height / 2,
    anchor = 0.5
) => {
    const sprite = PIXI.Sprite.from(import.meta.env.BASE_URL + filePath);
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.set(anchor);
    app.stage.addChild(sprite);
    return sprite;
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
    animationSpeed = 0.1
) => {
    const fileNames: string[] = [];
    for (let i = 0; i < num; i++) {
        let name = '';
        if (mcswspj) {
            name = i < 9 ? `${fileName}0${i + 1}` : `${fileName}${i + 1}`;
        } else {
            name = `${fileName}${i + 1}`;
        }
        PIXI.Assets.add(name, import.meta.env.BASE_URL + `${localPath}${name}.png`);
        fileNames.push(name);
    }
    const textures = await PIXI.Assets.load(fileNames);
    const frames: PIXI.Texture[] = [];

    Object.keys(textures).forEach((key) => {
        frames.push(textures[key]);
    });
    const sprite = new PIXI.AnimatedSprite(frames);
    sprite.x = app.screen.width * 0.25;
    sprite.y = app.screen.height / 2;
    sprite.anchor.set(0.5);
    sprite.animationSpeed = animationSpeed;
    sprite.play();
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
