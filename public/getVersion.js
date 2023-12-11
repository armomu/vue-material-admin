// eslint-disable-next-line no-undef
const fs = require('fs');
console.log('build version');
fs.writeFile('./version.js', `getVersion('${new Date().getTime()}')`, function (err) {
    console.log('build version success');
    if (err) {
        console.log(err, 'build version err');
    }
});
