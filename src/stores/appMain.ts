import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { vuetify } from '@/plugins/vuetify';

export const useMainStore = defineStore('main', () => {
    // 初始化是否是移动端设备
    window.addEventListener('resize', () => {
        const res = getMobile();
        if (res !== isMobile.value) {
            isMobile.value = res;
        }
    });
    const getMobile = () => {
        const rect = document.body.getBoundingClientRect();
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

    const settings: Settings = reactive({
        welt: true,
        backgroundColor: '#ffffff',
        drawer: false,
        primary: '#7F85F9',
        cardStyle: 'shadow', // border // default
        backgroundColors: ['#ffffff', '#f8f8f8', '#e5eaef'],
        highlightNav: true,
        primaryColors: [
            '#7F85F9',
            '#2196F3',
            '#03A9F4',
            '#8E24AA',
            '#3F51B5',
            '#0A7EA4',
            '#01C0C8',
            '#8BC34A',
            '#CDDC39',
            '#F44336',
            '#FF5722',
            '#FA896B',
        ],
    });

    const onDrawer = () => {
        settings.drawer = !settings.drawer;
    };

    const onBackgroundColor = (val: string) => {
        settings.backgroundColor = val;
    };

    const onPrimary = (val: string) => {
        settings.primary = val;
        vuetify.theme.themes.value.light.colors.primary = val;
        vuetify.theme.themes.value.dark.colors.primary = val;
    };
    return { theme, isMobile, onTheme, settings, onDrawer, onPrimary, onBackgroundColor };
});
interface Settings {
    welt: boolean;
    backgroundColor: string;
    drawer: boolean;
    highlightNav: boolean;
    primary: string;
    cardStyle: 'shadow' | 'border' | 'none';
    primaryColors: string[];
    backgroundColors: string[];
}
