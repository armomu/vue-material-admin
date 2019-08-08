import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './plugins/store';
import VueAMap from 'vue-amap';
import Vuetify from 'vuetify';
import i18n from './plugins/i18n';
import VCharts from 'v-charts';

import 'vuetify/src/stylus/main.styl';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '../src/assets/style/index.scss';



Vue.use(VCharts);
Vue.use(Vuetify, {
    theme: {
        primary: '#323259'
    }
});

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
    key: '527a03c5d37f26c924d83b3c68f9ac5c',
});

Vue.config.productionTip = false;

new Vue({
    router,
    i18n,
    store,
    render: (h) => h(App)
}).$mount('#app');
