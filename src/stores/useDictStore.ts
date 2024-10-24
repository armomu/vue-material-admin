import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useDictStore = defineStore('dict', () => {
    const dictList = ref<Obj>({});
    /**
     * @description 获取所有字典列表供选择器组件提取使用
     * @returns {void}
     */
    function initDict() {
        const modules = import.meta.glob('@/dict/*.ts');
        const paths = [];
        const obj: Obj = {};
        for (const path in modules) {
            paths.push(modules[path]());
        }
        Promise.all(paths).then((res) => {
            for (const mod in res) {
                // @ts-ignore
                for (const item in res[mod]) {
                    // @ts-ignore
                    obj[item] = res[mod][item];
                }
            }
            dictList.value = obj;
        });
    }
    initDict();

    return {
        dictList,
    };
});
interface Obj {
    [key: string]: {
        value: number;
        label: string;
        color: string;
    };
}
