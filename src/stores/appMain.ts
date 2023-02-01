import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
    // const doubleCount = computed(() => count.value * 2);
    const theme = ref('light');
    function onTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
    }

    return { theme, onTheme };
});
