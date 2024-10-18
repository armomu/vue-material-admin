import { ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import { cloneDeep } from 'lodash';
import type { RouteRecordRaw } from 'vue-router';
import type { CurrentUserDetail } from '@/api/auth';

export const useAuthStore = defineStore('auth', () => {
    const menus = ref<RouteRecordRaw[]>(cloneDeep(router.options.routes) as RouteRecordRaw[]);

    const addMenu = (menu: RouteRecordRaw) => {
        menus.value.push(cloneDeep(menu));
    };

    const resetMenu = () => {
        menus.value = cloneDeep(router.options.routes) as RouteRecordRaw[];
    };

    const userDetail = ref<CurrentUserDetail>({
        id: 0,
        username: '',
        enable: true,
        createTime: '',
        updateTime: '',
        profile: {
            id: 0,
            nickName: '',
            gender: 0,
            avatar: '',
            address: '',
            email: '',
            userId: 4,
        },
        roles: [],
        currentRole: {
            id: 0,
            code: '',
            name: '',
            enable: true,
            permissionIds: [],
        },
    });

    const setUserDetail = (data: CurrentUserDetail) => {
        userDetail.value = data;
    };

    return {
        menus,
        addMenu,
        resetMenu,
        userDetail,
        setUserDetail,
    };
});
