<template>
    <div class="pixijs" ref="pixiDom"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted } from 'vue';
import * as PIXI from 'pixi.js';

const pixiDom = shallowRef<HTMLDivElement>();
const screen = {
    width: 1024,
    height: 580,
};
let _app: PIXI.Application;
onMounted(async () => {
    _app = await init();
});
onUnmounted(() => {
    _app?.destroy();
});
const init = async () => {
    const app = new PIXI.Application({
        width: screen.width,
        height: screen.height,
    });
    pixiDom.value?.appendChild(app.view as any);
    addSceneBackground(app);
    addBottomBar(app);
    addFishFlock(app);
    loadAnimatedSprite('/fishcatcher/cannon/cannon6/', 'cannon600', 7, app).then((sprite) => {
        sprite.animationSpeed = 0.5;
        sprite.x = screen.width / 2 + 42;
        sprite.y = screen.height;
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
    bottomBar.zIndex = 1000;
    return Promise.resolve();
};
const addSceneBackground = (app: PIXI.Application) => {
    const background = PIXI.Sprite.from(import.meta.env.BASE_URL + '/fishcatcher/img/BG01.png');
    background.width = screen.width;
    background.height = screen.height;
    app.stage.addChild(background);
};
const addFishSprite = async (app: PIXI.Application, key = '5', num = 30) => {
    const arr: PIXI.AnimatedSprite[] = [];
    const fish = await loadAnimatedSprite(
        `/fishcatcher/fishimg/fish${key}/live/`,
        `fish${key}_live00`,
        num,
        app,
        true
    );

    const data: DataInterface = {
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
        inScene: true,
    };
    randomStartPoint(fish);

    randomEndPoint(data, fish);
    app.ticker.add((delta) => {
        const next_x = data.speed_x * delta;
        const next_y = data.speed_y * delta;
        // 负数转为正数的时候和上一个位置比下一个位置更近场景的时候为进场
        // 由正熟转换为负数的时候和上一个位置比下一个位置更远场景的时候为离场
        switch (data.direction) {
            case Direction.LeftUp:
                fish.x -= next_x;
                fish.y -= next_y;
                if (fish.x < data.b_x && (fish.x < 0 - fish.width || fish.y < 0 - fish.height)) {
                    // console.log('离开屏幕了 左上');
                    data.inScene = false;
                }
                break;
            case Direction.LeftDown:
                fish.x -= next_x;
                fish.y += next_y;
                if (fish.x < data.b_x && (fish.x < 0 || fish.y > screen.height)) {
                    data.inScene = false;
                }
                break;
            case Direction.RightUp:
                fish.x += next_x;
                fish.y -= next_y;
                if (fish.x > data.b_x && (fish.x < screen.width || fish.y < 0)) {
                    data.inScene = false;
                }
                break;
            case Direction.RightDown:
                fish.x += next_x;
                fish.y += next_y;
                if (fish.x > data.b_x && (fish.x < screen.width || fish.y < 0)) {
                    data.inScene = false;
                }
                break;
        }
        if (!data.inScene) {
            randomEndPoint(data, fish);
        }
    });
    app.stage.on('pointerdown', (event) => {
        pointApply(data, fish, { x: event.globalX, y: event.globalY });
    });
    return Promise.resolve(arr);
};

const addFishFlock = (app: PIXI.Application) => {
    // 头顶有个灯的大鱼
    for (let i = 0; i < 3; i++) {
        addFishSprite(app, '1');
    }
    addFishSprite(app, '2');
    // 河豚🐡
    for (let i = 0; i < 3; i++) {
        addFishSprite(app, '3');
    }
    // 黄色小鱼
    for (let i = 0; i < 10; i++) {
        addFishSprite(app, '5');
    }
    // 青色小小鱼
    for (let i = 0; i < 20; i++) {
        addFishSprite(app, '8');
    }
    // 蓝黄条纹鱼
    for (let i = 0; i < 8; i++) {
        addFishSprite(app, '9');
    }
    // 乌贼
    for (let i = 0; i < 5; i++) {
        addFishSprite(app, '10');
    }
    // 乌龟
    for (let i = 0; i < 4; i++) {
        addFishSprite(app, '11');
    }
    // 红色小小鱼
    for (let i = 0; i < 20; i++) {
        addFishSprite(app, '12');
    }
    // 长嘴鱼
    for (let i = 0; i < 2; i++) {
        addFishSprite(app, '7');
    }
    // 黑色鲸鱼
    for (let i = 0; i < 2; i++) {
        addFishSprite(app, '4');
    }
    // 蓝色鲨鱼
    addFishSprite(app, '6');
};
const pointApply = (
    _data: DataInterface,
    _sprite: PIXI.Sprite | PIXI.AnimatedSprite | PIXI.Container,
    _position?: Position
) => {
    if (!_position) {
        _position = {
            x: 0,
            y: 580,
        };
    }
    _data.inScene = true;
    const radian = Math.atan2(_position.y - _sprite.y, _position.x - _sprite.x);
    _sprite.rotation = radian;
    // 鼠标点击坐标
    _data.b_x = _position.x;
    _data.b_y = _position.y;
    // c点坐标
    _data.c_x = _position.x;
    _data.c_y = _sprite.y;
    _data.b2c_l = Math.abs(_data.c_y - _position.y);
    _data.a2c_l = Math.abs(_data.c_x - _sprite.x);
    _data.a2b_l = Math.abs(_data.b2c_l + _data.a2c_l);
    _data.speed_x = _data.a2c_l / _data.a2b_l;
    _data.speed_y = _data.b2c_l / _data.a2b_l;
    if (_position.x > _sprite.x && _position.y < _sprite.y) {
        _data.direction = Direction.RightUp;
    }
    if (_position.x > _sprite.x && _position.y > _sprite.y) {
        _data.direction = Direction.RightDown;
    }
    if (_position.x < _sprite.x && _position.y > _sprite.y) {
        _data.direction = Direction.LeftDown;
    }
    if (_position.x < _sprite.x && _position.y < _sprite.y) {
        _data.direction = Direction.LeftUp;
    }
};
// 随机开始的点位
const randomStartPoint = (_sprite: PIXI.Sprite | PIXI.AnimatedSprite | PIXI.Container) => {
    // 随机10%～90%的数
    const r1_9 = (Math.floor(Math.random() * 9) + 1) / 10;
    // y上半部分
    const sh2 = screen.height / 2;
    // 随机的方向 = Direction？
    const dir = Math.abs(Math.floor(Math.random() * 7) - 3);
    let x = 0 - _sprite.width - 10;
    let y = sh2 * r1_9;
    switch (dir) {
        case Direction.LeftUp:
            y = sh2 * r1_9;
            break;
        case Direction.LeftDown:
            y = sh2 + sh2 * r1_9;
            break;
        case Direction.RightUp:
            x = screen.width + _sprite.width / 2 + 10;
            break;
        case Direction.RightDown:
            x = screen.width + _sprite.width / 2 + 10;
            y = sh2 + sh2 * r1_9;
            break;
    }
    _sprite.x = x;
    _sprite.y = y;
    return { x, y };
};
const randomEndPoint = (
    _data: DataInterface,
    _sprite: PIXI.Sprite | PIXI.AnimatedSprite | PIXI.Container
) => {
    const x = Math.floor(Math.random() * screen.width) + 1;
    const y = Math.floor(Math.random() * screen.height) + 1;
    pointApply(_data, _sprite, { x, y });
};
const loadSprite = (
    filePath: string,
    app: PIXI.Application,
    add = true,
    x = screen.width / 2,
    y = screen.height / 2,
    anchor = 0.5
) => {
    const sprite = PIXI.Sprite.from(import.meta.env.BASE_URL + filePath);
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.set(anchor);
    add && app.stage.addChild(sprite);
    return sprite;
};
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
        const res = await PIXI.Texture.from(import.meta.env.BASE_URL + `${localPath}${name}.png`);
        textures.push(res);
    }
    const sprite = new PIXI.AnimatedSprite(textures);
    sprite.anchor.set(0.5);
    sprite.animationSpeed = animationSpeed;
    sprite.play();
    sprite.zIndex = 1;
    if (add) {
        app.stage.addChild(sprite);
    }
    return Promise.resolve(sprite);
};
enum Direction {
    LeftUp,
    RightUp,
    LeftDown,
    RightDown,
}
interface DataInterface {
    b_x: number;
    b_y: number;
    a2b_l: number; // 边的长度
    c_x: number;
    c_y: number;
    b2c_l: number; //
    a2c_l: number; // a到c的长度,
    speed_x: number;
    speed_y: number;
    direction: number;
    inScene: boolean; // 精灵的中心点是否离开了场景，从非场景中进入场景中也被判定为true
}

interface Position {
    x: number;
    y: number;
}
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
