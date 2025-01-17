import { ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import { cloneDeep } from 'lodash';
import type { RouteRecordRaw } from 'vue-router';
import type { CurrentUserDetail } from '@/api/auth';
import type { Role } from '@/api/role';
import { ApiUser } from '@/api/user';

export const userInfoTemplate = {
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
    roles: [] as Role[],
    currentRole: {
        id: 0,
        code: '',
        name: '',
        enable: true,
        permissionIds: [] as number[],
    },
};

export const useAuthStore = defineStore('auth', () => {
    const menus = ref<RouteRecordRaw[]>(cloneDeep(router.options.routes) as RouteRecordRaw[]);

    const addMenu = (menu: RouteRecordRaw) => {
        menus.value.push(cloneDeep(menu));
    };
    /**
     * 重置菜单
     * 切换角色应该回出现BUG
     */
    const resetMenu = () => {
        menus.value = cloneDeep(router.options.routes) as RouteRecordRaw[];
    };

    const userDetail = ref<CurrentUserDetail>(cloneDeep(userInfoTemplate));

    const setUserDetail = (data = cloneDeep(userInfoTemplate)) => {
        userDetail.value = data;
    };

    const logout = async () => {
        await ApiUser.logout();
        localStorage.removeItem('accessToken');
        router.push('/login');
        location.reload();
    };

    return {
        menus,
        addMenu,
        resetMenu,
        userDetail,
        setUserDetail,
        logout,
    };
});
