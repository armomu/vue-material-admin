import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAMap from 'vue-amap'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/main.styl';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify, {
    theme: {
        primary: "#3F51B5"
    }
})

Vue.use(VueAMap);

// 默认高德 sdk 版本为 1.4.4
VueAMap.initAMapApiLoader({
    key: "04f8cb5cba1e59c6264d0565905d56c1",
    plugin: ["MouseTool", "ToolBar", "MapType", "RangingTool", "Geolocation", "Geocoder", "MarkerClusterer"],
    v: "1.4.12"
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
