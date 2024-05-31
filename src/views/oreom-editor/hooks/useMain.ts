import { reactive, ref } from 'vue';

export const beaseTree: AppTree[] = [
    {
        id: 1,
        name: 'container',
        active: false,
        visible: true,
        type: 'container',
        content: {
            text: '',
            label: '',
            icon: 'mdi-card-outline',
        },
        styles: {
            width: 100,
            height: 0,
            marginTop: 0,
            marginRight: 0,
            marginButtom: 0,
            marginLeft: 0,
            paddingTop: 16,
            paddingRight: 16,
            paddingButtom: 16,
            paddingLeft: 16,
            background: '#ffffff',
            color: '#333333',
            radius: 0,
            shadow: 0,
            flexDirection: '',
            fillSpace: '',
            alignItems: '',
            justifyContent: '',
        },
        items: [],
    },
    {
        id: 2,
        name: 'button',
        active: false,
        visible: true,
        type: 'button',
        content: {
            text: 'button',
            label: '',
            icon: 'mdi-button-pointer',
        },
        styles: {
            width: 100,
            height: 0,
            marginTop: 0,
            marginRight: 0,
            marginButtom: 0,
            marginLeft: 0,
            paddingTop: 16,
            paddingRight: 16,
            paddingButtom: 16,
            paddingLeft: 16,
            background: '#ffffff',
            color: '#333333',
            radius: 0,
            shadow: 0,
            flexDirection: '',
            fillSpace: '',
            alignItems: '',
            justifyContent: '',
        },
        items: [],
    },
    {
        id: 2,
        name: 'text',
        active: false,
        visible: true,
        type: 'text',
        content: {
            text: '这是一个开放源码的中后台管理系统，Oreom editor可提供基础拖放编辑页面',
            label: '',
            icon: 'mdi-format-color-text',
        },
        styles: {
            width: 100,
            height: 0,
            marginTop: 0,
            marginRight: 0,
            marginButtom: 0,
            marginLeft: 0,
            paddingTop: 16,
            paddingRight: 16,
            paddingButtom: 16,
            paddingLeft: 16,
            background: '#ffffff',
            color: '#333333',
            radius: 0,
            shadow: 0,
            flexDirection: '',
            fillSpace: '',
            alignItems: '',
            justifyContent: '',
        },
        items: [],
    },
];

export const useMain = () => {
    const appTree = ref<AppTree[]>([]);
    const widgets = ref<AppTree[]>([...beaseTree]);
    // const onDrag = throttle();
    const onDrag = (e: DragEvent, obj: AppTree) => {
        // try {
        //     beaseTreeID++;
        //     const object = find(appTree.value[0], obj.id);
        //     object?.items.push({
        //         ...beaseTree,
        //         id: beaseTreeID++,
        //     });
        //     console.log('appTree.value');
        // } catch (err) {
        //     console.log(err);
        // }
    };
    const onOver = (e: DragEvent, obj: AppTree) => {
        // obj.items.push({
        //     ...beaseTree,
        //     id: beaseTreeID++,
        // });
        // const object = find(appTree.value[0], obj.id);
        // console.log(object);
    };

    const onTap = (e: any) => {
        console.log(e);
    };
    return {
        appTree,
        widgets,
        onDrag,
        onOver,
        onTap,
    };
};
export interface AppTree {
    id: number;
    name: string;
    active: boolean;
    visible: boolean;
    type: 'button' | 'container' | 'text' | 'image';
    styles: ContainerStyles;
    content: ContainerContent;
    items: AppTree[];
}
export interface ContainerContent {
    icon: string;
    label: string;
    text: string;
}
export interface ContainerStyles {
    width: number;
    height: number;
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
