import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/index.scss';
import App from './App.vue';
import router from './router';
import { vuetify } from '@/plugins/vuetify';
import registeComponent from './components';

const app = createApp(App);
registeComponent(app);
app.use(createPinia());
app.use(vuetify);
app.use(router);

registeComponent(app);
app.mount('#app').$nextTick(() => {
    setTimeout(() => {
        const d = document.getElementById('_loading_');
        d?.setAttribute('class', 'loading_ hide');
    }, 1000);
});
