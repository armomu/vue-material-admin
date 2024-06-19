import { reactive, ref, onMounted, computed, type DefineComponent } from 'vue';
import { useRuler } from './useRuler';
enum VirtualDomType {
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
        dragingDom.id = _id_;
        curDom.value = dragingDom;
        appDom.value.push(curDom.value);
    };

    const onVirtualDom = (val: any) => {
        curDom.value = val;
    };

    // 框选
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
        let className = '';
        // @ts-ignore
        className = e.target?.className || '';
        // 当点击的对象是拖拽框
        if (className.includes('vdr')) {
            return;
        }

        const vg = appDom.value.find((item) => item.virtualGroup);
        // 取消选中
        for (let i = 0; i < appDom.value.length; i++) {
            appDom.value[i].selected = false;
            if (vg && appDom.value[i].groupId === vg.id) {
                appDom.value[i].groupId = 0;
            }
        }
        vg && appDom.value.splice(appDom.value.indexOf(vg), 1);
        if (className.includes('work_content') || className.includes('work-area')) {
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
    // 查询有没有对象被选中
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

        // 获得框选组合
        if (uids.length > 0) _id_++; // 增加虚拟组合
        const haSelectedList: VirtualDom[] = [];
        for (let i = 0; i < appDom.value.length; i++) {
            if (uids.includes(appDom.value[i].id)) {
                appDom.value[i].selected = true;
                haSelectedList.push(appDom.value[i]);
            }
        }
        // 选中多个对象后 把它们放入一个虚拟组合里
        if (uids.length > 1) {
            let minTop = Infinity;
            let minLeft = Infinity;
            let maxBottom = -Infinity;
            let maxRight = -Infinity;
            const topList: number[] = [];
            const leftList: number[] = [];
            for (let i = 0; i < appDom.value.length; i++) {
                appDom.value[i].groupId = _id_;
                const { width, height, top, left } = appDom.value[i].styles;
                topList.push(top);
                leftList.push(left);
                if (top < minTop) {
                    minTop = top;
                }
                if (left < minLeft) {
                    minLeft = left;
                }
                const bottom = top + height;
                const right = left + width;
                if (bottom > maxBottom) {
                    maxBottom = bottom;
                }
                if (right > maxRight) {
                    maxRight = right;
                }
            }
            const obj: VirtualDom = {
                ...virtualGroup,
                id: _id_,
            };
            obj.styles.width = maxRight - minLeft;
            obj.styles.height = maxBottom - minTop;
            obj.styles.top = Math.min(...topList);
            obj.styles.left = Math.min(...leftList);
            curDom.value = obj;
            appDom.value.push(curDom.value);
        } else {
            // FIX BUG #01
            // for (let i = 0; i < appDom.value.length; i++) {
            //     if (appDom.value[i].groupId === _id_) appDom.value[i].groupId = 0;
            // }
        }
        boxSelect.height = '';
        boxSelect.width = '';
        boxSelect.top = '';
        boxSelect.left = '';
    };
    const onVirtualGroupDragging = (f: VirtualGroupDraggingOffset, item: VirtualDom) => {
        // console.log(f, b);
        if (item.virtualGroup || item.type === VirtualDomType.Group) {
            for (let i = 0; i < appDom.value.length; i++) {
                if (appDom.value[i].groupId === item.id) {
                    appDom.value[i].styles.left = appDom.value[i].styles.left + f.offsetX;
                    appDom.value[i].styles.top = appDom.value[i].styles.top + f.offsetY;
                }
            }
        }
    };

    const pointerEvent = {
        boxSelect,
        onPointerDown,
        onPointerMove,
        onPointerUp,
    };
    useRuler();

    // 对齐部分
    const onHorizontalCenter = () => {};

    return {
        appDom,
        widgets,
        curDom,
        scale,
        onDraging,
        onDragover,
        onDrop,
        onVirtualDom,
        onVirtualGroupDragging,
        ...pointerEvent,
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

interface VirtualGroupDraggingOffset {
    offsetX: number;
    offsetY: number;
}
