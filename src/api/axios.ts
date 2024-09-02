import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError, AxiosPromise } from 'axios';
import router from '@/router';
import { tiledRoute } from '@/router/tiled-route';
import { ElMessage, ElLoading } from 'element-plus';

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */
const request = Axios.create({
    baseURL: import.meta.env.VITE_API as string,
    timeout: 20000,
});

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */

let loadingInstance: any = null;
request.interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (localStorage.getItem('Authorization')) {
        config.headers = {
            ...config.headers,
            Authorization: localStorage.getItem('Authorization') || '',
        };
        config['loadingTarget'] = config.loadingTarget || '.app-content';
        if (config.loading) {
            loadingInstance = ElLoading.service({
                target: config.loadingTarget,
            });
        }
    }
    return config;
});


// const delay = (t?: number) => {
//     return new Promise<void>((r,) => {
//         setTimeout(() => {
//             r();
//         }, t)
//     })
// }
/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
request.interceptors.response.use(
    /** 请求有响应 */
    async (response: AxiosResponse): Promise<AxiosPromise> => {
        // await delay(300);
        loadingInstance?.close();
        const dom = document.getElementsByClassName('el-loading-mask');
        dom[0]?.remove();
        if (response.status === 200 && response.data.code === 200) {
            return Promise.resolve(response.data);
        } else if (response.status === 200 && response.data.code === 401) {
            if (router.currentRoute.value.path !== tiledRoute.login.path) {
                router.push(tiledRoute.login.path);
                location.reload();
            }
            return Promise.reject(response.data);
        } else if (response.status === 200 && response.data.code === 40004) {
            router.push(tiledRoute.login.path);
            return Promise.reject(response.data);
        } else {
            if (!response.config.banErrTip) {
                ElMessage.error(response.data.message);
            }
            return Promise.reject(response.data);
        }
    },
    /** 请求无响应 */
    (error: AxiosError): Promise<AxiosPromise> => {
        loadingInstance?.close();
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
);

export default request;

declare module 'axios' {
    export interface AxiosRequestConfig {
        loading?: boolean; // 接口请求时是否需要启用加载动画
        loadingTarget?: string; // 接口请求时是否需要启用加载动画
        banErrTip?: boolean; // 接口请求失败时是否进行弹窗提示
    }
}
declare module 'axios' {
    export interface AxiosResponse {
        code: number;
        message: string;
    }
}


export interface ApiModel<T = any> {
    result: T;
}

export interface ApiListModel<T = any> {
    result: Array<T>;
    total: number;
}

export interface Result<T = any> {
    result: T;
}

export interface DataList<T = any> {
    result: Array<T>;
    total: number;
}
