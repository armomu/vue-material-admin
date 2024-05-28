import { reactive, ref } from 'vue';
import { throttle } from 'lodash';

export const useMain = () => {
    let beaseTreeID = 4;
    const beaseTree = {
        id: 1,
        name: 'container',
        active: false,
        visible: true,
        width: 100,
        height: 90,
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
        items: [],
    };
    const appTree = ref<AppTree[]>([
        {
            ...beaseTree,
            items: [
                { ...beaseTree, id: 2 },
                { ...beaseTree, id: 3, items: [{ ...beaseTree, id: 4 }] },
            ],
        },
    ]);
    const widgets = ref([
        {
            name: 'Widgets',
            icon: 'mdi-auto-fix',
            open: false,
        },
    ]);
    function find(tree: AppTree, id: number) {
        const item = tree;
        if (tree.id === id) {
            return tree;
        } else {
            for (let i = 0; i < tree.items.length; i++) {
                find(tree.items[i], id);
            }
        }
    }
    // const onDrag = throttle();
    const onDrag = (e: DragEvent, obj: AppTree) => {
        beaseTreeID++;
        // obj.items.push({
        //     ...beaseTree,
        //     id: beaseTreeID++,
        // });
        appTree.value[0].items[0].items.push({
            ...beaseTree,
            id: beaseTreeID,
        });
        const object = find(appTree.value[0], obj.id);
        console.log(object);
        console.log('appTree.value');
    };
    const onOver = (e: DragEvent, obj: AppTree) => {
        // obj.items.push({
        //     ...beaseTree,
        //     id: beaseTreeID++,
        // });
        const object = find(appTree.value[0], obj.id);
        console.log(object);
    };

    return {
        appTree,
        widgets,
        onDrag,
        onOver,
    };
};

export interface AppTree {
    id: number;
    name: string;
    active: boolean;
    visible: boolean;
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
    items: AppTree[];
}
