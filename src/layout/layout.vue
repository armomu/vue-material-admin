<template>
    <v-layout :class="{ isMini: navState.isMini }"
        ><!-- expand-on-hover
            rail -->
        <v-navigation-drawer
            class="ms-4 my-4 layout_navigation"
            theme="dark"
            rail
            expand-on-hover
            rail-width="76"
            @update:rail="navigationRail"
            permanent
            style="height: calc(100% - 2rem); border-radius: 16px"
        >
            <v-list class="py-4 mx-2 logo" nav>
                <v-list-item
                    @click="window.open('https://github.com/Groundhog-Chen/vue-material-admin')"
                    prepend-avatar="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png"
                    class="mx-1"
                >
                    <v-list-item-title class="title">MATERIAL-UI</v-list-item-title>
                    <v-list-item-subtitle>vue-material-admin</v-list-item-subtitle>
                </v-list-item>
                <!-- <v-divider></v-divider> -->
            </v-list>
            <v-divider></v-divider>

            <v-list nav class="mx-2">
                <v-list-item
                    prepend-icon="mdi-view-dashboard"
                    title="Dashboard"
                    value="dashboard"
                    class="mx-1"
                ></v-list-item>
                <v-list-subheader>PAGES</v-list-subheader>

                <v-list-group class="mx-1">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon="mdi-account-circle"
                            title="Users"
                        ></v-list-item>
                    </template>
                    <v-list-item title="Users"></v-list-item>
                </v-list-group>

                <v-list-item
                    prepend-icon="mdi-account-multiple"
                    title="Shared with me"
                    value="shared"
                    class="mx-1"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- class="elevation-0" -->
        <main class="app_main">
            <header class="header">
                <Breadcrumbs />
                <v-spacer></v-spacer>
                <v-btn
                    text
                    target="_blank"
                    href="https://github.com/Groundhog-Chen/vue-material-admin"
                    class="min_hide"
                >
                    <v-icon title="https://github.com/Groundhog-Chen/vue-material-admin"
                        >mdi-github-circle</v-icon
                    >
                </v-btn>
                <v-btn text class="min_hide">
                    <v-icon>mdi-arrow-expand-all</v-icon>
                </v-btn>
                <v-btn>
                    <v-badge content="2" color="error">
                        <v-icon>mdi-bell-outline</v-icon>
                    </v-badge>
                </v-btn>
            </header>
            <RouterView />
        </main>
    </v-layout>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.vue';
import { reactive } from 'vue';
const navState = reactive({
    isMini: true,
});
const navigationRail = (e: boolean) => {
    navState.isMini = e;
};
</script>
<style scoped lang="scss"></style>
