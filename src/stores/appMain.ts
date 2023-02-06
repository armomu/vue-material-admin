import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
    // const doubleCount = computed(() => count.value * 2);
    const theme = ref('light');
    function onTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
        clearInterval(themeTimer);
    }

    const themeTimer = setInterval(() => {
        const winDark =
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (winDark && theme.value === 'light') {
            theme.value = 'dark';
        } else if (!winDark && theme.value === 'dark') {
            theme.value = 'light';
        }
    }, 100);

    return { theme, onTheme };
});
