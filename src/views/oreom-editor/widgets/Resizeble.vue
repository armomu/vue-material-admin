<template>
    <DragResizeBle
        v-if="props.data.visible"
        :active="_active"
        :w="_width"
        :h="_height"
        :x="_left"
        :y="_top"
        @activated="onActivated"
        @deactivated="onDeactivated"
        @resizestop="resize"
        @dragstop="resize"
        @refLineParams="getRefLineParams"
        :style="styles"
        @contextmenu.prevent.native="onMouser"
    >
        <slot></slot>
    </DragResizeBle>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { VirtualDom } from '../hooks/useMain';
// @ts-ignore
import DragResizeBle from '@/components/DragResizeble/index.vue';

const props = withDefaults(
    defineProps<{
        data: VirtualDom;
        active: boolean;
        width: number;
        height: number;
        top: number;
        left: number;
    }>(),
    {}
);
const emit = defineEmits([
    'update:active',
    'update:width',
    'update:height',
    'update:top',
    'update:left',
    'change',
    'snapLine',
    'mouser',
]);

const _active = computed(() => props.active);
const _width = computed(() => props.width);
const _height = computed(() => props.height);
const _top = computed(() => props.top);
const _left = computed(() => props.left);

const resize = (e: any) => {
    emit('update:width', e.width);
    emit('update:height', e.height);
    emit('update:top', e.top);
    emit('update:left', e.left);
    emit('change', e);
};

const getRefLineParams = (params: any) => {
    const { vLine, hLine } = params;
    let id = 0;
    const vs = vLine.map((item: any) => {
        item['id'] = ++id;
        return item;
    });
    const hl = hLine.map((item: any) => {
        item['id'] = ++id;
        return item;
    });
    emit('snapLine', [vs || [], hl || []]);
};
const onActivated = () => {
    emit('update:active', true);
};
const onDeactivated = () => {
    emit('update:active', false);
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
        // width: props.data.styles.width,
        // minHeight: props.data.styles.height + 'px',
        // marginTop: props.data.styles.marginTop + 'px',
        // marginRight: props.data.styles.marginRight + 'px',
        // marginButtom: props.data.styles.marginButtom + 'px',
        // marginLeft: props.data.styles.marginLeft + 'px',
        // paddingTop: props.data.styles.paddingTop + 'px',
        // paddingRight: props.data.styles.paddingRight + 'px',
        // paddingButtom: props.data.styles.paddingButtom + 'px',
        // paddingLeft: props.data.styles.paddingLeft + 'px',
        // background: props.data.styles.background,
        // color: props.data.styles.color,

        //
        display,
        flexDirection: props.data.styles.flexDirection,
        alignItems: props.data.styles.alignItems,
        justifyContent: props.data.styles.justifyContent,
    };
});

const onMouser = (e: PointerEvent) => {
    emit('mouser', e);
};
</script>
