import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { NumCardProps } from './types';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* align-items: center; */
`;

const CardList = styled.div`
  /* height: 56px; */
`;
const Card = styled.div`
  width: 32px;
  height: 56px;
  color: #ffffff;
  float: right;
  font-size: 48px;
  text-align: center;
  line-height: 56px;
  margin-right: 12px;
  background-color: #6788b8;
`;

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
              <>
                <Comma>,</Comma>
                <Card key={`item${index}`}>{item}</Card>
              </>
            ) : (
              <Card key={`item${index}`}>{item}</Card>
            );
          })}
      </CardList>
    </Container>
  );
};

export default NumCard;
