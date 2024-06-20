import { ref, type Ref } from 'vue';
import type { VirtualDom } from './useOreoApp';

// Align Hooks
export const useAlign = (appDom: VirtualDom[]) => {
    function getSelectList(): VirtualDom[] {
        const list: VirtualDom[] = [];
        for (let i = 0; i < appDom.length; i++) {
            if (appDom[i].selected || appDom[i].virtualGroup) {
                list.push(appDom[i]);
            }
        }
        console.log(JSON.parse(JSON.stringify(list)));
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
    const horizontalDistribute = () => {};
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

export interface Align {
    verticalTop: () => void;
    verticalBottom: () => void;
    horizontalLeft: () => void;
    horizontalRight: () => void;
    horizontalCenter: () => void;
    verticalCenter: () => void;
    horizontalDistribute: () => void;
    verticalDistribute: () => void;
}
