import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components/macro';
import { NumProps } from './types';
import './style.scss';
import { px2vw } from '../../utils/px2vw';

const Space3D = styled.div`
  width: ${px2vw(36)};
  height: ${px2vw(62)};
  float: right;
  overflow: hidden;
  perspective-origin: 50% 50%;
  -webkit-perspective-origin: 50% 50%;
  position: relative;
  margin-right: ${px2vw(12)};
`;
const Group = styled.div`
  width: ${px2vw(36)};
  height: ${px2vw(62)};
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  position: relative;
`;

const Num: FC<NumProps> = props => {
  const { cardIndex, newNum, lastNum } = props;
  const lastNumRef = useRef<HTMLDivElement>(null);
  const newNumRef = useRef<HTMLDivElement>(null);
  const [newVal, setNewVal] = useState(0);
  const [lastVal, setLastVal] = useState(0);
  const flag = useRef(0);

  useEffect(() => {
    if (newNum === lastNum && newNum !== 0) {
      return;
    }
    setTimeout(() => {
      flag.current++;
      if (lastNumRef.current && newNumRef.current) {
        if (flag.current % 2 === 1) {
          lastNumRef.current.style.transform = `rotateX(-180deg)`;
          newNumRef.current.style.transform = 'rotateX(0deg)';
          setNewVal(newNum);
          setLastVal(lastNum);
        } else {
          lastNumRef.current.style.transform = `rotateX(0deg)`;
          newNumRef.current.style.transform = 'rotateX(-180deg)';
          setNewVal(lastNum);
          setLastVal(newNum);
        }
      }
    }, 100);
  }, [newNum, lastNum]);

  return (
    <>
      <Space3D>
        <Group className="space3d-group-card-item-style">
          <>
            <div ref={lastNumRef} className="last_num-style" id={`num${cardIndex}_item${lastNum}`}>
              {lastVal}
            </div>
            <div ref={newNumRef} className="new_num-style" id={`num${cardIndex}_item${newNum}`}>
              {newVal}
            </div>
          </>
        </Group>
      </Space3D>
    </>
  );
};

export default Num;
