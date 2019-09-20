import React, { FC } from 'react';
import './style.scss';
import { ListItemProps } from './types';

const ListItem: FC<ListItemProps> = props => {
  const { listItemClassName, number, use, address, date } = props;
  return (
    <div className={`list-item-components ${listItemClassName}`}>
      <div>{number}</div>
      <div>{use}</div>
      <div>{address}</div>
      <div>{date}</div>
    </div>
  );
};

export default ListItem;
