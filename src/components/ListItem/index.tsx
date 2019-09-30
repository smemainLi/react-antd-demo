import React, { FC } from 'react';
import './style.scss';
import { ListItemProps } from './types';
import styled from 'styled-components/macro';
import { px2vw } from '../../utils/px2vw';

const Number = styled.div`
  width: ${px2vw(160)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Use = styled.div`
  width: ${px2vw(100)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Address = styled.div`
  width: ${px2vw(90)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Date = styled.div`
  width: ${px2vw(130)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ListItem: FC<ListItemProps> = props => {
  const { listItemClassName, number, use, address, date, handleClick } = props;
  return (
    <div className={`list-item-components ${listItemClassName}`} onClick={handleClick}>
      <Number>{number}</Number>
      <Use>{use}</Use>
      <Address>{address}</Address>
      <Date>{date}</Date>
    </div>
  );
};

export default ListItem;
