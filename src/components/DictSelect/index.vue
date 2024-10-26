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
import { computed } from 'vue';
import { useDictStore } from '@/stores/useDictStore';

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

const dictEvent = useDictStore();

const change = (val: any) => {
    emit('change', val);
};

const items = computed(() => {
    try {
        const list = [];
        for (const item in dictEvent.dictList[props.dict]) {
            // @ts-ignore
            list.push(dictEvent.dictList[props.dict][item]);
        }
        return list;
    } catch (e) {
        return [];
    }
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
