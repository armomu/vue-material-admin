<template>
    <v-layout
        :class="{
            isMini: navState.isMini,
            isMobile: mainStore.isMobile,
        }"
    >
        <v-navigation-drawer
            class="my-4 layout_navigation"
            :rail="navState.rail"
            expand-on-hover
            rail-width="77"
            @update:rail="navigationRail"
            :permanent="permanent"
            v-model="navState.menuVisible"
            style="position: fixed"
        >
            <v-list class="py-4 mx-2 logo" nav>
                <v-list-item :prepend-avatar="logo" class="mx-1">
                    <v-list-item-title class="title">Material UI</v-list-item-title>
                    <v-list-item-subtitle>vue-material-admin</v-list-item-subtitle>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>

            <v-list nav class="mx-2">
                <v-list-subheader>Dashboard</v-list-subheader>
                <template v-for="(item, key) in navState.routes" :key="key">
                    <v-list-item
                        v-if="item.meta?.visible && !item.children"
                        :prepend-icon="(item.meta?.icon as any)"
                        :title="(item.meta?.title as any)"
                        :to="{ name: item.name }"
                        class="mx-1"
                        active-class="nav_active"
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
                                :to="{ name: row.name }"
                            />
                        </template>
                    </v-list-group>
                    <v-list-subheader v-if="item.name === 'Dashboard'">Group</v-list-subheader>
                    <v-list-subheader v-if="item.name === 'map'">Other</v-list-subheader>
                </template>
                <v-list-item prepend-icon="mdi-text-box" class="mx-1">
                    <v-list-item-title
                        ><a target="_blank" href="https://vuetifyjs.com/" class="link"
                            >Document</a
                        ></v-list-item-title
                    >
                </v-list-item>
                <v-list-item prepend-icon="mdi-github" class="mx-1">
                    <v-list-item-title
                        ><a
                            target="_blank"
                            href="https://github.com/armomu/vue-material-admin"
                            class="link"
                            >Github</a
                        ></v-list-item-title
                    >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <main class="app_main">
            <header class="header">
                <Breadcrumbs v-if="!mainStore.isMobile" />
                <div v-if="!mainStore.isMobile" class="mt-3 ml-9 gamepad" @click="changeRail">
                    <v-icon v-if="navState.rail" icon="mdi-sort-variant-lock-open" />
                    <v-icon v-else icon="mdi-sort-variant" />
                </div>
                <div v-if="mainStore.isMobile" class="head_logo ml-4 mr-1">
                    <img :src="logo" height="40" />
                </div>
                <v-btn
                    v-if="mainStore.isMobile"
                    variant="text"
                    icon="mdi-menu"
                    @click="navState.menuVisible = !navState.menuVisible"
                >
                    <v-icon size="small"></v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <div v-if="!mainStore.isMobile" style="width: 220px" class="search_ip mr-2">
                    <!-- <div id="docsearch"></div> -->
                    <v-text-field
                        rounded
                        density="compact"
                        variant="outlined"
                        label="Search here"
                        prepend-inner-icon="mdi-magnify"
                        single-line
                        hide-details
                        clearable
                    ></v-text-field>
                </div>
                <div class="tool_btns">
                    <v-btn
                        @click="mainStore.onTheme"
                        variant="text"
                        :icon="
                            mainStore.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
                        "
                    />
                    <v-btn variant="text" icon="mdi-bell-outline">
                        <v-badge content="2" color="error">
                            <v-icon size="small"></v-icon>
                        </v-badge>
                    </v-btn>
                    <v-btn variant="text" append-icon="mdi-chevron-down" class="mr-2">
                        <v-avatar size="x-small" class="avatar mr-2">
                            <v-img :src="wxtx" alt="陈咩啊"></v-img>
                        </v-avatar>
                        <span v-if="!mainStore.isMobile">陈咩咩啊</span>
                        <v-menu activator="parent">
                            <v-list nav class="h_a_menu">
                                <v-list-item
                                    title="Github"
                                    prepend-icon="mdi-github"
                                    @click="toGithub"
                                />
                                <v-list-item
                                    title="Email"
                                    prepend-icon="mdi-email"
                                    @click="toEmail"
                                />
                                <v-list-item
                                    title="Sign out"
                                    prepend-icon="mdi-login"
                                    to="/login"
                                />
                            </v-list>
                        </v-menu>
                    </v-btn>
                </div>
                <div style="position: fixed; right: 20px; bottom: 100px; z-index: 99999">
                    <v-btn icon="mdi-cog" />
                </div>
            </header>
            <div class="router"><RouterView /></div>
        </main>
    </v-layout>
</template>
<script setup lang="ts">
import logo from '@/assets/admin-logo.png';
import wxtx from '@/assets/wx.png';
import { RouterView, useRouter } from 'vue-router';
// import { docsearch } from 'meilisearch-docsearch';
// import 'meilisearch-docsearch/css';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs.vue';
import { reactive, computed, watch, onMounted } from 'vue';
import { useMainStore } from '@/stores/appMain';

onMounted(() => {
    // docsearch({
    //     container: '#docsearch',
    //     host: 'https://ms-4c0f4c604814-2275.sgp.meilisearch.io',
    //     apiKey: 'be54438b7a46ff7567aa3ca928590a58bdc81abe7aa4e389881f8de597cc9d13',
    //     indexUid: 'dev_search',
    // });
});
const mainStore = useMainStore();
const router = useRouter();
const navState = reactive({
    menuVisible: true,
    rail: !mainStore.isMobile,
    isMini: !mainStore.isMobile,
    routes: router.options.routes,
});
const permanent = computed(() => {
    return !mainStore.isMobile;
});

watch(permanent, () => {
    navState.menuVisible = true;
    changeRail();
});
const navigationRail = (e: boolean) => {
    if (!navState.rail) return;
    navState.isMini = e;
};

const changeRail = () => {
    navState.rail = !navState.rail;
    navState.isMini = navState.rail;
};

const toGithub = () => {
    window.open('https://github.com/jaywoow/vue-material-admin', '_blank');
};
const toEmail = () => {
    window.open('mailto:894620576@qq.com', '_blank');
};
</script>
<style scoped lang="scss"></style>
