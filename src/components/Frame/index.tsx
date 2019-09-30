import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { FrameProps } from './types';
import { px2vw } from '../../utils/px2vw';

const Container = styled.div<FrameProps>`
  width: ${props => px2vw(props.width)};
  height: ${props => px2vw(props.height)};
  position: relative;
  border: ${px2vw(1)} solid #383c5e;
  & span {
    width: ${px2vw(26)};
    height: ${px2vw(26)};
    position: absolute;
    border-style: solid;
    border-color: #9298af;
  }
  & span:nth-child(1) {
    top: 0;
    left: 0;
    border-width: ${px2vw(1)} 0 0 ${px2vw(1)};
  }
  & span:nth-child(2) {
    top: 0;
    right: 0;
    border-width: ${px2vw(1)} ${px2vw(1)} 0 0;
  }
  & span:nth-child(3) {
    bottom: 0;
    left: 0;
    border-width: 0 0 ${px2vw(1)} ${px2vw(1)};
  }
  & span:nth-child(4) {
    bottom: 0;
    right: 0;
    border-width: 0 ${px2vw(1)} ${px2vw(1)} 0;
  }
`;

export const Frame: FC<FrameProps> = props => {
  const { className, children } = props;
  return (
    <Container {...props} className={className}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
    </Container>
  );
};

export default Frame;
