<template>
    <div class="layerTree" @click.stop="onClick">
        <div>{{ props.data.name }}</div>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { AppTree } from '../hooks/useMain';

const emit = defineEmits(['tap']);
const props = withDefaults(
    defineProps<{
        data: AppTree;
    }>(),
    {}
);
const onClick = () => {
    emit('tap', props.data);
};
// const styles = computed(() => {
//     return {
//         width: props.data.width + '%',
//         minHeight: props.data.height + 'px',
//         marginTop: props.data.marginTop + 'px',
//         marginRight: props.data.marginRight + 'px',
//         marginButtom: props.data.marginButtom + 'px',
//         marginLeft: props.data.marginLeft + 'px',
//         paddingTop: props.data.paddingTop + 'px',
//         paddingRight: props.data.paddingRight + 'px',
//         paddingButtom: props.data.paddingButtom + 'px',
//         paddingLeft: props.data.paddingLeft + 'px',
//         background: props.data.background,
//         color: props.data.color,
//     };
// });
</script>
