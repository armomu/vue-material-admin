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
                <ve-histogram :data="chartData" :extend="chartExtend" height="240px"></ve-histogram>
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
              <ve-ring :data="pieData" :settings="pieSettings" :extend="pieExtend" height="460px"></ve-ring>
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
      <v-card class="r_card play_item" dark ref="player">
        <audio controls ref="audio" preload="auto" id="audio" hidden>
          <source :src="m" type="audio/mpeg" />
        </audio>
        <div class="player_inner" :class="{play_ing: play}">
          <div class="image_bg">
            <img class="img" src="http://akveo.com/ngx-admin/assets/images/cover2.jpg" />
          </div>
          <v-system-bar dark color="transparent" class="v_system_bar" @click="test">
            <v-spacer></v-spacer>
            <v-icon class="mr-2">mdi-wifi-strength-4</v-icon>
            <v-icon class="mr-2">mdi-signal-cellular-outline</v-icon>
            <v-icon class="mr-2">mdi-battery</v-icon>
            <span>12:30</span>
          </v-system-bar>
          <div class="image" :class="{image_in: listOut, image_out: listIn,}">
            <div class="image_wrap">
              <img class="img" src="http://akveo.com/ngx-admin/assets/images/cover2.jpg" />
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
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
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
            duration: 0, //
            curVal: 0
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
        test() {
            html2canvas(this.$refs.player.$el).then((canvas) => {
                var imgData = canvas.toDataURL('image/jpeg');
                var doc = new jsPDF('p', 'mm', 'a4');
                doc.addImage(imgData, 'JPEG', 0, 0,210,297);
                doc.save('player' + '.pdf');
            });
        },
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
        curTimeChange(val) {
            console.log(val);
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
            // else {
            //     result = '00' + ':' + result;
            // }
            if (hourTime > 0) {
                result = (hourTime > 9 ? hourTime : ('0' + hourTime)) + ':' + result;
            } 
            // else {
            //     result = '00' + ':' + result;
            // }
            return result;
        },
        onPlayPause() {
            this.$refs.audio.pause();    
            this.play = false;      
        }
    }
};
</script>



