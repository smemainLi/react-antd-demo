import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { NumCardProps } from './types';
import Num from '../Num';
import { px2vw } from '../../utils/px2vw';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const CardList = styled.div`
  position: relative;
`;

const Comma = styled.div`
  float: right;
  color: #ffffff;
  font-size: ${px2vw(55)};
  margin-right: ${px2vw(12)};
`;

const NumCard: FC<NumCardProps> = props => {
  const { newVal, lastVal } = props.content;
  const reLastVal = Array.from(lastVal).reverse();
  return (
    <Container>
      <CardList>
        {!!newVal &&
          !!reLastVal &&
          Array.from(newVal)
            .reverse()
            .map((item, index) => {
              return index !== 0 && !(index % 3) ? (
                <React.Fragment key={`item${index}`}>
                  <Comma>,</Comma>
                  <Num newNum={Number(item)} lastNum={Number(reLastVal[index])} cardIndex={index}></Num>
                </React.Fragment>
              ) : (
                <Num key={`item${index}`} newNum={Number(item)} lastNum={Number(reLastVal[index])} cardIndex={index}>
                  {item}
                </Num>
              );
            })}
      </CardList>
    </Container>
  );
};

export default NumCard;
