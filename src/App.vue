<template>
    <v-app :dark="darkMode">
        <router-view />
    </v-app>
</template>
<script>
export default {
    computed: {
        darkMode() {
            return this.$store.state.darkMode;
        }
    },
    updated() {
        const dom = document.getElementById('loading');
        if (dom) {
            dom.remove();
        }
    }
};
</script>

