<template>
    <div
        ref="draggable"
        :style="{
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            width: width + 'px',
            height: height + 'px',
            background: 'grey',
        }"
        @mousedown="startDrag"
    >
        <div class="resize-handle" @mousedown="startResize"></div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            isDragging: false,
            isResizing: false,
            dragStartX: 0,
            dragStartY: 0,
            resizeStartX: 0,
            resizeStartY: 0,
        };
    },
    mounted() {
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.stopDrag);
    },
    beforeUnmount() {
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.stopDrag);
    },
    methods: {
        startDrag(event) {
            this.isDragging = true;
            this.dragStartX = event.clientX - this.x;
            this.dragStartY = event.clientY - this.y;
        },
        handleDrag(event) {
            if (this.isDragging) {
                this.x = event.clientX - this.dragStartX;
                this.y = event.clientY - this.dragStartY;
            }
            if (this.isResizing) {
                this.width = event.clientX - this.x;
                this.height = event.clientY - this.y;
            }
        },
        stopDrag() {
            this.isDragging = false;
            this.isResizing = false;
        },
        startResize(event) {
            this.isResizing = true;
            this.resizeStartX = event.clientX - this.width;
            this.resizeStartY = event.clientY - this.height;
        },
    },
});
</script>

<style>
.resize-handle {
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    background: white;
    border: 1px solid black;
    cursor: nwse-resize;
}
</style>
