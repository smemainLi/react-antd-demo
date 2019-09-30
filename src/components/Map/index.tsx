import echarts from 'echarts';
import 'echarts/map/js/china';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import _baseConfig from './baseConfigure';
import _config from './configure';
import { MapProps } from './types';
import { cityClientUrl, provinceCodeUrl, districtClientUrl } from '../../utils/request';
import { PROVINCE_SPELL } from './constants';
import { px2vw } from '../../utils/px2vw';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const MapBody = styled.div`
  width: ${px2vw(903)};
  height: ${px2vw(737)};
`;

function convertData(data: any, geoCoordObj: any) {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    let geoCoord = geoCoordObj[data[i].name];
    if (geoCoord) {
      res.push({
        ...data[i],
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
}

const Map: FC<MapProps> = props => {
  const { rData, areaValueData, active } = props;
  const mapCanvas = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<any>(_config);
  const [provinceCode, setProvinceCode] = useState<any>(null);

  const getProvinceCodeData = useCallback<any>(async () => {
    try {
      const result = await provinceCodeUrl();
      setProvinceCode(result.data.list);
    } catch (error) {}
  }, []);

  const getDistrictData = useCallback<any>(
    async (code: number) => {
      try {
        const result = await districtClientUrl({ type: active, provinceCode: code });
        return result.data;
      } catch (error) {}
    },
    [active]
  );

  useEffect(() => {
    let geoCoordObj: any = {};
    //const BMap = (window as any).BMap;
    //const myGeo = BMap && new BMap.Geocoder();
    if (rData.length && areaValueData.length) {
      for (let i = 0; i < areaValueData.length; i++) {
        areaValueData[i].name = areaValueData[i].city;
        geoCoordObj[areaValueData[i].name] = [areaValueData[i].location[0], areaValueData[i].location[1]];
        if (i === areaValueData.length - 1) {
          let maxValue = 0;
          for (let j in rData) {
            if (rData[j].value >= maxValue) {
              maxValue = rData[j].value;
            }
          }

          let averageValue = Math.floor(maxValue / 3);
          let piecesSymbol = 'circle';
          let newPieces = [
            { gte: averageValue * 2 + 1, symbol: piecesSymbol, color: '#487BC7' },
            { min: averageValue + 1, max: averageValue * 2, symbol: piecesSymbol, color: '#5D81B7' },
            { min: 1, max: averageValue, symbol: piecesSymbol, color: '#8AA2C5' },
            { min: 0, max: 0, symbol: piecesSymbol, color: '#B7CCE8' }
          ];
          const result = convertData(areaValueData, geoCoordObj);
          setConfig({
            ..._config,
            visualMap: {
              ..._config.visualMap,
              pieces: newPieces
            },
            series: [{ ..._config.series[0], data: result }, { ..._config.series[1], data: rData }]
          });
        }
      }
    }
  }, [rData, areaValueData]);

  useEffect(() => {
    getProvinceCodeData();
  }, []);

  useEffect(() => {
    if (mapCanvas && Object.keys(config)) {
      const myMap = echarts.init(mapCanvas.current!);
      myMap.setOption(config, true);

      myMap.off('click');
      myMap.on('click', function(params: any) {
        let findName = params.name;
        if (params.componentType === 'series') {
          if (params.data === undefined) return;
          if (params.data.district && params.data.location) return;

          let spell = PROVINCE_SPELL[findName];
          if (!spell) {
            for (let s in PROVINCE_SPELL) {
              if (params.data.province.indexOf(s) !== -1) {
                spell = PROVINCE_SPELL[s];
                findName = s;
                break;
              }
            }
            if (!spell) return;
          }

          import(('echarts/map/js/province/' + spell) as any).then(() => {
            let code;
            for (let son in provinceCode) {
              if (provinceCode[son].name.indexOf(findName) != -1) {
                code = provinceCode[son].code;
                break;
              }
            }

            getDistrictData(code).then((mapData: any) => {
              let areaValueData = mapData.list;
              let geoCoordObj: any = {};

              if (areaValueData.length) {
                for (let i = 0; i < areaValueData.length; i++) {
                  areaValueData[i].name = areaValueData[i].district;
                  areaValueData[i].value = areaValueData[i].number;
                  if (areaValueData[i].district.indexOf('市辖区') !== -1) {
                    areaValueData[i].name = '市辖区';
                  }
                  geoCoordObj[areaValueData[i].name] = [areaValueData[i].location[0], areaValueData[i].location[1]];
                  if (i === areaValueData.length - 1) {
                    params.name = findName;
                    myMap.setOption(
                      {
                        ..._baseConfig,
                        tooltip: {
                          ..._baseConfig.tooltip,
                          formatter: function(params: any) {
                            var dotHtml =
                              '<span style="display:inline-block;margin-right:20px;margin-top: 12px;margin-left: 5px;border-radius:10px;width:6px;height:6px;background-color:#F99137; border:0;"></span>';
                            return params.value[2]
                              ? `${dotHtml}&nbsp; ${params.data.city}<br /> ${params.name} : ${params.value[2]} 家`
                              : params.name;
                          }
                        },
                        series: [{ ..._baseConfig.series[0], data: convertData(areaValueData, geoCoordObj) }],
                        geo: {
                          ..._baseConfig.geo,
                          map: params.name
                        }
                      },
                      true
                    );
                  }
                }
              } else {
                myMap.setOption(
                  {
                    ..._baseConfig,
                    geo: {
                      ..._baseConfig.geo,
                      map: params.name
                    }
                  },
                  true
                );
              }
            });
          });
        }

        //handleClick(params);
      });
      window.onresize = function() {
        myMap.resize();
      };
    }
  }, [config]);

  return (
    <MapContainer>
      <MapBody ref={mapCanvas}></MapBody>
    </MapContainer>
  );
};

export default Map;
