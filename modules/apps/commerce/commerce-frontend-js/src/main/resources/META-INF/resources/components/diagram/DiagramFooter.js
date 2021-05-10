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
	selectedOption,
	setChangedScale,
	setResetZoom,
	setSelectedOption,
	setZoomInHandler,
	setZoomOutHandler,
	spritemap,
}) => {
	function handleZoomChange(event) {
		setSelectedOption(event.target.value);
		setChangedScale(true);
	}

	const options = [2, 1.75, 1.5, 1.25, 1, 0.75, 0.5];

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
					value={selectedOption}
				>
					{options.map((value) => (
						<ClaySelect.Option
							key={value}
							label={`${value * 100}%`}
							value={value}
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
