import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './router/auth';
import VueAMap from 'vue-amap';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';
import VCharts from 'v-charts';
import VueApexCharts from 'vue-apexcharts';
import '../src/styles/index.scss';

Vue.use(VCharts);
Vue.use(VueAMap);
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

VueAMap.initAMapApiLoader({
    key: '527a03c5d37f26c924d83b3c68f9ac5c',
    mapStyle: 'amap://styles/3822977fb93c74793f501b1f6cc7bf9b',
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
