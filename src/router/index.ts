import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/layout.vue';

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
                    path: 'tables',
                    name: 'tables',
                    meta: {
                        title: 'Tables',
                        icon: 'mdi-alpha-t',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/componets/table.vue'),
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
                    component: () => import('@/views/graphics/babylonjs.vue'),
                },
            ],
        },
        {
            path: '/low-code',
            name: 'LowCode',
            meta: {
                visible: true,
                title: 'Low Code',
                icon: 'mdi-view-module',
            },
            component: Layout,
            children: [
                {
                    path: 'layer-edit-example',
                    name: 'layerEdit',
                    meta: {
                        title: 'Layer Edit Example',
                        icon: 'mdi-alpha-l',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/low-code/layer-edit.vue'),
                    children: [],
                },
            ],
        },
        {
            path: '/map',
            name: 'map',
            meta: {
                visible: true,
                title: 'Map',
                icon: 'mdi-compass',
            },
            component: Layout,
            children: [
                {
                    path: 'amap',
                    name: 'amap',
                    meta: {
                        title: 'Amap',
                        icon: 'mdi-alpha-a',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/map/amap.vue'),
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
                visible: true,
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
