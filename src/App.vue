<template>
    <v-app>
        <router-view />
    </v-app>
</template>
<script>
export default {
    updated() {
        document.getElementById('loading').remove();
    }
};
</script>

