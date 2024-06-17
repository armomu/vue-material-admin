import { reactive, ref, onMounted, type DefineComponent } from 'vue';
import { useRuler } from './useRuler';

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

    let _id_ = 0;
    const onDrop = (e: DragEvent) => {
        _id_++;
        // console.log(e, 'onDragEnd');
        e.preventDefault();
        if (!dragingDom) return;
        for (let i = 0; i < appDom.value.length; i++) {
            appDom.value[i].active = false;
        }
        const { width, height } = dragingDom.styles;
        dragingDom.styles.top = e.offsetY - height / 2;
        dragingDom.styles.left = e.offsetX - width / 2;
        dragingDom.id = _id_;
        curDom.value = dragingDom;
        appDom.value.push(curDom.value);
    };

    const onVirtualDom = (val: any) => {
        curDom.value = val;
    };

    const boxSelect = reactive({
        visible: false,
        width: '',
        height: '',
        top: '',
        left: '',
    });
    const mouseState = {
        down: false,
        startX: 0,
        startY: 0,
    };
    const onPointerDown = (e: PointerEvent) => {
        console.log(e, 'onPointerDown');
        for (let i = 0; i < appDom.value.length; i++) {
            appDom.value[i].selected = false;
        }
        let className = '';
        // @ts-ignore
        className = e.target?.className || '';
        if (className.includes('work_content')) {
            mouseState.down = true;
            mouseState.startX = e.clientX + 0;
            mouseState.startY = e.clientY + 0;
            boxSelect.left = e.clientX + 'px';
            boxSelect.top = e.clientY + 'px';
        }
    };
    const onPointerMove = (e: PointerEvent) => {
        if (!mouseState.down) {
            return;
        }
        boxSelect.visible = true;
        boxSelect.width = Math.abs(e.clientX - mouseState.startX) + 'px';
        boxSelect.height = Math.abs(e.clientY - mouseState.startY) + 'px';
        if (e.clientX < mouseState.startX) {
            boxSelect.left = e.clientX + 'px';
        }
        if (e.clientY < mouseState.startY) {
            boxSelect.top = e.clientY + 'px';
        }
    };
    const onPointerUp = () => {
        mouseState.down = false;
        boxSelect.visible = false;
        checkSelectBox();
    };

    // 查询哟没有对象被选中
    const checkSelectBox = () => {
        const doms = document.getElementsByClassName('vdr');
        const left = parseFloat(boxSelect.left);
        const top = parseFloat(boxSelect.top);
        const width = parseFloat(boxSelect.width);
        const height = parseFloat(boxSelect.height);
        const uids: number[] = [];
        for (let i = 0; i < doms.length; i++) {
            const rect = doms[i].getBoundingClientRect();
            const isContained =
                left <= rect.left &&
                left + width >= rect.right &&
                top <= rect.top &&
                top + height >= rect.bottom;
            if (isContained) {
                uids.push(parseFloat(doms[i].getAttribute('uid') + ''));
            }
        }
        for (let i = 0; i < appDom.value.length; i++) {
            if (uids.includes(appDom.value[i].id)) {
                appDom.value[i].selected = true;
            }
        }
        // console.log(boxSelect   );
        boxSelect.height = '';
        boxSelect.width = '';
        boxSelect.top = '';
        boxSelect.left = '';
    };

    const pointerEvent = {
        boxSelect,
        onPointerDown,
        onPointerMove,
        onPointerUp,
    };

    // left ruler scroll
    const workAreaDomRef = ref<HTMLDivElement>();
    const ruler = useRuler();
    const onWorkAreaScroll = () => {
        const leftRulerDom = ruler.leftRulerDom.value as HTMLDivElement;
        leftRulerDom.style.top = `-${workAreaDomRef.value?.scrollTop}px`;
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
        workAreaDomRef,
        onWorkAreaScroll,
        ...pointerEvent,
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
    editText: boolean;
    styles: ElementStyles;
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
    shadowSpread: number;
    shadowColor: string;
}
