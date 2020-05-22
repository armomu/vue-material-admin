import Vue from 'vue';
import Router from 'vue-router';

import layout from '@/views/layout/layout.vue';
// import treeRoute from '@/views/layout/router.vue';


Vue.use(Router);

export default new Router({
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
            path: '/task',
            visible: true,
            redirect: '/task/mine',
            component: layout,
            meta: {
                title: 'task',
                icon: 'mdi-checkbox-multiple-marked-circle',
                keepAlive: false
            },
            children: [
                {
                    path: 'mine',
                    name: 'myTask',
                    meta: {
                        title: 'mine',
                        icon: 'mdi-alpha-m',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "myTask" */ '@/views/task/index.vue')
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
                    path: 'widget',
                    name: 'widget',
                    meta: {
                        title: 'widget',
                        icon: 'mdi-alpha-w',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "table" */ '@/views/component/widget.vue')
                },
                {
                    path: 'charts',
                    name: 'charts',
                    meta: {
                        title: 'charts',
                        icon: 'mdi-alpha-c',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "charts" */ '@/views/component/charts.vue')
                },
                {
                    path: 'form',
                    name: 'form',
                    meta: {
                        title: 'form',
                        icon: 'mdi-alpha-f',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "charts" */ '@/views/component/form.vue')
                },
                {
                    path: 'table',
                    name: 'starTask',
                    meta: {
                        title: 'table',
                        icon: 'mdi-alpha-t',
                        keepAlive: false
                    },
                    component: () => import(/* webpackChunkName: "starTask" */ '@/views/component/table.vue')
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
    ]
});

