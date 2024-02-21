import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
    // 初始化是否是移动端设备
    window.addEventListener('resize', () => {
        const res = getMobile();
        if (res !== isMobile.value) {
            isMobile.value = res;
        }
    });
    const { body } = document;
    const getMobile = () => {
        const rect = body.getBoundingClientRect();
        if (!document.hidden) {
            const res = rect.width - 1 < 777;
            return res;
        } else {
            return false;
        }
    };
    const isMobile = ref(getMobile());

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

    return { theme, isMobile, onTheme };
});
