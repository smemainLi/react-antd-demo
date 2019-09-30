import React, { FC } from 'react';
import './style.scss';
import { CardLayoutProps } from './types';

const CardLayout: FC<CardLayoutProps> = (props) => {
	const { cardLayoutClassName, title, titleClassName, children } = props;
	return (
		<div className={cardLayoutClassName}>
			<div className={titleClassName}>{title}</div>
			<div>{children}</div>
		</div>
	);
};

export default CardLayout;
