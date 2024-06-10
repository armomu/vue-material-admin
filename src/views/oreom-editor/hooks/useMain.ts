import { reactive, ref } from 'vue';

export const beaseDom: VirtualDom[] = [
    {
        id: 1,
        name: 'container',
        active: true,
        visible: true,
        type: 'container',
        edit: 0,
        content: {
            text: '',
            label: '',
            icon: 'mdi-card-outline',
        },
        styles: {
            width: 200,
            top: 0,
            left: 0,
            height: 90,
            marginTop: 0,
            marginRight: 0,
            marginButtom: 0,
            marginLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingButtom: 0,
            paddingLeft: 0,
            background: '#ffffff',
            color: '#333333',
            radius: 0,
            shadow: 0,
            flexDirection: 'column',
            fillSpace: '',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
    },
    {
        id: 2,
        name: 'button',
        active: false,
        visible: true,
        type: 'button',
        edit: 0,
        content: {
            text: 'button',
            label: '',
            icon: 'mdi-button-pointer',
        },
        styles: {
            width: 100,
            height: 32,
            top: 0,
            left: 0,
            marginTop: 0,
            marginRight: 0,
            marginButtom: 0,
            marginLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingButtom: 0,
            paddingLeft: 0,
            background: '#ffffff',
            color: '#333333',
            radius: 0,
            shadow: 0,
            flexDirection: '',
            fillSpace: '',
            alignItems: '',
            justifyContent: '',
        },
    },
    {
        id: 2,
        name: 'text',
        active: true,
        visible: true,
        type: 'text',
        edit: 1,
        content: {
            text: '这是一个开放源码的中后台管理系统，Oreom editor可提供基础拖放编辑页面',
            label: '',
            icon: 'mdi-format-color-text',
        },
        styles: {
            width: 300,
            height: 100,
            top: 0,
            left: 0,
            marginTop: 0,
            marginRight: 0,
            marginButtom: 0,
            marginLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingButtom: 0,
            paddingLeft: 0,
            background: '',
            color: '#333333',
            radius: 0,
            shadow: 0,
            flexDirection: '',
            fillSpace: '',
            alignItems: '',
            justifyContent: '',
        },
    },
];

export const useMain = () => {
    const appDom = ref<VirtualDom[]>([]);
    const widgets = ref<VirtualDom[]>([...beaseDom]);

    const curDom = ref<VirtualDom>();

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
        console.log(e, 'onDragEnd');
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

    return {
        appDom,
        widgets,
        curDom,
        onDraging,
        onDragover,
        onDrop,
        onVirtualDom,
    };
};
export interface VirtualDom {
    id: number;
    name: string;
    active: boolean;
    visible: boolean;
    type: 'button' | 'container' | 'text' | 'image';
    edit: number; //
    styles: ContainerStyles;
    content: ContainerContent;
}
export interface ContainerContent {
    icon: string;
    label: string;
    text: string;
}
export interface ContainerStyles {
    width: number;
    height: number;
    left: number;
    top: number;
    marginTop: number;
    marginRight: number;
    marginButtom: number;
    marginLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingButtom: number;
    paddingLeft: number;
    background: string;
    color: string;
    radius: number;
    shadow: number;
    flexDirection: string;
    fillSpace: string;
    alignItems: string;
    justifyContent: string;
}
