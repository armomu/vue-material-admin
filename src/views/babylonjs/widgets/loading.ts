import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoading = defineStore('loading', () => {
    const visible = ref(false);
    const pct = ref(0);

    const onShow = (val = 0) => {
        pct.value = val;
        if (!visible.value) {
            visible.value = true;
        }
        if (val >= 100) {
            visible.value = false;
        }
    };

    const onHide = () => {
        visible.value = false;
    };

    return { visible, pct, onShow, onHide };
});
