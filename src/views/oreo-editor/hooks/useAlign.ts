import { ref, type Ref } from 'vue';
import type { VirtualDom } from './useOreoApp';

export const useAlign = (appDom: VirtualDom[]) => {
    const verticalTop = () => {
        const minTop = Math.min(...appDom.map((vd) => vd.styles.top + vd.styles.height));
        for (let i = 0; i < appDom.length; i++) {
            appDom[i].styles.top = minTop;
        }
    };
    const verticalBottom = () => {
        const maxBottom = Math.max(...appDom.map((vd) => vd.styles.top + vd.styles.height));
        for (let i = 0; i < appDom.length; i++) {
            appDom[i].styles.top = maxBottom - appDom[i].styles.height;
        }
    };
    const horizontalLeft = () => {};
    const horizontalRight = () => {};
    const horizontalCenter = () => {
        const totalLeft = appDom.reduce((sum, vd) => sum + vd.styles.left, 0);
        const averageLeft = totalLeft / appDom.length;
        const totalWidth = appDom.reduce((sum, vd) => sum + vd.styles.width, 0);
        const averageWidth = totalWidth / appDom.length;
        for (let i = 0; i < appDom.length; i++) {
            const offset =
                averageLeft - appDom[i].styles.left + averageWidth / 2 - appDom[i].styles.width / 2;
            appDom[i].styles.left += offset;
        }
    };
    const verticalCenter = () => {};
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
