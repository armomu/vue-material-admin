import { ref } from 'vue';
import type { Ref } from 'vue';
import type { VirtualDom } from './useOreoApp';
export const useMouseMenu = (appDom: Ref<VirtualDom[]>, curDom: Ref<VirtualDom>) => {
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

    const onMenuVisible = () => {
        console.log('visible');
        console.log(curDom.value);
        curDom.value.visible = !curDom.value.visible;
    };
    const onMenuDelete = () => {
        console.log('del');
        console.log(curDom.value);
        console.log(appDom);
        // appDom.splice(appDom.indexOf())
    };
    const onMenuLocked = () => {
        curDom.value.locked = !curDom.value.locked;
    };
    const onMenuGroup = () => {
        const vg = appDom.value.find((item) => item.virtualGroup);

        // 取消选中
        for (let i = 0; i < appDom.value.length; i++) {
            if (vg && appDom.value[i].groupId === vg.id) {
                appDom.value[i].selected = false;
            }
        }
        if (vg) {
            vg.name = 'Group';
            vg.virtualGroup = false;
            vg.selected = true;
        }
    };
    const onMenuDisbandGroup = () => {};

    return {
        menuState,
        openMenu,
        meneActions: {
            onMenuVisible,
            onMenuDelete,
            onMenuLocked,
            onMenuGroup,
            onMenuDisbandGroup,
        },
    };
};
