import echarts from 'echarts';
import 'echarts/map/js/china';
import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import _config from './configure';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const MapBody = styled.div`
  width: 880px;
  height: 620px;
`;

const Map: FC = props => {
  const mapCanvas = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mapCanvas && Object.keys(_config)) {
      const myMap = echarts.init(mapCanvas.current!);
      myMap.setOption(_config, true);
    }
  }, [mapCanvas, _config]);

  return (
    <MapContainer>
      <MapBody ref={mapCanvas}></MapBody>
    </MapContainer>
  );
};

export default Map;
