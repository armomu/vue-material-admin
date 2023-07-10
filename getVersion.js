// eslint-disable-next-line no-undef
const fs = require('fs');
console.log('build version');
fs.writeFile('./public/version.js', `getVersion('${new Date().getTime()}')`, function (err) {
    if (err) {
        console.log(err);
        console.log('文件创建或写入失败');
    }
});
