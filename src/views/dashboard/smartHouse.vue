<template>
    <div class="smart_house pb-5">
        <v-row>
            <v-col cols="12" sm="6">
                <v-card title="Cameras" class="elevation-0">
                    <v-tabs v-model="tab" align-tabs="end" class="mx-4" color="primary">
                        <v-tab :value="1">Living Room</v-tab>
                        <v-tab :value="2">Bed Room</v-tab>
                    </v-tabs>
                    <v-window v-model="tab">
                        <v-window-item :value="1">
                            <div class="camera_wrap ma-4">
                                <v-img
                                    :aspect-ratio="16 / 9"
                                    height="365"
                                    cover
                                    src="https://demos.creative-tim.com/argon-dashboard-chakra/static/media/ImageArchitect1.032614a5.png"
                                />
                                <div class="label"><span /> Live</div>
                                <div class="label lk">4K Resolution</div>
                            </div>
                        </v-window-item>
                        <v-window-item :value="2"
                            ><div class="camera_wrap ma-4">
                                <v-img
                                    :aspect-ratio="16 / 9"
                                    height="365"
                                    cover
                                    src="https://demos.creative-tim.com/vuetify-material-dashboard-pro/img/bg-smart-home-2.975d8868.jpg"
                                />
                                <div class="label"><span /> Live</div>
                                <div class="label lk">4K Resolution</div>
                            </div></v-window-item
                        >
                    </v-window>
                </v-card>
            </v-col>
            <v-col cols="12" sm="2" class="px-sm-1 px-3 py-1 py-sm-3">
                <Device v-model="widgets.wifi" title="5G WI-FI" icon="mdi-wifi" :toolw="false" />
                <Device v-model="widgets.tv" class="my-4" title="Apple TV" icon="mdi-television" />
                <Device v-model="widgets.ts" title="Thermostat" icon="mdi-snowflake" />
            </v-col>
            <v-col cols="12" sm="4"> <AirConditioner /></v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="8" class="py-1">
                <v-row>
                    <v-col cols="12" sm="5">
                        <v-card class="elevation-0">
                            <div class="d-flex justify-space-between">
                                <v-avatar size="120" rounded="0" class="ma-4">
                                    <img src="../../assets/cloud.png" height="120" />
                                </v-avatar>
                                <div style="flex: 1; text-align: right">
                                    <v-card-title class="text-h5">
                                        ShenZhen <v-icon icon="mdi-map-marker-outline" size="24" />
                                    </v-card-title>

                                    <v-card-subtitle class="">Cloudy To Clear</v-card-subtitle>

                                    <div class="py-0 mr-4">
                                        <span class="text-h3">26&deg;</span
                                        ><span class="text-h6">C</span>
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="7" class="px-1 sm_item_ sm_pt_1"><MusicCard /></v-col>
                    <v-col cols="12" sm="3" class="py-1 pr-1 sm_item_">
                        <Device
                            v-model="widgets.cctv"
                            title="Camera CCTV"
                            :imgSrc="imgcctv"
                            dev-model="Google Camera - X2"
                        />
                    </v-col>
                    <v-col cols="12" sm="3" class="py-1 pr-1 sm_item_">
                        <Device
                            v-model="widgets.speaker"
                            title="Speaker"
                            :imgSrc="imgspeaker"
                            dev-model="Google Speaker - A2"
                        />
                    </v-col>
                    <v-col cols="12" sm="3" class="py-1 pr-1 sm_item_">
                        <Device
                            v-model="widgets.thermostat"
                            title="Thermostat"
                            :imgSrc="imgthermostat"
                            dev-model="Google Thermostat"
                        />
                    </v-col>
                    <v-col cols="12" sm="3" class="py-1 pr-1 sm_item_">
                        <Device
                            v-model="widgets.humidifier"
                            title="Humidifier"
                            :imgSrc="imghumidifier"
                            dev-model="Xiaomi Mi - X500"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="4" class="py-1 py1_no">
                <EnergyUsed />
            </v-col>
        </v-row>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import Device from './widgets/Device.vue';
import MusicCard from './widgets/MusicCard.vue';
import AirConditioner from './widgets/AirConditioner.vue';
import EnergyUsed from './widgets/EnergyUsed.vue';
import imgcctv from '../../assets/device/cctv.png';
import imgthermostat from '../../assets/device/thermostat.png';
import imgspeaker from '../../assets/device/speaker.png';
import imghumidifier from '../../assets/device/humidifier.png';
const tab = ref(1);
const widgets = reactive({
    wifi: true,
    tv: false,
    ts: true,
    cctv: true,
    speaker: false,
    thermostat: true,
    humidifier: false,
});
</script>
<style lang="scss">
.smart_house {
    .v-card {
        // background-color: mediumslateblue;
    }
    .camera_wrap {
        position: relative;
        border-radius: 6px;
        overflow: hidden;
        .label {
            max-width: 112px;
            line-height: 25px;
            padding: 0 6px;
            background: rgba(0, 0, 0, 0.2);
            position: absolute;
            left: 16px;
            top: 16px;
            color: rgba(255, 255, 255, 0.8);
            border-radius: 2px;
            span {
                display: inline-block;
                width: 10px;
                height: 10px;
                background: red;
                border-radius: 5px;
            }
        }
        .label.lk {
            left: auto;
            right: 16px;
        }
    }
}
.isMobile {
    .px-sm-3 {
        padding-right: 12px !important;
        padding-left: 12px !important;
    }
    .py-sm-1 {
        padding-top: 4px !important;
        padding-bottom: 4px !important;
    }
    .py1_no {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }
    .sm_item_ {
        padding: 16px 12px 0 12px !important;
    }
    .sm_pt_1 {
        padding-top: 4px !important;
    }
    .music_card {
        // padding: ;
        .zjbg {
            display: none;
        }
    }
}
</style>
