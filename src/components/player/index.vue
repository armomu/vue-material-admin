<template>
    <v-card class="r_card play_item" dark ref="player">
        <audio controls ref="audio" preload="auto" id="audio" hidden>
            <source :src="m" type="audio/mpeg" />
        </audio>
        <div class="player_inner" :class="{ play_ing: play }">
            <div class="image_bg">
                <img class="img" :src="img" />
            </div>
            <v-system-bar dark color="transparent" class="v_system_bar">
                <v-spacer></v-spacer>
                <v-icon class="mr-2">mdi-wifi-strength-4</v-icon>
                <v-icon class="mr-2">mdi-signal-cellular-outline</v-icon>
                <v-icon class="mr-2">mdi-battery</v-icon>
                <span>12:30</span>
            </v-system-bar>
            <div
                class="image"
                :class="{ image_in: listOut, image_out: listIn }"
            >
                <div class="image_wrap">
                    <img class="img" :src="img" />
                </div>
            </div>
            <div class="slder_bar">
                <v-slider
                    v-model="curVal"
                    :max="duration"
                    @end="curTimeChange"
                    class="align-center ml-5 mr-30"
                    hide-details
                >
                    <template v-slot:prepend>
                        <div>{{ timeFormatter(curVal) }}</div>
                    </template>
                    <template v-slot:append>
                        <div>{{ timeFormatter(duration) }}</div>
                    </template>
                </v-slider>
            </div>
            <div
                class="icon_play"
                :class="{ icon_play_in: listOut, icon_play_out: listIn }"
            >
                <v-btn fab dark color="purple" @click="onPlayPause" v-if="play">
                    <v-icon dark class="mdi-36px">mdi-roman-numeral-2</v-icon>
                </v-btn>
                <v-btn fab dark color="purple" @click="onPlay" v-else>
                    <v-icon dark class="mdi-36px">mdi-play</v-icon>
                </v-btn>
            </div>
            <v-list
                three-line
                v-if="listVisible"
                class="v-list"
                :class="{ v_list_in: listIn, v_list_out: listOut }"
            >
                <v-subheader inset>My playlists</v-subheader>
                <v-list-item
                    v-for="(item, key) in items"
                    :key="key"
                    :class="'v-list-item-' + (key + 1)"
                    @click="() => {}"
                >
                    <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                            item.subtitle
                        }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon>08:34</v-list-item-icon>
                </v-list-item>
            </v-list>
        </div>
    </v-card>
</template>
<script>
import m from '@/assets/Jain - Lil Mama.mp3';
export default {
    data() {
        return {
            m: m,
            img: require('../../assets/cover2.jpg'),
            play: false, // 播放状态
            listVisible: true,
            listIn: false, // 列表进入动画
            listOut: false, // 列表消失动画
            slider: 0,
            media: 0,
            items: [
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: 'Trevor Hansen Have any ideas',
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: 'Britta Holt We should eat ',
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: 'Trevor Hansen Have any ideas',
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: 'Britta Holt We should eat ',
                }
            ],
            duration: 0, //
            curVal: 0
        };
    },
    watch: {
        play: function(bool) {
            if (bool) {
                this.listOut = true;
                setTimeout(() => {
                    this.listOut = false;
                    this.listVisible = false;
                }, 500);
            } else {
                this.listVisible = true;
                this.listIn = true;
                setTimeout(() => {
                    this.listIn = false;
                }, 1000);
            }

        }
    },
    async mounted() {
        await this.$refs.audio.play();
        this.$refs.audio.pause();
        this.duration = this.$refs.audio.duration;
        this.$refs.audio.addEventListener('timeupdate', () => {
            this.curVal = this.$refs.audio.currentTime;
            if (this.curVal === this.duration) {
                this.curVal = 0;
            }
        });
        this.$refs.audio.addEventListener('pause', () => {
            this.play && (this.play = false);
        });
    },
    methods: {
        curTimeChange(val) {
            this.$refs.audio.currentTime = val;
            this.onPlay();
        },
        onPlay() {
            this.$refs.audio.play();
            this.play = true;
        },
        timeFormatter(duration) {
            let secondTime = parseInt(duration);// 秒
            let minuteTime = 0;// 分
            let hourTime = 0;// 小时
            if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
                // 获取分钟，除以60取整数，得到整数分钟
                minuteTime = parseInt(secondTime / 60);
                // 获取秒数，秒数取佘，得到整数秒数
                secondTime = parseInt(secondTime % 60);
                // 如果分钟大于60，将分钟转换成小时
                if (minuteTime > 60) {
                    // 获取小时，获取分钟除以60，得到整数小时
                    hourTime = parseInt(minuteTime / 60);
                    // 获取小时后取佘的分，获取分钟除以60取佘的分
                    minuteTime = parseInt(minuteTime % 60);
                }
            }
            let result = secondTime > 9 ? secondTime : ('0' + secondTime);
            if (minuteTime > 0) {
                result = (minuteTime > 9 ? minuteTime : ('0' + minuteTime)) + ':' + result;
            }
            if (hourTime > 0) {
                result = (hourTime > 9 ? hourTime : ('0' + hourTime)) + ':' + result;
            }
            return result;
        },
        onPlayPause() {
            this.$refs.audio.pause();
            this.play = false;
        }
    }
};
</script>
