<template>
    <v-app
        :theme="mainStore.theme"
        :class="{
            ffbg: mainStore.settings.backgroundColor === '#ffffff',
            e5bg: mainStore.settings.backgroundColor === '#e5eaef',
            f8bg: mainStore.settings.backgroundColor === '#f8f8f8',
            welt: mainStore.settings.welt,
            shadowCard: mainStore.settings.cardStyle === 'shadow',
            borderCard: mainStore.settings.cardStyle === 'border',
            mobile: mainStore.isMobile,
        }"
    >
        <router-view />
        <v-snackbar
            v-for="(item, key) in snackbarEvent.items"
            v-model="item.visible"
            :timeout="item.timeout"
            :key="key"
            color="grey-darken-3"
        >
            {{ item.text }}
            <template v-slot:actions>
                <v-btn color="blue" variant="text" @click="item.visible = false"> Close </v-btn>
            </template>
        </v-snackbar>
        <HatefulMouse />
    </v-app>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAppStore } from '@/stores/useAppStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSnackbarStore } from '@/stores/useSnackbarStore';
import router from './router';
import { checkVersion } from './plugins/pwa';
const mainStore = useAppStore();
const useAuthEvent = useAuthStore();
const snackbarEvent = useSnackbarStore();
router.beforeEach(async (to, from, next) => {
    if (useAuthEvent.userDetail.id <= 0 && to.path !== '/login') {
        console.log(useAuthEvent.userDetail.id, 'useAuthEvent.userDetail.id');
        next('/login');
        location.reload();
        return;
    }
    next();
    const d = document.getElementById('_loading_');
    d?.setAttribute('class', 'loading_ hide');
});

router.afterEach(() => {
    checkVersion();
});
</script>
<style scoped lang="scss"></style>
