import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const messages = {
    zh_CN: require('./zh.js'),
    en_US: require('./en.js')
};
const i18n = new VueI18n({
    locale: 'en_US',
    messages: messages
});
export default i18n;
