import echarts from 'echarts';
import 'echarts/map/js/china';
import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import _config from './configure';
import { MapProps } from './types';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const MapBody = styled.div`
  width: 920px;
  height: 620px;
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
  const BMap = (window as any).BMap;
  const myGeo = BMap && new BMap.Geocoder();
  const { rData, areaValueData } = props;
  const mapCanvas = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<any>(_config);

  useEffect(() => {
    let geoCoordObj: any = {};
    if (rData.length && areaValueData.length) {
      for (let i = 0; i < areaValueData.length; i++) {
        myGeo &&
          myGeo.getPoint(areaValueData[i].name, function(point: any) {
            if (point) {
              geoCoordObj[areaValueData[i].name] = [point.lng, point.lat];
              if (i === areaValueData.length - 1) {
                setTimeout(() => {
                  const result = convertData(areaValueData, geoCoordObj);
                  setConfig({
                    ..._config,
                    series: [{ ..._config.series[0], data: result }, { ..._config.series[1], data: rData }]
                  });
                }, 200);
              }
            }
          });
      }
    }
  }, [mapCanvas, _config, rData, areaValueData]);

  useEffect(() => {
    if (mapCanvas && Object.keys(config)) {
      const myMap = echarts.init(mapCanvas.current!);
      myMap.setOption(config, true);
    }
  }, [config]);

  return (
    <MapContainer>
      <MapBody ref={mapCanvas}></MapBody>
    </MapContainer>
  );
};

export default Map;
