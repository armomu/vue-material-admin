import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/index.scss';
import App from './App.vue';
import router from './router';
import { vuetify } from '@/plugins/vuetify';
import '@/plugins/pwa';
import registeComponent from './components';

// only use oreo-editor
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
const app = createApp(App);
app.use(createPinia());
app.use(vuetify);
app.use(ArcoVue); // only use oreo-editor
app.use(ArcoVueIcon); // only use oreo-editor
app.use(router);

registeComponent(app);
app.mount('#app').$nextTick(() => {
    const d = document.getElementById('_loading_');
    d?.setAttribute('class', 'loading_ hide');
});
