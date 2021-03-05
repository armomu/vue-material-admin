<template>
	<div v-if="!$route.meta.hideNav" class="layout_title">
		<v-toolbar-title style="padding: 30px 30px 0 30px">{{
			pageTitle
		}}</v-toolbar-title>
		<v-breadcrumbs
			:items="routeItems"
			style="padding: 30px;"
		>
        </v-breadcrumbs>
	</div>
</template>
<script>
export default {
    data() {
        return {
            routeItems: null
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
        }
    },
    created() {
        console.log(this.$route);
        this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb() {
            const _$route = this.$route;
            const { matched } = this.$route;
            if (matched[0].path === '/dashboard') {
                this.routeItems = [
                    {
                        text: 'Home',
                        disabled: true,
                        to: '/dashboard',
                    },
                ];
                return;
            }
            if (matched[0].path === matched[1].path) {
                this.routeItems = [
                    {
                        text: 'Home',
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
            this.routeItems = [
                {
                    text: 'Home',
                    disabled: false,
                    exact: true,
                    to: '/dashboard',
                }
            ];
            matched.forEach((route, index) => {
                if (index === matched.length - 1) {                    
                    this.routeItems.push({
                        text: route.meta.title,
                        exact: true,
                        disabled: true,
                        to: _$route.path,
                    });
                } else {
                    this.routeItems.push({
                        text: route.meta.title,
                        exact: true,
                        disabled: false,
                        to: route.path,
                    });
                }
                
            });
            // console.log(this.routeItems);
            // console.log(_$route);
        }
    }
};
</script>
<style lang="scss">
.layout_title+div {
    padding-top: 0;
    margin-top: 0;
}
</style>