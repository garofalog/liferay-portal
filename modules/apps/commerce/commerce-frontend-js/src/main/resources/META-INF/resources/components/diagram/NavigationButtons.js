/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import ClayIcon from '@clayui/icon';
import PropTypes from 'prop-types';
import React from 'react';

const NavigationButtons = ({
	moveDown,
	moveLeft,
	moveRight,
	moveUp,
	spritemap,
}) => {
	const navigationButtonStyle = {
		bottom: '15px',
		left: '',
		right: '50px',
		top: '',
	};

	return (
		<div id="move-controller" style={navigationButtonStyle}>
			<div className="box top" onClick={() => moveUp}>
				<ClayIcon
					className="icon"
					spritemap={spritemap}
					symbol="angle-left"
				/>
			</div>
			<div className="box right" onClick={() => moveRight}>
				<ClayIcon
					className="icon"
					spritemap={spritemap}
					symbol="angle-up"
				/>
			</div>
			<div className="box left" onClick={() => moveLeft}>
				<ClayIcon
					className="icon"
					spritemap={spritemap}
					symbol="angle-down"
				/>
			</div>
			<div className="bottom box" onClick={() => moveDown}>
				<ClayIcon
					className="icon"
					spritemap={spritemap}
					symbol="angle-down"
				/>
			</div>
		</div>
	);
};

export default NavigationButtons;

NavigationButtons.propTypes = {
	moveBottom: PropTypes.func,
	moveLeft: PropTypes.func,
	moveRight: PropTypes.func,
	moveUp: PropTypes.func,
	position: PropTypes.shape({
		bottom: PropTypes.string,
		left: PropTypes.string,
		right: PropTypes.string,
		top: PropTypes.string,
	}),
	spritemap: PropTypes.string,
};
