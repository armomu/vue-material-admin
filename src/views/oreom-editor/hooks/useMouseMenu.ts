import { ref, type Ref } from 'vue';
import type { VirtualDom } from './useMain';
export const useMouseMenu = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let curVirtualDom!: Ref<VirtualDom>;

    const onVirtualDomClick = (val: Ref<virtualDom>) => {
        curVirtualDom = val;
    };

    return {
        curVirtualDom,
        onVirtualDomClick,
    };
};
