<template>
    <header class="header">
        <Breadcrumbs v-if="!mainStore.isMobile" />
        <div v-if="!mainStore.isMobile" class="mt-3 ml-9 gamepad" @click="changeRail">
            <v-icon v-if="rail" icon="mdi-sort-variant-lock-open" />
            <v-icon v-else icon="mdi-sort-variant" />
        </div>
        <div v-if="mainStore.isMobile" class="head_logo ml-4 mr-1">
            <img :src="logo" height="40" />
        </div>
        <v-btn v-if="mainStore.isMobile" variant="text" icon="mdi-menu" @click="onShowMenu">
            <v-icon size="small"></v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <div v-if="!mainStore.isMobile" style="width: 320px" class="search_ip mr-2">
            <!-- <div id="docsearch"></div> -->
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
                @click="mainStore.onTheme"
                variant="text"
                :icon="mainStore.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            />
            <v-btn variant="text" icon="mdi-bell-outline">
                <v-badge content="2" color="error">
                    <v-icon size="small"></v-icon>
                </v-badge>
            </v-btn>
            <v-btn
                variant="text"
                icon="mdi-github"
                @click="link('https://github.com/armomu/vue-material-admin')"
            >
                <v-icon size="small"></v-icon>
            </v-btn>
            <v-btn variant="text" append-icon="mdi-chevron-down" class="mr-2">
                <v-avatar size="x-small" class="avatar mr-2">
                    <v-img :src="wxtx" alt="陈咩啊"></v-img>
                </v-avatar>
                <span v-if="!mainStore.isMobile">陈咩咩啊</span>
                <v-menu activator="parent">
                    <v-list :lines="false" nav density="compact">
                        <v-list-item
                            title="Github"
                            prepend-icon="mdi-github"
                            @click="link('https://github.com/armomu/vue-material-admin')"
                        />
                        <v-list-item
                            title="Email"
                            prepend-icon="mdi-email"
                            @click="link('mailto:894620576@qq.com')"
                        />
                        <v-list-item title="Sign out" prepend-icon="mdi-login" to="/login" />
                    </v-list>
                </v-menu>
            </v-btn>
        </div>
    </header>
</template>
<script lang="ts" setup>
import Breadcrumbs from '@/components/Breadcrumbs/index.vue';
import { useMainStore } from '@/stores/appMain';
import { defineEmits, computed } from 'vue';
import logo from '@/assets/admin-logo.png';
import wxtx from '@/assets/wx.png';

const emit = defineEmits(['update:rail', 'update:mini', 'update:visible']);

const mainStore = useMainStore();
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
</script>
