import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { checkVersion } from '@/plugins/pwa';
import { ApiAuth, type MenuInterface } from '@/api/auth';
import { useMenuStore } from '@/stores/useMenuStore';

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior() {
        return { top: 0 };
    },
    routes: [
        {
            path: '/urm',
            name: 'urm',
            redirect: '/urm/list',
            meta: {
                visible: true,
                title: 'Urm',
                icon: 'mdi-account-supervisor-circle',
            },
            component: Layout,
            children: [
                {
                    path: 'list',
                    name: 'urmList',
                    meta: {
                        title: 'Urm',
                        icon: 'mdi-alpha-u',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/urm/index.vue'),
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
        {
            path: '/:pathMatch(.*)',
            name: 'Match',
            meta: { keepAlive: false },
            redirect: '/404',
            children: [
                {
                    path: '/404',
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
    console.log('router to', to);
    console.log('router from', _from);
    if (to.path === '/' && _from.path === '/404') {
        next('');
        return;
    }
    next();
});

router.afterEach(() => {
    checkVersion();
});
export default router;

/**
 * 获取菜单树数据 将处理后的路由添加至路由表及菜单存储
 * @param toFirst 是否跳转第一个路由
 */
export async function syncRouter(toFirst = true) {
    try {
        const menuEvent = useMenuStore();
        const routeComponents = import.meta.glob('@/views/**/*.vue');
        console.log(routeComponents);
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
        const [route] = res.data;
        res.data.forEach((item) => {
            // @ts-ignore
            router.addRoute(item);
            // @ts-ignore
            menuEvent.addMenu(item);
        });
        if (toFirst) {
            router.push(route.path);
        }
        return Promise.resolve(route);
    } catch {
        // router.push('/login');
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
