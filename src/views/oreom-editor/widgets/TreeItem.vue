<template>
    <div class="layerTree" @click.stop="onClick" :style="styles">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { VirtualDom } from '../hooks/useMain';

const emit = defineEmits(['tap']);
const props = withDefaults(
    defineProps<{
        data: VirtualDom;
    }>(),
    {}
);
const onClick = () => {
    emit('tap', props.data);
};
const styles = computed(() => {
    return {
        width: props.data.styles.width + '%',
        minHeight: props.data.styles.height + 'px',
        marginTop: props.data.styles.marginTop + 'px',
        marginRight: props.data.styles.marginRight + 'px',
        marginButtom: props.data.styles.marginButtom + 'px',
        marginLeft: props.data.styles.marginLeft + 'px',
        paddingTop: props.data.styles.paddingTop + 'px',
        paddingRight: props.data.styles.paddingRight + 'px',
        paddingButtom: props.data.styles.paddingButtom + 'px',
        paddingLeft: props.data.styles.paddingLeft + 'px',
        background: props.data.styles.background,
        color: props.data.styles.color,
    };
});
</script>
