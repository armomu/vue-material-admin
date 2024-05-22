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
        <!-- <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :subtitle="item.raw.department"></v-list-item>
        </template> -->
    </v-select>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
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
        return props.modelValue || null;
    },
    set(val) {
        emit('update:modelValue', val);
    },
});

const change = (val: any) => {
    emit('change', val);
};

const dict_list = ref<any>({});

const modules = import.meta.glob('../../dict/*.ts');

(function initDict() {
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
    });
})();
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
