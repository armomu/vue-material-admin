import { ref } from 'vue';
import type { VirtualDom } from './useOreoApp';
const useMouseMenu = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let curVirtualDom!: Ref<VirtualDom>;

    const onVirtualDomClick = (val: Ref<VirtualDom>) => {
        curVirtualDom = val;
    };

    return {
        curVirtualDom,
        onVirtualDomClick,
    };
};
export default useMouseMenu;
