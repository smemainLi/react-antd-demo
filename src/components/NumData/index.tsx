import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { CountUp } from 'countup.js';
import { NumDataProps } from './types';

const BodyDiv = styled.div``;

const NumData: FC<NumDataProps> = props => {
  const { id, value, lastValue } = props;
  return (
    <BodyDiv id={`${id}`}>
      {}
      {new CountUp(`${id}`, value, {
        startVal: lastValue,
        separator: '',
        duration: 2
      }).start()}
    </BodyDiv>
  );
};

export default NumData;
