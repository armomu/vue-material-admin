import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/index.scss';
import App from './App.vue';
import router, { syncRouter } from './router';
import { vuetify } from '@/plugins/vuetify';
import registeComponent from './components';
import { setupLiquidGlassDirective } from './directives/liquidGlass';

const app = createApp(App);
registeComponent(app);
app.use(createPinia());
app.use(vuetify);
setupLiquidGlassDirective(app);
syncRouter().then((res) => {
    app.use(router);
    if (!res) {
        router.push('/login');
    }
    app.mount('#app');
});
