import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/layout.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior() {
        return { top: 0 };
    },
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'index',
            component: Layout,
            children: [],
            meta: {
                visible: false,
                title: 'home',
                keepAlive: false,
            },
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'Login',
                icon: 'mdi-fingerprint',
                visible: true,
            },
            component: () => import('@/views/login/login.vue'),
        },
        {
            path: '/',
            redirect: '/dashboard',
            name: 'index',
            component: Layout,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    meta: {
                        title: 'Dashboard',
                        icon: 'mdi-gauge',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/dashboard/dashboard.vue'),
                    children: [],
                },
                {
                    path: '',
                    name: 'dashboard',
                    meta: {
                        title: 'Dashboard',
                        icon: 'D',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/dashboard/dashboard.vue'),
                    children: [],
                },
            ],
        },
        { path: '/:pathMatch(.*)', name: 'Match', redirect: '/404' },
        { path: '/404', name: '404', component: () => import('@/views/feedback/404.vue') },
    ],
});

export default router;
