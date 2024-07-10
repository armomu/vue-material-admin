import { reactive } from 'vue';

export const useSnapLine = () => {
    // const snapLine = reactive<{
    //     vLine: SnapLine[];
    //     hLine: SnapLine[];
    // }>({
    //     vLine: [],
    //     hLine: [],
    // });
    // const onSnapLine = (arr: SnapLine[][]) => {
    //     const [vLine, hLine] = arr;
    //     snapLine.vLine = vLine;
    //     snapLine.hLine = hLine;
    //     if (pointerEvent.haSelectedList.length > 0) {
    //         const minTop = Math.min(...pointerEvent.haSelectedList.map((vd) => vd.styles.top));
    //         const minLeft = Math.min(...pointerEvent.haSelectedList.map((vd) => vd.styles.left));
    //         const tres = curDom.value.styles.top - minTop;
    //         const mres = curDom.value.styles.left - minLeft;
    //         for (let i = 0; i < pointerEvent.haSelectedList.length; i++) {
    //             pointerEvent.haSelectedList[i].styles.left =
    //                 pointerEvent.haSelectedList[i].styles.left + mres;
    //             pointerEvent.haSelectedList[i].styles.top =
    //                 pointerEvent.haSelectedList[i].styles.top + tres;
    //         }
    //     }
    // };
    // return {
    //     snapLine,
    //     onSnapLine,
    // };
};
