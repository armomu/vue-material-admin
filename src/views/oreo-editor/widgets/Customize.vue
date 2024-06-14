<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/valid-v-model -->
<template>
    <v-list v-if="data" density="compact">
        <div class="input_item">
            <div class="label">Width</div>
            <input class="input" v-model="data.styles.width" />
        </div>
        <div class="input_item">
            <div class="label">Height</div>
            <input class="input" v-model="data.styles.height" />
        </div>
        <div class="input_item">
            <div class="label">Background</div>
            <input
                class="input"
                v-model="data.styles.background"
                type="color"
                style="background: none"
            />
        </div>
        <div class="input_item">
            <div class="label">Text</div>
            <input
                class="input"
                v-model="data.styles.color"
                type="color"
                style="background: none"
            />
        </div>
        <div class="input_item">
            <div class="label">Radius</div>
            <v-slider
                v-model.number="data.styles.radius"
                hide-details
                color="primary"
                class="ml-5"
            />
        </div>
        <div class="input_item">
            <div class="label">Shadow</div>
            <v-slider
                v-model="data.styles.shadow"
                hide-details
                :max="20"
                color="primary"
                :min="0"
                :step="1"
                class="ml-5"
            />
        </div>
    </v-list>
</template>
<script lang="ts" setup>
import { computed, type Ref } from 'vue';
import type { VirtualDom } from '../hooks/useOreoApp';

withDefaults(
    defineProps<{
        data?: VirtualDom;
    }>(),
    {}
);
</script>
../hooks/useOreo
