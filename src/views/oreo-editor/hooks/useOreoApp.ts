import { ref, computed, type DefineComponent } from 'vue';
import { useRuler } from './useRuler';
import { useAlign } from './useAlign';
import { usePointer } from './usePointer';
import { useMouseMenu } from './useMouseMenu';
import { useIcon } from './useIcon';
import { useTextInput } from './useTextInput';
import { useSnapLine } from './useSnapLine';
import testJson from './test.json';

export enum VirtualDomType {
    Group,
    Rect,
    Circle,
    Text,
    Image,
    Video,
    Icon,
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
        type: VirtualDomType.Rect,
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
        type: VirtualDomType.Circle,
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
            fontSize: 12,
            lineHeight: 15,
            fontFamily: 'alishuhei',
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
    {
        id: 4,
        name: 'Image',
        groupId: 0,
        icon: 'mdi-image-outline',
        type: VirtualDomType.Image,
        active: true,
        visible: true,
        selected: false,
        locked: false,
        styles: { ...beaseDomStyle, imgFit: 'contain' },
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
        const vg = appDom.value.find((item) => item.virtualGroup);
        for (let i = 0; i < appDom.value.length; i++) {
            appDom.value[i].selected = false;
            appDom.value[i].active = false;
            if (vg && appDom.value[i].groupId === vg.id) {
                appDom.value[i].groupId = 0;
            }
        }
        // 删除虚拟组合
        vg && appDom.value.splice(appDom.value.indexOf(vg), 1);
        const { width, height } = dragingDom.styles;

        dragingDom.styles.top = e.offsetY - height / 2;
        dragingDom.styles.left = e.offsetX - width / 2;
        dragingDom.id = _id_ + 0;
        curDom.value = dragingDom;
        appDom.value.push(curDom.value);
        if (curDom.value.type === VirtualDomType.Image) {
            console.log(imageFileRef.value);
            imageFileRef.value.click();
        }
    };

    // 点击页面图层
    const onVirtualDom = (val: VirtualDom) => {
        console.log(curDom.value, '点击了');
        curDom.value = val;
    };

    const onDelVirtualDom = (id: number) => {
        const index = appDom.value.findIndex((item) => item.id === id);
        if (index < 0) return;
        appDom.value.splice(index, 1);
    };

    const pointerEvent = usePointer(appDom, curDom);
    const rulerBar = useRuler();
    const mouseMenu = useMouseMenu(appDom, curDom);
    const iconEvent = useIcon(appDom, curDom, pointerEvent);
    const inputEvent = useTextInput(appDom, curDom, pointerEvent);
    const align = useAlign(appDom);
    const snapLineEvent = useSnapLine();
    //
    const disableDraResize = computed(() => {
        if (pointerEvent.mouseMode.value.text) {
            return true;
        }
        return false;
    });

    const onResize = (val: ResizeOffset) => {
        // BUG 为什么解除组合圆形的宽会变大
        if (curDom.value.type === VirtualDomType.Circle) {
            curDom.value.styles.radius = parseInt(val.width / 2 + '');
        }
    };

    const imageFileRef = ref<any>();
    const onAddImage = (event: Event) => {
        // @ts-ignore
        const file = event.target?.files[0];
        if (!file) return;
        const _URL = window.URL || window.webkitURL;
        const image = new Image();
        curDom.value.url = _URL.createObjectURL(file);
        image.src = curDom.value.url;
        image.onload = () => {
            curDom.value.styles.fill = false;
            curDom.value.styles.width = 216;
            curDom.value.styles.height = (image.height / image.width) * 216;
        };
    };

    const onLayerTreeNode = (item: VirtualDom) => {
        for (let i = 0; i < appDom.value.length; i++) {
            appDom.value[i].selected = item.id === appDom.value[i].id;
        }
    };

    const jsonViewerVisible = ref(false);
    // test
    appDom.value = testJson._rawValue as any;
    return {
        appDom,
        widgets,
        curDom,
        scale,
        onDraging,
        onDragover,
        onDrop,
        onVirtualDom,
        onDelVirtualDom,
        onResize,
        disableDraResize,
        imageFileRef,
        onAddImage,
        onLayerTreeNode,
        jsonViewerVisible,
        ...snapLineEvent,
        align,
        ...pointerEvent,
        ...rulerBar,
        ...mouseMenu,
        ...iconEvent,
        ...inputEvent,
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
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0组合，1矩形，2圆形，3文本，4图片，5视频
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
    imgFit?: 'fill' | 'none' | 'contain' | 'cover' | 'scale-down' | undefined;
    background: string;

    border: boolean;
    borderWidth: string;
    borderStyle: 'solid' | 'dashed' | 'dotted';
    borderColor: string;
}

// 文本
export interface FontStyle extends Shadow {
    color: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: 'bold' | 'bolder' | 'normal' | 'lighter' | 'bolder';
    textAlign: 'center' | 'left' | 'right' | 'justify' | 'start' | 'end';
    decoration: 'none' | 'overline' | 'line-through' | 'underline';
    lineHeight: number;
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
