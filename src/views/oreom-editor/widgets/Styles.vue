<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/valid-v-model -->
<template>
    <v-list v-if="data" density="compact">
        <v-list-group>
            <template v-slot:activator="item">
                <v-list-item v-bind="item.props" title="Dimensions" />
            </template>
            <v-text-field
                v-model="data.styles.width"
                hide-details
                label="Width"
                density="compact"
                dense
                variant="outlined"
            ></v-text-field>
        </v-list-group>
    </v-list>
</template>
<script lang="ts" setup>
import { computed, type Ref } from 'vue';
import type { VirtualDom } from '../hooks/useMain';

withDefaults(
    defineProps<{
        data?: Ref<VirtualDom>;
    }>(),
    {}
);
</script>
