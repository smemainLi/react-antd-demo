const config: any = {
  aria: {
    show: true
  },
  tooltip: {
    trigger: 'item',
    formatter: function(params: any) {
      var dotHtml =
        '<span style="display:inline-block;margin-right:20px;margin-top: 12px;margin-left: 5px;border-radius:10px;width:6px;height:6px;background-color:#F99137; border:0;"></span>';
      return params.value[2]
        ? `${dotHtml}&nbsp; ${params.data.province}<br /> ${params.name} : ${params.value[2]} 家`
        : params.name;
    },
    backgroundColor: '#FFFFFF',
    textStyle: {
      color: '#284A86'
    },
    axisPointer: {}
  },
  // legend: {
  //   orient: 'vertical',
  //   left: 'left',
  //   data: ['categoryA']
  // },
  visualMap: {
    type: 'piecewise',
    left: 120,
    bottom: 20,
    seriesIndex: [1],
    pieces: [
      { gte: 5, symbol: 'circle', color: '#487BC7' },
      { min: 3, max: 4, symbol: 'circle', color: '#5D81B7' },
      { min: 1, max: 2, symbol: 'circle', color: '#8AA2C5' },
      { min: 0, max: 0, symbol: 'circle', color: '#B7CCE8' }
    ],
    textStyle: {
      color: '#C2C1D9',
      width: '110%',
      height: '110%'
    },
    padding: 13,
    backgroundColor: 'rgba(18,24,59,0.39)'
  },
  geo: {
    map: 'china',
    roam: true,
    zoom: 1.2,
    label: {
      normal: {
        show: false,
        textStyle: {
          color: 'rgba(0,0,0,0.4)'
        }
      },
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      normal: {
        areaColor: 'rgba(194,212,235,1)',
        borderColor: '#2c558f',
        borderWidth: 1.5
      },
      emphasis: {
        color: null,
        areaColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 20,
        borderWidth: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  series: [
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      rippleEffect: {
        brushType: 'stroke'
      },
      data: [],
      symbolSize: function(val: any) {
        let temp = val[2];
        if (temp >= 2) {
          if (temp >= 5) temp = 5;
          temp = temp * 0.65;
        } else {
          temp = temp * 0.85;
        }
        return temp * 10;
      },
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          color: '#F99137'
        }
      }
    },
    {
      name: 'categoryA',
      type: 'map',
      geoIndex: 0,
      data: []
    }
  ]
};

export default config;
