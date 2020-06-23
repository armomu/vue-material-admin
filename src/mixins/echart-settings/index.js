// 替换echart表样式
const ecrows1 = [];
for (var i = 0; i < 100; i++) {
    ecrows1.push({
        value: 'value',
        orders: (Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5,
        profit: (Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5
    });
}
export default {
    data() {
        return {
            chartExtend: {
                color: ['#a16eff', '#00D68F'],
                textStyle: {
                    color: '#fff'
                },
                xAxis: {
                    show: false
                },
                yAxis: {
                    offset: 50,
                    width: 0,
                    splitNumber: 6,
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#efefef'
                        }
                    }
                },
                // tooltip: {
                //     backgroundColor: 'rgba(50,50,89,1)',
                //     borderColor: '#1b1b38',
                //     borderWidth: 1
                // },
                legend: {
                    borderColor: '#fff',
                    show: false,
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'bold'
                    },

                },
                grid: {
                    show: true,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderColor: 'transparent',
                },
            },
            //
            chartExtend2: {
                color: ['#a16eff', '#00D68F'],
                textStyle: {
                    color: '#fff'
                },
                xAxis: {
                    show: false
                },
                yAxis: {
                    offset: 50,
                    width: 0,
                    splitNumber: 6,
                    splitLine: {
                        lineStyle: {
                            color: 'transparent'
                        }
                    }
                },
                // tooltip: {
                //     backgroundColor: 'rgba(50,50,89,1)',
                //     borderColor: '#1b1b38',
                //     borderWidth: 1
                // },
                legend: {
                    borderColor: '#fff',
                    show: false,
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'bold'
                    },

                },
                grid: {
                    show: true,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderColor: 'transparent',
                },
            },
            pieExtend: {
                color: ['#a16eff', '#00D68F'],
                textStyle: {
                    color: '#fff'
                },
                xAxis: {
                    show: false
                },
                yAxis: {
                    offset: 50,
                    width: 0,
                    splitNumber: 6,
                    splitLine: {
                        lineStyle: {
                            color: 'transparent'
                        }
                    }
                },
                // tooltip: {
                //     backgroundColor: 'rgba(50,50,89,1)',
                //     borderColor: '#1b1b38',
                //     borderWidth: 1
                // },
                legend: {
                    borderColor: '#fff',
                    show: false,
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'bold'
                    },

                },
                grid: {
                    show: true,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderColor: 'transparent',
                },
            },
            chartExtend3: {
                color: ['#a16eff', '#00D68F'],
                textStyle: {
                    color: '#999'
                },
                xAxis: {
                    //
                    show: false,
                    splitNumber: 12,
                    splitLine: {
                        lineStyle: {
                            color: '#1b1b38'
                        }
                    }
                },
                yAxis: {
                    width: 0,
                    splitNumber: 2,
                    splitLine: {
                        lineStyle: {
                            color: '#1b1b38'
                        }
                    }
                },
                // tooltip: {
                //     backgroundColor: 'rgba(50,50,89,1)',
                //     borderColor: '#1b1b38',
                //     borderWidth: 1
                // },
                legend: {
                    borderColor: '#fff',
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'bold'
                    },

                },
                grid: {
                    show: true,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderColor: 'transparent',
                },
            },
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
            },
            pieSettings: {
                limitShowNum: 3,
                labelLine: {
                    show: false
                },
                radius: ['65%', '85%'],
                label: {
                    show: false
                }
            },
            pieData: {
                columns: ['日期', '访问用户'],
                rows: [
                    { 日期: '1/2', 访问用户: 3530 },
                    { 日期: '1/3', 访问用户: 1204 }
                ]
            },
        };
    }
};
