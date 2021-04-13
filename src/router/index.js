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
                title: 'Dashboard',
                icon: 'mdi-gauge',
                keepAlive: false
            },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    meta: {
                        title: 'Dashboard',
                        hideNav: true,
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
                title: 'Task',
                icon: 'mdi-checkbox-multiple-marked-circle',
                keepAlive: false
            },
            children: [
                {
                    path: ':label',
                    name: 'myTask',
                    meta: {
                        title: 'Tasks',
                        hideNav: true,
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
                title: 'Components',
                icon: 'mdi-view-comfy',
                keepAlive: false
            },
            children: [
                {
                    path: 'widgets',
                    name: 'widget',
                    meta: {
                        title: 'Widgets',
                        icon: 'mdi-alpha-w',
                        hideNav: false,
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
                        hideNav: false,
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "charts" */ '@/views/components/sparklines.vue')
                },
                {
                    path: 'form',
                    name: 'form',
                    meta: {
                        title: 'Form',
                        icon: 'mdi-alpha-f',
                        hideNav: false,
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "charts" */ '@/views/components/form.vue')
                },
                {
                    path: 'table',
                    name: 'starTask',
                    meta: {
                        title: 'Table',
                        icon: 'mdi-alpha-t',
                        hideNav: false,
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
                title: 'Map',
                icon: 'mdi-map-marker-radius',
                keepAlive: false
            },
            children: [
                {
                    path: '',
                    name: 'map',
                    meta: {
                        title: 'Map',
                        icon: 'mdi-map-marker-radius',
                        hideNav: true,
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
                title: 'FlowEditor',
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
                        hideNav: false,
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
                    path: '',
                    name: 'keepAlive',
                    meta: {
                        title: 'Keep Alive',
                        hideNav: true,
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
                        hideNav: true,
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
                title: 'Login',
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