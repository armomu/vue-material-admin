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
    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    pixiDom.value?.appendChild(app.view as any);
    addSceneBackground(app);
    const fishFlock = await addFishFlock(app);
    // engine = Matter.Engine.create();

    // const wallTop = Matter.Bodies.rectangle(screen.width / 2, 0, screen.width, 10, {
    //     isStatic: true,
    // });
    // const wallBottom = Matter.Bodies.rectangle(screen.width / 2, screen.height, screen.width, 10, {
    //     isStatic: true,
    // });
    // const wallRight = Matter.Bodies.rectangle(screen.width, screen.height / 2, 10, screen.height, {
    //     isStatic: true,
    // });
    // const wallLeft = Matter.Bodies.rectangle(0, screen.height / 2, 10, screen.height, {
    //     isStatic: true,
    // });
    // Matter.World.add(engine.world, [wallBottom, wallTop, wallLeft, wallRight]);
    // const testArr: Matter.Body[] = [];
    // fishFlock.forEach((item) => {
    //     const imageBody = Matter.Bodies.rectangle(
    //         item.position.x,
    //         item.position.y,
    //         item.width,
    //         item.height,
    //         {
    //             restitution: 0.8,
    //             // isStatic: true,
    //         }
    //     );
    //     Matter.World.addBody(engine.world, imageBody);
    //     testArr.push(imageBody);
    // });

    // app.ticker.add(() => {
    //     testArr.forEach((object, index) => {
    //         fishFlock[index].position.x = object.position.x;
    //         fishFlock[index].position.y = object.position.y;
    //         // object.position.x = fishFlock[index].position.x;
    //         // object.position.y = fishFlock[index].position.y;
    //     });
    // });

    // const mouseConstraint = Matter.MouseConstraint.create(engine, {
    //     mouse: Matter.Mouse.create(document.querySelector('.pixijs canvas')!),
    // });

    // Matter.World.add(engine.world, mouseConstraint);
    // Matter.Runner.run(engine);
    // Matter.Render.create({
    //     engine: engine,
    //     options: {
    //         wireframes: true, // 将该选项设置为 true，以显示物体的线框
    //     },
    // });
    // Matter.Runner.create
    // Matter.Runner.run(engine);
    await addCannon(app, fishFlock);

    return Promise.resolve(app);
};
const addFishFlock = async (app: PIXI.Application) => {
    const arr: PIXI.AnimatedSprite[] = [];
    // 头顶有个灯的大鱼
    for (let i = 0; i < 3; i++) {
        const fish = await addFishSprite(app, '1');
        arr.push(fish);
    }
    // 河豚🐡
    for (let i = 0; i < 3; i++) {
        const fish = await addFishSprite(app, '3');
        arr.push(fish);
    }
    // 黄色小鱼
    // for (let i = 0; i < 10; i++) {
    //     const fish = await addFishSprite(app, '5');
    //     arr.push(fish);
    // }
    // 青色小小鱼
    for (let i = 0; i < 20; i++) {
        const fish = await addFishSprite(app, '8');
        arr.push(fish);
    }
    // 蓝黄条纹鱼
    for (let i = 0; i < 8; i++) {
        const fish = await addFishSprite(app, '9');
        arr.push(fish);
    }
    // 乌贼
    // for (let i = 0; i < 5; i++) {
    //     const fish = await addFishSprite(app, '10');
    //     arr.push(fish);
    // }
    // 乌龟
    for (let i = 0; i < 4; i++) {
        const fish = await addFishSprite(app, '11');
        arr.push(fish);
    }
    // 红色小小鱼
    // for (let i = 0; i < 20; i++) {
    //     const fish = await addFishSprite(app, '12');
    //     arr.push(fish);
    // }
    // 长嘴鱼
    // for (let i = 0; i < 2; i++) {
    //     const fish = await addFishSprite(app, '7');
    //     arr.push(fish);
    // }
    // 黑色鲸鱼
    // for (let i = 0; i < 2; i++) {
    //     const fish = await addFishSprite(app, '4');
    //     arr.push(fish);
    // }
    // 蓝色鲨鱼;
    // const fish6 = await addFishSprite(app, '6');
    // arr.push(fish6);
    const fish2 = await addFishSprite(app, '2');
    arr.push(fish2);
    return Promise.resolve(arr);
};

