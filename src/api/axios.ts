import Axios from 'axios';
import type {
    AxiosResponse,
    AxiosRequestConfig,
    AxiosError,
    AxiosPromise,
    InternalAxiosRequestConfig,
} from 'axios';

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

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 */
const request = Axios.create({
    // baseURL: import.meta.env.VITE_API as string,
    baseURL: import.meta.env.VITE_API || 'http://localhost:8085',
    timeout: 20000,
});

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
request.interceptors.request.use((config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    const token = localStorage.getItem('Authorization');
    config.headers.Authorization = token || '';
    // config.withCredentials = true;
    console.log(config, '======');
    return config;
});

/**
 * @description 响应收到后的拦截器
 */
request.interceptors.response.use(
    /** 请求有响应 */
    (response: AxiosResponse) => {
        return Promise.resolve(response.data);
    },
    /** 请求无响应 */
    (error: AxiosError): Promise<AxiosPromise> => {
        return Promise.reject(error);
    }
);

export default request;

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
