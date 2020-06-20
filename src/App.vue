<template>
    <v-app>
        <router-view />
    </v-app>
</template>
<script>
export default {
    updated() {
        const dom = document.getElementById('loading');
        if (dom) {
            dom.remove();
        }
    },
    created() {
        // console.log(process.env);
    }
};
</script>

