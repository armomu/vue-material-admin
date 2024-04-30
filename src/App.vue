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
    </v-app>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useMainStore } from '@/stores/useMainStore';
const mainStore = useMainStore();
</script>
<style scoped lang="scss"></style>
@/stores/useMainStore
