<template>
    <v-layout
        :class="{
            mini_nav: navState.isMini,
        }"
    >
        <Navigation
            v-model:value="navState.menuVisible"
            :rail="navState.rail"
            :routes="navState.routes"
        />
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
import { RouterView, useRouter } from 'vue-router';
import Settings from '@/components/Settings/index.vue';
import Navigation from './wigets/Navigation.vue';
import Header from './wigets/Header.vue';
import { reactive, computed, watch } from 'vue';
import { useMainStore } from '@/stores/appMain';

const mainStore = useMainStore();
const router = useRouter();
const navState = reactive({
    menuVisible: true,
    rail: !mainStore.isMobile,
    isMini: !mainStore.isMobile,
    routes: router.options.routes,
});
const device = computed(() => mainStore.isMobile);
watch(device, (val) => {
    if (val) {
        navState.rail = false;
    }
});
</script>
