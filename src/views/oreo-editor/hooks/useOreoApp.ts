import { reactive, ref, onMounted, type DefineComponent } from 'vue';

export const beaseDom: VirtualDom[] = [
    {
        id: 1,
        name: 'container',
        active: true,
        visible: true,
        selected: false,
        locked: false,
        type: 'container',
        editText: false,
        content: {
            text: '',
            label: '',
            icon: 'mdi-card-outline',
        },
        styles: {
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
        },
    },
    {
        id: 1,
        name: 'container',
        active: true,
        visible: true,
        selected: false,
        locked: false,
        type: 'text',
        editText: false,
        content: {
            text: 'This is an open source backend management system. Oreo editor can provide basic drag-and-drop editing pages.',
            label: '',
            icon: 'mdi-format-color-text',
        },
        styles: {
            width: 200,
            height: 90,
            left: 0,
            top: 0,
            opacity: 1,
            rotate: 0,
            radius: 0,

            fill: false,
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
        },
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

const OreoApp = () => {
    const appDom = ref<VirtualDom[]>([]);
    const widgets = ref<VirtualDom[]>([...beaseDom]);

    const curDom = ref<VirtualDom>({
        ...beaseDom[0],
    });
    const scale = ref(1);

    let dragingDom: VirtualDom;
    const onDraging = (e: VirtualDom) => {
        dragingDom = e;
    };

    // 这个为false 才能添加拖拽中的节点
    const addend = false;
    const onDragover = (e: DragEvent) => {
        e.preventDefault();
        // console.log(e, 'onDragover');
    };

    const onDrop = (e: DragEvent) => {
        // console.log(e, 'onDragEnd');
        e.preventDefault();
        if (!dragingDom) return;
        const { width, height } = dragingDom.styles;
        dragingDom.styles.top = e.offsetY - height / 2;
        dragingDom.styles.left = e.offsetX - width / 2;
        curDom.value = dragingDom;
        appDom.value.push(curDom.value);
    };

    const onVirtualDom = (val: any) => {
        curDom.value = val;
    };

    const boxSelect = ref({
        visible: false,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
    });
    const mouseState = {
        down: false,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
    };
    const onMouseDown = (e: MouseEvent) => {
        mouseState.down = true;
        mouseState.startX = e.offsetX;
        // @ts-ignore
        const offsetX = e.clientX - e.target.getBoundingClientRect().left;
        mouseState.startY = e.offsetY;
        console.log(e, 'onMouseDown');
    };
    const onMouseMove = (e: MouseEvent) => {
        if (mouseState.down) {
            boxSelect.value.visible = true;
        }
    };
    const onMouseUp = (e: MouseEvent) => {
        console.log(e, 'onMouseUp');
        mouseState.down = false;
    };

    const mouseEvent = {
        boxSelect,
        onMouseDown,
        onMouseMove,
        onMouseUp,
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
        ...mouseEvent,
    };
};
export default OreoApp;

export interface VirtualDom {
    id: number;
    name: string;
    active: boolean; // 进行拖变大小状态
    selected: boolean; // 选中状态
    locked: boolean; // 锁定状态
    visible: boolean;
    type: 'button' | 'container' | 'text' | 'image';
    editText: boolean; //
    styles: ContainerStyles;
    fontStyle?: FontStyle;
    component?: DefineComponent;
    content: ContainerContent;
}
export interface ContainerContent {
    icon: string;
    label: string;
    text: string;
}

// 基础框框
export interface ContainerStyles extends Shadow {
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
    shadowSpread: number;
    shadowColor: string;
}
