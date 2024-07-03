import { ref, computed, type DefineComponent } from 'vue';
import { useRuler } from './useRuler';
import { usePointer } from './usePointer';
import { useMouseMenu } from './useMouseMenu';

export enum VirtualDomType {
    Group,
    Rect,
    Circle,
    Text,
    Image,
    Video,
}
export const beaseDomStyle: ElementStyles = {
    width: 200,
    height: 90,
    left: 0,
    top: 0,
    opacity: 1,
    rotate: 0,
    radius: 0,

    fill: true,
    background: '#efefef',

    border: false,
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: '#999',

    shadow: false,
    shadowX: 0,
    shadowY: 4,
    shadowBlur: 8,
    shadowSpread: 0,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
};
export const beaseDom: VirtualDom[] = [
    {
        id: 1,
        name: 'Rect',
        groupId: 0,
        icon: 'mdi-card-outline',
        type: VirtualDomType.Rect, // 1矩形，2圆形，3文本，4图片，5视频
        active: true,
        visible: true,
        selected: false,
        locked: false,
        styles: { ...beaseDomStyle },
    },
    {
        id: 2,
        name: 'Circle',
        groupId: 0,
        icon: 'mdi-circle-outline',
        type: VirtualDomType.Circle, // 1矩形，2圆形，3文本，4图片，5视频
        active: true,
        visible: true,
        selected: false,
        locked: false,
        styles: { ...beaseDomStyle, width: 90, radius: 45 },
    },
    {
        id: 3,
        name: 'Text',
        groupId: 0,
        icon: 'mdi-format-color-text',
        label: 'This is an open source backend management system. Oreo editor can provide basic drag-and-drop editing pages.', // 展示文本 或者title用
        active: true,
        visible: true,
        selected: false,
        locked: false,
        type: VirtualDomType.Text,
        styles: { ...beaseDomStyle, fill: false },
        fontStyle: {
            color: '#333333',
            fontSize: '12',
            fontFamily: 'inherit',
            fontWeight: 'normal',
            textAlign: 'left',
            shadow: false,
            shadowX: 0,
            shadowY: 1,
            shadowBlur: 2,
            shadowSpread: 0,
            shadowColor: 'rgba(0, 0, 0, 1)',
            decoration: 'none',
        },
    },
];
export const virtualGroup: VirtualDom = {
    id: 0,
    name: 'virtualGroup',
    groupId: 0,
    virtualGroup: true, // 虚拟组 如果是虚拟组
    icon: 'mdi-group', // 统一用Vuetify mdi-xxxx这套
    type: 0, // 组合
    active: true,
    visible: true,
    selected: false,
    locked: false,
    styles: { ...beaseDomStyle, fill: false },
};
const OreoApp = () => {
    const appDom = ref<VirtualDom[]>([]);
    const widgets = ref<VirtualDom[]>([...beaseDom]);
    // 当前选中的节点
    const curDom = ref<VirtualDom>({
        ...beaseDom[0],
    });
    // 当前视图放大的倍数
    const _scale = ref(1);
    const scale = computed({
        get() {
            return _scale.value * 100;
        },
        set(val: number) {
            _scale.value = val / 100;
        },
    });
    // 当前拖动中的节点
    let dragingDom: VirtualDom;
    const onDraging = (e: VirtualDom) => {
        dragingDom = e;
    };

    const onDragover = (e: DragEvent) => {
        e.preventDefault();
    };

    // 各种群组ID索引
    let _id_ = 0;
    const onDrop = (e: DragEvent) => {
        _id_++;
        e.preventDefault();
        if (!dragingDom) return;
        for (let i = 0; i < appDom.value.length; i++) {
            appDom.value[i].active = false;
        }
        const { width, height } = dragingDom.styles;
        dragingDom.styles.top = e.offsetY - height / 2;
        dragingDom.styles.left = e.offsetX - width / 2;
        dragingDom.id = _id_ + 0;
        curDom.value = dragingDom;
        appDom.value.push(curDom.value);
    };

    const onVirtualDom = (val: VirtualDom) => {
        curDom.value = val;
    };

    const pointerEvent = usePointer(appDom, _id_, curDom);
    const rulerBar = useRuler();
    const mouseMenu = useMouseMenu(appDom, curDom);

    const disableDraResize = computed(() => {
        if (pointerEvent.mouseMode.value.text) {
            return true;
        }

        return false;
    });

    const onBlur = () => {
        curDom.value.input = false;
        curDom.value.locked = false;
        pointerEvent.onMouseMode('boxSelect');
    };

    const onInput = () => {
        // curDom.value.input = false;
    };
    const onEnter = () => {
        // curDom.value.input = false;
    };

    //
    // @ts-ignore
    const onResizeChange = (val: ResizeOffset) => {
        if (curDom.value.type === VirtualDomType.Circle) {
            curDom.value.styles.radius = parseInt(val.width / 2 + '');
        }
    };

    return {
        appDom,
        widgets,
        curDom,
        scale,
        onDraging,
        onDragover,
        onDrop,
        onVirtualDom,
        onBlur,
        onInput,
        onEnter,
        onResizeChange,
        disableDraResize,
        ...pointerEvent,
        ...rulerBar,
        ...mouseMenu,
    };
};
export default OreoApp;

export interface VirtualDom {
    id: number;
    groupId: number; // 所属组合ID
    virtualGroup?: boolean; // 虚拟组 如果是虚拟组
    name: string;
    icon: string; // 统一用Vuetify mdi-xxxx这套
    label?: string; // 展示文本 或者title用
    type: 0 | 1 | 2 | 3 | 4 | 5; // 0组合，1矩形，2圆形，3文本，4图片，5视频
    url?: string; // 图片或者资源链接
    active: boolean; // 进行拖变大小状态
    selected: boolean; // 选中状态
    locked: boolean; // 锁定状态
    visible: boolean;
    input?: boolean; // 文本特有的编辑文本中状态
    styles: ElementStyles;
    fontStyle?: FontStyle;
    component?: DefineComponent; // 内组件
}

// 基础框框
export interface ElementStyles extends Shadow {
    // 变换
    width: number;
    height: number;
    left: number;
    top: number;
    opacity: number;
    rotate: number;
    radius: number;

    fill: boolean;
    background: string;

    border: boolean;
    borderWidth: string;
    borderStyle: 'solid' | 'dashed' | 'dotted';
    borderColor: string;
}

// 文本
export interface FontStyle extends Shadow {
    color: string;
    fontSize: string;
    fontFamily: string;
    fontWeight: 'bold' | 'bolder' | 'normal' | 'lighter' | 'bolder';
    textAlign: 'center' | 'left' | 'right' | 'justify' | 'start' | 'end';
    decoration: 'none' | 'overline' | 'line-through' | 'underline';
}
interface Shadow {
    shadow: boolean;
    shadowX: number;
    shadowY: number;
    shadowBlur: number;
    shadowSpread: number; // 文本不可用
    shadowColor: string;
}
export interface ResizeOffset {
    left: number;
    top: number;
    width: number;
    height: number;
}
