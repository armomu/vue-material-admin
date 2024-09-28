import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { checkVersion } from '@/plugins/pwa';
import { ApiAuth, type MenuInterface } from '@/api/auth';
import { useMenuStore } from '@/stores/useMenuStore';

const menu = {
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
            component: () => import('@/views/authority/index.vue'),
            children: [],
        },
    ],
};
const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior() {
        return { top: 0 };
    },
    routes: [
        menu,
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

export async function syncRouter() {
    try {
        const menuEvent = useMenuStore();
        const routeComponents = import.meta.glob('@/views/**/*.vue');
        const layout = import.meta.glob('@/layout/index.vue');
        const res = await ApiAuth.menuTree();
        traverseTree(res.data, (item) => {
            if (item.component === '/src/layout/index.vue') {
                // @ts-ignore
                item.component = layout[item.component];
            } else {
                // @ts-ignore
                item.component = routeComponents[item.component];
            }
            // @ts-ignore
            item.meta = {
                title: item.name,
                icon: item.icon,
                visible: !!item.show,
            };
            item.name = item.code;
        });
        res.data.forEach((item) => {
            // @ts-ignore
            router.addRoute(item);
            // @ts-ignore
            menuEvent.addMenu(item);
        });
        // menuEvent.addMenu(menu);
        return Promise.resolve();
    } catch {
        return Promise.resolve();
    }
}
function traverseTree(node: MenuInterface[], callback: (arg: MenuInterface) => void) {
    node.forEach((item: MenuInterface) => {
        // 对当前节点执行操作
        callback(item);
        if (item.children && Array.isArray(item.children)) {
            traverseTree(item.children, callback);
        }
    });
}
