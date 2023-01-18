<template>
    <div class="elevation-0 tesla" color="dark">
        <div class="car">
            <v-card class="elevation-0 cloud_card py-2" width="50%">
                <div class="d-flex justify-space-between">
                    <div style="flex: 1">
                        <v-card-title class="text-h5"> ShenZhen Tody </v-card-title>

                        <v-card-subtitle>Cloudy To Clear</v-card-subtitle>

                        <v-card-text class="py-0">
                            <v-row align="center" no-gutters>
                                <v-col class="text-h3" cols="6"> 26&deg;C </v-col>
                            </v-row>
                        </v-card-text>
                    </div>

                    <v-avatar class="ma-3" size="100" rounded="0">
                        <img src="../../assets/cloud.png" width="100" />
                    </v-avatar>
                </div>
            </v-card>
            <div class="my-4 d-flex justify-space-between" style="width: 50%">
                <v-card class="elevation-0 mr-2 pa-4 battery" width="50%">
                    <div class="d-flex">
                        <v-btn
                            color="rgba(0,0,0,0.8)"
                            icon="mdi-car-battery"
                            theme="dark"
                            class="elevation-0"
                        ></v-btn>
                        <v-card-title class="text-h6"> Battery Health</v-card-title>
                    </div>
                    <v-card-text class="py-0 mt-4 px-0">
                        <v-row align="center" no-gutters>
                            <v-col cols="6" style="border-right: 1px solid rgba(0, 0, 0, 0.3)">
                                <v-card-subtitle class="ml-0 pl-0"
                                    >Remaining Battery</v-card-subtitle
                                >
                                <div class="text-h3">90<span class="text-h6">%</span></div>
                            </v-col>
                            <v-col cols="6">
                                <div class="pl-4">
                                    <v-card-subtitle class="ml-0 pl-0">Distance</v-card-subtitle>
                                    <div class="text-h3">415<span class="text-h6">Km</span></div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card class="elevation-0 ml-2 pa-4 Trip" width="50%">
                    <div class="d-flex">
                        <v-btn
                            color="rgba(0,0,0,0.8)"
                            icon="mdi-speedometer"
                            theme="dark"
                            class="elevation-0"
                        ></v-btn>
                        <v-card-title class="text-h6"> Today's Trip</v-card-title>
                    </div>
                    <v-card-text class="py-0 mt-4 px-0">
                        <v-row align="center" no-gutters>
                            <v-col cols="6" style="border-right: 1px solid rgba(0, 0, 0, 0.3)">
                                <v-card-subtitle class="ml-0 pl-0">Average Speed </v-card-subtitle>
                                <div class="text-h3">52<span class="text-h6">Km</span></div>
                            </v-col>
                            <v-col cols="6">
                                <div class="pl-4">
                                    <v-card-subtitle class="ml-0 pl-0">Distance</v-card-subtitle>
                                    <div class="text-h3">98<span class="text-h6">Km</span></div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </div>
            <img src="../../assets/tesla-model-s.png" class="tesla_img" />
        </div>
        <div class="car_sys">
            <v-system-bar
                theme="dark"
                style="position: relative; left: 0; top: 0; width: auto; background: none"
            >
                <v-icon icon="mdi-wifi-strength-4" size="x-small"></v-icon>
                <v-icon icon="mdi-signal" class="ml-2" size="x-small"></v-icon>
                <v-icon icon="mdi-battery" class="ml-2" size="x-small"></v-icon>
                <span class="ml-2">3:13PM</span>
            </v-system-bar>
            <div id="amap">
                <div class="a_t"></div>
                <div class="a_l"></div>
                <div class="a_r"></div>
                <div class="search_bar">
                    <!-- <div class="input">
                        <input placeholder="Search Here" />
                    </div> -->
                    <v-text-field
                        theme="dark"
                        density="compact"
                        variant="solo"
                        class="ma-4"
                        label="Search templates"
                        prepend-inner-icon="mdi-magnify"
                        single-line
                        hide-details
                        style="background-color: rgba(0, 0, 0, 0.3)"
                    ></v-text-field>
                    <v-row align="center" class="mx-2">
                        <v-col cols="6">
                            <v-card class="elevation-0 pa-2 cur" theme="dark">
                                <div class="text-h6 d-flex">Location</div>
                                <div>Tian City</div>
                            </v-card>
                        </v-col>
                        <v-col cols="6">
                            <v-card class="elevation-0 pa-2 de" theme="dark">
                                <div class="text-h6 d-flex">Dest</div>
                                <div>Vienna Hotels</div>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-list theme="dark" style="background: transparent">
                        <v-list-item
                            append-icon="mdi-map-marker-radius"
                            title="Vienna Hotels"
                            subtitle="3.1 Km"
                        >
                            <v-card-subtitle class="pl-0">Longgang Central City</v-card-subtitle>
                        </v-list-item>
                        <v-list-item
                            append-icon="mdi-map-marker-radius"
                            title="Vienna Hotels"
                            subtitle="3.1 Km"
                        >
                            <v-card-subtitle class="pl-0">Longgang Central City</v-card-subtitle>
                        </v-list-item>
                        <v-list-item
                            append-icon="mdi-map-marker-radius"
                            title="Vienna Hotels"
                            subtitle="3.1 Km"
                        >
                            <v-card-subtitle class="pl-0">Longgang Central City</v-card-subtitle>
                        </v-list-item>
                        <!-- <div style="text-align: center">Clear History</div> -->
                    </v-list>
                </div>
                <div class="music">
                    <img src="../../assets/cover2.jpg" class="bg" />

                    <div class="music_wrap">
                        <!-- <div class="text-h6 pa-2">Music</div> -->
                        <audio controls ref="audio" preload="auto" id="audio" hidden>
                            <source :src="LilMama" type="audio/mpeg" />
                        </audio>
                        <div class="zjbg">
                            <img
                                src="../../assets/cover2.jpg"
                                class="zj_img"
                                width="100"
                                height="100"
                            />
                            <div
                                class="zj_y"
                                :class="{
                                    zj_y_zzz: audioData.play,
                                }"
                            >
                                <img
                                    src="../../assets/cover2.jpg"
                                    class="zj_cd_fm"
                                    width="62"
                                    height="62"
                                />
                                <img src="../../assets/cd-mine.png" class="zj_cd_bg" width="100" />
                            </div>
                        </div>
                        <div class="text-h6" style="text-align: center">Lil Mama</div>
                        <div style="text-align: center">To Sing Jain</div>
                        <v-slider
                            class="slider mx-4 mt-3"
                            color="#fff"
                            label="0"
                            style="color: white"
                        >
                            <template #append>{{
                                audioData.duration ? audioData.duration : ''
                            }}</template>
                        </v-slider>

                        <div
                            class="icon_group d-flex justify-space-around mx-2"
                            style="justify-content: space-around"
                        >
                            <v-btn variant="text" color="#fff" icon="mdi-volume-high" />
                            <v-btn variant="text" color="#fff" icon="mdi-skip-previous" />
                            <v-btn
                                v-if="audioData.play"
                                variant="text"
                                class="play_btn"
                                icon="mdi-pause"
                                @click="onPlay"
                            />
                            <v-btn
                                v-else
                                variant="text"
                                class="play_btn"
                                icon="mdi-play-circle"
                                @click="onPlay"
                            />
                            <v-btn variant="text" color="#fff" icon="mdi-skip-next" />
                            <v-btn variant="text" color="#fff" icon="mdi-playlist-music-outline" />
                        </div>
                    </div>
                </div>
                <div class="bottom_bar" @click="onStart">
                    <div class="bb_inner elevation-10">
                        <div class="bbi_wrap d-flex">
                            <v-btn
                                variant="text"
                                icon="mdi-car-parking-lights"
                                color="#ffffff"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                icon="mdi-car-brake-parking"
                                color="#ffffff"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                icon="mdi-car-traction-control"
                                color="#ffffff"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                icon="mdi-car-defrost-rear"
                                color="#ffffff"
                            ></v-btn>
                            <div class="igroup">
                                <div class="ig_inner d-flex">
                                    <div class="wd">
                                        <div class="text-h6">18&deg;C</div>
                                        <div class="label">A/C</div>
                                    </div>
                                    <div class="icon_fan">
                                        <div class="icon_fan_in">
                                            <v-icon icon="fa:fas mdi-fan mdi-spin" />
                                        </div>
                                    </div>
                                    <div class="wd">
                                        <div class="text-h6">26&deg;C</div>
                                        <div class="label">Outdoor</div>
                                    </div>
                                </div>
                            </div>
                            <v-btn variant="text" icon="mdi-phone-dial" color="#ffffff"></v-btn>
                            <v-btn
                                variant="text"
                                icon="mdi-music-note-bluetooth"
                                color="#ffffff"
                            ></v-btn>
                            <v-btn variant="text" icon="mdi-gauge" color="#ffffff"></v-btn>
                            <v-btn variant="text" icon="mdi-view-comfy" color="#ffffff"></v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import LilMama from '@/assets/Jain - Lil Mama.mp3';
