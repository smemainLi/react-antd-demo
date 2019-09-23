import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { NumProps } from './types';

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

const Num: FC<NumProps> = props => {
  const { number } = props;
  let start = 0;
  const [num, setNum] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const timer = setInterval(() => {
        setNum(++start);
        if (start === number) {
          clearInterval(timer);
        }
      }, 200);
    }, 200);
  }, []);
  return (
    <>
      <Card>{num}</Card>
    </>
  );
};

export default Num;
