import { ref } from 'vue';
// import type { Ref } from 'vue';
// import type { VirtualDom } from './useOreoApp';
// import type { OreoPointerEvent } from './usePointer';

export const useSnapLine = () => {
    const snapLine = ref<{
        vLine: SnapLine[];
        hLine: SnapLine[];
    }>({
        vLine: [],
        hLine: [],
    });
    const onSnapLine = (arr: SnapLine[][]) => {
        const [vLine, hLine] = arr;
        snapLine.value.vLine = vLine;
        snapLine.value.hLine = hLine;
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
