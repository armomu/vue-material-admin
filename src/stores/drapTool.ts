import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { onUpVersion } from '@/plugins/pwa';

export const useDrapToolStore = defineStore('drapTool', () => {
    const position = reactive({
        x: 0,
        y: 0,
    });
    const onSetDrapXy = (x: number, y: number) => {
        position.x = x;
        position.y = y;
    };

    return { position, onSetDrapXy };
});
