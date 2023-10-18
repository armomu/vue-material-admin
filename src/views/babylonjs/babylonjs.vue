<template>
    <div class="babylon">
        <canvas id="canvas" ref="canvasDom"></canvas>
        <div class="msg_wrap" hidden>
            <div class="msg">
                <div class="item" v-for="(item, i) in msg.list" :key="i">
                    <div class="name">{{ item.name }}:</div>
                    <div class="val">{{ item.msg }}</div>
                </div>
            </div>
            <div class="input_wrap">
                <input v-model="msg.input" class="input" placeholder="按空格键发送" />
                <div class="btn" @keyup.enter="onSend" @click="onSend">发送</div>
            </div>
        </div>
        <Loading />
    </div>
</template>
<script setup lang="ts">
import Loading from './widgets/loading.vue';
import { onMounted, shallowRef, onBeforeUnmount, reactive } from 'vue';

import { BabylonScene } from './serves/main';
const canvasDom = shallowRef<HTMLCanvasElement>();
const msg = reactive({
    list: [
        {
            name: '管理员',
            msg: '使用键盘WSAD控制角色',
        },
        {
            name: '管理员',
            msg: '按右上角ESC键显示鼠标',
        },
    ],
    input: '',
});
const onSend = () => {
    if (msg.input) {
        msg.list.push({
            name: '我',
            msg: msg.input,
        });
        msg.input = '';
    }
};
let playerApp: BabylonScene;
onMounted(() => {
    playerApp = new BabylonScene(canvasDom.value!);
});
onBeforeUnmount(() => {
    playerApp.dispose();
});
</script>
<style scoped lang="scss">
.babylon {
    position: relative;
    height: var(--content-height);

    .msg_wrap {
        position: absolute;
        left: 10px;
        bottom: 10px;
        width: 246px;
        background: rgba($color: #000000, $alpha: 0.3);
        padding: 10px;
        border-radius: 8px;
        z-index: 1;
        .input_wrap {
            // border: 1px solid rgba($color: #fff, $alpha: 0.8);
            height: 32px;
            display: flex;
            align-items: center;
            border-radius: 4px;
            padding-left: 8px;
            background: rgba($color: #000000, $alpha: 0.6);
            .btn {
                width: 60px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                color: #fff;
                background: #7f85f9;
            }
            .input {
                flex: 1;
                height: 30px;
                line-height: 30px;
            }
        }
        .msg {
            height: 160px;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                // 定义了滚动条整体的样式；
                width: 6px;
                height: 6px;
            }
            &::-webkit-scrollbar-thumb {
                width: 5px;
                height: 5px;
                border-radius: 8px;
            }
            .item {
                display: flex;
                margin-bottom: 6px;
                // font-size: 12px;
                color: #ffffff;
                text-shadow: 1px 1px 0px rgba($color: #000000, $alpha: 0.3);
                .name {
                    width: 50px;
                }
                .val {
                    flex: 1;
                    text-justify: inter-word;
                }
            }
        }
    }
}

#canvas {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
./serves/main
