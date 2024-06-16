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
        :class="classNames"
        @contextmenu.prevent.native="onMouser"
    >
        <div v-if="props.data.content.text" class="text">{{ props.data.content.text }}</div>
        <slot></slot>
    </DragResizeBle>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { VirtualDom } from '../hooks/useOreoApp';
// @ts-ignore
import DragResizeBle from '@/components/DragResizeble/index.vue';
import { transform } from 'lodash';

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
    let background = 'none';
    if (props.data.styles.fill) {
        background = props.data.styles.background;
    }
    let border = 'none';
    if (props.data.styles.border) {
        border =
            props.data.styles.borderWidth +
            'px ' +
            props.data.styles.borderStyle +
            ' ' +
            props.data.styles.borderColor;
    }
    let boxShadow = 'none';
    if (props.data.styles.shadow) {
        boxShadow = `${props.data.styles.shadowX} ${props.data.styles.shadowY}px ${props.data.styles.shadowBlur}px ${props.data.styles.shadowSpread}px ${props.data.styles.shadowColor}`;
    }
    // console.log(props.data.fontStyle, 'set');

    // 字体样式
    let fontStyle: any = {};
    if (props.data.fontStyle) {
        fontStyle = {
            ...props.data.fontStyle,
        };
        fontStyle.fontSize = props.data.fontStyle.fontSize + 'px';
        if (props.data.fontStyle.shadow) {
            fontStyle.textShadow = `${props.data.fontStyle.shadowX}px ${props.data.fontStyle.shadowY}px ${props.data.fontStyle.shadowBlur}px ${props.data.fontStyle.shadowColor}`;
        }
        // console.log(fontStyle, 'fontStyle');
    }
    return {
        borderRadius: `${props.data.styles.radius}px`,
        background,
        border,
        opacity: props.data.styles.opacity,
        // transform: `rotate(${props.data.styles.rotate}deg)`,
        // transformOrigin: 'left top',
        boxShadow,
        ...fontStyle,
    };
});
const classNames = computed(() => {
    return [`elevation-${props.data.styles.shadow}`];
});

const onMouser = (e: PointerEvent) => {
    emit('mouser', e);
};
</script>
