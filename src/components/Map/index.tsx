import React, { FC, useRef } from 'react';
import styled from 'styled-components/macro';

const MapContainer = styled.div``;
const MapBody = styled.div``;

const Map: FC = props => {
  const mapCanvas = useRef<HTMLDivElement>(null);

  return (
    <MapContainer>
      <MapBody ref={mapCanvas}></MapBody>
    </MapContainer>
  );
};

export default Map;
