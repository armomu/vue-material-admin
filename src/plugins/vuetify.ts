// plugins/vuetify/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

export const vuetify = createVuetify({
    components,
    directives,
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#7F85F9', // #E53935 6B38FB 1C1E2C 7F85F9
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi',
        sets: {},
    },
});
// vuetify.theme.themes.value.light.colors.primary = '#E53935';
