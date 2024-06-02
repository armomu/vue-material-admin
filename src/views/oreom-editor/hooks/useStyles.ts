import { ref, type Ref } from 'vue';
import type { VirtualDom } from './useMain';
import { cloneDeep } from 'lodash';
export const useStyles = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    const curVirtualDom: Ref<VirtualDom> = ref();

    const curStyleVisible = ref(false);

    const onVirtualDom = (val: any) => {
        // console.log(val);
        curVirtualDom.value = val;
        console.log(curVirtualDom);
        curStyleVisible.value = true;
    };

    return {
        curVirtualDom,
        curStyleVisible,
        onVirtualDom,
    };
};
