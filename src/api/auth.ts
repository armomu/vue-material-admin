import request from './axios';
import type { RootInterface } from './axios';

export const ApiAuth = {
    login: async (data: SignApi): Promise<void> => {
        try {
            const res = await request({
                url: '/auth/login',
                method: 'POST',
                data,
            });
            localStorage.setItem('accessToken', 'Bearer ' + res.data.accessToken);
            // router.push('/');
            return Promise.resolve();
        } catch (err) {
            return Promise.reject();
        }
    },
    captcha: (): Promise<string> => request({ url: '/auth/captcha' }),

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
    delMenu: (id: any): Promise<void> => {
        return request({
            url: '/permission/' + id,
            method: 'delete',
        });
    },
    users: (params: any): Promise<void> => {
        return request({
            url: '/user',
            params,
        });
    },
};

export interface SignApi {
    username: string;
    password: string;
    captcha: string;
}

export interface MenuInterface {
    id: number;
    name: string;
    code: string;
    icon_: string;
    type: string;
    type_: string;
    parentId?: any;
    path: string;
    redirect?: any;
    icon: string;
    component?: string;
    layout?: string;
    keepAlive?: any;
    method?: any;
    description?: any;
    show: boolean;
    enable: boolean;
    order: number;
    children?: MenuInterface[];
}
