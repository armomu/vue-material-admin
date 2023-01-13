<template>
    <div v-if="!$route.meta.hideNav" class="header_title ml-4">
        <div>
            <v-breadcrumbs :items="routeItems">
                <template v-slot:prepend>
                    <!-- <img :src="logo" class="imglogo" /> -->
                    <v-icon size="small" icon="mdi-home-circle"></v-icon>
                    <li class="v-breadcrumbs-divider">/</li>
                </template>
            </v-breadcrumbs>
        </div>
        <div class="page_title">{{ pageTitle }}</div>
    </div>
</template>
<script>
import logo from '@/assets/admin-logo.png';
export default {
    data() {
        return {
            logo,
            routeItems: null,
        };
    },
    computed: {
        pageTitle() {
            return this.$route.meta.title;
        },
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        },
    },
    created() {
        this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb() {
            const _$route = this.$route;
            const { matched } = this.$route;
            // console.log(matched);
            if (matched[0].path === '/dashboard') {
                this.routeItems = [
                    {
                        text: 'Dashboard',
                        disabled: false,
                        to: '/dashboard',
                    },
                ];
                return;
            }
            if (matched[0].path === matched[1].path) {
                this.routeItems = [
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
            this.routeItems = [];
            matched.forEach((route, index) => {
                if (index === matched.length - 1) {
                    this.routeItems.push({
                        text: route.meta.title,
                        exact: true,
                        disabled: false,
                        to: _$route.path,
                    });
                } else {
                    this.routeItems.push({
                        text: route.meta.title,
                        exact: false,
                        disabled: true,
                        to: route.path,
                    });
                }
            });
            // console.log(this.routeItems);
            // console.log(_$route);
        },
    },
};
</script>
<style lang="scss">
.layout_title + div {
    padding-top: 0;
    margin-top: 0;
}
</style>
