import { onMounted, onUnmounted, reactive, ref, type Ref } from 'vue';
import { virtualGroup, beaseDom, VirtualDomType } from './useOreoApp';
import type { VirtualDom } from './useOreoApp';
import { cloneDeep } from 'lodash';

export const usePointer = (appDom: Ref<VirtualDom[]>, curDom: Ref<VirtualDom>) => {
    const mouseMode = ref({
        boxSelect: true,
        draRact: false,
        text: false,
        hand: false,
    });

    // 框选框视图状态
    const boxSelectState = ref({
        visible: false,
        width: '',
        height: '',
        top: '',
        left: '',
    });
    // 记录鼠标移动数据
    const mouseState = reactive({
        draggableActive: false,
        down: false,
        startX: 0,
        startY: 0,
        layerX: 0,
        layerY: 0,
        endX: 0,
        endY: 0,
        offsetX: 0,
        offsetY: 0,
    });

    // 是否正在添加新的对象中
    let adding = false;
    let pointerDownCount = 0;
    // eslint-disable-next-line no-undef
    let pointerDownTimer: NodeJS.Timeout | null = null;
    const onPointerDown = (e: PointerEvent) => {
        mouseState.startX = e.clientX + 0;
        mouseState.startY = e.clientY + 0;
        mouseState.layerX = e.layerX + 0;
        mouseState.layerY = e.layerY + 0;
        let className = '';
        // @ts-ignore
        className = e.target?.className || '';
        // @ts-ignore
        const e_t_did = parseInt(e.target?.getAttribute('uid') + '');

        console.log(className, 'onPointerDown');
        if (mouseMode.value.boxSelect) {
            if (
                className.includes('draggable') &&
                e_t_did === curDom.value.id &&
                curDom.value.type === VirtualDomType.Text
            ) {
                // 判定双击
                pointerDownCount++;
                if (pointerDownCount === 1) {
                    pointerDownTimer = setTimeout(() => {
                        pointerDownCount = 0;
                    }, 250);
                }
                if (pointerDownCount === 2) {
                    console.log('==========+++2');
                    pointerDownCount = 0;
                    pointerDownTimer && clearTimeout(pointerDownTimer);
                    curDom.value.input = true;
                }
            }

            // 当点击的对象是拖拽框
            if (className.includes('draggable')) {
                mouseState.draggableActive = true;
                // 找出当前ID所有子对象 包括组合子组合中的对象
                haSelectedList = findUids(e_t_did);
                return;
            }
            // 点击的对象是右键菜单项目不做操作
            if (className.includes('contextmenu_item')) {
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
            // 删除虚拟组合
            vg && appDom.value.splice(appDom.value.indexOf(vg), 1);

            // 设置键菜单位置信息
            if (className.includes('work_content') || className.includes('work-area')) {
                mouseState.down = true;
                boxSelectState.value.left = e.clientX + 'px';
                boxSelectState.value.top = e.clientY + 'px';
            }
        }
        // 画矩形
        if (mouseMode.value.draRact) {
            // curDom.value.locked = true;

            const newDom = cloneDeep(beaseDom[0]);
            newDom.visible = false;
            newDom.active = false;
            newDom.styles.width = 0;
            newDom.styles.height = 0;
            newDom.styles.left = e.layerX + 0;
            newDom.styles.top = e.layerY + 0;
            newDom.id = new Date().getTime();
            curDom.value = newDom;
            appDom.value.push(newDom);
            adding = true;
        }
        if (mouseMode.value.text) {
            if (curDom.value.input && className.includes('textarea')) {
                console.log('正在添加文字中，请继续编辑！');
                return;
            }
            if (curDom.value.input && className.includes('work_content')) {
                curDom.value.input = false;
                return;
            }
            const newDom = cloneDeep(beaseDom[2]);
            newDom.active = false;
            newDom.styles.width = 80;
            newDom.styles.height = 14;
            newDom.styles.left = e.layerX + 0;
            newDom.styles.top = e.layerY + 0;

            newDom.input = true;
            newDom.label = '双击编辑文字';
            newDom.id = new Date().getTime();
            curDom.value = newDom;
            appDom.value.push(curDom.value);
            console.log('添加了新的文字对象');
            console.log(curDom.value);
        }
    };

    const onPointerMove = (e: PointerEvent) => {
        mouseState.endX = e.clientX;
        mouseState.endY = e.clientY;
        if (mouseState.draggableActive) {
            if (e.clientX < mouseState.startX) {
                mouseState.offsetX = -mouseState.startX - e.clientX;
            } else {
                mouseState.offsetX = e.clientX - mouseState.startX;
            }
            if (e.clientY < mouseState.startY) {
                mouseState.offsetY = -mouseState.startY - e.clientY;
            } else {
                mouseState.offsetY = e.clientY - mouseState.startY;
            }
        }

        // 画框选框
        if (mouseState.down && mouseMode.value.boxSelect) {
            boxSelectState.value.visible = true;
            boxSelectState.value.width = Math.abs(e.clientX - mouseState.startX) + 'px';
            boxSelectState.value.height = Math.abs(e.clientY - mouseState.startY) + 'px';
            if (e.clientX < mouseState.startX) {
                boxSelectState.value.left = e.clientX + 'px';
            }
            if (e.clientY < mouseState.startY) {
                boxSelectState.value.top = e.clientY + 'px';
            }
        }
        // 画矩形
        if (mouseMode.value.draRact && adding) {
            curDom.value.visible = true;

            curDom.value.styles.width = Math.abs(e.layerX - mouseState.layerX);
            curDom.value.styles.height = Math.abs(e.layerY - mouseState.layerY);
            if (e.layerX < mouseState.layerX) {
                curDom.value.styles.left = e.layerX + 0;
            }
            if (e.layerY < mouseState.layerY) {
                curDom.value.styles.top = e.layerY + 0;
            }
        }
    };

    const onPointerUp = () => {
        mouseState.down = false;
        boxSelectState.value.visible = false;
        mouseState.draggableActive = false;
        if (!curDom.value.input) {
            onMouseMode('boxSelect');
        }
        // onMouseMode('boxSelect');
        adding = false;
        checkSelectBox();
    };

    let haSelectedList: VirtualDom[] = [];
    // 所有包含在框选内的对象、组合的ID，不包含虚拟组合
    let uids: number[] = [];
    // 查询有没有对象被选中
    const checkSelectBox = () => {
        if (!mouseMode.value.boxSelect) return;
        if (!boxSelectState.value.width || parseFloat(boxSelectState.value.width) < 5) {
            // console.log('没有进入 ========= 查询有没有对象被选中');
            return;
        }
        // 获取所有对象集合
        const doms = document.getElementsByClassName('vdr');
        const left = parseFloat(boxSelectState.value.left);
        const top = parseFloat(boxSelectState.value.top);
        const width = parseFloat(boxSelectState.value.width);
        const height = parseFloat(boxSelectState.value.height);
        uids = [];
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
        haSelectedList = [];
        for (let i = 0; i < appDom.value.length; i++) {
            // 需要去除包含在组内到的对象 只得到没有 组合的图层和组合框 组合框对象不包含
            if (uids.includes(appDom.value[i].id) && !appDom.value[i].groupId) {
                appDom.value[i].selected = true;
                haSelectedList.push(appDom.value[i]);
            }
        }
        let _id_ = 0;
        if (haSelectedList.length > 0) _id_ = new Date().getTime(); // 增加虚拟组合的ID
        // 选中多个对象后 把它们放入一个虚拟组合里
        if (haSelectedList.length > 1) {
            let minTop = Infinity;
            let minLeft = Infinity;
            let maxBottom = -Infinity;
            let maxRight = -Infinity;
            const topList: number[] = [];
            const leftList: number[] = [];
            for (let i = 0; i < haSelectedList.length; i++) {
                haSelectedList[i].groupId = _id_;
                const { width, height, top, left } = haSelectedList[i].styles;
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
            const obj = cloneDeep(virtualGroup);
            obj.id = _id_;
            obj.styles.width = maxRight - minLeft;
            obj.styles.height = maxBottom - minTop;
            obj.styles.top = Math.min(...topList);
            obj.styles.left = Math.min(...leftList);
            curDom.value = obj;
            appDom.value.push(curDom.value);
        }
        // 取消框选的状态
        boxSelectState.value.height = '';
        boxSelectState.value.width = '';
        boxSelectState.value.top = '';
        boxSelectState.value.left = '';
    };

    //
    const onVirtualGroupDragging = (f: DragOffset) => {
        for (let i = 0; i < haSelectedList.length; i++) {
            haSelectedList[i].styles.left = haSelectedList[i].styles.left + f.offsetX;
            haSelectedList[i].styles.top = haSelectedList[i].styles.top + f.offsetY;
        }
    };

    // 修复群组对齐的时候
    const fixDragOffset = () => {
        if (haSelectedList.length > 0) {
            const minTop = Math.min(...haSelectedList.map((vd) => vd.styles.top));
            const minLeft = Math.min(...haSelectedList.map((vd) => vd.styles.left));
            const tres = curDom.value.styles.top - minTop;
            const mres = curDom.value.styles.left - minLeft;
            console.log(tres, mres, 'offset');
            // for (let i = 0; i < haSelectedList.length; i++) {
            //     if (tres > 0) {
            //         haSelectedList[i].styles.left = haSelectedList[i].styles.left + mres;
            //     } else {
            //         haSelectedList[i].styles.left = haSelectedList[i].styles.left - mres;
            //     }
            //     if (mres > 0) {
            //         haSelectedList[i].styles.top = haSelectedList[i].styles.top + tres;
            //     } else {
            //         haSelectedList[i].styles.top = haSelectedList[i].styles.top - tres;
            //     }
            // }
        }
    };

    const onMouseMode = (name: string) => {
        Object.keys(mouseMode.value).forEach((key) => {
            if (name === key) {
                // @ts-ignore
                mouseMode.value[key] = true;
            } else {
                // @ts-ignore
                mouseMode.value[key] = false;
            }
        });
        console.log(name, '模式=======', curDom.value.input);
    };

    function findUids(id: number) {
        const result: VirtualDom[] = [];
        function findChildren(items: VirtualDom[], parentId: number) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.groupId === parentId) {
                    result.push(item);
                    findChildren(items, item.id);
                }
            }
        }
        findChildren(appDom.value, id);
        return result;
    }

    function onKeydown(event: KeyboardEvent) {
        if (event.code === 'Space' && mouseMode.value.boxSelect) {
            event.preventDefault();
            if (!mouseMode.value.hand) {
                onMouseMode('hand');
            }
        }
    }
    function onKeyup(event: KeyboardEvent) {
        if (event.code === 'Space' && mouseMode.value.hand) {
            onMouseMode('boxSelect');
        }
    }

    onMounted(() => {
        document.addEventListener('keydown', onKeydown);
        document.addEventListener('keyup', onKeyup);
    });
    onUnmounted(() => {
        document.removeEventListener('keydown', onKeydown);
        document.removeEventListener('keyup', onKeyup);
    });

    return {
        mouseMode,
        boxSelectState,
        haSelectedList,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onVirtualGroupDragging,
        fixDragOffset,
        onMouseMode,
    };
};

export interface OreoPointerEvent {
    mouseMode: Ref<MouseMode>;
    boxSelectState: Ref<BoxSelectState>;
    haSelectedList: VirtualDom[];
    onPointerDown: (e: PointerEvent) => void;
    onPointerMove: (e: PointerEvent) => void;
    onPointerUp: () => void;
    onVirtualGroupDragging: (f: DragOffset) => void;
    fixDragOffset: () => void;
    onMouseMode: (name: string) => void;
}

interface MouseMode {
    boxSelect: boolean;
    draRact: boolean;
    text: boolean;
    hand: boolean;
}
interface BoxSelectState {
    visible: boolean;
    width: string;
    height: string;
    top: string;
    left: string;
}
interface DragOffset {
    offsetX: number;
    offsetY: number;
}
