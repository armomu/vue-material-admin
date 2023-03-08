<template>
    <div class="low_code_page">
        <v-card class="widgets">
            <v-text-field
                label="Search Wigets"
                variant="outlined"
                density="compact"
                append-inner-icon="mdi-magnify"
                class="ma-4"
                hide-details
            ></v-text-field>
            <v-list v-model:opened="menus.open" nav>
                <v-list-group value="Wigets">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            prepend-icon="mdi-auto-fix"
                            title="Wigets"
                        ></v-list-item>
                    </template>
                </v-list-group>

                <v-list-group value="Charts">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            title="Charts"
                            prepend-icon="mdi-chart-areaspline"
                        ></v-list-item>
                    </template>
                </v-list-group>
                <v-list-group value="3D Model">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            title="3D Model"
                            prepend-icon="mdi-unity"
                        ></v-list-item>
                    </template>
                </v-list-group>
            </v-list>
        </v-card>
        <div class="work_area">
            <div class="work_content">
                <div
                    class="scale_wrap"
                    :style="{
                        transform: `scale(${scaleState.slider / 100})`,
                    }"
                ></div>
            </div>
            <v-btn variant="text" append-icon="mdi-chevron-down" class="w_b_tool">
                {{ scaleState.slider }}%
                <v-menu activator="parent">
                    <v-list class="h_a_menu">
                        <v-list-item
                            v-for="item in scaleState.sliderStep"
                            :key="item"
                            @click="onScale(item)"
                        >
                            <v-list-item-title>{{ item }}%</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
            <!-- <v-card class="w_b_tool">
                <v-slider
                    v-model="scaleState.slider"
                    color="primary"
                    :step="5"
                    class="align-center"
                    :max="200"
                    :min="25"
                    density="compact"
                    hide-details
                >
                    <template v-slot:prepend>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <div style="width: 56px; text-align: center" v-bind="props">
                                    {{ scaleState.slider }}%
                                </div>
                            </template>
                            <v-list class="h_a_menu">
                                <v-list-item
                                    v-for="item in scaleState.sliderStep"
                                    :key="item"
                                    @click="onScale(item)"
                                >
                                    <v-list-item-title>{{ item }}%</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </template>
                </v-slider>
            </v-card> -->
        </div>
        <v-card class="tool_area">
            <v-card class="widget_tools"></v-card>
            <v-card class="widget_layouts"></v-card>
        </v-card>
    </div>
</template>
<script lang="ts" setup>
import 'vue3-ruler-tool/dist/style.css';
import { ref, computed, reactive } from 'vue';

const scaleState = reactive({
    slider: 100,
    sliderStep: [50, 100, 150],
});
const onScale = (val: number) => {
    scaleState.slider = val;
};
const menus = reactive({
    open: ['Wigets'],
});
const dragMove = (e) => {
    console.log(e);
};
</script>
