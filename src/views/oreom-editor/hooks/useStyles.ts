import { ref, type Ref } from 'vue';
import type { VirtualDom } from './useMain';
import { cloneDeep } from 'lodash';
export const useStyles = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    const curVirtualDom: Ref<VirtualDom | null> = ref();

    const curStyleVisible = ref(false);

    const onVirtualDomClick = (val: any) => {
        // console.log(val);
        curVirtualDom.value = cloneDeep(val);
        console.log(curVirtualDom);
        curStyleVisible.value = true;
    };

    return {
        curVirtualDom,
        curStyleVisible,
        onVirtualDomClick,
    };
};
