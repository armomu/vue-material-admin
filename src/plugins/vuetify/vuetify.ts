// plugins/vuetify/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#1C1E2C', // #E53935
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi',
        sets: {},
    },
});
