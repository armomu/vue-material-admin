<template>
    <div class="dashboard_container">
        <div class="card_box">
            <div class="left">
                <div class="card_wrap">
                    <v-card class="r_card">
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
            <BubbleCharts />            
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
                            @click="
                                handleZoomCamera(
                                    'http://akveo.com/ngx-admin/assets/images/camera1.jpg'
                                )
                            "
                        >
                            <span class="camera_name">Camera #1</span>
                        </div>
                        <div
                            class="camera_item"
                            style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera2.jpg');"
                            @click="
                                handleZoomCamera(
                                    'http://akveo.com/ngx-admin/assets/images/camera2.jpg'
                                )
                            "
                        >
                            <span class="camera_name">Camera #2</span>
                        </div>
                        <div
                            class="camera_item"
                            style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera3.jpg');"
                            @click="
                                handleZoomCamera(
                                    'http://akveo.com/ngx-admin/assets/images/camera3.jpg'
                                )
                            "
                        >
                            <span class="camera_name">Camera #3</span>
                        </div>
                        <div
                            class="camera_item"
                            style="background-image: url('http://akveo.com/ngx-admin/assets/images/camera4.jpg');"
                            @click="
                                handleZoomCamera(
                                    'http://akveo.com/ngx-admin/assets/images/camera4.jpg'
                                )
                            "
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
                        <div
                            class="camera_content camera_content2"
                            @click="handleRunReversal"
                        >
                            <div
                                class="camera_item"
                                :style="{ backgroundImage: 'url(' + url + ')' }"
                            >
                                <span class="camera_name">Camera #1</span>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
            <Player />
        </div>
    </div>
</template>
<script>
// import QRCode from 'qrcode';
import echartMixins from '@/mixins/echart-settings';
import Player from '@/components/player';
import BubbleCharts from '@/components/bubble-charts';
export default {
    components: {Player, BubbleCharts},
    data() {
        return {
            url: 'http://akveo.com/ngx-admin/assets/images/camera1.jpg',
            pieBoxVisible: false,
            reversal: false,
        };
    },
    mixins: [echartMixins],
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
        }
    }
};
</script>



