import request from './axios';
import type { RootInterface, ArrayResult } from './axios';

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
    edit: (data: any): Promise<RootInterface<UserInterface>> => {
        return request({
            url: '/user',
            data,
        });
    },
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

export interface Role {
    id: number;
    code: string;
    name: string;
    enable: boolean;
}
