import { ref } from 'vue';
import { defineStore } from 'pinia';
import { onUpVersion } from '@/plugins/pwa';

export const useMainStore = defineStore('main', () => {
    // 初始化是否是移动端设备
    window.addEventListener('resize', () => {
        const res = getIsMobile();
        if (res !== isMobile.value) {
            isMobile.value = res;
        }
    });
    const { body } = document;
    const getIsMobile = () => {
        const rect = body.getBoundingClientRect();
        if (!document.hidden) {
            const res = rect.width - 1 < 777;
            return res;
        } else {
            return false;
        }
    };
    const _isMobile = getIsMobile();
    const isMobile = ref(_isMobile);

    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    scheme.addEventListener('change', () => {
        theme.value = scheme.matches ? 'dark' : 'light';
    });
    const root = document.querySelector(':root');
    root?.setAttribute('theme', scheme.matches ? 'dark' : 'light');
    const theme = ref(scheme.matches ? 'dark' : 'light');

    const onTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
        root?.setAttribute('theme', theme.value);
    };

    const upVisible = ref(false);

    const onHideUp = () => {
        upVisible.value = false;
    };
    let versionCode = '';
    const onShowUp = (code: string) => {
        versionCode = code;
        upVisible.value = true;
    };
    const onUp = () => {
        onUpVersion(versionCode);
        upVisible.value = false;
    };

    return { theme, isMobile, onTheme, upVisible, onHideUp, onShowUp, onUp };
});
