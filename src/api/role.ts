import request from './axios';
import type { RootInterface, ArrayResult } from './axios';

export const ApiRole = {
    list: (): Promise<RootInterface<Role[]>> => {
        return request({
            url: '/role',
        });
    },
    listPage: (params: any): Promise<RootInterface<ArrayResult<Role>>> => {
        return request({
            url: '/role/page',
            params,
        });
    },
    edit: (data: Role): Promise<void> => {
        return request({
            url: `/role/${data.id}`,
            method: 'patch',
            data,
        });
    },
    add: (data: Role): Promise<void> => {
        return request({
            url: `/role`,
            method: 'post',
            data,
        });
    },
};

export interface Role {
    code: string;
    enable: boolean;
    id: number;
    name: string;
    permissionIds: number[];
}