const addFishSprite = async (app: PIXI.Application, key = '5', num = 30) => {
    const fish = await loadAnimatedSprite(
        `fishcatcher/fishimg/fish${key}/live/`,
        `fish${key}_live00`,
        num,
        app,
        true
    );
    fish.animationSpeed = 0.1;
    fish.play();
    const data: DataInterface = {
        b_x: 0,
        b_y: 0,
        a2b_l: 0,
        c_x: 0,
        c_y: 0,
        b2c_l: 0,
        a2c_l: 0,
        speed_x: 0,
        speed_y: 0,
        direction: 0,
        inScene: false,
        rotation: 0,
        to_radian: 0,
    };
    fish.position.x = screen.width / 2;
    // fish.position.y = screen.height / 2;
    // fish.rotation = -Math.PI / 4;
    fish.position.y = 60;
    randomStartPoint(fish);
    randomEndPoint(data, fish);
    const count_radian = 0;
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
        // if (data.to_radian !== 0) {
        //     const to_radian = 0.1 * delta;
        //     count_radian += to_radian;
        //     if (count_radian > Math.abs(data.to_radian)) {
        //         count_radian = 0;
        //         data.to_radian = 0;
        //     }
        //     if (data.to_radian > 0) {
        //         fish.rotation += to_radian;
        //     } else {
        //         fish.rotation -= to_radian;
        //     }
        // }
    });
    // app.stage.on('pointerdown', (event) => {
    //     pointApply(data, fish, { x: event.globalX, y: event.globalY });
    // });
    return Promise.resolve(fish);
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
    // 鼠标点击坐标
    _data.b_x = _position.x;
    _data.b_y = _position.y;
    // c点坐标
    _data.c_x = _position.x;
    _data.c_y = _sprite.y;
    // 直角三角形边长
    _data.b2c_l = Math.abs(_data.c_y - _position.y);
    _data.a2c_l = Math.abs(_data.c_x - _sprite.x);
    _data.a2b_l = Math.abs(_data.b2c_l + _data.a2c_l);
    // 速度比例 x =
    _data.speed_x = _data.a2c_l / _data.a2b_l;
    _data.speed_y = _data.b2c_l / _data.a2b_l;

    let direction = -1;
    if (_position.x > _sprite.x && _position.y < _sprite.y) {
        direction = Direction.RightUp;
    }
    if (_position.x > _sprite.x && _position.y > _sprite.y) {
        direction = Direction.RightDown;
    }
    if (_position.x < _sprite.x && _position.y > _sprite.y) {
        direction = Direction.LeftDown;
    }
    if (_position.x < _sprite.x && _position.y < _sprite.y) {
        direction = Direction.LeftUp;
    }
    const _y = _position.y - _sprite.y;
    const _x = _position.x - _sprite.x;

    // 获取基于精灵本身新的转向角度
    const radian = Math.atan2(_y, _x);
    // // 算出需要转向的夹角角度
    // const diff = Math.abs(_data.rotation - radian);
    // let to_radian = Math.min(diff, 2 * Math.PI - diff);
    // if (_data.rotation > 0) {
    //     // 镜像角度
    //     const d = -Math.PI + _data.rotation;
    //     if (radian > _data.rotation && radian > d) {
    //         to_radian;
    //         console.log('顺时针');
    //     } else {
    //         to_radian = -to_radian;
    //         console.log('逆时针');
    //     }
    // } else {
    //     // 镜像角度
    //     const d = Math.PI + _data.rotation;

    //     if (radian > _data.rotation && radian < d && radian > 0) {
    //         console.log('顺时针');
    //         to_radian;
    //     } else {
    //         to_radian = -to_radian;
    //         console.log('逆时针');
    //     }
    // }
    // // 初始
    // if (_data.rotation === 0 && radian < 0) {
    //     to_radian = -to_radian;
    // }
    // 设置新的角度
    _data.rotation = radian;
    // 设置新的朝向
    _data.direction = direction;
    // // 保存算出来的角度以供计算
    // _data.to_radian = to_radian;
    _sprite.rotation = radian;

    // console.log(to_radian, '需要转向的角度');
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

    // 获取基于精灵本身新的转向角度
    const radian = Math.atan2(screen.height / 2 - y, screen.width / 2 - x);

    _sprite.rotation = radian;
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
const addCannon = async (app: PIXI.Application, fishFlock: PIXI.AnimatedSprite[] = []) => {
    const bottomBar = loadSprite('fishcatcher/img/bottom-bar.png', app);
    bottomBar.x = bottomBar.x - 48;
    bottomBar.y = 580 - 34;
    bottomBar.zIndex = 999;
    const cannon = await loadAnimatedSprite(
        'fishcatcher/cannon/cannon6/',
        'cannon600',
        7,
        app,
        true
    );
    cannon.anchor.set(0.5, 1);
    cannon.scale.set(0.5);
    cannon.animationSpeed = 0.8;
    cannon.x = screen.width / 2;
    cannon.y = screen.height;
    cannon.onLoop = () => {
        cannon.stop();
    };
    const bullets = await addBulletTicker(app, fishFlock);
    app.stage.on('pointermove', (event) => {
        const radian = Math.atan2(event.globalY - cannon.y, event.globalX - cannon.x);
        cannon.rotation = Math.PI / 2 - Math.abs(radian);
    });
    app.stage.on('pointerdown', (event) => {
        pushBullet(app, bullets, cannon, event, fishFlock);
        cannon.play();
    });
    app.ticker.add((delta) => {
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].bulletSprite.visible) {
                bullets[i].bulletSprite.x += bullets[i].speed_x * delta;
                bullets[i].bulletSprite.y += bullets[i].speed_y * delta;
            }
            if (bullets[i].bulletSprite.x > screen.width || bullets[i].bulletSprite.y < 0) {
                bullets[i].bulletSprite.visible = false;
            }

            if (bullets[i].bulletSprite.visible) {
                bullets[i].graphics.position = bullets[i].bulletSprite.position;
                const buonds = bullets[i].graphics.getBounds();
                // console.log(buonds);
                for (let key = 0; key < fishFlock.length; key++) {
                    const fishBounds = fishFlock[key].getBounds();
                    if (buonds.intersects(fishBounds)) {
                        bullets[i].bulletSprite.play();
                        // bullets[i].bulletSprite.hitArea;
                        bullets[i].speed_x = 0;
                        bullets[i].speed_y = 0;
                    }
                    if (fishFlock[key].alpha < 1) {
                        fishFlock[key].alpha += 1 * delta;
                    }
                }
            }
        }
        // for (let key = 0; key < fishFlock.length; key++) {
        //     if (fishFlock[key].alpha < 1) {
        //         fishFlock[key].alpha += 0.5 * delta;
        //     }
        // }
    });
};

