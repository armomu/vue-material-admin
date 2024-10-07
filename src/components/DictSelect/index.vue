<template>
    <v-select
        v-model="value"
        :items="items"
        item-title="label"
        :item-value="props.itemValue"
        :clearable="props.clearable"
        :hide-details="props.hideDetails"
        :dense="props.dense"
        :label="props.label"
        :placeholder="props.placeholder"
        :density="props.density"
        :variant="props.variant"
        :rules="props.rules"
        :prepend-icon="props.prependIcon"
        @update:model-value="change"
    >
    </v-select>
</template>
<script lang="ts" setup>
import { computed, ref, onBeforeMount } from 'vue';
const emit = defineEmits(['update:modelValue', 'change']);

const props = withDefaults(defineProps<Props>(), {
    clearable: true,
    hideDetails: true,
    dense: true,
    label: 'label',
    itemValue: 'value',
    placeholder: '',
    density: 'compact',
    variant: 'outlined',
    dict: 'StatusDict',
});
const value = computed({
    get() {
        return props.modelValue;
    },
    set(val) {
        emit('update:modelValue', val);
    },
});

const change = (val: any) => {
    emit('change', val);
};

const dict_list = ref<any>({});

function initDict() {
    // TODO 建议放全局变量里面
    const res = localStorage.getItem('dict_list');
    if (res) {
        dict_list.value = JSON.parse(res);
        return;
    }
    const modules = import.meta.glob('../../dict/*.ts');
    const paths = [];
    const obj = {};
    for (const path in modules) {
        paths.push(modules[path]());
    }
    Promise.all(paths).then((res) => {
        for (const mod in res) {
            // @ts-ignore
            for (const item in res[mod]) {
                // @ts-ignore
                obj[item] = res[mod][item];
            }
        }
        dict_list.value = obj;
        // TODO 建议放全局变量里面
        localStorage.setItem('dict_list', JSON.stringify(obj));
    });
}
onBeforeMount(initDict);
const items = computed(() => {
    const list = [];
    for (const item in dict_list.value[props.dict]) {
        list.push(dict_list.value[props.dict][item]);
    }
    return list;
});
interface Props {
    modelValue: any;
    itemValue?: string;
    clearable?: boolean;
    dict?: string;
    hideDetails?: boolean;
    dense?: boolean;
    label?: string;
    placeholder?: string;
    prependIcon?: string;
    density?: 'default' | 'comfortable' | 'compact';
    variant?:
        | 'underlined'
        | 'filled'
        | 'outlined'
        | 'plain'
        | 'solo'
        | 'solo-inverted'
        | 'solo-filled';
    rules?: any[];
}
</script>
