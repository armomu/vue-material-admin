import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbar', () => {
    const items = ref<Snackbar[]>([]);

    const addItem = (text: string, timeout = 2000) => {
        items.value?.push({
            visible: true,
            text,
            timeout,
        });
    };

    return {
        items,
        addItem,
    };
});

interface Snackbar {
    visible: boolean;
    text: string;
    timeout?: number;
}
