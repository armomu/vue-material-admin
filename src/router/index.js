import Vue from 'vue';
import Router from 'vue-router';

import layout from '@/layout/layout.vue';
// import treeRoute from '@/views/layout/router.vue';

Vue.use(Router);
const router = new Router({
    // mode:'history',
    routes: [
        //首页
        {
            path: '/',
            redirect: '/login',
            name: 'index',
            visible: false,
            component: layout,
            meta: {
                title: 'home',
                keepAlive: false
            }
        },
        // 仪表盘
        {
            path: '/dashboard',
            visible: true,
            component: layout,
            meta: {
                title: 'dashboard',
                icon: 'mdi-gauge',
                keepAlive: false
            },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    meta: {
                        title: 'dashboard',
                        icon: 'mdi-gauge',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
                },
            ]
        },
        // 任务
        {
            path: '/tasks',
            visible: true,
            component: layout,
            redirect: '/tasks/list',
            meta: {
                title: 'task',
                icon: 'mdi-checkbox-multiple-marked-circle',
                keepAlive: false
            },
            children: [
                {
                    path: ':label',
                    name: 'myTask',
                    meta: {
                        title: 'Tasks',
                        icon: 'mdi-alpha-t',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "myTask" */ '@/views/task/list.vue')
                }
            ]
        },
        // 组件
        {
            path: '/components',
            visible: true,
            redirect: '/components/table',
            component: layout,
            meta: {
                title: 'components',
                icon: 'mdi-view-comfy',
                keepAlive: false
            },
            children: [
                {
                    path: 'widgets',
                    name: 'widget',
                    meta: {
                        title: 'widgets',
                        icon: 'mdi-alpha-w',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "table" */ '@/views/components/widget.vue')
                },
                {
                    path: 'sparklines',
                    name: 'sparklines',
                    meta: {
                        title: 'Sparklines',
                        icon: 'mdi-alpha-s',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "charts" */ '@/views/components/sparklines.vue')
                },
                {
                    path: 'form',
                    name: 'form',
                    meta: {
                        title: 'form',
                        icon: 'mdi-alpha-f',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "charts" */ '@/views/components/form.vue')
                },
                {
                    path: 'table',
                    name: 'starTask',
                    meta: {
                        title: 'table',
                        icon: 'mdi-alpha-t',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "starTask" */ '@/views/components/table.vue')
                }
            ]
        },
        // 地图
        {
            path: '/map',
            visible: true,
            redirect: '/map',
            component: layout,
            meta: {
                title: 'map',
                icon: 'mdi-map-marker-radius',
                keepAlive: false
            },
            children: [
                {
                    path: '/map',
                    name: 'map',
                    meta: {
                        title: 'map',
                        icon: 'mdi-map-marker-radius',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "map" */ '@/views/map/index.vue')
                },
            ]
        },
        // 流程图
        {
            path: '/flow-editor',
            visible: true,
            component: layout,
            meta: {
                title: 'flowEditor',
                icon: 'mdi-vector-triangle',
                keepAlive: false
            },
            children: [
                {
                    path: '/flow-editor',
                    name: 'FlowEditor',
                    meta: {
                        title: 'Flow Editor',
                        icon: 'mdi-vector-triangle',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "flowchart" */ '@/views/flowchart/index.vue')
                }
            ]
        },
        // 测试页面缓存
        {
            path: '/keep-alive',
            visible: false,
            component: layout,
            meta: {
                title: 'keepAlive',
                icon: 'mdi-archive-arrow-down-outline',
                keepAlive: false
            },
            children: [
                {
                    path: '/keep-alive',
                    name: 'keepAlive',
                    meta: {
                        title: 'Keep Alive',
                        strategy: 'keep', // keep,  refresh
                        keepAlive: true
                    },
                    component: () => import(/* webpackChunkName: "keepAlive" */ '@/views/keep-alive/index.vue'),
                }
            ]
        },
        // 测试离开缓存页面
        {
            path: '/keep-alive',
            visible: false,
            component: layout,
            meta: {
                title: 'keepAlive',
                icon: 'mdi-archive-arrow-down-outline',
                keepAlive: false
            },
            children: [
                {
                    path: ':id',
                    name: 'ddddd',
                    meta: {
                        title: 'Keep Alive',
                        icon: '',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "widget22" */ '@/views/keep-alive/inner.vue')
                }
            ]
        },
        // 登录页面
        {
            path: '/login',
            name: 'login',
            visible: true,
            meta: {
                title: 'login',
                icon: 'mdi-fingerprint',
                keepAlive: false
            },
            component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
        },
        {
            path: '/404',
            name: '404',
            visible: false,
            component: () => import(/* webpackChunkName: "404page" */ '@/views/exception-page/404.vue'),
            meta: {
                title: '404',
                keepAlive: false
            }
        },
        { path: '*', redirect: '/404' }
    ],
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return { x: 0, y: 0 };
    //     }
    // }
});

export default router;