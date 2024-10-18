import Layout from '@/layout/index.vue';
export default [
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
                name: 'three-js',
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
                path: 'pixi-js',
                name: 'pixi-js',
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
                path: 'oreo-editor',
                name: 'oreo',
                meta: {
                    title: 'Oreo Editor',
                    icon: 'mdi-alpha-o',
                    keepAlive: false,
                    visible: true,
                },
                component: () => import('@/views/oreo-editor/index.vue'),
                children: [],
            },
        ],
    },
    {
        path: '/access-control',
        name: 'AccessControl',
        meta: {
            visible: true,
            title: 'Access Control',
            icon: 'mdi-account-supervisor-circle',
        },
        component: Layout,
        children: [
            {
                path: 'menus',
                name: 'menus',
                meta: {
                    title: 'Menus',
                    icon: 'mdi-alpha-m',
                    keepAlive: false,
                    visible: true,
                },
                component: () => import('@/views/rbac/index.vue'),
                children: [],
            },
        ],
    },
];
