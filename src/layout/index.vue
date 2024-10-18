<template>
    <v-layout
        :class="{
            mini_nav: navState.isMini,
        }"
    >
        <Navigation v-model:value="navState.menuVisible" :rail="navState.rail" :mobile="device" />
        <main class="app_main">
            <Header
                v-model:rail="navState.rail"
                v-model:mini="navState.isMini"
                v-model:visible="navState.menuVisible"
            />
            <div class="router"><RouterView /></div>
        </main>
        <Settings />
    </v-layout>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navigation from './widgets/Navigation.vue';
import Header from './widgets/Header.vue';
import { reactive, computed, watch } from 'vue';
import { useAppStore } from '@/stores/useAppStore';

const mainStore = useAppStore();
const navState = reactive({
    menuVisible: true,
    rail: !mainStore.isMobile,
    isMini: !mainStore.isMobile,
});
const device = computed(() => mainStore.isMobile);
watch(device, () => {
    navState.rail = !navState.rail;
});
</script>
