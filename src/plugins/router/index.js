import Vue from 'vue';
import Router from 'vue-router';

import layout from '@/views/layout/layout.vue';
import treeRoute from '@/views/layout/router.vue';


Vue.use(Router);

export default new Router({
    // mode:'history',
    routes: [
        //首页
        {
            path: '/',
            redirect: '/components/charts',
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
                    meta: {
                        title: '仪表盘',
                        icon: 'mdi-gauge',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
                },
                {
                    path: 'task',
                    name: 'task',
                    redirect: '/task/mine',
                    meta: {
                        title: '任务',
                        icon: 'mdi-checkbox-multiple-marked-circle',
                        keepAlive: false
                    },
                    component: treeRoute,
                    children: [
                        {
                            path: 'mine',
                            name: 'myTask',
                            title: '我的任务',
                            meta: {
                                title: 'mine',
                                icon: 'mdi-alpha-m',
                                keepAlive: false
                            },
                            component: () => import(/* webpackChunkName: "myTask" */ '@/views/task/index.vue')
                        },
                        {
                            path: 'star',
                            name: 'starTask',
                            title: '星标任务',
                            meta: {
                                title: 'star',
                                icon: 'mdi-alpha-s',
                                keepAlive: false
                            },
                            component: () => import(/* webpackChunkName: "starTask" */ '@/views/task/star.vue')
                        }
                    ]
                },
                {
                    path: 'components',
                    name: 'components',
                    redirect: '/components/table',
                    meta: {
                        title: '组件',
                        icon: 'mdi-view-comfy',
                        keepAlive: false
                    },
                    component: treeRoute,
                    children: [
                        {
                            path: 'table',
                            name: 'table',
                            meta: {
                                title: 'table',
                                icon: 'mdi-alpha-t',
                                keepAlive: false
                            },
                            component: () => import(/* webpackChunkName: "table" */ '@/views/task/image.vue')
                        },
                        {
                            path: 'charts',
                            name: 'charts',
                            meta: {
                                title: 'charts',
                                icon: 'mdi-alpha-c',
                                keepAlive: false
                            },
                            component: () => import(/* webpackChunkName: "table" */ '@/views/component/charts.vue')
                        }
                    ]
                },
                {
                    path: 'map',
                    name: 'map',
                    meta: {
                        title: '地图',
                        icon: 'mdi-map-marker-radius',
                        keepAlive: false
                    },
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

