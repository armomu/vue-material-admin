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
const pageTitle = computed(() => $route.meta.title);

const routes = computed(() => {
    const { matched } = $route;
    return matched.map((route, index) => {
        return {
            title: route.meta.title,
            disabled: true,
            // disabled: index === matched.length - 1,
            href: route.path,
        };
    });
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
