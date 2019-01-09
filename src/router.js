import Vue from 'vue'
import Router from 'vue-router'

import layout from '@/views/layout/layout.vue';

Vue.use(Router);

export default new Router({
    // mode:'history',
    routes: [
        //首页
        {
            path: '/',
            redirect: '/home',
            name: '/',
            hidden: false,
            component: layout,
            meta: {
                title: '首页',
                keepAlive: false
            },
            children: [
                //首页
                {
                    path: 'home',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "login" */ "@/views/home/index.vue"),
                    meta: {
                        icon: 'home',
                        title: '首页',
                        keepAlive: false
                    },
                }
            ]
        },
        {
            path: '/about',
            name: 'about',
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

