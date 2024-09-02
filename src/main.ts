import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/index.scss';
import App from './App.vue';
import router from './router';
import { vuetify } from '@/plugins/vuetify';
import '@/plugins/pwa';
import registeComponent from './components';

const app = createApp(App);
app.use(createPinia());
app.use(vuetify);
app.use(router);

registeComponent(app);
app.mount('#app').$nextTick(() => {
    setTimeout(() => {
        const d = document.getElementById('_loading_');
        d?.setAttribute('class', 'loading_ hide');
        // console.log('222');
    }, 200);
});
