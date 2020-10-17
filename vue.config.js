const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

if (process.env.NODE_ENV !== 'development') {
    var fs = require('fs');
    var version = new Date().getTime();
    var content = 'getVersion(\'' + version + '\')';

    // console.log('开始创建版本文件...')
    fs.writeFile('./src/version.js', content, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('version.js OK');
    });
}

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
