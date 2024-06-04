<template>
    <div class="oreom-editor">
        <div class="widgets_area"><BasicWidget :data="widgets" @draging="onDraging" /></div>
        <div class="works_area">
            <Layout :data="appDom" @on-dragover="onDragover" @on-drop="onDrop" />
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
            <Styles :data="curDom" />
        </v-card>
    </div>
</template>
<script lang="ts" setup>
import './css.scss';
import BasicWidget from './widgets/BasicWidget.vue';
import Styles from './widgets/Styles.vue';
import Layout from './widgets/Layout.vue';
import { useMain } from './hooks/useMain';
import { useUndoRedo } from './hooks/useUndoRedo';
// import { VSheet } from 'vuetify/components'

const { appDom, widgets, curDom, onDraging, onDragover, onDrop } = useMain();

const { useUrState, onUndo, onRedo, appChange } = useUndoRedo(appDom);

// const { curVirtualDom, curStyleVisible, onVirtualDomClick } = useStyles();
</script>
