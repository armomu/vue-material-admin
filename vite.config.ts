import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/vue-material-admin',
    plugins: [vue(), vueJsx(), vuetify() as any],
    server: {
        open: true,
        host: '0.0.0.0',
        port: 8088,
        hmr: true,
        // proxy: {
        //     // 选项写法
        //     '/api': {
        //         target: 'xxxx',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, '')
        //     }
        // }
    },
    assetsInclude: ['**/*.gltf', '**/*.glb'],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
