import Vue from 'vue';
import App from './App.vue';
import store from './plugins/store';
import router from './plugins/router';
import './plugins/router/auth';
import VueAMap from 'vue-amap';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import VCharts from 'v-charts';

// import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '../src/assets/style/index.scss';




Vue.use(VCharts);
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
    key: '527a03c5d37f26c924d83b3c68f9ac5c',
    plugin: ['MarkerClusterer', 'AMap.ControlBar']
});

Vue.config.productionTip = false;

new Vue({
    router,
    i18n,
    store,
    vuetify,
    render: (h) => h(App)
}).$mount('#app');
