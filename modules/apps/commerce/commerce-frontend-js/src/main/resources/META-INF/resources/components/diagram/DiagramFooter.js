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
import {ClaySelect} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import React from 'react';

const DiagramFooter = ({
	enableResetZoom,
	setResetZoom,
	selectedOption,
	changedScale,
	setChangedScale,
	setSelectedOption,
	setZoomInHandler,
	setZoomOutHandler,
	spritemap,
}) => {
	function handleZoomChange(event) {
		setSelectedOption(event.target.value / 100);
		setChangedScale(true);
	}

	const options = [
		{
			label: '200%',
			value: '200',
		},
		{
			label: '175%',
			value: '175',
		},
		{
			label: '150%',
			value: '150',
		},
		{
			label: '125%',
			value: '125',
		},
		{
			label: '100%',
			value: '100',
		},
		{
			label: '75%',
			value: '75',
		},
		{
			label: '50%',
			value: '50',
		},
	];

	return (
		<div className="d-flex diagram-footer justify-content-end mt-3">
			<ClayButton className="mr-3">
				<span className="inline-item inline-item-before">
					<ClayIcon spritemap={spritemap} symbol="expand" />
				</span>
				Expand
			</ClayButton>

			<div className="d-flex">
				<ClayButton
					className=""
					displayType="secondary"
					onClick={() => {
						setZoomOutHandler(true);
					}}
				>
					-
				</ClayButton>

				<ClaySelect
					aria-label="Select Label"
					className="ml-3 mr-3"
					id="mySelectId"
					onChange={handleZoomChange}
				>
					{options.map((item) => (
						<ClaySelect.Option
							key={item.value}
							label={item.label}
							selected={item.value === '100' ? true : false}
							value={item.value}
						/>
					))}
				</ClaySelect>

				<ClayButton
					className=""
					displayType="secondary"
					onClick={() => {
						setZoomInHandler(true);
					}}
				>
					+
				</ClayButton>
			</div>

			{enableResetZoom && (
				<ClayButton
					className="ml-3 reset-zoom"
					displayType="secondary"
					id="reset"
					onClick={() => setResetZoom(true)}
				>
					Reset Zoom
				</ClayButton>
			)}
		</div>
	);
};

export default DiagramFooter;
