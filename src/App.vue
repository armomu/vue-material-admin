<template>
    <v-app :theme="mainStore.theme">
        <router-view />
    </v-app>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useMainStore } from '@/stores/appMain';
const mainStore = useMainStore();
</script>
<style scoped lang="scss"></style>
