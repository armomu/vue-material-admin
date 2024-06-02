<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/valid-v-model -->
<template>
    <v-list v-if="data" density="compact">
        <v-list-group>
            <template v-slot:activator="item">
                <v-list-item v-bind="item.props" title="Dimensions" />
            </template>
            <div class="input_row d-flex">
                <div class="input_item">
                    <div class="label">Width</div>
                    <input v-model="data.styles.width" />
                </div>
                <div class="input_item">
                    <div class="label">Height</div>
                    <input v-model="data.styles.height" />
                </div>
            </div>
        </v-list-group>
        <v-list-group>
            <template v-slot:activator="item">
                <v-list-item v-bind="item.props" title="Colors" />
            </template>
            <div class="input_row">
                <div class="input_item">
                    <div class="label">Background</div>
                    <input v-model="data.styles.background" />
                </div>
                <div class="input_item mt-4">
                    <div class="label" style="width: 77.4px">Text</div>
                    <input v-model="data.styles.color" />
                </div>
            </div>
        </v-list-group>
        <v-list-group>
            <template v-slot:activator="item">
                <v-list-item v-bind="item.props" title="Margin" />
            </template>
            <div class="slider mt-4">
                <v-slider
                    class="mx-4"
                    v-model="data.styles.marginLeft"
                    label="Left"
                    density="compact"
                ></v-slider>
                <v-slider
                    class="mx-4"
                    v-model="data.styles.marginRight"
                    label="Right"
                    density="compact"
                ></v-slider>
                <v-slider
                    class="mx-4"
                    v-model="data.styles.marginTop"
                    label="Top"
                    density="compact"
                ></v-slider>
                <v-slider
                    class="mx-4"
                    v-model="data.styles.marginButtom"
                    label="Buttom"
                    density="compact"
                ></v-slider>
            </div>
        </v-list-group>
        <v-list-group>
            <template v-slot:activator="item">
                <v-list-item v-bind="item.props" title="Padding" />
            </template>
            <div class="slider mt-4">
                <v-slider
                    class="mx-4"
                    v-model="data.styles.paddingLeft"
                    label="Left"
                    density="compact"
                ></v-slider>
                <v-slider
                    class="mx-4"
                    v-model="data.styles.paddingRight"
                    label="Right"
                    density="compact"
                ></v-slider>
                <v-slider
                    class="mx-4"
                    v-model="data.styles.paddingTop"
                    label="Top"
                    density="compact"
                ></v-slider>
                <v-slider
                    class="mx-4"
                    v-model="data.styles.paddingButtom"
                    label="Buttom"
                    density="compact"
                ></v-slider>
            </div>
        </v-list-group>
        <v-list-group>
            <template v-slot:activator="item">
                <v-list-item v-bind="item.props" title="Decoration" />
            </template>
            <div class="slider mt-4">
                <v-slider
                    class="mx-4"
                    v-model="data.styles.radius"
                    label="Left"
                    density="compact"
                ></v-slider>
                <v-slider
                    class="mx-4"
                    v-model="data.styles.shadow"
                    label="Right"
                    density="compact"
                ></v-slider>
            </div>
        </v-list-group>
        <v-list-group>
            <template v-slot:activator="item">
                <v-list-item v-bind="item.props" title="Alignment" />
            </template>
            <div class="alignment d-flex px-4">
                <div class="item">
                    <div class="label ml-2">Flex Direction</div>
                    <v-radio-group hide-details>
                        <v-radio label="Row" value="one"></v-radio>
                        <v-radio label="Column" value="two"></v-radio>
                    </v-radio-group>
                </div>
                <div class="item">
                    <div class="label ml-2">Fill space</div>
                    <v-radio-group hide-details>
                        <v-radio label="Yes" value="one"></v-radio>
                        <v-radio label="No" value="two"></v-radio>
                    </v-radio-group>
                </div>
                <div class="item">
                    <div class="label ml-2">Align Items</div>
                    <v-radio-group hide-details>
                        <v-radio label="Flex start" value="one"></v-radio>
                        <v-radio label="Center" value="two"></v-radio>
                        <v-radio label="Flex end" value="two"></v-radio>
                    </v-radio-group>
                </div>
                <div class="item">
                    <div class="label ml-2">Justify Content</div>
                    <v-radio-group hide-details>
                        <v-radio label="Flex start" value="one"></v-radio>
                        <v-radio label="Center" value="two"></v-radio>
                        <v-radio label="Flex end" value="two"></v-radio>
                    </v-radio-group>
                </div>
            </div>
        </v-list-group>
    </v-list>
</template>
<script lang="ts" setup>
import { computed, type Ref } from 'vue';
import type { VirtualDom } from '../hooks/useMain';

withDefaults(
    defineProps<{
        data?: VirtualDom;
    }>(),
    {}
);
</script>
