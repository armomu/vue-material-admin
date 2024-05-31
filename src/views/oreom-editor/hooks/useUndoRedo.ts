import type { Ref } from 'vue';
import type { AppTree } from './useMain';
import { cloneDeep } from 'lodash';

export const useUndoRedo = (source: Ref<AppTree[]>) => {
    let index = 0;
    const keepData: AppTree[][] = [];
    const onUndo = () => {
        index--;
        if (keepData[index]) {
            source.value = cloneDeep(keepData[index]);
        }
    };
    const onRedo = () => {
        index++;
        if (index <= keepData.length) {
            source.value = cloneDeep(keepData[index]);
        }
    };
    const appWatch = () => {
        console.log('set');
        keepData.push(cloneDeep(source.value));
        index = keepData.length - 1;
        console.log(keepData.length);
    };
    return {
        appWatch,
        onUndo,
        onRedo,
    };
};
