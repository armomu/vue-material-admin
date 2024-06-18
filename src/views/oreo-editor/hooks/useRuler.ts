import { Application, Color, Graphics, Text } from 'pixi.js';
import { onMounted, ref } from 'vue';

export const useRuler = () => {
    const topRulerDom = ref();
    const leftRulerDom = ref();

    function initTop() {
        const topDom = document.getElementById('oreoEditor') as HTMLDivElement;

        // topDom.attributes.
        const pixiApp = new Application({
            width: 4000,
            height: 20,
            antialias: true, // 开启抗锯齿
            background: new Color('#ffffff'),
        });
        // @ts-ignore
        pixiApp.view.classList.add('top_ruler');
        topDom.appendChild(pixiApp.view as any);
        const graphics = new Graphics();
        const length = 4000; // 尺子的长度
        const tickSpacing = 10; // 刻度线之间的间距

        for (let i = 0; i <= length; i += tickSpacing) {
            graphics.beginFill(new Color('#999999'));
            let h = 6;
            if (i % 50 === 0) {
                h = 12;
                const label = new Text(i);
                label.style.fontSize = 10;
                label.style.fill = '#999999';
                label.x = i + 2;
                label.y = 9;

                pixiApp.stage.addChild(label);
            }
            graphics.drawRect(i, 0, 0.5, h);
            graphics.endFill();
        }
        pixiApp.stage.addChild(graphics);

        // const zd = new Graphics();

        // graphics.beginFill(new Color('#999999'));
        topRulerDom.value = pixiApp.view;
        initLeft();
    }
    function initLeft() {
        const topDom = document.getElementById('workArea') as HTMLDivElement;
        // topDom.attributes.
        const pixiApp = new Application({
            width: 20,
            height: 4000,
            antialias: true, // 开启抗锯齿
            background: new Color('#ffffff'),
        });
        // @ts-ignore
        pixiApp.view.classList.add('left_ruler');
        topDom.appendChild(pixiApp.view as any);
        const graphics = new Graphics();

        const length = 4000; // 尺子的长度
        const tickSpacing = 10; // 刻度线之间的间距

        for (let y = 0; y <= length; y += tickSpacing) {
            graphics.beginFill(new Color('#999999'));
            const x = 0;
            let w = 6;
            if (y % 50 === 0) {
                w = 12;
                const label = new Text(y);
                label.style.fontSize = 10;
                label.style.fill = '#999999';
                label.x = 20;
                label.y = y + 4;
                label.rotation = Math.PI / 2;
                pixiApp.stage.addChild(label);
            }
            graphics.drawRect(x, y, w, 0.5);
            graphics.endFill();
        }
        pixiApp.stage.addChild(graphics);
        leftRulerDom.value = pixiApp.view;
    }

    onMounted(initTop);

    return {
        leftRulerDom,
        topRulerDom,
    };
};
