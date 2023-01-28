<template>
    <v-layout :class="{ isMini: navState.isMini }"
        ><!-- expand-on-hover
            rail -->
        <v-navigation-drawer
            class="ms-4 my-4 layout_navigation"
            theme="dark"
            :rail="navState.rail"
            expand-on-hover
            rail-width="77"
            @update:rail="navigationRail"
            permanent
            style="height: calc(100vh - 2rem); position: fixed"
        >
            <v-list class="py-4 mx-2 logo" nav>
                <v-list-item :prepend-avatar="logo" class="mx-1">
                    <v-list-item-title class="title">Material UI</v-list-item-title>
                    <v-list-item-subtitle>vue-material-admin</v-list-item-subtitle>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>

            <v-list nav class="mx-2">
                <v-list-item :prepend-avatar="wxtx" class="mx-1">
                    <v-list-item-title class="title ml-4 mt-1">陈咩咩咩咩咩咩啊</v-list-item-title>
                    <v-list-item-subtitle class="ml-4 mt-1">894620576@qq.com</v-list-item-subtitle>
                </v-list-item>
                <v-divider class="my-4"></v-divider>
                <template v-for="(item, key) in navState.routes" :key="key">
                    <v-list-item
                        v-if="item.meta?.visible && !item.children"
                        :prepend-icon="(item.meta?.icon as any)"
                        :title="(item.meta?.title as any)"
                        :to="{ name: item.name }"
                        class="mx-1"
                    ></v-list-item>

                    <v-list-group
                        v-if="item.meta?.visible && item.children && item.children.length > 0"
                        class="mx-1"
                    >
                        <template v-slot:activator="{ props }">
                            <v-list-item
                                v-bind="props"
                                :prepend-icon="item.meta.icon"
                                :title="item.meta.title"
                            />
                        </template>
                        <template v-for="(row, i) in item.children">
                            <v-list-item
                                v-if="(row.meta?.visible as  any)"
                                :title="(row.meta?.title as any)"
                                :prepend-icon="navState.isMini ? (row.meta?.icon as any) : ''"
                                :key="i"
                                active-color="primary"
                                :to="{ name: row.name }"
                            />
                        </template>
                    </v-list-group>
                    <v-list-subheader v-if="item.name === 'Dashboard'">Group</v-list-subheader>
                    <v-list-subheader v-if="item.name === 'map'">Other</v-list-subheader>
                </template>
                <v-list-item prepend-icon="mdi-microsoft-word" class="mx-1">
                    <v-list-item-title
                        ><a
                            target="_blank"
                            href="https://next.vuetifyjs.com/en/"
                            style="color: #ffffff"
                            >Document</a
                        ></v-list-item-title
                    >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- class="elevation-0" -->
        <main class="app_main">
            <header class="header">
                <Breadcrumbs />
                <div class="mt-3 ml-9 gamepad" @click="changeRail">
                    <v-icon v-if="navState.rail" icon="mdi-sort-variant-lock-open" />
                    <v-icon v-else icon="mdi-sort-variant" />
                </div>

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
                <a target="_blank" href="https://github.com/Groundhog-Chen/vue-material-admin"
                    ><v-icon class="mx-3" icon="mdi-github"
                /></a>
                <v-badge content="2" class="mr-5" color="error">
                    <v-icon icon="mdi-bell-outline" />
                </v-badge>
                <v-icon class="mr-3" icon="mdi-cog" />
            </header>
            <div class="router"><RouterView /></div>
        </main>
    </v-layout>
</template>
<script setup lang="ts">
import logo from '@/assets/admin-logo.png';
import wxtx from '@/assets/wx.png';
import { RouterView, useRouter } from 'vue-router';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs.vue';
import { reactive } from 'vue';
const router = useRouter();
const navState = reactive({
    rail: false,
    isMini: false,
    routes: router.options.routes,
});
const navigationRail = (e: boolean) => {
    if (!navState.rail) return;
    navState.isMini = e;
};

const changeRail = () => {
    navState.rail = !navState.rail;
    navState.isMini = navState.rail;
};
</script>
<style scoped lang="scss"></style>
