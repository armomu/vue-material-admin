import router from '@/router';
import request from './axios';
import type { AxiosPromise } from 'axios';

export class ApiAuth {
    static async login(data: SignApi): Promise<void> {
        try {
            const res = await request({
                url: '/auth/login',
                method: 'POST',
                data,
            });
            localStorage.setItem('accessToken', res.data.accessToken);
            // console.log(res);
            // router.push('/');
            return Promise.resolve();
        } catch (err) {
            return Promise.reject();
        }
    }
    static captcha(): Promise<string> {
        return request({
            url: '/auth/captcha',
        });
    }

    static async setRouterMenu(): Promise<void> {
        try {
            const res = await request({
                url: '/role/permissions/tree',
            });

            // const routeGroup: Record<string, any> = {};
            // Object.keys(tiledRoute).forEach((key) => {
            //     routeGroup[key] = tiledRoute[key].component;
            // });
            // Object.keys(baseRoute).forEach((key) => {
            //     routeGroup[key] = baseRoute[key].component;
            // });
            // res.data.forEach((item) => {
            //     router.addRoute({
            //         path: item.path,
            //         name: item.component + item.id,
            //         meta: item.meta,
            //         component: routeGroup[item.component],
            //     });
            //     if (item.children && item.children.length > 0) {
            //         item.children.forEach((child) => {
            //             router.addRoute(item.component + item.id, {
            //                 path: child.path,
            //                 meta: child.meta,
            //                 name: child.component,
            //                 component: routeGroup[child.component],
            //             });
            //         });
            //     }
            // });
            // const { setMenu } = useMenuStore();
            // router['menus'] = res.data;
            // setMenu(res.data);
            // return Promise.resolve();
        } catch (err) {
            return Promise.resolve();
        }
    }

    static menuTree(): Promise<void> {
        return request({
            url: '/permission/tree',
        });
    }

    // static sinOut(to = true): void {}
    // static adminUserInfo(to = false): AdminUser | null {
    //     const res = localStorage.getItem('userInfo');
    //     if (!res && to) {
    //         this.sinOut();
    //     }
    //     return JSON.parse(res as string) as AdminUser;
    // }
    // static authUserInfo(): AxiosPromise<AdminUserInfo> {
    //     return request({
    //         url: '/admin/getUserInfo',
    //         method: 'get',
    //     });
    // }
    // static setAuth(authorityId: number): AxiosPromise<void> {
    //     return request({
    //         url: '/admin/setUserAuthority',
    //         method: 'post',
    //         data: {
    //             authorityId,
    //         },
    //     });
    // }
}

export interface SignApi {
    username: string;
    password: string;
    captcha: string;
}

export interface AdminInfo {
    alias: string;
    email: string;
    group_id: number;
    head: string;
    id: number;
    is_active: number;
    is_admin: boolean;
    means_list: Array<MenuRow>;
    mobile: string;
    name: string;
    openid: string;
    operator_id: number;
    password: string;
}

export interface LoginApiResponse {
    token: string;
    user: AdminUser;
}

interface ShopInfo {
    domain: string;
    head: string;
    logo: string;
    name: string;
    phone: string;
}
export interface AdminUser {
    alias?: string;
    email?: string;
    head?: string;
    id: number;
    is_active?: number;
    is_admin?: number;
    mobile?: string;
    name: string;
    open_id?: string;
    operator_id?: number;
    shop_info: ShopInfo;
}

export interface MenuRow {
    children: MenuRow;
    component: string;
    hidden: boolean;
    meta: Record<string, unknown>;
    name: string;
    path: string;
    redirect: string;
}

export interface AdminUserInfo {
    Alias: string;
    AuthorityId: number;
    CreatedAt: string;
    DeletedAt: null;
    Email: string;
    Head: string;
    ID: number;
    IsActive: number;
    IsAdmin: number;
    Mobile: string;
    Name: string;
    OpenID: string;
    OperatorID: number;
    Pwd: string;
    ShopId: number;
    authorities: Authority[];
    authority: Authority;
}
