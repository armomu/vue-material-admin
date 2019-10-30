import Vue from 'vue';
import Router from 'vue-router';

import layout from '@/views/layout/layout.vue';

Vue.use(Router);

export default new Router({
    // mode:'history',
    routes: [
        //首页
        {
            path: '/',
            redirect: '/login',
            name: '/',
            hidden: false,
            component: layout,
            meta: {
                title: '首页',
                keepAlive: false
            },
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    title: '动态',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
                },
                {
                    path: 'task',
                    name: 'task',
                    redirect: '/task/mine',
                    title: '任务',
                    component: () => import(/* webpackChunkName: "task" */ '@/views/task/router.vue'),
                    children: [
                        {
                            path: 'mine',
                            name: 'myTask',
                            title: '我的任务',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/task/index.vue')
                        },
                        {
                            path: 'star',
                            name: 'starTask',
                            title: '星标任务',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/task/star.vue')
                        },
                        {
                            path: 'book',
                            name: 'bookTask',
                            title: '星标任务',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/task/book.vue')
                        },
                        {
                            path: 'image',
                            name: 'imageTask',
                            title: '星标任务',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/task/image.vue')
                        },
                    ]
                },
                {
                    path: 'componnets',
                    name: 'componnets',
                    title: '组件',
                    component: () => import(/* webpackChunkName: "component" */ '@/views/component/router.vue'),
                    children: [
                        {
                            path: '',
                            name: 'xxx',
                            title: '我的任务',
                            component: () => import(/* webpackChunkName: "xxx" */ '@/views/task/image.vue')
                        }
                    ]
                },
                {
                    path: 'map',
                    name: 'map',
                    title: '地图',
                    component: () => import(/* webpackChunkName: "map" */ '@/views/map/index.vue')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            title: '登录',
            component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
        },
    ]
});

