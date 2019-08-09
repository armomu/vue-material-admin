<template>
    <v-app id="app">
        <router-view />
    </v-app>
</template>
<script>
export default {
    mounted() {
        setTimeout(() => {
            document.getElementById("loading").remove();
        }, 500);
    }
};
</script>
