<template>
    <div class="home">
        <div class="amap-page-container">
            <el-amap
                vid="Amap"
                :center="center"
                :zoom="zoom"
                class="amap-demo"
                :events="events"
                :amap-manager="amapManager"
            >
                <el-amap-marker
                    v-for="(marker,index) in markers"
                    :position="marker.position"
                    :content="marker.content"
                    :events="marker.events"
                    :key="index"
                ></el-amap-marker>
            </el-amap>
        </div>
    </div>
</template>
<script>
import VueMap from 'vue-amap';
const amapManager = new VueMap.AMapManager();
export default {
    data() {
        // let self = this;
        return {
            zoom: 1,
            center: [114.22951, 22.720603],
            markers: [],
            amapManager,
            markerRefs: [],
            events: {
                init(amp) {
                    amp.setMapStyle(
                        'amap://styles/5a5b5154506719b871666675766b9035'
                    );
                    // setTimeout(() => {
                    //     let cluster = new AMap.MarkerClusterer(
                    //         o,
                    //         self.markerRefs,
                    //         {
                    //             gridSize: 80,
                    //             renderCluserMarker: self._renderCluserMarker
                    //         }
                    //     );
                    // }, 1000);
                }
            }
        };
    },
    created() {
        // let self = this;
        // let markers = [];
        // let index = 0;
        // while (++index <= 40) {
        //     markers.push({
        //         position: [114.22951 + 0.001 * index, 22.720603],
        //         content:
        //             '<div style="text-align:center; background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
        //         events: {
        //             init(o) {
        //                 self.markerRefs.push(o);
        //             }
        //         }
        //     });
        // }
        // this.markers = markers;
    },
    computed: {
        map() {
            return this.amapManager.getMap();
        },
        locale(key) {
            return this.$t('header.' + key);
        }
    },
    mounted() {
        this.$vuetify.theme.primary = '#323259';
        setTimeout(() => {
            console.log(this.map.getCenter());
        }, 2000);
    },
    methods: {
        _renderCluserMarker(context) {
            const count = this.markers.length;

            let factor = Math.pow(context.count / count, 1 / 18);
            let div = document.createElement('div');
            let Hue = 180 - factor * 180;
            let bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
            let fontColor = 'hsla(' + Hue + ',100%,20%,1)';
            let borderColor = 'hsla(' + Hue + ',100%,40%,1)';
            let shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
            div.style.backgroundColor = bgColor;
            let size = Math.round(
                30 + Math.pow(context.count / count, 1 / 5) * 20
            );
            div.style.width = div.style.height = size + 'px';
            div.style.border = 'solid 1px ' + borderColor;
            div.style.borderRadius = size / 2 + 'px';
            div.style.boxShadow = '0 0 1px ' + shadowColor;
            div.innerHTML = context.count;
            div.style.lineHeight = size + 'px';
            div.style.color = fontColor;
            div.style.fontSize = '14px';
            div.style.textAlign = 'center';
            context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
            context.marker.setContent(div);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.amap-demo {
    width: 100%;
    height: calc(100vh - 64px);
}
</style>
