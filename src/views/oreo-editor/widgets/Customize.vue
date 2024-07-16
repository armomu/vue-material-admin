<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/valid-v-model -->
<template>
    <div class="customizes">
        <a-collapse
            v-if="props.data"
            :default-active-key="['1', '2', '3', '4']"
            :bordered="false"
            :show-expand-icon="false"
            expand-icon-position="right"
        >
            <!-- 基础样式开始 -->
            <a-collapse-item header="Designed" key="1">
                <div class="align_group">
                    <v-btn
                        variant="text"
                        icon="mdi-align-horizontal-center"
                        size="x-small"
                        @click="props.align.horizontalCenter"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-vertical-center"
                        size="x-small"
                        @click="props.align.verticalCenter"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-vertical-top"
                        size="x-small"
                        @click="props.align.verticalTop"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-vertical-bottom"
                        size="x-small"
                        @click="props.align.verticalBottom"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-horizontal-left"
                        size="x-small"
                        @click="props.align.horizontalLeft"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-horizontal-right"
                        size="x-small"
                        @click="props.align.horizontalRight"
                    />

                    <!-- <v-btn
                        variant="text"
                        icon="mdi-align-horizontal-distribute"
                        size="x-small"
                        class="mt-2"
                        @click="props.align.horizontalDistribute"
                    />
                    <v-btn
                        variant="text"
                        icon="mdi-align-vertical-distribute"
                        size="x-small"
                        class="ml-0 mt-2"
                        @click="props.align.verticalDistribute"
                    /> -->
                </div>
                <a-divider class="my-2 mb-3"></a-divider>
                <a-row :gutter="8">
                    <a-col :span="12">
                        <a-input-number v-model="props.data.styles.left" size="mini"
                            ><template #prepend>X</template></a-input-number
                        >
                    </a-col>
                    <a-col :span="12">
                        <a-input-number v-model="props.data.styles.top" size="mini"
                            ><template #prepend>Y</template></a-input-number
                        >
                    </a-col>
                    <a-col :span="12" class="mt-2">
                        <a-input-number v-model="props.data.styles.width" size="mini"
                            ><template #prepend>W</template></a-input-number
                        >
                    </a-col>
                    <a-col :span="12" class="mt-2">
                        <a-input-number v-model="props.data.styles.height" size="mini"
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
            </a-collapse-item>
            <!-- 基础样式结束 -->
            <!-- 填充样式开始 -->
            <a-collapse-item v-if="showExterior" header="Exterior" key="2">
                <a-row :gutter="8">
                    <a-col :span="4" class="pt-1">
                        <a-checkbox v-model="props.data.styles.fill"
                    /></a-col>
                    <a-col :span="3">
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
                    <a-col :span="3" class="mt-2">
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
                            size="mini"
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
                            size="mini"
                        >
                            <a-option value="solid">Solid</a-option>
                            <a-option value="dashed">Dashed</a-option>
                        </a-select>
                    </a-col>

                    <a-col :span="4" class="mt-3 pt-1">
                        <a-checkbox v-model="props.data.styles.shadow"
                    /></a-col>
                    <a-col :span="3" class="mt-3">
                        <a-color-picker showPreset v-model="props.data.styles.shadowColor">
                            <a-tag
                                size="small"
                                :color="props.data.styles.shadowColor"
                                style="display: block"
                            >
                            </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="16" class="mt-3">Shadow</a-col>
                </a-row>
                <a-row v-if="props.data.styles.shadow" class="shadow_styles_input mb-2" :gutter="8">
                    <!-- <a-col :span="4" class="mt-2"> </a-col> -->
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="props.data.styles.shadowX" size="mini" />
                    </a-col>
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="props.data.styles.shadowY" size="mini" />
                    </a-col>
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="props.data.styles.shadowBlur" size="mini" />
                    </a-col>
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="props.data.styles.shadowSpread" size="mini" />
                    </a-col>
                </a-row>
                <a-button @click="onAddWidget" size="small" type="outline" long class="mt-3"
                    >Add Components</a-button
                >
            </a-collapse-item>
            <!-- 填充样式结束 -->

            <!-- 文本样式开始 -->
            <a-collapse-item v-if="props.data.fontStyle && showText" header="Text" key="3">
                <a-row :gutter="8">
                    <a-col :span="3">
                        <a-color-picker showPreset v-model="props.data.fontStyle.color">
                            <a-tag
                                size="small"
                                :color="props.data.fontStyle.color"
                                style="display: block"
                            >
                            </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="8">
                        <a-select
                            v-model="props.data.fontStyle.fontSize"
                            style="flex: 1"
                            size="small"
                        >
                            <a-option v-for="item in 100" :key="item" :value="item">{{
                                item
                            }}</a-option>
                        </a-select>
                    </a-col>
                    <a-col :span="13">
                        <a-select
                            v-model="props.data.fontStyle.fontFamily"
                            size="small"
                            style="flex: 1"
                        >
                            <a-option value="inherit">Inherit</a-option>
                            <a-option value="alipuhui">阿里普惠</a-option>
                            <a-option value="alishuhei">阿里数黑</a-option>
                        </a-select>
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
                        <a-button-group size="small">
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
                        <a-button-group size="mini" disabled>
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
                    <a-col :span="3" class="mt-3">
                        <a-color-picker showPreset v-model="props.data.fontStyle.shadowColor">
                            <a-tag
                                size="small"
                                :color="props.data.fontStyle.shadowColor"
                                style="display: block"
                            >
                            </a-tag>
                        </a-color-picker>
                    </a-col>
                    <a-col :span="16" class="mt-3">Shadow</a-col>
                </a-row>
                <a-row v-if="props.data.fontStyle.shadow" :gutter="8" class="shadow_styles_input">
                    <a-col :span="4" class="mt-2"></a-col>
                    <a-col :span="6" class="mt-2">
                        <a-input-number v-model="props.data.fontStyle.shadowX" size="mini" />
                    </a-col>
                    <a-col :span="7" class="mt-2">
                        <a-input-number v-model="props.data.fontStyle.shadowY" size="mini" />
                    </a-col>
                    <a-col :span="7" class="mt-2">
                        <a-input-number v-model="props.data.fontStyle.shadowBlur" size="mini" />
                    </a-col>
                </a-row>
            </a-collapse-item>
            <!-- 文本样式结束 -->
            <!-- 图片样式开始 -->
            <a-collapse-item v-if="showImage" header="Image" key="4">
                <a-image
                    :width="216"
                    :height="imageHeight"
                    :fit="props.data.styles.imgFit"
                    :src="props.data?.url || undefined"
                />
                <a-row :gutter="8" class="mt-3">
                    <a-col :span="6">Img Fit</a-col>
                    <a-col :span="18">
                        <a-select v-model="props.data.styles.imgFit" size="mini" style="flex: 1">
                            <a-option value="contain">Contain</a-option>
                            <a-option value="cover">Cover</a-option>
                            <a-option value="fill">Fill</a-option>
                            <a-option value="scale-down">Scale down</a-option>
                            <a-option value="none">None</a-option>
                        </a-select>
                    </a-col>
                </a-row>
            </a-collapse-item>
            <!-- 图片样式结束 -->
        </a-collapse>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { VirtualDom } from '../hooks/useOreoApp';
import { VirtualDomType } from '../hooks/useOreoApp';
import type { AlignFun } from '../hooks/useAlign';

const props = withDefaults(
    defineProps<{
        data?: VirtualDom;
        align: AlignFun;
    }>(),
    {}
);
const emit = defineEmits(['add-widget']);
const imageHeight = computed(() => {
    if (props.data) {
        return (props.data.styles.height / props.data.styles.width) * 216;
    }
    return 0;
});

const showExterior = computed(() => {
    if (props.data && props.data.type === VirtualDomType.Group) return false;
    if (props.data && props.data.type === VirtualDomType.Image) return false;
    if (props.data && props.data.type === VirtualDomType.Text) return false;
    return true;
});

const showImage = computed(() => {
    if (props.data && props.data.type === VirtualDomType.Image) return true;
    return false;
});

const showText = computed(() => {
    if (props.data && props.data.type === VirtualDomType.Icon) return true;
    if (props.data && props.data.type === VirtualDomType.Text) return true;
    return false;
});

const onAddWidget = () => {
    emit('add-widget');
};
</script>
