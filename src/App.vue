<template>
    <v-app id="app">
        <router-view />
    </v-app>
</template>
<script>
export default {
    mounted() {
        document.getElementById('loading').remove();
    }
};
</script>

