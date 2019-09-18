import React, { FC } from 'react';
import './style.scss';
import { CardLayoutProps } from './types';

const CardLayout: FC<CardLayoutProps> = props => {
  const { otherClassName, title, titleClassName, children } = props;
  return (
    <div className={`card-layout-container ${otherClassName}`}>
      <div className={titleClassName}>{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default CardLayout;
