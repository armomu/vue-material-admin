<template>
    <div class="tesla">
        <div class="car">
            <img src="../../assets/tesla-model-s.png" class="tesla_img" />
            <v-card class="elevation-0 cloud_card py-2" theme="light">
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
            <div class="row2">
                <v-card class="elevation-0 pa-4 battery" theme="light">
                    <div class="d-flex">
                        <v-btn
                            color="rgba(0,0,0,0.8)"
                            icon="mdi-battery-90"
                            theme="dark"
                            class="elevation-0 innericon"
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
                <v-card class="elevation-0 pa-4 Trip" theme="light">
                    <div class="d-flex">
                        <v-btn
                            color="rgba(0,0,0,0.8)"
                            icon="mdi-speedometer"
                            theme="dark"
                            class="elevation-0 innericon"
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
        </div>
        <div class="car_sys mt-4">
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
                <div class="bottom_bar" @click="onStart">
                    <div class="bb_inner elevation-10">
                        <div class="bbi_wrap d-flex">
                            <v-btn
                                variant="text"
                                icon="mdi-car-parking-lights"
                                color="#ffffff"
                                class="hide"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                icon="mdi-car-brake-parking"
                                color="#ffffff"
                                class="hide"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                icon="mdi-car-traction-control"
                                color="#ffffff"
                                class="hide"
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
                                class="hide"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                icon="mdi-gauge"
                                color="#ffffff"
                                class="hide"
                            ></v-btn>
                            <v-btn
                                variant="text"
                                icon="mdi-view-comfy"
                                color="#ffffff"
                                class="hide"
                            ></v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import { shallowRef, onMounted, onBeforeUnmount } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
onMounted(() => {
    // audio.value.addEventListener();
});

const map_ = shallowRef<any>(null);
let AMap: any;
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
let marker: any;
const lineArr = [
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
        const map = new AMap.Map('amap', {
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

        const passedPolyline = new AMap.Polyline({
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
setTimeout(() => {
    onStart();
}, 3000);
onBeforeUnmount(() => {
    map_.value?.destroy();
});
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
        .row2 {
            display: flex;
            align-items: center;
            width: 50%;
            .v-card {
                margin-top: 16px;
            }
        }
        .v-card {
            width: 50%;
            border-radius: 12px;
        }
        .cloud_card {
            background-image: linear-gradient(to right, #ddf4ff, #d4eef9);
        }
        .battery {
            background-image: linear-gradient(to right, #4eebe4, #69fee1);
            margin-right: 8px;
            .innericon {
                color: #ffffff;
            }
        }
        .Trip {
            background-image: linear-gradient(to right, #6b38fb, #bc78f2);
            margin-left: 8px;
            .innericon {
                color: #ffffff;
            }
        }
        .tesla_img {
            width: 48%;
            position: absolute;
            right: 0;
            top: -90px;
            z-index: 2;
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
        .search_bar {
            position: absolute;
            left: 50px;
            top: 30px;
            width: 300px;
            height: 350px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 3;
            border-radius: 8px;
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
    }
}
.isMobile {
    .tesla {
        .car {
            .tesla_img {
                position: relative;
                top: 0;
                width: 80%;
                display: block;
                margin: 0 auto;
            }
            .row2 {
                width: auto;
                display: block !important;
            }
            .v-card {
                width: auto;
            }
        }
        .car_sys {
            .search_bar {
                display: none;
                visibility: hidden;
            }
        }
        .bottom_bar {
            width: 92%;
            left: 4%;
        }
        .hide {
            display: none;
        }
    }
}
</style>
