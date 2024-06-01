import { reactive, computed, type Ref } from 'vue';
import type { VirtualDom } from './useMain';
import { cloneDeep } from 'lodash';

export const useUndoRedo = (sourceAppTree: Ref<VirtualDom[]>) => {
    const keepData: VirtualDom[][] = [];

    const useUrState = reactive({
        index: -1,
        disabledRedo: false,
        disabledUndo: false,
    });

    const onUndo = () => {
        if (useUrState.index === 0) {
            sourceAppTree.value = [];
            useUrState.disabledUndo = true;
            return;
        }
        useUrState.index--;
        console.log(useUrState.index);
        sourceAppTree.value = cloneDeep(keepData[useUrState.index]);

        useUrState.disabledUndo = false;
    };
    const onRedo = () => {
        if (useUrState.index + 1 === keepData.length) {
            useUrState.disabledRedo = true;
            return;
        }
        useUrState.index++;
        sourceAppTree.value = cloneDeep(keepData[useUrState.index]);
        useUrState.disabledRedo = false;
    };
    const appChange = () => {
        console.log('change');
        keepData.push(cloneDeep(sourceAppTree.value));
        useUrState.index = keepData.length - 1;
        console.log(keepData.length);
    };
    return {
        useUrState,
        onUndo,
        onRedo,
        appChange,
    };
};
