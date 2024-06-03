<template>
    <div class="layerTree" @click.stop="onClick" :style="styles">
        <div class="text">{{ props.data.content.text }}</div>
        <!-- <textarea v-model="props.data.content.text" class="textarea" /> -->
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
    // let width = '';
    // if (typeof props.data.styles.width === 'string') {
    //     width = props.data.styles.width;
    // }
    console.log(props.data, 'get styles');
    let display = 'block';
    if (props.data.styles.flexDirection === 'row') {
        display = 'flex';
    }

    return {
        width: props.data.styles.width,
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

        //
        display,
        flexDirection: props.data.styles.flexDirection,
        alignItems: props.data.styles.alignItems,
        justifyContent: props.data.styles.justifyContent,
    };
});
</script>
