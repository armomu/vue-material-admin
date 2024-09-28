import { ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import { cloneDeep } from 'lodash';
import type { RouteRecordRaw } from 'vue-router';

export const useMenuStore = defineStore('menus', () => {
    // @ts-ignore
    const menus = ref<RouteRecordRaw[]>(cloneDeep(router.options.routes));

    const addMenu = (menu: RouteRecordRaw) => {
        menus.value.push(cloneDeep(menu));
    };
    return {
        menus,
        addMenu,
    };
});
