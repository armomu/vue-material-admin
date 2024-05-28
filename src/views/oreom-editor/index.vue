<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
    <div class="oreom-editor">
        <v-card class="widgets_area">
            <div v-for="item in widgets" :key="item.name" class="item">
                <div class="icon" draggable="true">
                    <v-icon :icon="item.icon"></v-icon>
                </div>
            </div>
        </v-card>
        <div class="works_area">
            <div class="work_content">
                <LayerTree v-model:data="appTree" @ondrop="onDrag" @over="onOver" />
            </div>
        </div>

        <div class="column_tools">
            <v-btn variant="text" icon="mdi-play-circle" size="small" />
            <v-btn variant="text" icon="mdi-hand-back-right-outline" size="small" />
            <v-btn variant="text" icon="mdi-reply" size="small" />
            <v-btn variant="text" icon="mdi-share" size="small" />
        </div>
        <v-card class="tools_area">
            <div class="widget_layouts" title="Layers">
                <div class="layout_min_wrap" hidden>
                    <!-- <vuedraggable v-model="data.layouts" item-key="index">
                        <template #item="{ element, index }">
                            <div
                                class="layout_min_item d-flex jsb"
                                :key="index"
                                :class="{
                                    active: element.active,
                                }"
                                @click.stop="onMinLayout(index)"
                            >
                                <div class="title cursor-move">
                                    {{ element.widget }}
                                </div>
                                <div class="icons">
                                    <v-icon
                                        :icon="element.visible ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click.stop="
                                            () => {
                                                element.visible = !element.visible;
                                            }
                                        "
                                    />
                                    <v-icon icon="mdi-delete" @click.stop="onDelLayer(index)" />
                                </div>
                            </div>
                        </template>
                    </vuedraggable> -->
                </div>
            </div>
        </v-card>
        <v-card
            class="contextmenu"
            v-if="contextmenu.visible"
            :style="{
                left: contextmenu.left + 'px',
                top: contextmenu.top + 'px',
            }"
        >
            <div class="layout_min_wrap">
                <div class="layout_min_item">隐藏</div>
                <div class="layout_min_item">删除</div>
                <div class="layout_min_item">下一层</div>
                <div class="layout_min_item">上一层</div>
            </div>
        </v-card>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import './css.scss';
import vuedraggable from 'vuedraggable';
import LayerTree from './widgets/LayerTree.vue';
import { useMain } from './hooks/useMain';
const { appTree, widgets, onDrag, onOver } = useMain();
const contextmenu = reactive({
    left: 0,
    top: 0,
    visible: false,
});
const hideMenu = () => {
    contextmenu.visible = false;
};
const openMenu = (e: PointerEvent) => {
    e.preventDefault();
    contextmenu.left = e.clientX;
    contextmenu.top = e.clientY;
    contextmenu.visible = true;
    document.body.addEventListener('click', hideMenu);
};
</script>
