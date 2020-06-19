<template>
    <div class="dashboard_container">
        <div class="card_box">
            <div class="left">
                <div class="card_wrap">
                    <v-card class="r_card">
                        <!-- <div class="item_header">
                            <div class="title">Ve-histogram</div>
                        </div>-->
                        <v-card-title>Ve-histogram</v-card-title>
                        <v-divider></v-divider>
                        <div class="item_content">
                            <div class="chart_wrap">
                                <ve-histogram
                                    :data="chartData"
                                    :extend="chartExtend"
                                    height="240px"
                                ></ve-histogram>
                            </div>
                        </div>
                    </v-card>
                    <v-card class="r_card">
                        <v-card-title>Ve-line</v-card-title>
                        <v-divider></v-divider>
                        <div class="item_content">
                            <div class="tool">
                                <div class="t">
                                    <div class="i">Daily Income</div>
                                    <div class="r">
                                        <v-icon>mdi-arrow-up</v-icon>38%
                                    </div>
                                </div>
                                <div class="v">584</div>
                            </div>
                            <div class="chart_wrap chart_wrap1">
                                <ve-line
                                    :data="chartData2"
                                    :extend="chartExtend2"
                                    :settings="chartSettings"
                                    height="240px"
                                ></ve-line>
                            </div>
                        </div>
                    </v-card>
                </div>

                <v-card class="r_card">
                    <div class="item_weather">
                        <div class="weather_header">
                            <div class="weather_header_left">
                                <div class="city">Shen Zhen</div>
                                <div class>Mon 29 May</div>
                                <div class="city wd">31℃</div>
                            </div>
                            <div class="weather_header_right">
                                <v-icon>mdi-spin mdi-weather-sunny</v-icon>
                            </div>
                        </div>
                        <div class="weather_week">
                            <div class="day_item">
                                <div class="lb">Sun</div>
                                <v-icon>mdi-weather-sunny</v-icon>
                                <div class="wd">31℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Mon</div>
                                <v-icon>mdi-weather-hazy</v-icon>
                                <div class="wd">35℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Tues</div>
                                <v-icon>mdi-weather-partly-snowy</v-icon>
                                <div class="wd">25℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Wed</div>
                                <v-icon>mdi-weather-partly-snowy-rainy</v-icon>
                                <div class="wd">10℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Thur</div>
                                <v-icon>mdi-weather-night-partly-cloudy</v-icon>
                                <div class="wd">31℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Fri</div>
                                <v-icon>mdi-weather-pouring</v-icon>
                                <div class="wd">31℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Sat</div>
                                <v-icon>mdi-weather-sunset-down</v-icon>
                                <div class="wd">31℃</div>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
            <div class="right">
                <v-card class="r_card">
                    <div class="arrow" @click="handlePieBoxVisibleStatus">
                        <v-btn icon>
                            <v-icon v-if="pieBoxVisible">mdi-arrow-left-thick</v-icon>
                            <v-icon v-else>mdi-arrow-right-thick</v-icon>
                        </v-btn>
                    </div>
                    <div class="inner_item" :class="{inner_item_hide: pieBoxVisible}">
                        <!-- <div class="item_header">
                            <div class="total">4,734</div>
                            <div class="min_title">Today Visitors</div>
                        </div>-->
                        <div class="inner_item_content" style="margin-top: 140px">
                            <ve-ring
                                :data="pieData"
                                :settings="pieSettings"
                                :extend="pieExtend"
                                height="460px"
                            ></ve-ring>
                        </div>
                    </div>
                    <v-card-title @click="handlePieBoxVisibleStatus">Visitors Analytics</v-card-title>
                    <v-divider></v-divider>
                    <div class="item_content">
                        <div class="chart_wrap" style="margin-top: 30px">
                            <ve-line
                                :data="chartData3"
                                :extend="chartExtend3"
                                :settings="chartSettings3"
                                height="560px"
                            ></ve-line>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>

        <div class="camera_play_row">
            <div class="camera_wrap" :class="{ reversal: reversal }">
                <v-card class="r_card reversal_before">
                    <v-card-title>📹 Camera</v-card-title>
                    <v-divider></v-divider>
                    <!-- <div class="item_header">
                        <div class="title">📹 Camera</div>
                        <v-btn
                            icon
                            @click="handleRunReversal"
                        >
                            <v-icon>mdi-camera-retake</v-icon>
                        </v-btn>
                    </div>-->
                    <div class="camera_content">
                        <div
                            class="camera_item"
                            style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera1.jpg');"
                            @click="handleZoomCamera('http://akveo.com/ngx-admin/assets/images/camera1.jpg')"
                        >
                            <span class="camera_name">Camera #1</span>
                        </div>
                        <div
                            class="camera_item"
                            style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera2.jpg');"
                            @click="handleZoomCamera('http://akveo.com/ngx-admin/assets/images/camera2.jpg')"
                        >
                            <span class="camera_name">Camera #2</span>
                        </div>
                        <div
                            class="camera_item"
                            style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera3.jpg');"
                            @click="handleZoomCamera('http://akveo.com/ngx-admin/assets/images/camera3.jpg')"
                        >
                            <span class="camera_name">Camera #3</span>
                        </div>
                        <div
                            class="camera_item"
                            style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera4.jpg');"
                            @click="handleZoomCamera('http://akveo.com/ngx-admin/assets/images/camera4.jpg')"
                        >
                            <span class="camera_name">Camera #4</span>
                        </div>
                    </div>
                </v-card>
                <v-card class="r_card reversal_after">
                    <v-card-title>📹 Camera</v-card-title>
                    <v-divider></v-divider>
                    <!-- <div class="item_header">
                        <div class="title">📹 Camera</div>
                        <v-btn
                            icon
                            @click="handleRunReversal"
                        >
                            <v-icon>mdi-camera-retake-outline</v-icon>
                        </v-btn>
                    </div>-->
                    <div class="reversal">
                        <div class="camera_content camera_content2" @click="handleRunReversal">
                            <div class="camera_item" :style="{ backgroundImage: 'url('+ url +')' }">
                                <span class="camera_name">Camera #1</span>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
            <v-card class="r_card play_item" dark>
                <audio controls ref="audio" id="audio" hidden>
                    <source :src="m" type="audio/mpeg" />
                </audio>
                <div class="player_inner" :class="{play_ing: play}">
                    <v-system-bar dark color="transparent" class="v_system_bar">
                        <v-spacer></v-spacer>
                        <v-icon class="mr-2">mdi-wifi-strength-4</v-icon>
                        <v-icon class="mr-2">mdi-signal-cellular-outline</v-icon>
                        <v-icon class="mr-2">mdi-battery</v-icon>
                        <span>12:30</span>
                    </v-system-bar>
                    <div class="image" :class="{image_in: listOut, image_out: listIn,}">
                        <div class="image_wrap">
                            <img
                                class="img"
                                src="http://akveo.com/ngx-admin/assets/images/cover2.jpg"
                            />
                        </div>
                    </div>
                    <div class="slder_bar">
                        <v-slider v-model="slider" class="align-center ml-5 mr-30" hide-details />
                    </div>
                    <div class="icon_play" :class="{icon_play_in: listOut, icon_play_out: listIn,}">
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
                        :class="{v_list_in: listIn, v_list_out: listOut,}"
                    >
                        <v-subheader inset>My playlists</v-subheader>
                        <v-list-item
                            v-for="(item, key) in items"
                            :key="key"
                            :class="'v-list-item-' + (key+1)"
                            @click="()=>{}"
                        >
                            <v-list-item-avatar>
                                <v-img :src="item.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-icon>08:34</v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </div>
            </v-card>
        </div>

        <!-- <v-card>
            <v-footer class="pa-3">
                <v-spacer></v-spacer>
                <div>&copy; {{ new Date().getFullYear() }} Created with by Groundhog.chen</div>
            </v-footer>
        </v-card>-->
    </div>
</template>
<script>
// import QRCode from 'qrcode';
import echartMixins from '@/mixins/echart-settings';
import m from '@/assets/Jain - Lil Mama.mp3';
export default {
    data() {
        return {
            m: m,
            play: false, // 播放状态
            listVisible: true,
            listIn: false, // 列表进入动画
            listOut: false, // 列表消失动画
            slider: 0,
            media: 0,
            ex1: { label: 'color', val: 25, color: '#a16eff' },
            pieBoxVisible: false,
            reversal: false,
            url: 'http://akveo.com/ngx-admin/assets/images/camera1.jpg',
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
        };
    },
    mixins: [echartMixins],
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
    mounted() {
        // var myAuto = document.getElementById('myaudio');
    },
    methods: {
        handlePieBoxVisibleStatus() {
            this.pieBoxVisible = !this.pieBoxVisible;
        },
        handleRunReversal() {
            this.reversal = !this.reversal;
        },
        handleZoomCamera(url) {
            this.url = url;
            this.reversal = true;
        },
        onPlay() {
            this.$refs.audio.play();    
            this.play = true;    
        },
        onPlayPause() {
            this.$refs.audio.pause();    
            this.play = false;      
        }
    }
};
</script>



