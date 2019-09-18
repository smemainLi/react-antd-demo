import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { FrameProps } from './types';

const Container = styled.div<FrameProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
  border: 1px solid #383c5e;
  & span {
    width: 26px;
    height: 26px;
    position: absolute;
    border-style: solid;
    border-color: #9298af;
  }
  & span:nth-child(1) {
    top: 0;
    left: 0;
    border-width: 1px 0 0 1px;
  }
  & span:nth-child(2) {
    top: 0;
    right: 0;
    border-width: 1px 1px 0 0;
  }
  & span:nth-child(3) {
    bottom: 0;
    left: 0;
    border-width: 0 0 1px 1px;
  }
  & span:nth-child(4) {
    bottom: 0;
    right: 0;
    border-width: 0 1px 1px 0;
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
