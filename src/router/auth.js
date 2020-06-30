import router from './index';
// import store from '../plugins/store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
// const whiteList = ['/login', '/authredirect'];// 免登录白名单
NProgress.configure({ showSpinner: false });// NProgress configuration
router.beforeEach((to, from, next) => {
    NProgress.start();
    // 给缓存页面增加刷新策略
    // 如果从需要缓存的页面跳转二级页面
    if (to.meta.keepAlive) {
        const toUrl = to.path.split('/');
        const fromUrl = from.path.split('/');
        if (toUrl[1] === fromUrl[1]) {
            to.meta.strategy = 'keep';
        } else {
            to.meta.strategy = 'refresh';
        }
    }    
    // if (store.state.isLogin) {
    //     if (to.path === '/login') {
    //         next('/');

    //     }
    //     next();
    // } else {
    //     if (whiteList.indexOf(to.path) !== -1) {
    //         next();
    //     } else {
    //         next();
    //     }
    // }
    next();
});
router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
