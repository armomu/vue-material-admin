import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/views/layout/layout.vue';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        //首页
        {
            path: '/',
            redirect: '/moving',
            name: '/',
            hidden: false,
            component: layout,
            meta: {
                title: '首页',
                keepAlive: false
            },
            children: [
                {
                    path: 'moving',
                    name: 'moving',
                    title: '动态',
                    component: () => import(/* webpackChunkName: "login" */ "@/views/moving/index.vue")
                },
                {
                    path: 'task',
                    name: 'task',
                    title:"任务",
                    component: () => import(/* webpackChunkName: "login" */ "@/views/task/index.vue")
                },
                {
                    path: 'schedule',
                    name: 'schedule',
                    title:"日程",
                    component: () => import(/* webpackChunkName: "login" */ "@/views/schedule/index.vue")
                },
                {
                    path: 'flies',
                    name: 'flies',
                    title:"文件",
                    component: () => import(/* webpackChunkName: "login" */ "@/views/flies/index.vue")
                },
                {
                    path: 'map',
                    name: 'map',
                    title:"地图",
                    component: () => import(/* webpackChunkName: "login" */ "@/views/map/index.vue")
                },
            ]
        },
        {
            path: '/about',
            hidden: false,
            component: layout,
            meta: {
                title: '页面',
                keepAlive: false
            },
            children: [
                //首页
                {
                    path: '',
                    name: 'page1',
                    component: () => import(/* webpackChunkName: "login" */ '@/views/About.vue'),
                    meta: {
                        icon: 'home',
                        title: '新页面1',
                        keepAlive: false
                    },
                }
            ]
        }

    ]
})

