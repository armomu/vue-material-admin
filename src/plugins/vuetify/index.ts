// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
// import colors from 'vuetify/lib/util/colors';
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';

export const vuetify = createVuetify({
    // components,
    // directives,
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
    },
});
