<template>
    <v-btn
        v-for="item in props.data"
        :key="item.id"
        variant="text"
        :icon="item.icon"
        size="x-small"
        draggable="true"
        @dragstart="onDragstart(item)"
        @click="onClick(item)"
    >
        <v-icon :icon="item.icon"></v-icon>
        <!-- <v-tooltip activator="parent" location="end">{{ item.name }}</v-tooltip> -->
    </v-btn>
    <input ref="imageFileRef" hidden accept="image/*" type="file" @change="changeFile" />
</template>
<script lang="ts" setup>
import type { VirtualDom } from '../hooks/useOreoApp';
import { VirtualDomType } from '../hooks/useOreoApp';
import { ref } from 'vue';
import { cloneDeep } from 'lodash';

const emit = defineEmits(['draging', 'addimg']);

const props = withDefaults(
    defineProps<{
        data: VirtualDom[];
    }>(),
    {}
);

const onDragstart = (e: VirtualDom) => {
    emit('draging', cloneDeep(e));
};

const imageFileRef = ref<any>();

let curObj: VirtualDom;

const onClick = (e: VirtualDom) => {
    if (imageFileRef.value && e.type === VirtualDomType.Image) {
        curObj = cloneDeep(e);
        imageFileRef.value.click();
    }
};
const changeFile = (event: any) => {
    const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);

    const _URL = window.URL || window.webkitURL;
    const image = new Image();
    // @ts-ignore
    curObj.url = _URL.createObjectURL(file);
    // @ts-ignore
    image.src = curObj.url;
    image.onload = () => {
        curObj.styles.fill = false;
        curObj.styles.left = 0;
        curObj.styles.top = 0;
        curObj.styles.width = image.width;
        curObj.styles.height = image.height;
        emit('addimg', curObj);
    };

    // reader.onload = function (e) {
    //     if (curObj) {
    //         // @ts-ignore
    //         curObj.url = e?.target?.result;
    //         emit('addimg', curObj);
    //     }
    // };
};
</script>
