<template>
    <v-card class="music_card">
        <!-- <img src="../../../assets/cover2.jpg" class="card_bg" /> -->
        <audio ref="audio" preload="auto" id="audio" hidden :src="audioData.url">
            <!-- <source type="audio/mpeg" />
            <source src="/sound/ngm.mp3" type="audio/mpeg" /> -->
        </audio>
        <div class="music_wrap pa-4">
            <div class="zjbg">
                <img src="../../../assets/cover2.jpg" class="zj_img" width="120" height="120" />
                <div
                    class="zj_y"
                    :class="{
                        zj_play: audioData.play,
                    }"
                >
                    <img src="../../../assets/cover2.jpg" class="zj_cd_fm" width="72" height="72" />
                    <img src="../../../assets/cd-mine.png" class="zj_cd_bg" width="120" />
                </div>
            </div>
            <div class="slider pt-2">
                <div class="d-flex">
                    <div class="">
                        <div class="text-h6">Music Card</div>
                        <v-card-subtitle class="pl-0">Vocalist</v-card-subtitle>
                    </div>
                    <div class="icon_group d-flex justify-space-around mt-2">
                        <v-btn variant="text" icon="mdi-skip-previous" />
                        <v-btn
                            v-if="audioData.play"
                            variant="tonal"
                            :color="mainStore.settings.primary"
                            icon="mdi-pause"
                            size="large"
                            @click="onPlay"
                            style="font-size: 24px"
                        />
                        <v-btn
                            v-else
                            variant="tonal"
                            :color="mainStore.settings.primary"
                            icon="mdi-play-circle"
                            size="large"
                            @click="onPlay"
                            style="font-size: 24px"
                        />
                        <v-btn variant="text" icon="mdi-skip-next" />
                        <!-- <v-btn variant="text" icon="mdi-playlist-music-outline" /> -->
                    </div>
                </div>
                <v-slider
                    class="mt-4 ml-0"
                    v-model="audioData.curTime"
                    :color="mainStore.settings.primary"
                    hide-details
                />
            </div>
        </div>
    </v-card>
</template>
<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue';
import { useMainStore } from '@/stores/useMainStore';
const mainStore = useMainStore();

const audio = ref<HTMLAudioElement>()!;
const audioData = reactive({
    play: false,
    duration: 0,
    curTime: 0,
    url: '/sound/jntm.mp3',
});
let timer = setInterval(() => {});
const onNext = () => {};
const onPlay = async () => {
    audioData.duration = audio.value?.duration || 0;
    clearInterval(timer);
    if (audioData.play) {
        await audio.value?.pause();
        audioData.play = false;
        return;
    }
    await audio.value?.play();
    audioData.play = true;
    timer = setInterval(() => {
        const c = audio.value?.currentTime || 0;
        audioData.curTime = (c / audioData.duration) * 100;
        if (c >= audioData.duration) {
            audioData.curTime = 0;
            audioData.play = false;
            clearInterval(timer);
        }
    }, 50);
};

onBeforeUnmount(() => {
    clearInterval(timer);
});
</script>
<style scoped lang="scss">
.music_card {
    overflow: hidden;
    position: relative;
    .card_bg {
        width: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        z-index: -1;
        filter: blur(25px);
        // opacity: 0.6;
    }
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
        display: flex;
        // color: #ffffff;
        .play_btn {
            background: rgba(255, 255, 255, 0.2);
        }
        .zjbg {
            position: relative;
            flex: 0 0 180px;
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
                animation-fill-mode: forwards;

                &::after {
                    content: '';
                    display: block;
                    width: 16px;
                    height: 16px;
                    background: #efefef;
                    border-radius: 50%;
                    position: absolute;
                    z-index: 2;
                    top: 50%;
                    left: 50%;
                    margin-left: -9px;
                    margin-top: -8px;
                    box-shadow: inset 1px 1px rgba(255, 255, 255, 0.2);
                }
                .zj_cd_fm {
                    border-radius: 50%;
                    position: absolute;
                    top: 24px;
                    left: 24px;
                    z-index: 2;
                }
            }
            .zj_y.zj_play {
                animation: zzzzz 5s linear infinite;
                @keyframes zzzzz {
                    0% {
                        transform: rotateZ(0deg);
                    }
                    100% {
                        transform: rotateZ(360deg);
                    }
                }
            }
        }
        // .zjbg.zj_play {
        //     // flex: 0 0 180px;
        // }
        .slider {
            flex: 1;
            margin-left: 16px;
        }
        .icon_group {
            margin-left: auto;
            flex: 0 0 170px;
        }
    }
}
</style>
@/stores/useMainStore
