<template>
    <v-layout :class="{ isMini: navState.isMini }"
        ><!-- expand-on-hover
            rail -->
        <v-navigation-drawer
            class="ms-4 my-4 layout_navigation"
            theme="dark"
            rail
            expand-on-hover
            rail-width="77"
            @update:rail="navigationRail"
            permanent
            style="height: calc(100% - 2rem)"
        >
            <v-list class="py-4 mx-2 logo" nav>
                <v-list-item :prepend-avatar="logo" class="mx-1">
                    <v-list-item-title class="title">Material UI</v-list-item-title>
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
                            prepend-icon="fa:fas mdi-account-circle"
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
                <div style="width: 180px">
                    <v-text-field
                        label="Search here"
                        model-value="vue"
                        variant="outlined"
                        hide-details
                        density="compact"
                        clearable
                        focused
                    ></v-text-field>
                </div>
                <v-icon class="mx-3" icon="mdi-github" />
                <v-icon class="mr-3" icon="mdi-cog" />
                <v-badge content="2" class="mr-5" color="error">
                    <v-icon icon="mdi-bell-outline" />
                </v-badge>
            </header>
            <RouterView />
        </main>
    </v-layout>
</template>
<script setup lang="ts">
import logo from '@/assets/admin-logo.png';
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
