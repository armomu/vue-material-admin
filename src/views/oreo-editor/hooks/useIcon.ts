import { ref, type Ref } from 'vue';

import materialIcons from './icon';
import { cloneDeep } from 'lodash';
import { VirtualDomType, beaseDom, type VirtualDom } from './useOreoApp';
import type { OreoPointerEvent } from './usePointer';

export const useIcon = (
    appDom: Ref<VirtualDom[]>,
    curDom: Ref<VirtualDom>,
    pointerEvent: OreoPointerEvent
) => {
    const iconState = ref({
        dialogVisible: false,
        list: materialIcons,
    });

    const onShowIconDialog = () => {
        pointerEvent.setSelectedList();
        const vg = appDom.value.find((item) => item.virtualGroup);
        // 取消选中
        for (let i = 0; i < appDom.value.length; i++) {
            appDom.value[i].selected = false;
            appDom.value[i].active = false;
            if (vg && appDom.value[i].groupId === vg.id) {
                appDom.value[i].groupId = 0;
            }
        }
        // 删除虚拟组合
        vg && appDom.value.splice(appDom.value.indexOf(vg), 1);
        iconState.value.dialogVisible = true;
    };

    const onAddIcon = (icon: string) => {
        const iconDom = cloneDeep(beaseDom[0]);
        iconDom.type = VirtualDomType.Icon;
        iconDom.id = new Date().getTime();
        iconDom.name = 'Icon';
        iconDom.icon = icon;
        iconDom.styles.fill = false;
        iconDom.styles.width = 30;
        iconDom.styles.height = 30;
        iconDom.styles.left = 30;
        iconDom.styles.top = 30;
        iconDom.fontStyle = {
            color: '#333333',
            fontSize: 12,
            lineHeight: 15,
            fontFamily: 'inherit',
            fontWeight: 'normal',
            textAlign: 'left',
            shadow: false,
            shadowX: 0,
            shadowY: 1,
            shadowBlur: 2,
            shadowSpread: 0,
            shadowColor: 'rgba(0, 0, 0, 1)',
            decoration: 'none',
        };
        curDom.value = iconDom;
        appDom.value.push(iconDom);

        iconState.value.dialogVisible = false;
    };
    return {
        iconState,
        onShowIconDialog,
        onAddIcon,
    };
};
