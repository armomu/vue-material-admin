const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vue-material-admin' : '/',
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        clientLogLevel: 'warning',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7001',
                changeOrigin: true,  //开启代理
                ws: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            // new BundleAnalyzerPlugin()
        ]
    }
};
