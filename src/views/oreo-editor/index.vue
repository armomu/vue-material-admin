<template>
    <iframe
        src="https://armomu.github.io/oreo-editor/#/"
        style="width: 100%; height: var(--content-height); border: none"
    />
    <v-snackbar v-model="snackbar">
        The source code of oreo-editor H5 editor has been independently transferred to the
        https://github.com/armomu/oreo-editor project

        <template v-slot:actions>
            <v-btn color="primary" variant="text" @click="snackbar = false"> Close </v-btn>
        </template>
    </v-snackbar>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const snackbar = ref(true);
</script>
