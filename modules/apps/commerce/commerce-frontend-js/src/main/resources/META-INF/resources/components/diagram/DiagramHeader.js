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

import ClayButton from '@clayui/button';
import ClayColorPicker from '@clayui/color-picker';
import ClayDropDown from '@clayui/drop-down';
import {ClaySelect, ClaySelectWithOption} from '@clayui/form';
import ClaySlider from '@clayui/slider';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

const DiagramHeader = ({spritemap}) => {
	return (
		<div className="d-flex diagram diagram-header justify-content-between">
			<ClayButton
				className="auto-mapping my-auto pull-right"
				displayType="secondary"
			>
				Auto-mapping
			</ClayButton>
		</div>
	);
};

DiagramHeader.defaultProps = {
	radiusChoice: [
		{
			label: 'Small',
			value: 10,
		},
		{
			label: 'Medium',
			value: 20,
		},
		{
			label: 'Large',
			value: 30,
		},
	],
};

export default DiagramHeader;
