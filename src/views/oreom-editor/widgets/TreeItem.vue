<template>
    <div
        class="layerTree"
        draggable="true"
        @dragover="onDragover"
        @drop="onDrop"
        @contextmenu.prevent="(_e) => {}"
        :style="styles"
    >
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { AppTree } from '../hooks/useMain';

const props = withDefaults(
    defineProps<{
        data: AppTree;
    }>(),
    {}
);
const emit = defineEmits(['ondrop', 'over']);

const styles = computed(() => {
    return {
        width: props.data.width + '%',
        minHeight: props.data.height + 'px',
        marginTop: props.data.marginTop + 'px',
        marginRight: props.data.marginRight + 'px',
        marginButtom: props.data.marginButtom + 'px',
        marginLeft: props.data.marginLeft + 'px',
        paddingTop: props.data.paddingTop + 'px',
        paddingRight: props.data.paddingRight + 'px',
        paddingButtom: props.data.paddingButtom + 'px',
        paddingLeft: props.data.paddingLeft + 'px',
        background: props.data.background,
        color: props.data.color,
    };
});

const onDragover = (e: DragEvent) => {
    e.preventDefault();
    emit('over', e, props.data);
};

const onDrop = (e: DragEvent) => {
    e.stopPropagation();
    emit('ondrop', e, props.data);
};
</script>
