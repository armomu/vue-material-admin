import request from './axios';
import type { RootInterface, ArrayResult } from './axios';

export const ApiRole = {
    list: (): Promise<RootInterface<ArrayResult<UserInterface>>> => {
        return request({
            url: '/role/page',
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
