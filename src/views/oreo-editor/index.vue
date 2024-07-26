<template>
    <iframe
        src="https://armomu.github.io/oreo-editor/#/"
        style="width: 100%; height: var(--content-height); border: none"
    />
    <v-dialog v-model="dialog" width="30%">
        <v-card title="Dialog">
            <v-card-text>
                oreo-editor H5编辑器源代码已经独立到 https://github.com/armomu/oreo-editor 项目中
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">收到 over！</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const dialog = ref(true);
</script>
