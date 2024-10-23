import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { checkVersion } from '@/plugins/pwa';
import { ApiAuth, type MenuInterface } from '@/api/auth';
import { useAuthStore } from '@/stores/useAuthStore';

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior() {
        return { top: 0 };
    },
    routes: [
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
            redirect: '/404',
        },
        {
            path: '/404',
            name: 'NotFound',
            meta: { keepAlive: false },
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

router.beforeEach(async (to, from, next) => {
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
export async function syncRouter(toFirst = false) {
    try {
        const authEvent = useAuthStore();
        authEvent.resetMenu();
        const res = await ApiAuth.curMenuTree();
        const user = await ApiAuth.detail();
        const routeComponents = import.meta.glob('@/views/**/*.vue');
        console.log(routeComponents);
        const layout = import.meta.glob('@/layout/index.vue');
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
            authEvent.addMenu(item);
        });
        authEvent.setUserDetail(user.data);
        if (toFirst) {
            router.push(route.path);
        }
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err, '==================');
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
