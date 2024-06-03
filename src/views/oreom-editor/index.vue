<template>
    <div class="oreom-editor">
        <div class="widgets_area"><BasicWidget :data="widgets" /></div>
        <div class="works_area">
            <div class="work_content">
                <LayerTree v-model:items="appTree" @tap="onVirtualDom" @change="appChange" />
            </div>
        </div>

        <div class="column_tools mr-4">
            <v-tooltip text="Finish Editing" location="top">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="text" icon="mdi-play-circle" size="small" />
                </template>
            </v-tooltip>
            <v-tooltip text="Undo" location="top">
                <template v-slot:activator="{ props }">
                    <v-btn
                        v-bind="props"
                        variant="text"
                        icon="mdi-reply"
                        size="small"
                        @click="onUndo"
                        :disabled="useUrState.disabledUndo"
                    />
                </template>
            </v-tooltip>
            <v-tooltip text="Repdo" location="top">
                <template v-slot:activator="{ props }">
                    <v-btn
                        v-bind="props"
                        variant="text"
                        icon="mdi-share"
                        size="small"
                        @click="onRedo"
                        :disabled="useUrState.disabledRedo"
                    />
                </template>
            </v-tooltip>
        </div>
        <v-card class="tools_area" title="Customize">
            <Styles :data="curVirtualDom" />
        </v-card>
    </div>
</template>
<script lang="ts" setup>
import './css.scss';
import BasicWidget from './widgets/BasicWidget.vue';
import LayerTree from './widgets/LayerTree.vue';
import Styles from './widgets/Styles.vue';
import { useMain } from './hooks/useMain';
import { useUndoRedo } from './hooks/useUndoRedo';
import { useStyles } from './hooks/useStyles';

const { appTree, widgets, curVirtualDom, onVirtualDom } = useMain();

const { useUrState, onUndo, onRedo, appChange } = useUndoRedo(appTree);

// const { curVirtualDom, curStyleVisible, onVirtualDomClick } = useStyles();
</script>