import { shallowRef, ref, onMounted, reactive } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
const audio = ref<HTMLAudioElement>(null);
const audioData = reactive({
    play: false,
    duration: 0,
    curTime: 0,
});
onMounted(() => {
    // audio.value.addEventListener();
});
const onPlay = async () => {
    if (audioData.play) {
        await audio.value.pause();
        audioData.play = false;
        return;
    }
    await audio.value.play();
    audioData.play = true;
};
const map_ = shallowRef<any>(null);
var AMap: any;
const initMap = async () => {
    const amap_ = await AMapLoader.load({
        key: '527a03c5d37f26c924d83b3c68f9ac5c', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        // plugins: ['AMap.Scale'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        Loca: {
            version: '2.0', // Loca 版本，缺省 1.3.2
        },
    });
    AMap = amap_;
    test();
};
initMap();
var marker: any;
var lineArr = [
    [116.478935, 39.997761],
    [116.478939, 39.997825],
    [116.478912, 39.998549],
    [116.478912, 39.998549],
    [116.478998, 39.998555],
    [116.478998, 39.998555],
    [116.479282, 39.99856],
    [116.479658, 39.998528],
    [116.480151, 39.998453],
    [116.480784, 39.998302],
    [116.480784, 39.998302],
    [116.481149, 39.998184],
    [116.481573, 39.997997],
    [116.481863, 39.997846],
    [116.482072, 39.997718],
    [116.482362, 39.997718],
    [116.483633, 39.998935],
    [116.48367, 39.998968],
    [116.484648, 39.999861],
];
const test = () => {
    AMap.plugin('AMap.MoveAnimation', function () {
        var map = new AMap.Map('amap', {
            resizeEnable: true,
            showLabel: false,
            center: [116.478935, 39.997761],
            pitch: 55,
            zoom: 17.8,
            viewMode: '3D',
            skyColor: '#1a1a1a',
            mapStyle: 'amap://styles/dark',
            buildingAnimation: true, // 楼块出现是否带动画
        });
        map_.value = map;
        marker = new AMap.Marker({
            map: map,
            position: [116.478935, 39.997761],
            icon: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
            offset: new AMap.Pixel(-13, -26),
        });

        // 绘制轨迹
        new AMap.Polyline({
            map: map,
            path: lineArr,
            showDir: true,
            strokeColor: '#5D95E6', // 线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6, // 线宽
            strokeStyle: 'solid', // 线样式
        });

        var passedPolyline = new AMap.Polyline({
            map: map,
            strokeColor: '#AF5', // 线颜色
            strokeWeight: 6, // 线宽
        });

        marker.on('moving', function (e: any) {
            passedPolyline.setPath(e.passedPath);
            // 设置地图中心点
            map.setCenter(e.target.getPosition());
            // 设置旋转角
            map.setRotation(-e.target.getOrientation());
        });
        // setTimeout(() => {
        //     marker.moveAlong(lineArr, {
        //         // 每一段的时长
        //         duration: 1000,
        //         // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
        //         autoRotation: true,
        //     });
        // }, 3000);

        // map.setFitView();

        // window.startAnimation = function startAnimation() {

        // };

        // window.pauseAnimation = function () {
        //     marker.pauseMove();
        // };

        // window.resumeAnimation = function () {
        //     marker.resumeMove();
        // };

        // window.stopAnimation = function () {
        //     marker.stopMove();
        // };
    });
};
const onStart = () => {
    marker.moveAlong(lineArr, {
        // 每一段的时长
        duration: 1000,
        // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
        autoRotation: true,
    });
};
// setTimeout(() => {
//     onStart();
// }, 3000);
</script>

