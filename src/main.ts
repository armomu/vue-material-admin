import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/index.scss';
import App from './App.vue';
import router, { syncRouter } from './router';
import { createVuetify } from 'vuetify';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { createI18n, useI18n } from 'vue-i18n';
import localeMessages from './locales';
import registeComponent from './components';
import { setupLiquidGlassDirective } from './directives/liquidGlass';

const app = createApp(App);
registeComponent(app);
app.use(createPinia());

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: localeMessages,
});
app.use(i18n);

const vuetify = createVuetify({
    locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
});
app.use(vuetify);

setupLiquidGlassDirective(app);
syncRouter().then((res) => {
    app.use(router);
    if (!res) {
        router.push('/login');
    }
    app.mount('#app');
});
