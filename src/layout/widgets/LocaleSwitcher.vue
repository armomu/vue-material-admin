<template>
    <v-btn ref="switchButton" icon variant="text">
        <v-icon>mdi-earth</v-icon>
    </v-btn>
    <v-menu v-model="menuOpen" :activator="switchButton" location="bottom" anchor="top">
        <v-list>
            <v-list-item
                v-for="(localeMessage, localeId) in localeMessages"
                :key="localeId"
                @click="changeLocale(localeId)"
            >
                <v-list-item-title>{{ localeMessage.languageName }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup>
import { ref } from 'vue';
import { useLocale } from 'vuetify';
import localeMessages from '@/locales';

const switchButton = ref(null);
const menuOpen = ref(false);
const { current } = useLocale();

function changeLocale(locale) {
    current.value = locale;
}
</script>
