<template>
    <v-card class="header">
        <Breadcrumbs v-if="!appEvent.isMobile" />
        <div v-if="!appEvent.isMobile" class="mt-3 ml-9 gamepad" @click="changeRail">
            <v-icon v-if="rail" icon="mdi-sort-variant-lock-open" />
            <v-icon v-else icon="mdi-sort-variant" />
        </div>
        <div v-if="appEvent.isMobile" class="head_logo ml-4 mr-1">
            <img :src="logo" height="40" />
        </div>
        <v-btn v-if="appEvent.isMobile" variant="text" icon="mdi-menu" @click="onShowMenu">
            <v-icon size="small"></v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <div v-if="!appEvent.isMobile" style="width: 320px" class="search_ip mr-2">
            <v-text-field
                rounded
                variant="outlined"
                density="compact"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                hide-details
                clearable
            ></v-text-field>
        </div>
        <div class="tool_btns">
            <v-btn
                @click="appEvent.onTheme"
                variant="text"
                :icon="appEvent.theme === 'light' ? 'mdi-theme-light-dark' : 'mdi-weather-sunny'"
            />
            <v-menu v-model="messageVisible" :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="text" icon="mdi-bell-outline">
                        <v-badge content="2" color="error">
                            <v-icon size="small"></v-icon>
                        </v-badge>
                    </v-btn>
                </template>
                <v-card min-width="300" class="px-2">
                    <v-list style="height: 200px; overflow: auto">
                        <v-list-item
                            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                            subtitle="Go out for a drink at night 🍺🍺🍺"
                            title="John 铁柱"
                            @click="() => {}"
                        />
                    </v-list>
                    <div class="pt-2 pb-2 d-flex jsb">
                        <v-btn variant="text" color="primary"> All messages </v-btn>
                        <v-tooltip text="Clear" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-btn
                                    v-bind="props"
                                    variant="icon"
                                    color="#999"
                                    style="margin-left: auto"
                                    icon="mdi-trash-can-outline"
                                    size="small"
                                >
                                    <v-icon color="red" size="small" icon="mdi-trash-can-outline" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </v-card>
            </v-menu>
            <v-btn
                variant="text"
                icon="mdi-github"
                @click="link('https://github.com/armomu/vue-material-admin')"
            >
                <v-icon size="small"></v-icon>
            </v-btn>
            <v-btn variant="text" icon="mdi" class="mr-2">
                <v-avatar size="small" class="avatar">
                    <v-img :src="authEvent.userDetail.profile.avatar" alt="陈咩啊"></v-img>
                </v-avatar>
                <v-menu activator="parent" transition="slide-y-transition">
                    <v-list :lines="false" nav density="compact" class="pa-2">
                        <v-list-item
                            :title="authEvent.userDetail.username"
                            :prependAvatar="authEvent.userDetail.profile.avatar"
                            @click="() => {}"
                        >
                            <template #subtitle>
                                <div style="margin-top: 4px">
                                    <v-icon size="x-small" icon="mdi-email-outline"></v-icon>
                                    <span class="ml-1">894620576@qq.com</span>
                                </div>
                            </template>
                        </v-list-item>
                        <v-divider class="my-2"></v-divider>
                        <v-list-item
                            title="Github"
                            append-icon="mdi-github"
                            @click="link('https://github.com/armomu/vue-material-admin')"
                        />
                        <v-list-item
                            title="Sign out"
                            append-icon="mdi-login"
                            @click="authEvent.logout"
                        />
                    </v-list>
                </v-menu>
            </v-btn>
        </div>
    </v-card>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/useAppStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { defineEmits, computed, ref } from 'vue';
import logo from '@/assets/admin-logo.png';

const emit = defineEmits(['update:rail', 'update:mini', 'update:visible']);

const appEvent = useAppStore();
const authEvent = useAuthStore();
const props = withDefaults(
    defineProps<{
        rail: boolean;
        mini: boolean;
        visible: boolean;
    }>(),
    {}
);

const railVal = computed({
    get() {
        return props.rail;
    },
    set(val: boolean) {
        emit('update:rail', val);
    },
});
const miniVal = computed({
    get() {
        return props.mini;
    },
    set(val: boolean) {
        emit('update:mini', val);
    },
});
const changeRail = () => {
    railVal.value = !railVal.value;
    miniVal.value = !miniVal.value;
};
const link = (url: string, target = '_blank') => {
    window.open(url, target);
};
const onShowMenu = () => {
    emit('update:visible', true);
};
const messageVisible = ref(false);
</script>
