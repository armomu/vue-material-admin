<template>
    <div class="test"></div>
</template>
<script lang="ts" setup>
import { ref, computed, defineEmits } from 'vue';

const emits = defineEmits<{
    change: [id: number];
}>();
emits('change', 1);
</script>
