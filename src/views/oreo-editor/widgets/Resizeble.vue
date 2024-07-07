<template>
    <template v-if="props.data.visible">
        <div v-if="isDiv" :style="styles" :class="classNames" :uid="props.data.id">
            <div v-if="props.data.label && !props.data.input" class="text">
                {{ props.data.label }}
            </div>
            <textarea
                v-if="props.data.input"
                class="textarea"
                v-model="props.data.label"
                @blur="onBlur"
                @input="onInput"
                @keydown.enter="onEnter"
                autofocus="true"
            ></textarea>
            <img
                v-if="props.data.url"
                :src="props.data.url"
                :width="props.data.styles.width"
                :height="props.data.styles.height"
            />
        </div>
        <DragResizeBle
            v-else
            :active="_active"
            :w="_width"
            :h="_height"
            :x="_left"
            :y="_top"
            :draggable="_disable"
            :resizable="_disable"
            @activated="onActivated"
            @deactivated="onDeactivated"
            @resizestop="resize"
            @dragstop="resize"
            @dragging="onDragging"
            @resizing="onChanging"
            @refLineParams="getRefLineParams"
            :lockAspectRatio="lockAspectRatio"
            :style="styles"
            :class="classNames"
            :uid="props.data.id"
            @contextmenu.prevent="onMouser"
        >
            <div v-if="props.data.label && !props.data.input" class="text">
                {{ props.data.label }}
            </div>
            <a-image
                v-if="props.data.url"
                :width="props.data.styles.width"
                :height="props.data.styles.height"
                :fit="props.data.styles.imgFit"
                :src="props.data?.url || undefined"
                style="z-index: -1"
            />
            <v-icon
                v-if="props.data.type === 6"
                :icon="props.data.icon"
                :size="props.data.styles.width"
            />
            <slot></slot>
        </DragResizeBle>
    </template>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { ResizeOffset, VirtualDom } from '../hooks/useOreoApp';
import { VirtualDomType } from '../hooks/useOreoApp';
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
        disable?: boolean | null;
    }>(),
    {
        disable: false,
    }
);
const emit = defineEmits([
    'update:active',
    'update:width',
    'update:height',
    'update:top',
    'update:left',
    'change',
    'changing',
    'snapLine',
    'mouser',
    'dragging',
    'activated',
    'blur',
    'input',
    'enter',
]);

const _active = computed(() => props.active);
const _width = computed(() => props.width);
const _height = computed(() => props.height);
const _top = computed(() => props.top || 0);
const _left = computed(() => props.left || 0);

const isDiv = computed(() => {
    if (props.disable) {
        return true;
    }
    if (props.data.input) return true;
    return !!props.data.groupId && !!props.data.type;
});

const _disable = computed(() => {
    return !props.data.locked && !props.data.input;
});
const lockAspectRatio = computed(() => {
    const arr = [VirtualDomType.Circle, VirtualDomType.Icon];
    return arr.includes(props.data.type);
});

const resize = (e: ResizeOffset) => {
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
    emit('activated', props.data);
};
const onDeactivated = () => {
    emit('update:active', false);
};
const onDragging = (left_: number, top_: number, f: object) => {
    // console.log(f, 'f');
    emit('dragging', f, props.data);
};
const onBlur = () => {
    // console.log(f, 'f');
    emit('blur');
};
const onInput = (e: Event) => {
    // console.log(f, 'f');
    emit('input', e);
};
const onEnter = (e: Event) => {
    // console.log(f, 'f');
    emit('enter', e);
};
const onChanging = (left: number, top: number, width: number, height: number) => {
    // console.log(f, 'f');
    emit('changing', { left, top, width, height });
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
    let zIndex: any = '';
    if (props.data.active) {
        zIndex = 1;
    }

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
    const div: any = {};
    if (isDiv.value) {
        div.width = props.data.styles.width + 'px';
        div.height = props.data.styles.height + 'px';
        div.transform = `translate(${props.data.styles.left}px, ${props.data.styles.top}px)`;
    }

    return {
        borderRadius: `${props.data.styles.radius}px`,
        background,
        border,
        opacity: props.data.styles.opacity,
        boxShadow,
        zIndex,
        ...div,
        ...fontStyle,
    };
});
const classNames = computed(() => {
    return [
        'vdr',
        props.data.selected ? 'selected' : '',
        props.data.virtualGroup ? 'virtualGroup' : '',
        props.data.type === 0 ? 'group' : '',
    ];
});

const onMouser = (e: PointerEvent) => {
    emit('mouser', e);
};
</script>