<style scoped lang="scss">
#amap {
    height: 500px;
    position: relative;
}
.tesla {
    .car {
        // border: 1px #999 solid;
        position: relative;
        margin-top: 50px;
        .v-card {
            border-radius: 12px;
        }
        .cloud_card {
            background-image: linear-gradient(to right, #ddf4ff, #d4eef9);
        }
        .battery {
            background-image: linear-gradient(to right, #4eebe4, #69fee1);
        }
        .Trip {
            background-image: linear-gradient(to right, #6b38fb, #bc78f2);
        }
        .tesla_img {
            width: 48%;
            position: absolute;
            right: 0;
            top: -90px;
        }
    }
    .car_sys {
        overflow: hidden;
        min-height: 400px;
        background: #212121;
        border-radius: 12px;
        margin-bottom: 16px;
        .a_t {
            z-index: 1;
            pointer-events: none;
            position: absolute;
            width: 100%;
            height: 50px;
            background-image: linear-gradient(to bottom, #1a1a1a, #1a1a1a, transparent);
        }
        .a_l,
        .a_r {
            z-index: 1;
            pointer-events: none;
            position: absolute;
            width: 100px;
            height: 100%;
        }
        .a_l {
            left: 0;
            background-image: linear-gradient(to right, #1a1a1a, #1a1a1a, transparent);
        }
        .a_r {
            right: 0;
            background-image: linear-gradient(to left, #1a1a1a, #1a1a1a, transparent);
        }
        .v-system-bar {
            .v-icon {
                color: #ffffff;
                opacity: 1;
            }
        }
        .bottom_bar {
            height: 86px;
            position: absolute;
            left: 10%;
            bottom: 0;
            width: 80%;
            overflow: hidden;
            z-index: 3;
            .bb_inner {
                height: 200px;
                background: #1a1a1a;
                border-radius: 70px;
                padding: 0 20px;
                .bbi_wrap {
                    height: 86px;
                    align-items: center;
                    justify-content: space-around;
                }
                .igroup {
                    width: 320px;
                    color: rgba(255, 255, 255, 0.8);
                    text-align: center;
                    // height: 76px;
                    align-self: flex-start;
                    .ig_inner {
                        height: 76px;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        position: relative;
                        z-index: 3;
                        background: #282828;
                        border-radius: 0 0 33px 33px;
                        padding: 0 20px;
                    }
                    .wd {
                        position: relative;
                        z-index: 1;
                    }
                    .label {
                        font-size: 12px;
                    }
                    .icon_fan {
                        padding: 6px;
                        border-radius: 50%;
                        position: relative;
                        overflow: hidden;
                        padding: 2px;
                        background-image: linear-gradient(to bottom, #37aed2, #282828);
                        .icon_fan_in {
                            padding: 6px;
                            background: #282828;
                            border-radius: 50%;
                        }
                    }
                    .mdi-fan {
                        font-size: 38px;
                        color: #37aed2;
                        z-index: 1;
                    }
                }
            }
        }
        .search_bar,
        .music {
            position: absolute;
            left: 50px;
            top: 30px;
            width: 300px;
            height: 350px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 3;
            border-radius: 8px;
        }
        .search_bar {
            .v-field--single-line {
                background: rgba(0, 0, 0, 0.2);
            }
            .cur {
                // color: inherit;
                background-image: linear-gradient(to right, #4eebe4, #4eebe4);
            }
            .de {
                // color: inherit;
                background-image: linear-gradient(to right, #bc78f2, #bc78f2);
            }
            // filter: blur(10px);
        }
        .music {
            left: auto;
            right: 50px;
            overflow: hidden;
            .bg {
                height: 100%;
                position: absolute;
                margin-left: 150px;
                transform: translate(-50%, 0);
                filter: blur(25px);
                opacity: 0.6;
            }
            .music_wrap {
                position: relative;
                z-index: 2;
                color: #ffffff;
                .play_btn {
                    background: rgba(255, 255, 255, 0.2);
                }
                .zjbg {
                    width: 150px;
                    margin: 40px auto 20px auto;
                    position: relative;
                    &::after {
                        content: '';
                        display: block;
                        width: 16px;
                        height: 16px;
                        background: #1a1a1a;
                        border-radius: 50%;
                        position: absolute;
                        z-index: 4;
                        top: 42px;
                        left: 92px;
                        box-shadow: inset 1px 1px rgba(255, 255, 255, 0.2);
                    }
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
                        &.zj_y_zzz {
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
                        .zj_cd_fm {
                            border-radius: 50%;
                            position: absolute;
                            top: 19px;
                            left: 19px;
                            z-index: 2;
                        }
                    }
                }
            }
        }
    }
}
</style>
