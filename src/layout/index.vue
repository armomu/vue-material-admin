<template>
    <v-layout
        :class="{
            mini_nav: navState.isMini,
            fixed_header: mainStore.settings.fixedHeader,
        }"
    >
        <Navigation
            v-model:value="navState.menuVisible"
            :rail="navState.rail"
            :mobile="device"
            :show-settings="mainStore.settings.drawer"
        />
        <main class="app_main">
            <Header
                v-model:rail="navState.rail"
                v-model:mini="navState.isMini"
                v-model:visible="navState.menuVisible"
            />
            <div class="router"><RouterView :key="mainStore.theme" /></div>
        </main>
        <Settings />
    </v-layout>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navigation from './widgets/Navigation.vue';
import Header from './widgets/Header.vue';
import { reactive, computed } from 'vue';
import { useAppStore } from '@/stores/useAppStore';

const mainStore = useAppStore();
const navState = reactive({
    menuVisible: true,
    rail: !mainStore.isMobile,
    isMini: !mainStore.isMobile,
});
if (mainStore.settings.cardStyle === 'liquid-glass') {
    setTimeout(() => {
        navState.isMini = false;
        navState.rail = false;
    }, 1000);
}
const device = computed(() => mainStore.isMobile);
</script>
