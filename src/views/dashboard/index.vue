<template>
    <div class="dashboard_container">
        <div class="card_box">
            <div class="left">
                <div class="card_wrap">
                    <div class="r_card">
                        <div class="item_header">
                            <div class="title">$ Histogram</div>
                            <v-icon>keyboard_arrow_right</v-icon>
                        </div>
                        <div class="item_content">
                            <div class="chart_wrap">
                                <ve-histogram
                                    :data="chartData"
                                    :extend="chartExtend"
                                    height="240px"
                                ></ve-histogram>
                            </div>
                        </div>
                    </div>
                    <div class="r_card">
                        <div class="item_header">
                            <div class="title">Ve-line</div>
                            <v-icon>keyboard_arrow_right</v-icon>
                        </div>
                        <div class="item_content">
                            <div class="tool">
                                <div class="t">
                                    <div class="i">Daily Income</div>
                                    <div class="r">
                                        <v-icon>arrow_drop_up</v-icon>38%
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
                    </div>
                </div>

                <div class="r_card">
                    <div class="item_weather">
                        <div class="weather_header">
                            <div class="weather_header_left">
                                <div class="city">Shen Zhen</div>
                                <div class="">Mon 29 May</div>
                                <div class="city wd">31℃</div>
                            </div>
                            <div class="weather_header_right">
                                <v-icon>wb_sunny</v-icon>
                            </div>
                        </div>
                        <div class="weather_week">
                            <div class="day_item">
                                <div class="lb">Sun</div>
                                <v-icon>wb_sunny</v-icon>
                                <div class="wd">31℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Mon</div>
                                <v-icon>cloud_queue</v-icon>
                                <div class="wd">35℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Tues</div>
                                <v-icon>cloud_queue</v-icon>
                                <div class="wd">25℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Wed</div>
                                <v-icon>ac_unit</v-icon>
                                <div class="wd">10℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Thur</div>
                                <v-icon>wb_sunny</v-icon>
                                <div class="wd">31℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Fri</div>
                                <v-icon>timelapse</v-icon>
                                <div class="wd">31℃</div>
                            </div>
                            <div class="day_item">
                                <div class="lb">Sat</div>
                                <v-icon>wb_sunny</v-icon>
                                <div class="wd">31℃</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="r_card">
                    <div
                        class="arrow"
                        @click="handlePieBoxVisibleStatus"
                    >
                        <v-btn icon>
                            <v-icon v-if="pieBoxVisible">arrow_back</v-icon>
                            <v-icon v-else>arrow_forward</v-icon>
                        </v-btn>

                    </div>
                    <div
                        class="inner_item"
                        :class="{inner_item_hide: pieBoxVisible}"
                    >
                        <div class="item_header">
                            <div class="total">4,734</div>
                            <div class="min_title">Today Visitors</div>
                        </div>
                        <div class="inner_item_content">
                            <ve-ring
                                :data="pieData"
                                :settings="pieSettings"
                                :extend="pieExtend"
                                height="460px"
                            ></ve-ring>
                        </div>
                        <div class="c">
                            <div class="row">
                                <div class="bfb">25.43%</div>
                                <div class="row_inner">
                                    <div class="cb cb1"></div>
                                    <div class="c1">Payment</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="bfb">74.57%</div>
                                <div class="row_inner">
                                    <div class="cb cb2"></div>
                                    <div class="c2">Payment</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item_header">
                        <div
                            class="title"
                            @click="handlePieBoxVisibleStatus"
                        >Visitors Analytics</div>
                    </div>
                    <div class="item_content">
                        <p class="min_title">Consumption</p>
                        <div class="chart_header">
                            <div class="c">
                                <div class="cb cb1"></div>
                                <div class="c c1">Payment</div>
                                <div class="cb cb2"></div>
                                <div class="c">Canceled</div>
                            </div>
                            <div class="r"></div>
                        </div>
                        <div class="chart_wrap">
                            <ve-line
                                :data="chartData3"
                                :extend="chartExtend3"
                                :settings="chartSettings3"
                                height="460px"
                            ></ve-line>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="camera_play_row">
            <div class="camera_wrap">
                <div class=" r_card">
                    <div class="item_header">
                        <div class="title">📹 Camera</div>
                        <v-btn
                            icon
                            @click="handleRunReversal"
                            v-if="reversal"
                        >
                            <v-icon>dashboard</v-icon>
                        </v-btn>
                        <v-btn
                            icon
                            @click="handleRunReversal"
                            v-else
                        >
                            <v-icon>view_agenda</v-icon>
                        </v-btn>
                    </div>
                    <div
                        class="reversal"
                        :class="{run_reversal: reversal}"
                    >
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
                        <div class="camera_content camera_content2">
                            <div
                                class="camera_item"
                                :style="{ backgroundImage: 'url('+ url +')' }"
                            >
                                <span class="camera_name">Camera #1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="r_card play_item">
                <div class="item_header">
                    <div class="title">My Playlist</div>
                </div>
                <div class="item_content">
                    <div
                        class="image"
                        style="background-image: url(&quot;http://akveo.com/ngx-admin/assets/images/cover2.jpg&quot;); background-position: center center;"
                    ></div>
                    <div class="title">Miusic - name</div>
                    <div class="name"></div>
                    <div class="current_time">
                        <div class="t min">{{ ex1.val }}</div>
                        <v-slider
                            v-model="ex1.val"
                            :color="ex1.color"
                        ></v-slider>
                        <div class="t max">100</div>
                    </div>
                    <div class="btn_g">
                        <v-btn icon>
                            <v-icon>repeat_one</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>skip_previous</v-icon>
                        </v-btn>
                        <v-btn
                            icon
                            large
                            fab
                            class="py"
                        >
                            <v-icon>play_circle_filled</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>skip_next</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>volume_off</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
        <v-footer class="pa-3" dark color="primary">
            <v-spacer></v-spacer>
            <div>&copy; {{ new Date().getFullYear() }} Created with by Groundhog.chen</div>
        </v-footer>
    </div>
</template>
<script>
// import QRCode from 'qrcode';
import echartMixins from '@/mixins/echart-settings';

export default {
    data() {
        return {
            media: 0,
            ex1: { label: 'color', val: 25, color: '#a16eff' },
            pieBoxVisible: false,
            reversal: false,
            url: 'http://akveo.com/ngx-admin/assets/images/camera1.jpg'
        };
    },
    mixins: [echartMixins],
    mounted() {
        this.$vuetify.theme.primary = '#323259';
    },
    methods: {
        handlePieBoxVisibleStatus() {
            this.pieBoxVisible = !this.pieBoxVisible;
        },
        handleRunReversal() {
            this.reversal = !this.reversal;
        },
        handleZoomCamera(url) {
            console.log(url);
            this.url = url;
            this.reversal = true;
        }
    }
};
</script>



