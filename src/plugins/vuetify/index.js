import Vue from 'vue';
import Vuetify from 'vuetify';
import zhHans from 'vuetify/es5/locale/zh-Hans';
import '@mdi/font/css/materialdesignicons.css';
// import 'vuetify/src/styles/main.sass';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        dark: false,
        themes: {
            light: {
                primary: '#4CAF50'
            },

        },
    },
    lang: {
        locales: { zhHans },
        current: 'zhHans'
    }
});
