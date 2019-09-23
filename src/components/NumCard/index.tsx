import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { NumCardProps } from './types';
import Num from '../Num';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const CardList = styled.div``;

const Comma = styled.div`
  float: right;
  color: #ffffff;
  font-size: 48px;
  margin-right: 12px;
`;

const NumCard: FC<NumCardProps> = props => {
  const { content } = props;
  return (
    <Container>
      <CardList>
        {Array.from(content.toString())
          .reverse()
          .map((item, index) => {
            return index !== 0 && !(index % 3) ? (
              <React.Fragment key={`item${index}`}>
                <Comma>,</Comma>
                <Num key={`item${index}`} number={Number(item)}></Num>
              </React.Fragment>
            ) : (
              <Num key={`item${index}`} number={Number(item)}>
                {item}
              </Num>
            );
          })}
      </CardList>
    </Container>
  );
};

export default NumCard;
