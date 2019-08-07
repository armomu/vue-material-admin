import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAMap from 'vue-amap';
import Vuetify from 'vuetify';
import i18n from './tools/i18n';
import 'vuetify/src/stylus/main.styl';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '../src/assets/style/index.scss';
Vue.use(Vuetify, {
    theme: {
        primary: '#3F51B5'
    }
});

Vue.use(VueAMap);

// 默认高德 sdk 版本为 1.4.4
VueAMap.initAMapApiLoader({
    key: '527a03c5d37f26c924d83b3c68f9ac5c',
    plugin: ['MouseTool', 'ToolBar', 'MapType', 'RangingTool', 'Geolocation', 'Geocoder', 'MarkerClusterer'],
    v: '1.4.12'
});

Vue.config.productionTip = false;

new Vue({
    router,
    i18n,
    store,
    render: (h) => h(App)
}).$mount('#app');
