import React, { FC } from 'react';
import './style.scss';
import { LineDataProps } from './types';
import { changeNum } from '../../utils/tools';

const LineData: FC<LineDataProps> = props => {
  const { lineDataClassName, valueClassName, value, unitClassName, unit } = props;
  return (
    <div className={`line-data-container ${lineDataClassName}`}>
      <div className={`line-data-value ${valueClassName}`}>{changeNum(value)}</div>
      <div className={`line-data-unit ${unitClassName}`}>{unit}</div>
    </div>
  );
};

export default LineData;
