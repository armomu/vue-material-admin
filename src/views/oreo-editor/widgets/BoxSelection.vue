<template>
    <div :style="styles"></div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        data: any;
    }>(),
    {}
);

const styles = computed(() => {
    return {};
});
</script>
