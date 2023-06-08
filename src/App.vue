<template>
    <v-app :theme="mainStore.theme">
        <router-view />
        <v-snackbar location="bottom right" vertical v-model="mainStore.upVisible" :timeout="-1">
            <p>New content available, click on reload button to update</p>

            <template v-slot:actions>
                <v-btn color="blue" @click="mainStore.onUp"> Reload </v-btn>
                <v-btn color="blue" variant="text" @click="mainStore.onHideUp"> Close </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useMainStore } from '@/stores/appMain';
const mainStore = useMainStore();
</script>
<style scoped lang="scss"></style>
