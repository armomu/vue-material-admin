module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-material-admin' : '/',
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
            '/api': {
                /* 目标代理服务器地址 */
                target: 'http://47.100.47.3/',
                /* 允许跨域 */
                changeOrigin: true,
            },
        },
    },
};
