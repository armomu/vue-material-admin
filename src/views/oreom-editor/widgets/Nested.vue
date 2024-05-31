<template>
    <div class="bg-white">
        <draggable
            class="dragArea"
            tag="ul"
            :list="items"
            :group="{ name: 'people', pull: 'clone', put: false }"
        >
            <li v-for="(el, index) in items" :key="index">
                <p>{{ el.name }}</p>
                <nested-draggable :items="el.items" class="bg-gray-100 pl-5" />
            </li>
        </draggable>
    </div>
</template>
<script lang="ts">
import { VueDraggableNext } from 'vue-draggable-next';
export default {
    props: {
        items: {
            required: true,
            type: Array<any>,
        },
    },
    components: {
        draggable: VueDraggableNext,
    },
    name: 'nested-draggable',
};
</script>
<style scoped>
.dragArea {
    margin: 16px;
    min-height: 50px;
    outline: 1px dashed;
}
</style>
