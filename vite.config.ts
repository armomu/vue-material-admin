import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuetify from 'vite-plugin-vuetify';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // eslint-disable-next-line no-undef
    const env = loadEnv(mode, process.cwd(), '');
    console.log(env.APP_ENV);
    return {
        // base: env.APP_ENV === 'production' ? '/vue-material-admin' : '/',
        base: '/vue-material-admin',
        plugins: [
            vue(),
            vueJsx(),
            vuetify() as any,
            VitePWA({
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: true,
                },
                manifest: {
                    name: 'Material UI',
                    short_name: 'Material UI',
                    icons: [
                        {
                            purpose: 'maskable',
                            src: 'http://storage.ckudz.com/20230209150833_icon-192.png?e=1991286513&token=6p-iHOSmyL95FPwRy4pd3OXJFLFxCp0JnSqDqF0_:jeIPaBn-qgiVU4He5cnSURC7XUg=',
                            type: 'image/png',
                            sizes: '192x192',
                        },
                        {
                            src: 'http://storage.ckudz.com/20230209150833_icon-192.png?e=1991286513&token=6p-iHOSmyL95FPwRy4pd3OXJFLFxCp0JnSqDqF0_:jeIPaBn-qgiVU4He5cnSURC7XUg=',
                            type: 'image/png',
                            sizes: '64x64 32x32 24x24 16x16',
                        },
                        {
                            src: 'https://storage.ckudz.com/20230209150923_icon-512.png?e=1991286563&token=6p-iHOSmyL95FPwRy4pd3OXJFLFxCp0JnSqDqF0_:4WQvV-efArRA8xWaAxQK_kt5ei8=',
                            type: 'image/png',
                            sizes: '128x128 144x144 152x152 192x192 256x256 512x512',
                        },
                    ],
                    scope: '/vue-material-admin/',
                    start_url: '/vue-material-admin/',
                    background_color: '#FFFFFF',
                    theme_color: '#FFFFFF',
                    display: 'standalone',
                },
            }),
        ],
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
        optimizeDeps: {
            exclude: ['@babylonjs/havok'],
        },
        assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.wasm'],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    };
});
