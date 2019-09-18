import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { NumCardProps } from './types';

const Container = styled.div`
  width: 32px;
  height: 56px;
  color: #ffffff;
  font-size: 48px;
  text-align: center;
  line-height: 56px;
  background-color: #6788b8;
`;

const NumCard: FC<NumCardProps> = props => {
  const { content } = props;
  return <Container>{content}</Container>;
};

export default NumCard;
