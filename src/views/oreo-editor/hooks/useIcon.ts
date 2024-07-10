import { reactive, ref, type Ref } from 'vue';

import materialIcons from './icon';
import { cloneDeep } from 'lodash';
import { VirtualDomType, beaseDom, type VirtualDom } from './useOreoApp';

export const useIcon = (appDom: Ref<VirtualDom[]>, curDom: Ref<VirtualDom>) => {
    const iconState = ref({
        dialogVisible: false,
        list: materialIcons,
    });

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
        curDom.value = iconDom;
        appDom.value.push(iconDom);

        iconState.value.dialogVisible = false;
    };
    return {
        iconState,
        onAddIcon,
    };
};
