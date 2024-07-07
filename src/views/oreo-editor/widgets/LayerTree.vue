<template>
    <a-tree
        @select="onSelect"
        @check="onCheck"
        @expand="onExpand"
        :data="treeData"
        block-node
        show-line
        size="small"
    >
        <template #extra="nodeData">
            <v-icon
                v-if="!nodeData.item.locked"
                icon="mdi-lock-outline"
                size="x-small"
                @click="onLock(nodeData)"
            />
            <v-icon
                v-else
                icon="mdi-lock-open-variant-outline"
                size="x-small"
                @click="onLock(nodeData)"
            />
            <v-icon
                v-if="!nodeData.item.visible"
                icon="mdi-eye-outline"
                size="x-small"
                class="ml-2"
                @click="onVisible(nodeData)"
            />
            <v-icon
                v-else
                icon="mdi-eye-off-outline"
                size="x-small"
                class="ml-2"
                @click="onVisible(nodeData)"
            />
        </template>
        <template #switcher-icon="node, { isLeaf }">
            <IconDown v-if="!isLeaf" />
        </template>
    </a-tree>
</template>
<script lang="ts" setup>
import { computed, h } from 'vue';
import type { Ref, VNode } from 'vue';
import { IconDriveFile, IconDown, IconImage, IconFontColors } from '@arco-design/web-vue/es/icon';
import { VIcon } from 'vuetify/components';
import { VirtualDomType } from '../hooks/useOreoApp';
import type { VirtualDom } from '../hooks/useOreoApp';
import { size } from 'lodash';

const props = withDefaults(
    defineProps<{
        data: VirtualDom[];
    }>(),
    {}
);
const treeData = computed(() => {
    const res = buildTree(props.data, 0);
    console.log(res);
    return res;
});

const emit = defineEmits(['select']);

const originTreeData = [
    {
        title: 'Trunk 0-0',
        key: '0-0',
        icon: 'font',
        children: [
            {
                title: 'Branch 0-0-1',
                key: '0-0-1',
                icon: 'font',
                children: [
                    {
                        title: 'Leaf 0-0-1-1',
                        key: '0-0-1-1',
                        icon: 'font',
                    },
                    {
                        title: 'Leaf 0-0-1-2',
                        key: '0-0-1-2',
                        icon: 'font',
                    },
                ],
            },
        ],
    },
    {
        title: 'Trunk 0-1',
        key: '0-1',
        icon: 'font',
        children: [
            {
                title: 'Branch 0-1-1',
                key: '0-1-1',
                icon: 'font',
                children: [
                    {
                        title: 'Leaf 0-1-1-0',
                        key: '0-1-1-0',
                        icon: 'font',
                    },
                ],
            },
            {
                title: 'Branch 0-1-2',
                key: '0-1-2',
                icon: 'font',
                children: [
                    {
                        title: 'Leaf 0-1-2-0',
                        key: '0-1-2-0',
                        icon: 'font',
                    },
                ],
            },
        ],
    },
];

// const treeData = computed(() => {
//     return originTreeData;
// });

const onLock = (nodeData: TreeData) => {
    console.log(nodeData);
    nodeData.item.locked = !nodeData.item.locked;
};
const onVisible = (nodeData: TreeData) => {
    console.log(nodeData);
    nodeData.item.visible = !nodeData.item.visible;
};

const onSelect = (newSelectedKeys: string[], event: TreeEvent) => {
    console.log('select: ', event.node.item);
    event.node.item.selected = true;
    emit('select', event.node.item);
};
const onCheck = (newCheckedKeys: string[], event: TreeEvent) => {
    console.log('check: ', newCheckedKeys, event);
};
const onExpand = (newExpandedKeys: string[], event: TreeEvent) => {
    console.log('expand: ', newExpandedKeys, event);
};

function buildTree(flatData: VirtualDom[], rootId: number) {
    const tree: TreeData[] = [];

    for (let i = 0; i < flatData.length; i++) {
        if (flatData[i].groupId === rootId) {
            const children = buildTree(flatData, flatData[i].id);
            const icon = getIcon(flatData[i].type);
            tree.push({
                item: flatData[i],
                key: flatData[i].id + '',
                title: flatData[i].name,
                switcherIcon: children.length ? undefined : icon,
                children,
            });
        }
    }

    return tree;
}
const getIcon = (type: number) => {
    let icon = () => h(IconDriveFile);
    if (type === VirtualDomType.Image) {
        icon = () => h(IconImage);
    }
    if (type === VirtualDomType.Text) {
        icon = () => h(IconFontColors);
    }
    return icon;
};
interface TreeData {
    item: VirtualDom;
    key: string;
    title: string;
    switcherIcon?: any;
    children: TreeData[];
}
interface TreeEvent {
    e: PointerEvent;
    node: TreeData;
    selected: boolean;
    selectedNodes: TreeData[];
}
</script>
<style lang="scss">
.contextmenu {
    position: fixed;
    left: 200px;
    top: 300px;
    z-index: 999;
    padding: 4px;
    .contextmenu_item {
        line-height: 24px;
        height: 24px;
        padding: 0 12px;
        margin: 2px 0;
        font-size: 11px;
        width: 200px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        opacity: 0.8;
        &:hover {
            background-color: rgba(255, 255, 255, 0.15);
        }
    }
}
</style>
