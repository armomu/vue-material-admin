<template>
    <v-navigation-drawer
        class="my-4 layout_navigation"
        :rail="rail"
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
        <v-divider></v-divider>

        <v-list nav class="mx-2" color="primary">
            <v-list-subheader>Dashboard</v-list-subheader>
            <template v-for="(item, key) in routes" :key="key">
                <v-list-item
                    v-if="item.meta?.visible && !item.children"
                    :prepend-icon="(item.meta?.icon as any)"
                    :title="(item.meta?.title as any)"
                    :to="{ name: item.name }"
                    class="mx-1"
                    active-class="nav_active"
                    rounded="lg"
                ></v-list-item>

                <v-list-group
                    v-if="item.meta?.visible && item.children && item.children.length > 0"
                    class="mx-1"
                >
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            :prepend-icon="(item.meta.icon as any)"
                            :title="(item.meta.title as any)"
                            :active-class="mainStore.settings.highlightNav ? 'nav_active' : ''"
                            rounded="lg"
                        />
                    </template>
                    <template v-for="(row, i) in item.children">
                        <v-list-item
                            v-if="(row.meta?.visible as  any)"
                            :title="(row.meta?.title as any)"
                            :prepend-icon="rail ? (row.meta?.icon as any) : ''"
                            :key="i"
                            :to="{ name: row.name }"
                            rounded="lg"
                        />
                    </template>
                </v-list-group>
                <v-list-subheader v-if="item.name === 'Dashboard'">Examples</v-list-subheader>
                <v-list-subheader v-if="item.name === 'Miscellaneous'">Other</v-list-subheader>
            </template>
            <v-list-item prepend-icon="mdi-text-box" class="mx-1" rounded="lg">
                <v-list-item-title
                    ><a target="_blank" href="https://vuetifyjs.com/" class="link"
                        >Document</a
                    ></v-list-item-title
                >
            </v-list-item>
            <v-list-item prepend-icon="mdi-github" class="mx-1" rounded="lg">
                <v-list-item-title
                    ><a
                        target="_blank"
                        href="https://github.com/armomu/vue-material-admin"
                        class="link"
                        >Github</a
                    ></v-list-item-title
                >
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script lang="ts" setup>
import logo from '@/assets/admin-logo.png';
import type { RouteRecordRaw } from 'vue-router';
import { defineEmits, computed } from 'vue';
import { useMainStore } from '@/stores/appMain';

const mainStore = useMainStore();
const emit = defineEmits(['update:value']);

const props = withDefaults(
    defineProps<{
        rail: boolean;
        value?: boolean | null | undefined;
        routes: readonly RouteRecordRaw[];
    }>(),
    {}
);

const val = computed({
    get() {
        return props.value;
    },
    set(val: boolean) {
        emit('update:value', val);
    },
});
</script>
