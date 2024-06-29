import { reactive, type Ref } from 'vue';
import { virtualGroup } from './useOreoApp';
import type { VirtualDom } from './useOreoApp';
import { cloneDeep } from 'lodash';

export const usePointer = (appDom: Ref<VirtualDom[]>, _id_: number, curDom: Ref<VirtualDom>) => {
    // 框选
    const boxSelect = reactive({
        visible: false,
        width: '',
        height: '',
        top: '',
        left: '',
    });
    const mouseState = {
        draggableActive: false,
        down: false,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        offsetX: 0,
        offsetY: 0,
    };

    const onPointerDown = (e: PointerEvent) => {
        mouseState.startX = e.clientX + 0;
        mouseState.startY = e.clientY + 0;
        console.log(e, 'onPointerDown');
        let className = '';
        // @ts-ignore
        className = e.target?.className || '';
        // @ts-ignore
        const e_t_did = parseInt(e.target?.getAttribute('uid') + '');

        // 当点击的对象是拖拽框
        if (className.includes('draggable')) {
            mouseState.draggableActive = true;
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
            boxSelect.left = e.clientX + 'px';
            boxSelect.top = e.clientY + 'px';
        }
    };
    const onPointerMove = (e: PointerEvent) => {
        console.log(e.clientX + 0);
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
            console.log(mouseState);
        }

        // 画框选框
        if (mouseState.down) {
            boxSelect.visible = true;
            boxSelect.width = Math.abs(e.clientX - mouseState.startX) + 'px';
            boxSelect.height = Math.abs(e.clientY - mouseState.startY) + 'px';
            if (e.clientX < mouseState.startX) {
                boxSelect.left = e.clientX + 'px';
            }
            if (e.clientY < mouseState.startY) {
                boxSelect.top = e.clientY + 'px';
            }
        }
    };
    const onPointerUp = () => {
        mouseState.down = false;
        boxSelect.visible = false;
        mouseState.draggableActive = false;
        checkSelectBox();
    };

    let haSelectedList: VirtualDom[] = [];
    // 所有包含在框选内的对象、组合的ID，不包含虚拟组合
    let uids: number[] = [];
    // 查询有没有对象被选中
    const checkSelectBox = () => {
        if (!boxSelect.width || parseFloat(boxSelect.width) < 5) {
            console.log('没有进入 ========= 查询有没有对象被选中');
            return;
        }
        // 获取所有对象集合
        const doms = document.getElementsByClassName('vdr');
        const left = parseFloat(boxSelect.left);
        const top = parseFloat(boxSelect.top);
        const width = parseFloat(boxSelect.width);
        const height = parseFloat(boxSelect.height);
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
        boxSelect.height = '';
        boxSelect.width = '';
        boxSelect.top = '';
        boxSelect.left = '';
    };

    //
    const onVirtualGroupDragging = (f: VirtualGroupDraggingOffset) => {
        for (let i = 0; i < haSelectedList.length; i++) {
            haSelectedList[i].styles.left = haSelectedList[i].styles.left + f.offsetX;
            haSelectedList[i].styles.top = haSelectedList[i].styles.top + f.offsetY;
        }

        // if (item.virtualGroup || item.type === VirtualDomType.Group) {
        //     for (let i = 0; i < appDom.value.value.length; i++) {
        //         if (appDom.value.value[i].groupId === item.id) {
        //             appDom.value.value[i].styles.left = appDom.value.value[i].styles.left + f.offsetX;
        //             appDom.value.value[i].styles.top = appDom.value.value[i].styles.top + f.offsetY;
        //         }
        //     }
        // }
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

    return {
        boxSelect,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onVirtualGroupDragging,
    };
};

interface VirtualGroupDraggingOffset {
    offsetX: number;
    offsetY: number;
}
