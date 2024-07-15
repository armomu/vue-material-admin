<template>
    <template v-if="props.data.visible">
        <div v-if="isDiv" :style="styles" :class="classNames" :uid="props.data.id">
            <div v-if="props.data.label && !props.data.input" class="text">
                {{ props.data.label }}
            </div>
            <textarea
                v-if="props.data.input"
                class="textarea"
                v-model="_label"
                @blur="onBlur"
                @input="onInput"
                @keydown.enter="onEnter"
                autofocus="true"
            ></textarea>
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
        </div>
        <DragResizeBle
            v-else
            :active="_active"
            :w="_width"
            :h="_height"
            :x="_left"
            :y="_top"
            :draggable="disableDrag"
            :resizable="disableResize"
            @activated="onActivated"
            @deactivated="onDeactivated"
            @resizestop="funStop"
            @dragstop="funStop"
            @dragging="onDragging"
            @resizing="onResizing"
            @refLineParams="getRefLineParams"
            :lockAspectRatio="lockAspectRatio"
            :style="styles"
            :class="classNames"
            :uid="props.data.id"
            @contextmenu.prevent="onMouser"
        >
            <div v-if="props.data.label && !props.data.input" class="text dr_text">
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
        label?: string;
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
    'update:label',
    'stop',
    'resizing',
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
const _label = computed({
    get() {
        return props.label || '';
    },
    set(val: string) {
        emit('update:label', val);
    },
});

const isDiv = computed(() => {
    // 禁用宽高调整
    if (props.disable) {
        return true;
    }
    // 如果是文字输入也是div形式
    if (props.data.input) return true;

    // !!props.data.type 不是组合
    // !!props.data.type 是组合
    // return !!props.data.groupId && !props.data.type;
    if (props.data.groupId) return true;
    if (props.data.virtualGroup) return false;
    return !!props.data.groupId && !!props.data.type;
});

const disableDrag = computed(() => {
    if (props.data.groupId) return true;
    return !props.data.locked && !props.data.input;
});
const disableResize = computed(() => {
    if (props.data.type === VirtualDomType.Group || props.data.virtualGroup) return true;
    if (props.data.groupId) return true;
    return !props.data.locked && !props.data.input;
});

const lockAspectRatio = computed(() => {
    const arr = [VirtualDomType.Circle, VirtualDomType.Icon];
    return arr.includes(props.data.type);
});

const funStop = (e: ResizeOffset) => {
    emit('update:width', e.width);
    emit('update:height', e.height);
    emit('update:top', e.top);
    emit('update:left', e.left);
    emit('stop', e);
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
    emit('update:top', top_);
    emit('update:left', left_);
    emit('dragging', f, props.data);
};
const onResizing = (left: number, top: number, width: number, height: number) => {
    emit('update:width', width);
    emit('update:height', height);
    emit('resizing', { left, top, width, height });
};

const onBlur = () => {
    emit('blur');
};
const onInput = (e: Event) => {
    emit('input', e);
};
const onEnter = (e: Event) => {
    emit('enter', e);
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
        fontStyle.lineHeight = '1';
        // fontStyle.lineHeight = props.data.fontStyle.lineHeight + 'px';
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

// 右键
const onMouser = (e: PointerEvent) => {
    emit('mouser', e, props.data);
};
</script>
