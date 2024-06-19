import { ref } from 'vue';
import type { VirtualDom } from './useOreoApp';
export const useMouseMenu = () => {
    const menuState = ref({
        visible: false,
        top: 0,
        left: 0,
    });

    const hideMenu = () => {
        menuState.value.visible = false;
    };
    const openMenu = (e: PointerEvent) => {
        e.preventDefault();
        menuState.value.left = e.clientX;
        menuState.value.top = e.clientY;
        menuState.value.visible = true;
        document.body.addEventListener('click', hideMenu);
        setTimeout(() => {
            // document.body.removeEventListener('click', hideMenu);
        }, 50);
    };

    return {
        menuState,
        openMenu,
    };
};
