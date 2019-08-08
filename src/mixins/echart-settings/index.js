// 替换echart表样式
export default {
    data() {
        return {
            chartExtend: {
                color: ['#a16eff','#00D68F'],
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
                            color: '#1b1b38'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(50,50,89,1)',
                    borderColor: '#1b1b38',
                    borderWidth: 1
                },
                legend: {
                    borderColor: '#fff',
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
                color: ['#a16eff','#00D68F'],
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
                tooltip: {
                    backgroundColor: 'rgba(50,50,89,1)',
                    borderColor: '#1b1b38',
                    borderWidth: 1
                },
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
        };
    }
};
