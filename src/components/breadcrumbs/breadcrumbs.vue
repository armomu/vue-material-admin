<template>
    <div v-if="!$route.meta.hideNav" class="header_title ml-4">
        <div>
            <v-breadcrumbs :items="routes">
                <template v-slot:prepend>
                    <router-link to="/"
                        ><v-icon size="small" icon="mdi-home-circle"></v-icon
                    ></router-link>
                    <li class="v-breadcrumbs-divider">/</li>
                </template>
            </v-breadcrumbs>
        </div>
        <div class="page_title">{{ pageTitle }}</div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
const routes = ref();
const pageTitle = computed(() => $route.meta.title);
function init() {
    const { matched } = $route;
    // console.log(matched);
    if (matched[0].path === '/dashboard') {
        routes.value = [
            {
                text: 'Dashboard',
                disabled: false,
                to: '/dashboard',
            },
        ];
        return;
    }
    if (matched[0].path === matched[1].path) {
        routes.value = [
            {
                text: 'Index',
                disabled: false,
                to: '/dashboard',
            },
            {
                text: matched[0].meta.title,
                disabled: true,
                to: matched[0].path,
            },
        ];
        return;
    }
    routes.value = [];
    matched.forEach((route, index) => {
        if (index === matched.length - 1) {
            routes.value.push({
                text: route.meta.title,
                exact: true,
                disabled: false,
                to: $route.path,
            });
        } else {
            routes.value.push({
                text: route.meta.title,
                exact: false,
                disabled: true,
                to: route.path,
            });
        }
    });
}
init();
</script>
<style lang="scss">
.v-breadcrumbs__prepend {
    .mdi-home-circle {
        margin-right: 4px;
    }
}
.layout_title + div {
    padding-top: 0;
    margin-top: 0;
}
</style>
