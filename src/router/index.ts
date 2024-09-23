import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';

import { checkVersion } from '@/plugins/pwa';

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior() {
        return { top: 0 };
    },
    routes: [
        {
            path: '/authority',
            name: 'Auth',
            meta: {
                visible: true,
                title: 'Authority',
                icon: 'mdi-account-supervisor-circle',
            },
            component: Layout,
            children: [
                {
                    path: '',
                    name: 'authority',
                    meta: {
                        title: 'Authority',
                        icon: 'mdi-alpha-a',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/authority/index.vue'),
                    children: [],
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'Login',
                icon: 'mdi-shield-account',
                visible: false,
            },
            component: () => import('@/views/login/login.vue'),
        },
        { path: '/:pathMatch(.*)', name: 'Match', meta: { keepAlive: false }, redirect: '/404' },
        {
            path: '/404',
            name: '404',
            meta: { keepAlive: false, title: 'Not found', icon: 'mdi-paw-off', visible: false },
            component: Layout,
            children: [
                {
                    path: '',
                    name: 'd404',
                    meta: {
                        title: 'Not found',
                        visible: false,
                    },
                    component: () => import('@/views/feedback/no.vue'),
                    children: [],
                },
            ],
        },
    ],
});

router.beforeEach(async (to, _from, next) => {
    next();
});

router.afterEach(() => {
    checkVersion();
});
export default router;
