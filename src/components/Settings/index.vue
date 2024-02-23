<template>
    <div style="position: fixed; right: 20px; top: 90vh; z-index: 99">
        <v-btn icon="" size="large" color="primary" @click="mainStore.onDrawer">
            <v-icon icon="mdi-cog" size="large" />
        </v-btn>
    </div>
    <v-navigation-drawer
        style="height: 100vh; z-index: 1000; position: fixed"
        location="right"
        v-model="mainStore.settings.drawer"
        temporary
        width="360"
    >
        <v-list-item title="Settings">
            <template v-slot:title>
                <div class="text-h6">Settings</div>
            </template>
            <template v-slot:append>
                <v-btn
                    color="grey-lighten-1"
                    icon="mdi-close"
                    variant="text"
                    @click="mainStore.onDrawer"
                ></v-btn>
            </template>
        </v-list-item>
        <v-divider></v-divider>
        <div class="pa-4">
            <div class="text-h7">Styles</div>
            <v-radio-group class="mt-4" v-model="mainStore.settings.plain" color="primary">
                <v-radio label="White" :value="true"></v-radio>
                <v-radio label="Light gray" :value="false"></v-radio>
            </v-radio-group>
            <div class="text-h7">Theme Color</div>
            <div class="my-4 colors-picker">
                <v-btn
                    v-for="item in mainStore.settings.colors"
                    :key="item"
                    density="comfortable"
                    icon=""
                    :color="item"
                    variant="elevated"
                    @click="mainStore.onPrimary(item)"
                >
                    <v-icon v-if="item === mainStore.settings.primary" icon="mdi-check" />
                </v-btn>
            </div>
            <div class="text-h7">Card Styles</div>
            <v-radio-group class="mt-4" v-model="mainStore.settings.cardStyle" color="primary">
                <v-radio label="plain" value="shadow"></v-radio>
                <v-radio label="border" value="border"></v-radio>
                <v-radio label="default" value="default"></v-radio>
            </v-radio-group>
        </div>
    </v-navigation-drawer>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/appMain';
const mainStore = useMainStore();
</script>
<style lang="scss">
.colors-picker {
    display: flex;
    flex-wrap: wrap;
    .v-btn {
        margin-right: 16px;
        margin-bottom: 16px;
    }
}
</style>
