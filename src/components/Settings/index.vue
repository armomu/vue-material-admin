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
            <div class="text-h7">Background Colors</div>
            <div class="my-4 settings-btns-picker">
                <v-btn
                    v-for="item in mainStore.settings.backgroundColors"
                    :key="item"
                    density="comfortable"
                    icon=""
                    :color="item"
                    variant="elevated"
                    @click="mainStore.onBackgroundColor(item)"
                >
                    <v-icon v-if="item === mainStore.settings.backgroundColor" icon="mdi-check" />
                </v-btn>
            </div>
            <div class="text-h7">Theme Colors</div>
            <div class="my-4 settings-btns-picker">
                <v-btn
                    v-for="item in mainStore.settings.primaryColors"
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
            <div class="text-h7">Navigation</div>
            <v-radio-group color="primary" inline v-model="mainStore.settings.welt" hide-details>
                <v-radio label="Welt" :value="true"></v-radio>
                <v-radio label="Spacing" :value="false"></v-radio>
            </v-radio-group>
            <v-switch
                color="primary"
                label="Active highlight"
                class="ml-2"
                v-model="mainStore.settings.highlightNav"
            ></v-switch>
            <!-- <div class="d-flex jsb">
                <div class="text-h7">Navigation active highlight</div>
                <v-switch
                    hide-details
                    label="Active highlight"
                    v-model="mainStore.settings.highlightNav"
                ></v-switch>
            </div> -->
            <div class="text-h7">Card Styles</div>
            <v-radio-group
                class="mt-4"
                inline
                v-model="mainStore.settings.cardStyle"
                color="primary"
                hide-details
            >
                <v-radio label="plain" value="shadow"></v-radio>
                <v-radio label="border" value="border"></v-radio>
                <v-radio label="default" value="default"></v-radio>
            </v-radio-group>
        </div>
    </v-navigation-drawer>
</template>
<script setup lang="ts">
import { useMainStore } from '@/stores/appMain';
const mainStore = useMainStore();
</script>
<style lang="scss">
.settings-btns-picker {
    display: flex;
    flex-wrap: wrap;
    .v-btn {
        margin-right: 16px;
        margin-bottom: 16px;
    }
}
</style>
