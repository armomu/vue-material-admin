import router from './index';
import store from '../plugins/store';
const whiteList = ['/login', '/authredirect'];// 免登录白名单

router.beforeEach((to, from, next) => {
    console.log();
    if (store.state.isLogin) {
        if (to.path === '/login') {
            next('/');
        }
        next();
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next();
        }
    }
});
