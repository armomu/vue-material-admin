<template>
    <div class="dashboard_container">
        <div class="row1">
            <div class="left">
                <div class="card_wrap">
                    <div class="item">
                        <div class="item_flex_title">
                            <div class="name">$ Histogram</div>
                            <v-icon>keyboard_arrow_right</v-icon>
                        </div>
                        <div class="item_content">
                            <div class="chart_wrap">
                                <ve-histogram
                                    :data="chartData"
                                    :extend="chartExtend"
                                    height="180px"
                                ></ve-histogram>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item_flex_title">
                            <div class="name">Ve-line</div>
                            <v-icon>keyboard_arrow_right</v-icon>
                        </div>
                        <div class="item_content">
                            <div class="tool">
                                <div class="t">
                                    <div class="i">Daily Income</div>
                                    <div class="r">
                                        <v-icon>arrow_drop_up</v-icon>
                                        38%
                                    </div>
                                </div>
                                <div class="v">584</div>
                            </div>
                            <div class="chart_wrap chart_wrap1">
                                <ve-line
                                    :data="chartData2"
                                    :extend="chartExtend2"
                                    :settings="chartSettings"
                                    height="180px"
                                ></ve-line>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="item_flex_title">
                        <div class="name">sales</div>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </div>
                    <div class="item_content"></div>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="item_flex_title">
                        <div class="name">sales</div>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </div>
                    <div class="item_content"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import QRCode from 'qrcode';
import echartMixins from '@/mixins/echart-settings';
const ecrows1 = [];
let count = -30;
let count2 = 20;
for (let eli = 0; eli < 100; eli++) {
    if (eli > 0 && eli <= 60) {
        count += 1; // 50
        count2 += 1;
    } else if (eli > 60 && eli <= 75) {
        count -= 1; // 8
        count2 -= 1;
    } else if (eli > 75 && eli <= 90) {
        count += 1; // 50
        count2 += 1;
    } else if (eli > 90 && eli <= 100) {
        count -= 1; // 50
        count2 -= 1;
    }
    ecrows1.push({
        value: '$',
        orders: count,
        profit: count2
    });
}

export default {
    data() {
        return {
            chartSettings: {
                area: true
            },
            chartData: {
                columns: ['value', 'orders', 'profit'],
                rows: ecrows1
            },
            chartData2: {
                columns: ['日期', '访问用户'],
                rows: [
                    {
                        日期: '1/1',
                        访问用户: 1393
                    },
                    {
                        日期: '1/2',
                        访问用户: 3530
                    },
                    {
                        日期: '1/3',
                        访问用户: 2923
                    },
                    {
                        日期: '1/4',
                        访问用户: 1723
                    },
                    {
                        日期: '1/5',
                        访问用户: 3792
                    },
                    {
                        日期: '1/6',
                        访问用户: 4593
                    }
                ]
            }
        };
    },
    mixins: [echartMixins],
    mounted() {}
};
</script>



