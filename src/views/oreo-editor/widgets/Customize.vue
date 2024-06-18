<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/valid-v-model -->
<template>
    <div class="customizes">
        <a-collapse
            :default-active-key="['1', '2', '3']"
            :bordered="false"
            :show-expand-icon="false"
            expand-icon-position="right"
        >
            <a-collapse-item header="Designed" key="1">
                <div class="align_group">
                    <v-btn
                        variant="text"
                        disabled
                        icon="mdi-align-horizontal-center "
                        size="x-small"
                    />
                    <v-btn variant="text" disabled icon="mdi-align-vertical-top" size="x-small" />
                    <v-btn
                        variant="text"
                        disabled
                        icon="mdi-align-horizontal-left"
                        size="x-small"
                    />
                    <v-btn
                        variant="text"
                        disabled
                        icon="mdi-align-horizontal-right"
                        size="x-small"
                    />
                    <v-btn
                        variant="text"
                        disabled
                        icon="mdi-align-vertical-bottom"
                        size="x-small"
                    />
                    <v-btn
                        variant="text"
                        disabled
                        icon="mdi-align-vertical-center"
                        size="x-small"
                    />
                    <v-btn
                        variant="text"
                        disabled
                        icon="mdi-align-vertical-distribute"
                        size="x-small"
                        class="ml-0 mt-2"
                    />
                    <v-btn
                        variant="text"
                        disabled
                        icon="mdi-align-horizontal-distribute"
                        size="x-small"
                        class="mt-2"
                    />
                </div>
                <a-divider class="my-2 mb-3"></a-divider>
                <div v-if="props.data">
                    <a-row :gutter="8">
                        <a-col :span="12">
                            <a-input-number v-model="props.data.styles.left" size="small"
                                ><template #prepend>X</template></a-input-number
                            >
                        </a-col>
                        <a-col :span="12">
                            <a-input-number v-model="props.data.styles.top" size="small"
                                ><template #prepend>Y</template></a-input-number
                            >
                        </a-col>
                        <a-col :span="12" class="mt-3">
                            <a-input-number v-model="props.data.styles.width" size="small"
                                ><template #prepend>W</template></a-input-number
                            >
                        </a-col>
                        <a-col :span="12" class="mt-3">
                            <a-input-number v-model="props.data.styles.height" size="small"
                                ><template #prepend>H</template></a-input-number
                            >
                        </a-col>
                        <div class="d-flex mt-2">
                            <v-btn variant="text" disabled icon="mdi-scan-helper" size="x-small" />
                            <a-slider
                                v-model="props.data.styles.radius"
                                style="width: 98px"
                                class="mx-2"
                            />
                            <a-input-number
                                style="width: 72px"
                                v-model="props.data.styles.radius"
                                size="mini"
                                class="ml-1"
                            />
                        </div>
                        <div class="d-flex mt-2">
                            <v-btn variant="text" disabled icon="mdi-restore" size="x-small" />
                            <a-slider
                                disabled
                                v-model="props.data.styles.rotate"
                                style="width: 98px"
                                class="mx-2"
                            />
                            <a-input-number
                                disabled
                                style="width: 72px"
                                v-model="props.data.styles.rotate"
                                size="mini"
                                class="ml-1"
                            />
                        </div>
                        <div class="d-flex mt-2">
                            <v-btn variant="text" disabled icon="mdi-eye-outline" size="x-small" />
                            <a-slider
                                v-model="props.data.styles.opacity"
                                :max="1"
                                :min="0.0"
                                :step="0.01"
                                style="width: 98px"
                                class="mx-2"
                            />
                            <a-input-number
                                style="width: 72px"
                                v-model="props.data.styles.opacity"
                                size="mini"
                                class="ml-1"
                            />
                        </div>
                    </a-row>
                </div>
            </a-collapse-item>
            <a-collapse-item v-if="props.data" header="Exterior" key="2">
                <a-row :gutter="8">
                    <a-col :span="4" class="pt-1">
                        <a-checkbox v-model="props.data.styles.fill"
                    /></a-col>
                    <a-col :span="4">
                        <a-color-picker showPreset v-model="props.data.styles.background">
                            <a-tag
                                :color="props.data.styles.background"
                                style="border: 1px #efefef solid; display: block"
                            >
                            </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="16">Fill</a-col>
                    <a-col :span="4" class="mt-2 pt-1">
                        <a-checkbox v-model="props.data.styles.border"
                    /></a-col>
                    <a-col :span="4" class="mt-2">
                        <a-color-picker showPreset v-model="props.data.styles.borderColor">
                            <a-tag
                                :color="props.data.styles.borderColor"
                                style="border: 1px #efefef solid; display: block"
                            >
                            </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="16" class="mt-2">Border</a-col>
                    <a-col :span="4" class="mt-2"> </a-col>
                    <a-col :span="8" class="mt-2">
                        <a-select
                            v-model="props.data.styles.borderWidth"
                            style="flex: 1"
                            size="small"
                        >
                            <a-option v-for="item in 30" :key="item" :value="item">{{
                                item
                            }}</a-option>
                        </a-select>
                    </a-col>
                    <a-col :span="12" class="mt-2">
                        <a-select
                            v-model="props.data.styles.borderStyle"
                            style="flex: 1"
                            size="small"
                        >
                            <a-option value="solid">Solid</a-option>
                            <a-option value="dashed">Dashed</a-option>
                        </a-select>
                    </a-col>

                    <a-col :span="4" class="mt-3 pt-1">
                        <a-checkbox v-model="props.data.styles.shadow"
                    /></a-col>
                    <a-col :span="4" class="mt-3">
                        <a-color-picker showPreset v-model="props.data.styles.shadowColor">
                            <a-tag :color="props.data.styles.shadowColor" style="display: block">
                            </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="16" class="mt-3">Shadow</a-col>
                </a-row>
                <a-row class="shadow_styles_input">
                    <a-col :span="4" class="mt-2"> </a-col>
                    <a-col :span="5" class="mt-2">
                        <a-input-number v-model="props.data.styles.shadowX" size="small" />
                    </a-col>
                    <a-col :span="5" class="mt-2">
                        <a-input-number v-model="props.data.styles.shadowY" size="small" />
                    </a-col>
                    <a-col :span="5" class="mt-2">
                        <a-input-number v-model="props.data.styles.shadowBlur" size="small" />
                    </a-col>
                    <a-col :span="5" class="mt-2">
                        <a-input-number v-model="props.data.styles.shadowSpread" size="small" />
                    </a-col>
                </a-row>
            </a-collapse-item>
            <!-- 文本样式开始 -->
            <a-collapse-item v-if="props.data && props.data.fontStyle" header="Text" key="3">
                <a-row :gutter="8">
                    <a-col :span="8" style="width: auto">
                        <a-select
                            v-model="props.data.fontStyle.fontSize"
                            style="flex: 1"
                            size="small"
                        >
                            <a-option v-for="item in 100" :key="item" :value="item + ''">{{
                                item
                            }}</a-option>
                        </a-select>
                    </a-col>
                    <a-col :span="16" style="width: auto">
                        <a-select
                            v-model="props.data.fontStyle.fontFamily"
                            style="flex: 1"
                            size="small"
                        >
                            <a-option value="inherit">FollowSystem</a-option>
                            <a-option value="-apple-system">AppleSystem</a-option>
                            <a-option value="BlinkMacSystemFont">BlinkMacSystemFont</a-option>
                            <a-option value="dashed">PingFang SC</a-option>
                            <a-option value="dashed">Hiragino Sans GB</a-option>
                            <a-option value="dashed">Microsoft YaHei</a-option>
                            <a-option value="dashed">Helvetica Neue</a-option>
                        </a-select>
                    </a-col>

                    <a-col :span="5" class="mt-3">
                        <a-color-picker showPreset v-model="props.data.fontStyle.color">
                            <a-tag :color="props.data.fontStyle.color" style="display: block">
                            </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="19" class="mt-3">
                        <a-radio-group
                            type="button"
                            size="small"
                            v-model="props.data.fontStyle.textAlign"
                        >
                            <a-radio value="left"
                                ><v-icon icon="mdi-format-align-left" size="x-mall"
                            /></a-radio>
                            <a-radio value="right"
                                ><v-icon icon="mdi-format-align-right" size="x-mall"
                            /></a-radio>
                            <a-radio value="center"
                                ><v-icon icon="mdi-format-align-center" size="x-mall"
                            /></a-radio>
                            <a-radio value="justify"
                                ><v-icon icon="mdi-format-align-justify" size="x-mall"
                            /></a-radio>
                        </a-radio-group>
                    </a-col>
                    <a-col :span="12" class="mt-3" style="width: auto">
                        <a-button-group disabled>
                            <a-button style="width: 33px">
                                <template #icon
                                    ><v-icon icon="mdi-format-bold" size="mall"
                                /></template>
                            </a-button>
                            <a-button style="width: 33px">
                                <template #icon
                                    ><v-icon icon="mdi-format-underline" size="mall"
                                /></template>
                            </a-button>
                            <a-button style="width: 33px">
                                <template #icon
                                    ><v-icon icon="mdi-format-strikethrough" size="mall"
                                /></template> </a-button
                        ></a-button-group>
                    </a-col>
                    <a-col :span="12" class="mt-3" style="width: auto">
                        <a-button-group disabled>
                            <a-button style="width: 33px">
                                <template #icon
                                    ><v-icon icon="mdi-format-vertical-align-bottom" size="mall"
                                /></template>
                            </a-button>
                            <a-button style="width: 33px">
                                <template #icon
                                    ><v-icon icon="mdi-format-vertical-align-center" size="mall"
                                /></template>
                            </a-button>
                            <a-button style="width: 33px">
                                <template #icon
                                    ><v-icon icon="mdi-format-vertical-align-top" size="mall"
                                /></template>
                            </a-button>
                        </a-button-group>
                    </a-col>
                </a-row>

                <a-row :gutter="8">
                    <a-col :span="4" class="mt-3 pt-1">
                        <a-checkbox v-model="props.data.fontStyle.shadow"
                    /></a-col>
                    <a-col :span="4" class="mt-3">
                        <a-color-picker showPreset v-model="props.data.fontStyle.shadowColor">
                            <a-tag :color="props.data.fontStyle.shadowColor" style="display: block">
                            </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="16" class="mt-3">Shadow</a-col>
                </a-row>
                <a-row :gutter="8" class="shadow_styles_input">
                    <a-col :span="4" class="mt-2"></a-col>
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="props.data.fontStyle.shadowX" size="small" />
                    </a-col>
                    <a-col :span="7" class="mt-2">
                        <a-input-number v-model="props.data.fontStyle.shadowY" size="small" />
                    </a-col>
                    <a-col :span="7" class="mt-2">
                        <a-input-number v-model="props.data.fontStyle.shadowBlur" size="small" />
                    </a-col>
                </a-row>
            </a-collapse-item>
            <!-- 文本样式结束 -->
        </a-collapse>
    </div>
</template>
<script lang="ts" setup>
import { computed, type Ref } from 'vue';
import type { VirtualDom } from '../hooks/useOreoApp';

const props = withDefaults(
    defineProps<{
        data?: VirtualDom;
    }>(),
    {}
);
// const emit = defineEmits(['update:data.fontStyle.fontWeight']);

// const onTextFormat = () => {
//     console.log(props.data.fontStyle.fontWeight);
//     emit('update:data.fontStyle.fontWeight', 'bold');
//     console.log(props.data.fontStyle.fontWeight);
// };

const bgColor = computed(() => {
    if (props?.data?.styles.background) {
        return true;
    }
    return false;
});
</script>
