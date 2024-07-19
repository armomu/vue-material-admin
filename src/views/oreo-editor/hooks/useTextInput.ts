import type { Ref } from 'vue';
import type { VirtualDom } from './useOreoApp';
import type { OreoPointerEvent } from './usePointer';

export const useTextInput = (
    appDom: Ref<VirtualDom[]>,
    curDom: Ref<VirtualDom>,
    pointerEvent: OreoPointerEvent
) => {
    const onBlur = (e: Event) => {
        curDom.value.input = false;
        curDom.value.locked = false;
        console.log(e);
        pointerEvent.onMouseMode('boxSelect');
    };
    let onEnteState = false;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const onInput = (e: Event) => {
        if (pointerEvent.mouseMode.value.text && !onEnteState) {
            // @ts-ignore
            context.font = window.getComputedStyle(e.target).getPropertyValue('font');
            const texts = (curDom.value.label || '').split('\n');
            let maxWidth = 0;
            texts.forEach((text) => {
                const textWidth = context.measureText(text).width;
                maxWidth = Math.max(maxWidth, textWidth);
            });
            // @ts-ignore
            curDom.value.styles.width = maxWidth + curDom.value.fontStyle?.fontSize || 0;
        }
    };
    const onEnter = (e: Event) => {
        onEnteState = true;
        if (curDom.value.fontStyle) {
            curDom.value.styles.height =
                curDom.value.styles.height +
                curDom.value.fontStyle.fontSize +
                curDom.value.fontStyle.fontSize * 0.3;
        }
    };

    return {
        onBlur,
        onInput,
        onEnter,
    };
};
