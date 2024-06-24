import { reactive, type Ref } from 'vue';
import { virtualGroup } from './useOreoApp';
import type { VirtualDom } from './useOreoApp';
import { cloneDeep } from 'lodash';

export const usePointer = (appDom: VirtualDom[], _id_: number, curDom: Ref<VirtualDom>) => {
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
        // 但点击的对象是右键菜单项目
        if (className.includes('contextmenu_item')) {
            return;
        }

        const vg = appDom.find((item) => item.virtualGroup);
        // 取消选中
        for (let i = 0; i < appDom.length; i++) {
            appDom[i].selected = false;
            if (vg && appDom[i].groupId === vg.id) {
                appDom[i].groupId = 0;
            }
        }
        // 删除虚拟组合
        vg && appDom.splice(appDom.indexOf(vg), 1);
        // 设置键菜单位置信息
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
        console.log('========', boxSelect.width + '');
        if (!boxSelect.width || parseFloat(boxSelect.width) < 5) {
            return;
        }
        const doms = document.getElementsByClassName('draggable');
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
        console.log(uids, 'uids');
        // 获得框选组合
        const haSelectedList: VirtualDom[] = [];
        for (let i = 0; i < appDom.length; i++) {
            // 需要去除包含在组内到的对象
            if (uids.includes(appDom[i].id) && !appDom[i].groupId) {
                appDom[i].selected = true;
                haSelectedList.push(appDom[i]);
            }
        }
        console.log('haSelectedList', JSON.parse(JSON.stringify(haSelectedList)));
        if (haSelectedList.length > 0) _id_ = new Date().getSeconds(); // 增加虚拟组合的ID
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
            appDom.push(curDom.value);
            console.log(appDom, 'not push');
        }
        // 取消框选的状态
        boxSelect.height = '';
        boxSelect.width = '';
        boxSelect.top = '';
        boxSelect.left = '';
    };

    return {
        boxSelect,
        onPointerDown,
        onPointerMove,
        onPointerUp,
    };
};
