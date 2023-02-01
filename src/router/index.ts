import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/layout.vue';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior() {
        return { top: 0 };
    },
    routes: [
        {
            path: '/',
            redirect: '/dashboard/tesla-model-s',
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
                // {
                //     path: '/dashboard/sparklines',
                //     name: 'sparklines',
                //     meta: {
                //         title: 'Sparklines',
                //         icon: 'mdi-alpha-s',
                //         keepAlive: false,
                //         visible: true,
                //     },
                //     component: () => import('@/views/dashboard/sparklines.vue'),
                //     children: [],
                // },
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
                    path: 'sample',
                    name: 'allSample',
                    meta: {
                        title: 'Sample',
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
            ],
        },
        {
            path: '/graphics',
            name: 'graphics',
            meta: {
                visible: true,
                title: '3D Graphics',
                icon: 'mdi-image',
            },
            component: Layout,
            children: [
                // {
                //     path: 'cruel-mushroom',
                //     name: 'mushroom',
                //     meta: {
                //         keepAlive: false,
                //         title: 'Cruel mushroom',
                //         icon: 'mdi-alpha-c',
                //         visible: true,
                //     },
                //     component: () => import('@/views/graphics/mushroom.vue'),
                // },
                {
                    path: 'canvas',
                    name: 'canvas',
                    meta: {
                        keepAlive: false,
                        title: 'Canvas',
                        icon: 'mdi-alpha-c',
                        visible: true,
                    },
                    component: () => import('@/views/graphics/canvas.vue'),
                },
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
                // {
                //     path: 'baidu-map',
                //     name: 'baiduMap',
                //     meta: {
                //         title: 'Baidu map',
                //         icon: 'mdi-alpha-b',
                //         keepAlive: false,
                //         visible: true,
                //     },
                //     component: () => import('@/views/map/baiduMap.vue'),
                //     children: [],
                // },
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
            component: () => import('@/views/feedback/no.vue'),
        },
        // {
        //     path: '/document',
        //     name: 'document',
        //     meta: {
        //         keepAlive: false,
        //         title: 'Document',
        //         icon: 'mdi-microsoft-word',
        //         visible: true,
        //     },
        //     component: () => import('@/views/feedback/no.vue'),
        // },
    ],
});

NProgress.configure({ showSpinner: false });
router.beforeEach(async (to, _from, next) => {
    // console.log(to, _from);
    NProgress.start();
    // try {
    //     if (import.meta.env.MODE !== 'development') {
    //         const versionScript = document.createElement('script');
    //         versionScript.src = location.origin + '/version.js?v=' + new Date().getTime();
    //         const s = document.getElementsByTagName('script')[0];
    //         s.parentNode?.insertBefore(versionScript, s);
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
    next();
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
export default router;
