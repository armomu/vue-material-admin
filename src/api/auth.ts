import type { RouteMeta } from 'vue-router';
import request from './axios';
import type { RootInterface } from './axios';
import type { Role } from './role';

export const ApiAuth = {
    // 当前登陆用户的详情
    detail: (): Promise<RootInterface<CurrentUserDetail>> => request({ url: '/user/detail' }),
    curMenuTree: (): Promise<RootInterface<MenuInterface[]>> => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            return Promise.reject();
        }
        return request({
            url: '/role/permissions/tree',
        });
    },
    menuTree: (): Promise<RootInterface<MenuInterface[]>> => {
        return request({
            url: '/permission/tree',
        });
    },
    editMenu: (id: any, data: any): Promise<void> => {
        return request({
            url: '/permission/' + id,
            data,
            method: 'patch',
        });
    },
    addMenu: (data: any): Promise<void> => {
        return request({
            url: '/permission',
            data,
            method: 'post',
        });
    },
    /**
     * 删除菜单
     * @param id
     */
    delMenu: (id: any): Promise<void> => {
        return request({
            url: '/permission/' + id,
            method: 'delete',
        });
    },
};

export interface MenuInterface {
    id: number;
    name: string;
    code: string;
    icon_: string;
    type: string;
    type_: string;
    parentId?: any;
    path: string;
    redirect: any;
    icon: string;
    component: any;
    layout?: string;
    keepAlive?: any;
    method?: any;
    description?: any;
    show: boolean;
    enable: boolean;
    order: number;
    meta?: RouteMeta | undefined;
    children?: MenuInterface[];
}
export interface CurrentUserDetail {
    createTime: string;
    currentRole: Role;
    enable: boolean;
    id: number;
    profile: Profile;
    roles: Role[];
    updateTime: string;
    username: string;
    [property: string]: any;
}

export interface Profile {
    address: string;
    avatar: string;
    email: string;
    gender: number;
    id: number;
    nickName: string;
    userId: number;
}
