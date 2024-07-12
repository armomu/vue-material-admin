import { reactive } from 'vue';
import type { Ref } from 'vue';
import type { VirtualDom } from './useOreoApp';
import type { OreoPointerEvent } from './usePointer';

export const useSnapLine = (
    appDom: Ref<VirtualDom[]>,
    curDom: Ref<VirtualDom>,
    pointerEvent: OreoPointerEvent
) => {
    const snapLine = reactive<{
        vLine: SnapLine[];
        hLine: SnapLine[];
    }>({
        vLine: [],
        hLine: [],
    });
    const onSnapLine = (arr: SnapLine[][]) => {
        const [vLine, hLine] = arr;
        snapLine.vLine = vLine;
        snapLine.hLine = hLine;
        const v = vLine.findIndex((item) => item.display === true);
        const h = hLine.findIndex((item) => item.display === true);
        if (v > -1 || h > -1) {
            pointerEvent.fixDragOffset();
        }
    };
    return {
        snapLine,
        onSnapLine,
    };
};

export interface SnapLine {
    display: boolean;
    id: number;
    lineLength: string;
    origin: string;
    position: string;
}
