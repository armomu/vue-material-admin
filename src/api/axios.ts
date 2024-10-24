import Axios from 'axios';
import router from '@/router';
import type {
    AxiosResponse,
    AxiosRequestConfig,
    AxiosError,
    AxiosPromise,
    InternalAxiosRequestConfig,
} from 'axios';
import { useSnackbarStore } from '@/stores/useSnackbarStore';

declare module 'axios' {
    export interface AxiosRequestConfig {
        loading?: boolean;
        banErrTip?: boolean;
    }
}

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 */
const request = Axios.create({
    baseURL: import.meta.env.VITE_API,
    // baseURL: 'https://apifoxmock.com/m1/5061937-4723200-default',
    // baseURL: 'http://localhost:8085',
    timeout: 20000,
});

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
request.interceptors.request.use((config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token || '';
    return config;
});

/**
 * @description 响应收到后的拦截器
 */
request.interceptors.response.use(
    /** 请求有响应 */
    (response: AxiosResponse) => {
        // console.log(response.data);
        return Promise.resolve(response.data);
    },
    /** 请求无响应 */
    async (error: AxiosError<RootInterface<void>>): Promise<AxiosPromise> => {
        const snackbarEvent = useSnackbarStore();
        if (error.response?.data?.message) {
            snackbarEvent.addItem(error.response?.data?.message);
        } else {
            snackbarEvent.addItem(error.message);
        }
        if (error.response?.status === 401) {
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default request;

export interface RootInterface<T> {
    code: number;
    message: string;
    data: T;
    originUrl: string;
}

export interface ArrayResult<T> {
    pageData: T[];
    total: number;
}
