<template>
    <div class="test"></div>
</template>
<script lang="ts" setup>
import { defineEmits } from 'vue';
const props = withDefaults(
    defineProps<{
        visible: boolean;
    }>(),
    {}
);
const emits = defineEmits<{
    change: [id: number];
}>();
emits('change', 1);
</script>
