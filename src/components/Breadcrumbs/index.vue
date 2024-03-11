<template>
    <div v-if="!$route.meta.hideNav" class="header_title ml-4">
        <div>
            <v-breadcrumbs :items="routes">
                <template v-slot:prepend>
                    <router-link to="/" class="link"
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
// const routes = ref();
const pageTitle = computed(() => $route.meta.title);

const routes = computed(() => {
    const { matched } = $route;
    const arr: any[] = [];
    if (matched[0].path === '/dashboard') {
        return [
            {
                title: 'Dashboard',
                disabled: false,
                href: '/dashboard',
            },
        ];
    }
    if (matched[0].path === matched[1].path) {
        return [
            {
                title: 'Index',
                disabled: false,
                href: '/dashboard',
            },
            {
                title: matched[0].meta.title,
                disabled: true,
                href: matched[0].path,
            },
        ];
    }
    matched.forEach((route, index) => {
        if (index === matched.length - 1) {
            arr.push({
                title: route.meta.title,
                exact: true,
                disabled: false,
                href: $route.path,
            });
        } else {
            arr.push({
                title: route.meta.title,
                exact: false,
                disabled: true,
                href: route.path,
            });
        }
    });
    return arr;
});
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
