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
            path: '/',
            redirect: '/dashboard/smart-house',
            name: 'Dashboard',
            meta: {
                visible: true,
                title: 'Dashboard',
                icon: 'mdi-gauge',
            },
            component: Layout,
            children: [
                {
                    path: '/dashboard/tesla-model-s',
                    name: 'teslaModelS',
                    meta: {
                        title: 'Tesla Model S',
                        icon: 'mdi-alpha-t',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/dashboard/teslaModelS.vue'),
                    children: [],
                },
                {
                    path: '/dashboard/smart-house',
                    name: 'smartHouse',
                    meta: {
                        title: 'Smart House',
                        icon: 'mdi-alpha-s',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/dashboard/smartHouse.vue'),
                    children: [],
                },
            ],
        },
        {
            path: '/componets',
            name: 'componets',
            meta: {
                visible: true,
                title: 'Componets',
                icon: 'mdi-cube-scan',
            },
            component: Layout,
            children: [
                {
                    path: 'samples',
                    name: 'Samples',
                    meta: {
                        title: 'Samples',
                        icon: 'mdi-alpha-s',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/componets/sample.vue'),
                    children: [],
                },
                {
                    path: 'table',
                    name: 'table',
                    meta: {
                        title: 'Table',
                        icon: 'mdi-alpha-t',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/componets/table.vue'),
                    children: [],
                },
                {
                    path: 'calendar',
                    name: 'calendar',
                    meta: {
                        title: 'Calendar',
                        icon: 'mdi-alpha-c',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/componets/calendar.vue'),
                    children: [],
                },
            ],
        },
        {
            path: '/graphics',
            name: 'graphics',
            meta: {
                visible: true,
                title: 'Graphics',
                icon: 'mdi-image',
            },
            component: Layout,
            children: [
                {
                    path: 'three-js',
                    name: 'three.js',
                    meta: {
                        keepAlive: false,
                        title: 'Three.js',
                        icon: 'mdi-alpha-t',
                        visible: true,
                    },
                    component: () => import('@/views/graphics/threeJs.vue'),
                },
                {
                    path: 'babylonjs',
                    name: 'Babylon.js',
                    meta: {
                        keepAlive: false,
                        title: 'Babylon.js',
                        icon: 'mdi-alpha-b',
                        visible: true,
                    },
                    component: () => import('@/views/babylonjs/babylonjs.vue'),
                },
                {
                    path: 'pixijs',
                    name: 'Pixi.js',
                    meta: {
                        keepAlive: false,
                        title: 'Pixi.js',
                        icon: 'mdi-alpha-p',
                        visible: true,
                    },
                    component: () => import('@/views/graphics/pixiJs.vue'),
                },
            ],
        },
        {
            path: '/editor',
            name: 'Editor',
            meta: {
                visible: true,
                title: 'Editor',
                icon: 'mdi-view-module',
            },
            component: Layout,
            children: [
                {
                    path: 'layer-edit',
                    name: 'layerEdit',
                    meta: {
                        title: 'Layer Edit',
                        icon: 'mdi-alpha-l',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/layer-edit/index.vue'),
                    children: [],
                },
                {
                    path: 'oreom-editor',
                    name: 'oreom',
                    meta: {
                        title: 'Oreom Editor',
                        icon: 'mdi-alpha-o',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/oreom-editor/index.vue'),
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