const addBulletTicker = async (app: PIXI.Application, fishFlock: PIXI.AnimatedSprite[]) => {
    const bullet6 = await loadAnimatedSprite(
        'fishcatcher/bullet/bullet6/',
        'bullet600',
        9,
        app,
        true
    );
    bullet6.visible = false;
    bullet6.scale.set(0.5);
    bullet6.anchor.set(0.5);
    bullet6.onLoop = () => {
        bullet6.stop();
        castNetFishing(bullet6, fishFlock);
    };
    const graphics = new PIXI.Graphics();
    // 设置点的样式
    graphics.beginFill(0xffffff); // 白色
    graphics.drawCircle(0, 0, 5); // 在 (100, 100) 处绘制一个半径为 5 的圆
    graphics.visible = false;
    // 将绘制的图形添加到舞台
    app.stage.addChild(graphics);
    const obj = { speed_x: 0, speed_y: 0, bulletSprite: bullet6, graphics };
    return Promise.resolve([obj]);
};

const pushBullet = (
    app: PIXI.Application,
    bullets: BulletTicker[],
    cannon: PIXI.AnimatedSprite,
    event: PIXI.FederatedPointerEvent,
    fishFlock: PIXI.AnimatedSprite[]
) => {
    let bulletTicker = bullets[0];

    //
    let has = false;
    bullets.forEach((item) => {
        if (!item.bulletSprite.visible) {
            bulletTicker = item;
            has = true;
        }
    });
    if (!has) {
        bulletTicker = { ...bulletTicker };
        bulletTicker.bulletSprite = new PIXI.AnimatedSprite(bulletTicker.bulletSprite.textures);
        bulletTicker.bulletSprite.anchor.set(0.5);
        bulletTicker.bulletSprite.scale.set(0.5);
        bulletTicker.bulletSprite.onLoop = () => {
            bulletTicker.bulletSprite.stop();
            castNetFishing(bulletTicker.bulletSprite, fishFlock);
        };
        bulletTicker.graphics = bulletTicker.graphics.clone();
        bulletTicker.graphics.visible = false;
        bulletTicker.bulletSprite.visible = false;
        bulletTicker.bulletSprite.animationSpeed = 0.5;
        app.stage.addChild(bulletTicker.bulletSprite);
        app.stage.addChild(bulletTicker.graphics);
        bullets.push(bulletTicker);
    }
    bulletTicker.bulletSprite.x = cannon.x + 0;
    bulletTicker.bulletSprite.y = cannon.y + 0;
    bulletTicker.bulletSprite.rotation = cannon.rotation + 0;
    bulletTicker.bulletSprite.visible = true;

    // c点坐标
    const c_x = event.globalX;
    const c_y = cannon.y;
    // 直角三角形边长
    const b2c_l = Math.abs(c_y - event.globalY);

    let a2c_l = 0;
    if (event.globalX > bulletTicker.bulletSprite.x) {
        a2c_l = c_x - cannon.x;
    } else {
        a2c_l = cannon.x - c_x;
    }
    const a2b_l = Math.abs(b2c_l + a2c_l);

    // 速度比例 x =
    const speed_x = (a2c_l / a2b_l) * 30;
    const speed_y = (b2c_l / a2b_l) * 30;
    // 只往上
    bulletTicker.speed_y = -speed_y;
    if (
        event.globalX > bulletTicker.bulletSprite.x &&
        event.globalY < bulletTicker.bulletSprite.y
    ) {
        bulletTicker.speed_x = +speed_x;
    }
    if (
        event.globalX < bulletTicker.bulletSprite.x &&
        event.globalY < bulletTicker.bulletSprite.y
    ) {
        bulletTicker.speed_x = -speed_x;
    }
};
const castNetFishing = (bullet: PIXI.AnimatedSprite, fishFlock: PIXI.AnimatedSprite[]) => {
    bullet.texture.uvMatrix;
    console.log('撒🕸️');
    const bulletBounds = bullet.getBounds();
    for (let i = 0; i < fishFlock.length; i++) {
        const fishBounds = fishFlock[i].getBounds();
        if (bulletBounds.intersects(fishBounds)) {
            fishFlock[i].alpha = 0.5;
            const [k] = fishFlock[i].children;
            if (k) k.alpha = 0.1;
        }
    }
    // 最后再给炮弹隐藏
    bullet.visible = false;
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

const addSceneBackground = (app: PIXI.Application) => {
    const background = PIXI.Sprite.from(import.meta.env.BASE_URL + 'fishcatcher/img/BG01.png');
    background.width = screen.width;
    background.height = screen.height;
    app.stage.addChild(background);
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
    mcswspj = true
): Promise<PIXI.AnimatedSprite> => {
    const textures: PIXI.Texture[] = [];
    let url = '';
    for (let i = 0; i < num; i++) {
        let name = '';
        if (mcswspj) {
            name = i < 9 ? `${fileName}0${i + 1}` : `${fileName}${i + 1}`;
        } else {
            name = `${fileName}${i + 1}`;
        }
        url = import.meta.env.BASE_URL + `${localPath}${name}.png`;
        const res = await PIXI.Texture.from(url);
        textures.push(res);
    }
    const sprite = new PIXI.AnimatedSprite(textures);
    sprite.anchor.set(0.5);
    sprite.zIndex = 1;

    // 创建一个Graphics对象并设置背景颜色
    const background = new PIXI.Graphics();
    background.beginFill(new PIXI.Color('blue')); // 设置背景颜色，这里是红色
    background.drawRect(-sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height); // 绘制矩形，大小与精灵相同
    background.endFill();
    background.alpha = 0.1;
    sprite.addChild(background);

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
    c_x: number; // 直角x
    c_y: number; //
    b2c_l: number; //
    a2c_l: number; // a到c的长度,
    speed_x: number;
    speed_y: number;
    direction: number; // 方向
    inScene: boolean; // 精灵的中心点是否离开了场景，从非场景中进入场景中也被判定为true
    rotation: number; // 保存当前转向角度 因为计算的转向角度是一只加加加的
    to_radian: number; // 需要转向的夹角角度
}

interface Position {
    x: number;
    y: number;
}
interface BulletTicker {
    speed_x: number;
    speed_y: number;
    bulletSprite: PIXI.AnimatedSprite;
    graphics: PIXI.Graphics;
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
