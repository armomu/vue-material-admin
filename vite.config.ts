import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Vuetify from 'vite-plugin-vuetify';
import VueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    // base: '/vue-material-admin',
    plugins: [
        Vue(),
        Vuetify({ autoImport: true }), // 都用Vue还用什么JSX
        VueJsx(),
    ],
    server: {
        open: true,
        host: '0.0.0.0',
        port: 8088,
        hmr: true,
        // proxy: {
        //     '/api': {
        //         target: 'xxxx',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, '')
        //     }
        // }
    },
    optimizeDeps: {
        exclude: ['@babylonjs/havok'],
    },
    assetsInclude: ['**/*.gltf', '**/*.glb'],
    resolve: {
        alias: {
            // @ts-ignore
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
