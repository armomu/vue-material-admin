<template>
    <v-card class="dv_widget">
        <template v-if="imgSrc">
            <div class="d-flex jsb px-4">
                <div class="pt-4"><img :src="imgSrc" height="120" /></div>
                <div class="img_v">
                    <v-switch v-model="value" color="primary" hide-details inset></v-switch>
                    <div class="dv_tool">
                        <div v-if="toolw" class="item" :class="{ pbg: value }">
                            <v-icon icon="mdi-wifi" :color="value ? 'primary' : '#999'" size="12" />
                        </div>
                        <div v-if="toolp" class="item mt-2 bg">
                            <v-icon icon="mdi-power-plug" color="success" size="12" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="pa-4">
                <div class="dv_name">{{ title }}</div>
                <div class="is">{{ devModel }}</div>
            </div>
        </template>
        <template v-else>
            <div class="d-flex jsb px-4">
                <div class="text">{{ value ? 'ON' : 'OFF' }}</div>
                <div>
                    <v-switch v-model="value" color="primary" hide-details inset></v-switch>
                </div>
            </div>
            <div class="d-flex jsb px-4 t_row">
                <div>
                    <!-- <v-icon
                        :icon="icon"
                        :color="value ? 'primary' : ''"
                        size="42"
                        :class="{ pbg: value }"
                    /> -->
                    <v-btn variant="tonal" icon="" :color="value ? 'primary' : ''">
                        <v-icon :icon="icon" />
                    </v-btn>
                    <div class="dv_name my-4">{{ title }}</div>
                </div>
                <div class="dv_tool mb-4">
                    <div v-if="toolw" class="item" :class="{ pbg: value }">
                        <v-icon icon="mdi-wifi" :color="value ? 'primary' : '#999'" size="12" />
                    </div>
                    <div v-if="toolp" class="item mt-2 bg">
                        <v-icon icon="mdi-power-plug" color="success" size="12" />
                    </div>
                </div>
            </div>
        </template>
    </v-card>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        title?: string;
        icon?: string;
        imgSrc?: string;
        modelValue: boolean;
        devModel?: string;
        toolw?: boolean;
        toolp?: boolean;
        theme?: string;
    }>(),
    {
        title: 'title',
        icon: 'mdi-snowflake',
        toolw: true,
        toolp: true,
        theme: 'light',
    }
);
const emit = defineEmits(['update:modelValue']);
const value = computed({
    get() {
        return props.modelValue;
    },
    set(val: boolean) {
        emit('update:modelValue', val);
    },
});
</script>
<style scoped lang="scss">
.dv_widget {
    .dv_name {
        font-weight: 700;
    }
    .is {
        color: #999;
        font-size: 12px;
    }
    .t_row {
        align-items: flex-start;
        margin-top: -2px;
    }
    .img_v {
        .dv_tool {
            margin-top: 32px;
            padding-left: 26px;
        }
    }
    .dv_tool {
        align-self: flex-end;
        .item {
            width: 18px;
            height: 18px;
            text-align: center;
            border-radius: 9px;
            background-color: rgba(0, 0, 0, 0.1);
        }
        .pbg {
            background-color: rgba(var(--v-theme-primary), 0.2);
        }
        .bg {
            background-color: rgba(var(--v-theme-success), 0.2);
        }
    }
}
</style>
