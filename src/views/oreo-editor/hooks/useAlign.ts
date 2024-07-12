import type { Ref } from 'vue';
import type { VirtualDom } from './useOreoApp';

// Align Hooks
export const useAlign = (appDom: Ref<VirtualDom[]>) => {
    function getSelectList(includeVG = true): VirtualDom[] {
        const list: VirtualDom[] = [];
        for (let i = 0; i < appDom.value.length; i++) {
            if (appDom.value[i].selected || (appDom.value[i].virtualGroup && includeVG)) {
                list.push(appDom.value[i]);
            }
        }
        return list;
    }
    // 顶部对齐
    const verticalTop = () => {
        const list = getSelectList();
        const minTop = Math.min(...list.map((vd) => vd.styles.top));
        for (let i = 0; i < list.length; i++) {
            list[i].styles.top = minTop;
        }
    };
    const verticalBottom = () => {
        const list = getSelectList();
        const maxBottom = Math.max(...list.map((vd) => vd.styles.top + vd.styles.height));
        for (let i = 0; i < list.length; i++) {
            if (!list[i].virtualGroup) {
                list[i].styles.top = maxBottom - list[i].styles.height;
            }
        }
    };
    const horizontalLeft = () => {
        const list = getSelectList();
        const minLeft = Math.min(...list.map((vd) => vd.styles.left));
        console.log(minLeft, 'left');
        for (let i = 0; i < list.length; i++) {
            if (!list[i].virtualGroup) {
                list[i].styles.left = minLeft;
            }
        }
    };
    const horizontalRight = () => {
        const list = getSelectList();
        const maxRight = Math.max(...list.map((vd) => vd.styles.left + vd.styles.width));

        for (let i = 0; i < list.length; i++) {
            if (!list[i].virtualGroup) {
                list[i].styles.left = maxRight - list[i].styles.width;
            }
        }
    };
    const horizontalCenter = () => {
        const list = getSelectList();
        const totalLeft = list.reduce((sum, vd) => sum + vd.styles.left, 0);
        const averageLeft = totalLeft / list.length;
        const totalWidth = list.reduce((sum, vd) => sum + vd.styles.width, 0);
        const averageWidth = totalWidth / list.length;
        for (let i = 0; i < list.length; i++) {
            const offset =
                averageLeft - list[i].styles.left + averageWidth / 2 - list[i].styles.width / 2;
            list[i].styles.left += offset;
        }
    };
    const verticalCenter = () => {
        const list = getSelectList();
        const totalTop = list.reduce((sum, obj) => sum + obj.styles.top, 0);
        const averageTop = totalTop / list.length;
        const totalHeight = list.reduce((sum, obj) => sum + obj.styles.height, 0);
        const averageHeight = totalHeight / list.length;
        for (let i = 0; i < list.length; i++) {
            const offset =
                averageTop - list[i].styles.top + averageHeight / 2 - list[i].styles.height / 2;
            list[i].styles.top += offset;
        }
    };
    const horizontalDistribute = () => {
        const list = getSelectList(false);

        // 找出最左边对象的 left 值和最右边对象的 right 值
        const minLeft = Math.min(...list.map((obj) => obj.styles.left));
        const maxRight = Math.max(...list.map((obj) => obj.styles.left + obj.styles.width));

        // 计算总宽度和间隔
        const totalWidth = maxRight - minLeft;
        const interval = totalWidth / (list.length - 1);

        // 调整每个对象的 left 值
        for (let i = 0; i < list.length; i++) {
            list[i].styles.left = minLeft + i * interval;
        }
        // objects.forEach((obj, index) => {
        //     obj.left = minLeft + index * interval;
        // });
    };
    const verticalDistribute = () => {};

    return {
        verticalTop,
        verticalBottom,
        horizontalLeft,
        horizontalRight,
        horizontalCenter,
        verticalCenter,
        horizontalDistribute,
        verticalDistribute,
    };
};

export interface AlignFun {
    verticalTop: () => void;
    verticalBottom: () => void;
    horizontalLeft: () => void;
    horizontalRight: () => void;
    horizontalCenter: () => void;
    verticalCenter: () => void;
    horizontalDistribute: () => void;
    verticalDistribute: () => void;
}
