import { reactive, ref } from 'vue';
import { throttle } from 'lodash';

export const useMain = () => {
    let beaseTreeID = 1;
    const beaseTree = {
        id: 1,
        name: 'container',
        icon: 'mdi-auto-fix',
        active: false,
        visible: true,
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
        items: [],
    };
    const appTree = ref<AppTree[]>([
        {
            ...beaseTree,
        },
    ]);

    console.log(JSON.stringify(appTree.value));
    const widgets = ref<AppTree[]>([]);
    const icons = [
        'account-arrow-up',
        'arrow-all',
        'arrow-collapse-down',
        'church-outline',
        'library-outline',
    ];
    for (let i = 0; i < 5; i++) {
        beaseTree.icon = icons[i];
        widgets.value.push({ ...beaseTree, id: i });
    }
    function find(tree: AppTree, id: number): AppTree | null {
        if (tree.id === id) {
            return tree;
        } else {
            for (let i = 0; i < tree.items.length; i++) {
                return find(tree.items[i], id);
            }
        }
        return null;
    }
    // const onDrag = throttle();
    const onDrag = (e: DragEvent, obj: AppTree) => {
        try {
            beaseTreeID++;
            const object = find(appTree.value[0], obj.id);
            object?.items.push({
                ...beaseTree,
                id: beaseTreeID++,
            });
            console.log('appTree.value');
        } catch (err) {
            console.log(err);
        }
    };
    const onOver = (e: DragEvent, obj: AppTree) => {
        // obj.items.push({
        //     ...beaseTree,
        //     id: beaseTreeID++,
        // });
        // const object = find(appTree.value[0], obj.id);
        // console.log(object);
    };

    const onTap = (e) => {
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
    icon: string;
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
