<template>
    <v-select
        v-model="value"
        :items="items"
        item-title="name"
        item-value="department"
        :clearable="props.clearable"
        :hide-details="props.hideDetails"
        :dense="props.dense"
        :label="props.label"
        :placeholder="props.placeholder"
        :density="props.density"
        :variant="props.variant"
        @update:model-value="change"
    >
        <!-- <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :subtitle="item.raw.department"></v-list-item>
        </template> -->
    </v-select>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
const emit = defineEmits(['update:modelValue', 'change']);

const props = withDefaults(defineProps<Props>(), {
    clearable: true,
    hideDetails: true,
    dense: true,
    label: 'label',
    placeholder: 'label',
    density: 'compact',
    variant: 'outlined',
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

const items = [
    {
        name: 'John',
        department: 'Marketing1',
    },
    {
        name: 'Jane',
        department: 'Engineering',
    },
    {
        name: 'Joe',
        department: 'Sales1',
    },
    {
        name: 'Janet',
        department: 'Engineering1',
    },
    {
        name: 'Jake',
        department: 'Marketing',
    },
    {
        name: 'Jack',
        department: 'Sales',
    },
];

interface Props {
    modelValue: any;
    clearable?: boolean;
    hideDetails?: boolean;
    dense?: boolean;
    label?: string;
    placeholder?: string;
    density?: 'default' | 'comfortable' | 'compact';
    variant?:
        | 'underlined'
        | 'filled'
        | 'outlined'
        | 'plain'
        | 'solo'
        | 'solo-inverted'
        | 'solo-filled';
}
</script>
