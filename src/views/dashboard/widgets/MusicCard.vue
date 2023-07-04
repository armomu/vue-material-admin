<template>
    <!-- TODO
    增加播放侧滑出CD💽动画 -->
    <v-card class="music_card elevation-0">
        <!-- <audio controls ref="audio" preload="auto" id="audio" hidden>
            <source :src="LilMama" type="audio/mpeg" />
        </audio> -->
        <div class="d-flex music_wrap pa-4 pr-0">
            <div
                class="zjbg"
                :class="{
                    zj_play: audioData.play,
                }"
            >
                <img src="../../../assets/cover2.jpg" class="zj_img" width="120" height="120" />
                <div class="zj_y">
                    <img src="../../../assets/cover2.jpg" class="zj_cd_fm" width="72" height="72" />
                    <img src="../../../assets/cd-mine.png" class="zj_cd_bg" width="120" />
                </div>
            </div>
            <div class="slider ml-4">
                <div class="text-h6">Music Card</div>
                <v-card-subtitle class="pl-0">Vocalist</v-card-subtitle>
                <v-slider class="mt-2" model-value="23" color="primary" hide-details />
                <div class="d-flex jsb pl-2">
                    <div>3:45</div>
                    <div>{{ audioData.duration ? audioData.duration : '' }}</div>
                </div>
            </div>

            <div class="icon_group d-flex justify-space-around pr-1">
                <!-- <v-btn variant="text" icon="mdi-volume-high" /> -->
                <v-btn variant="text" icon="mdi-skip-previous" />
                <v-btn
                    v-if="audioData.play"
                    variant="tonal"
                    color="primary"
                    icon="mdi-pause"
                    size="large"
                    @click="onPlay"
                    style="font-size: 24px"
                />
                <v-btn
                    v-else
                    variant="tonal"
                    color="primary"
                    icon="mdi-play-circle"
                    size="large"
                    @click="onPlay"
                    style="font-size: 24px"
                />
                <v-btn variant="text" icon="mdi-skip-next" />
                <!-- <v-btn variant="text" icon="mdi-playlist-music-outline" /> -->
            </div>
        </div>
    </v-card>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
const audio = ref<HTMLAudioElement | null>(null);
const audioData = reactive({
    play: false,
    duration: 0,
    curTime: 0,
});
const onPlay = async () => {
    if (audioData.play) {
        //  await audio.value?.pause();
        audioData.play = false;
        return;
    }
    // await audio.value?.play();
    audioData.play = true;
};
setTimeout(() => {
    audioData.play = true;
}, 2000);
</script>
<style scoped lang="scss">
.music_card {
    overflow: hidden;
    position: relative;
    .bg {
        height: 100%;
        position: absolute;
        margin-left: 150px;
        transform: translate(-50%, 0);
        filter: blur(25px);
        // opacity: 0.6;
    }
    .music_wrap {
        position: relative;
        z-index: 2;
        // color: #ffffff;
        .play_btn {
            background: rgba(255, 255, 255, 0.2);
        }
        .zjbg {
            position: relative;
            flex: 0 0 120px;
            transition: all 0.3s;
            .zj_img {
                position: relative;
                z-index: 3;
                border-radius: 4px;
            }
            .zj_y {
                position: absolute;
                right: 0;
                top: 0;
                animation-fill-mode: forwards;
                transition: all 0.2s;
                animation: zzzzz 5s linear infinite;
                animation-fill-mode: forwards;

                &::after {
                    content: '';
                    display: block;
                    width: 16px;
                    height: 16px;
                    background: rgba(var(--header-bg), 1);
                    border-radius: 50%;
                    position: absolute;
                    z-index: 2;
                    top: 50%;
                    left: 50%;
                    margin-left: -9px;
                    margin-top: -8px;
                    box-shadow: inset 1px 1px rgba(255, 255, 255, 0.2);
                }
                @keyframes zzzzz {
                    0% {
                        transform: rotateZ(0deg);
                    }
                    100% {
                        transform: rotateZ(360deg);
                    }
                }
                .zj_cd_fm {
                    border-radius: 50%;
                    position: absolute;
                    top: 24px;
                    left: 24px;
                    z-index: 2;
                }
            }
        }
        .zjbg.zj_play {
            flex: 0 0 180px;
        }
        .slider {
            flex: 1;
        }
        .icon_group {
            margin-left: auto;
            flex: 0 0 170px;
        }
    }
}
</style>
