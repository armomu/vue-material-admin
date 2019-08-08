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
                    <div class="item_content">

                    </div>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="item_flex_title">
                        <div class="name">sales</div>
                        <v-icon>keyboard_arrow_right</v-icon>
                    </div>
                    <div class="item_content">
                        <div class="chart_wrap">
                            <ve-line
                                :data="chartData3"
                                :extend="chartExtend3"
                                :settings="chartSettings3"
                            ></ve-line>
                        </div>
                    </div>
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
let count2 = -20;
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
            },
            chartSettings3: {
                xAxisType: 'time'
            },
            chartData3: {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    {
                        日期: '2018-01-01',
                        访问用户: 1393,
                        下单用户: 1093,
                        下单率: 0.32
                    },
                    {
                        日期: '2018-01-02',
                        访问用户: 3530,
                        下单用户: 3230,
                        下单率: 0.26
                    },
                    {
                        日期: '2018-01-03',
                        访问用户: 2923,
                        下单用户: 2623,
                        下单率: 0.76
                    },
                    {
                        日期: '2018-01-05',
                        访问用户: 1723,
                        下单用户: 1423,
                        下单率: 0.49
                    },
                    {
                        日期: '2018-01-10',
                        访问用户: 3792,
                        下单用户: 3492,
                        下单率: 0.323
                    },
                    {
                        日期: '2018-01-20',
                        访问用户: 4593,
                        下单用户: 4293,
                        下单率: 0.78
                    }
                ]
            }
        };
    },
    mixins: [echartMixins],
    mounted() {}
};
</script>



