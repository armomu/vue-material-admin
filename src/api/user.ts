import request from './axios';
import type { RootInterface, ArrayResult } from './axios';
import type { Role } from './role';

export const ApiUser = {
    login: async (data: SignInterface): Promise<void> => {
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
    logout: (): Promise<void> => request({ url: '/auth/logout', method: 'post' }),
    /**
     * 获取验证码
     */
    captcha: (): Promise<string> => request({ url: '/auth/captcha' }),
    /**
     * 用户列表
     */
    users: (params: any): Promise<RootInterface<ArrayResult<UserInterface>>> => {
        return request({
            url: '/user',
            params,
        });
    },
    add: (data: AddUser): Promise<void> => {
        return request({
            url: '/user',
            method: 'post',
            data,
        });
    },
    edit: (data: EditUser): Promise<RootInterface<UserInterface>> => {
        return request({
            url: `/user/${data.id}`,
            method: 'patch',
            data: {
                id: data.id,
                enable: data.enable,
                roleIds: data.roleIds,
            },
        });
    },
    delete: (id: number): Promise<void> => request({ url: `/user/${id}`, method: 'delete' }),
};

export interface SignInterface {
    username: string;
    password: string;
    captcha?: string;
}

export interface UserInterface {
    id: number;
    username: string;
    enable: boolean;
    createTime: string;
    updateTime: string;
    roles: Role[];
    gender: number;
    avatar: string;
    address: string;
    email: string;
}
export interface AddUser extends EditUser {
    username: string;
    password: string;
}
export interface EditUser {
    id?: number;
    enable: boolean;
    roleIds: number[];
}
