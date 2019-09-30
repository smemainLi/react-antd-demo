const config: any = {
  tooltip: {
    trigger: 'item',
    formatter: function(params: any) {
      var dotHtml =
        '<span style="display:inline-block;margin-right:20px;margin-top: 12px;margin-left: 5px;border-radius:10px;width:6px;height:6px;background-color:#F99137; border:0;"></span>';
      return `运单轨迹：<br/>杭州 -> 青岛`;
    },
    backgroundColor: '#FFFFFF',
    textStyle: {
      color: '#284A86'
    },
    axisPointer: {}
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
        borderColor: 'rgba(44,85,143, 0.3)',
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
  }
};

export default config;
