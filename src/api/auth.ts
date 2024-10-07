import request from './axios';
import type { RootInterface, ArrayResult } from './axios';

export const ApiAuth = {
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
    component: string;
    layout?: string;
    keepAlive?: any;
    method?: any;
    description?: any;
    show: boolean;
    enable: boolean;
    order: number;
    children?: MenuInterface[];
}
