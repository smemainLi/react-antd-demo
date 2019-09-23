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
    left: 100,
    bottom: 20,
    seriesIndex: [1],
    pieces: [
      { min: 3, max: 4, symbol: 'circle', color: '#6E99D1' },
      { min: 2, max: 3, symbol: 'circle', color: '#A1BDE1' },
      { min: 1, max: 2, symbol: 'circle', color: '#A6C0E3' },
      { min: 0, max: 0, symbol: 'circle', color: '#B7CCE8' }
    ],
    textStyle: {
      color: '#C2C1D9'
    }
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
        borderColor: '#1B1B1B'
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
        return val[2] * 16;
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
