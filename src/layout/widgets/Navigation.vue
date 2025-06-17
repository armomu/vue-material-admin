<template>
    <v-navigation-drawer
        class="my-4 layout_navigation"
        :class="{ showSettings: showSettings }"
        :rail="rail"
        :mobile="mobile"
        expand-on-hover
        rail-width="77"
        v-model="val"
        style="position: fixed"
    >
        <v-list class="py-4 mx-2 logo" nav>
            <v-list-item rounded :prepend-avatar="logo" class="mx-1" to="/vue-material-admin/">
                <v-list-item-title class="title">Material UI</v-list-item-title>
                <v-list-item-subtitle>vue-material-admin</v-list-item-subtitle>
            </v-list-item>
        </v-list>
        <v-divider class="mx-5"></v-divider>
        <v-list nav class="mx-2" color="primary">
            <MenuNodeTree :data="routes" />
        </v-list>
    </v-navigation-drawer>
</template>
<script lang="ts" setup>
import logo from '@/assets/admin-logo.png';
import { defineEmits, computed } from 'vue';
import MenuNodeTree from './MenuNodeTree.vue';
import { useAuthStore } from '@/stores/useAuthStore';
const emit = defineEmits(['update:value']);

const props = withDefaults(
    defineProps<{
        rail: boolean;
        value?: boolean;
        mobile?: boolean;
        showSettings?: boolean;
    }>(),
    {}
);

const menuEvent = useAuthStore();

const val = computed({
    get() {
        return props.value;
    },
    set(val: boolean) {
        emit('update:value', val);
    },
});

const routes = computed(() => {
    return menuEvent.menus;
});
</script>
