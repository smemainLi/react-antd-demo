import React, { FC } from 'react';
import './style.scss';
import { LineDataProps } from './types';
import { CountUp } from 'countup.js';

const LineData: FC<LineDataProps> = props => {
  const { index, lineDataClassName, valueClassName, value, lastValue, unitClassName, unit } = props;
  return (
    <div className={`line-data-container ${lineDataClassName}`}>
      <div className={`line-data-value ${valueClassName}`} id={index}>
        {}
        {new CountUp(`${index}`, value, { startVal: lastValue, duration: 1.5 }).start()}
      </div>
      <div className={`line-data-unit ${unitClassName}`}>{unit}</div>
    </div>
  );
};

export default LineData;
