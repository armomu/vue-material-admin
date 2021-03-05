import router from './index';
// import store from '../store';
import NProgress from 'nprogress'; // progress bar
import Cookies from 'js-cookie';
import 'nprogress/nprogress.css'; // progress bar style

// 获取版本更新的jsonp回调函数
window.getVersion = (version) => {
    if (Cookies.get('app_version') !== version) {
        location.reload(); // 刷新页面
    }
    Cookies.set('app_version', version);
};
NProgress.configure({ showSpinner: false });// NProgress configuration
router.beforeEach((to, from, next) => {
    NProgress.start();
    // 发起jsonp：
    // eslint-disable-next-line no-unreachable
    var versionScript = document.createElement('script');
    versionScript.src = location.origin + '/vue-material-admin/version.js?v=' + new Date().getTime();
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(versionScript, s);

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
    next();
});
router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
