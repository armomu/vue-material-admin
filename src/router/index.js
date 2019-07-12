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
            redirect: '/dashboard',
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
                    component: () => import(/* webpackChunkName: "moving" */ '@/views/dashboard/index.vue')
                },
                {
                    path: 'task',
                    name: 'task',
                    title: '任务',
                    component: () => import(/* webpackChunkName: "task" */ '@/views/task/index.vue')
                },
                {
                    path: 'schedule',
                    name: 'schedule',
                    title: '日程',
                    component: () => import(/* webpackChunkName: "schedule" */ '@/views/schedule/index.vue')
                },
                {
                    path: 'flies',
                    name: 'flies',
                    title: '文件',
                    component: () => import(/* webpackChunkName: "flies" */ '@/views/flies/index.vue')
                },
                {
                    path: 'map',
                    name: 'map',
                    title: '地图',
                    component: () => import(/* webpackChunkName: "map" */ '@/views/map/index.vue')
                },
            ]
        },
    ]
});

