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
import React, {useState} from 'react';

const DiagramHeader = ({
	addNewPinState,
	newPinSettings,
	radiusChoice,
	setAddNewPinState,
	setAddPinHandler,
	spritemap,
}) => {
	const [active, setActive] = useState(false);
	const [customColors, setCustoms] = useState(
		newPinSettings.colorPicker.defaultColors
	);
	const [color, setColor] = useState(
		newPinSettings.colorPicker.selectedColor
	);

	// useEffect(() => {

	//     setAddNewPinState({
	//         color: addNewPinState.color,
	//         radius: addNewPinState.radius
	//     })

	// }, [color, addNewPinState])

	// useEffect(() => {
	//     setCustoms(newPinSettings.colorPicker.defaultColors)
	// }, [newPinSettings.colorPicker.defaultColors])

	return (
		<div className="d-flex diagram diagram-header justify-content-between">
			<div className="d-flex text-align-center">
				<label className="align-middle my-auto">Circle Diagram:</label>

				<ClayDropDown
					active={active}
					className="my-auto"
					onActiveChange={setActive}
					trigger={
						<ClayButton
							alt="Click-to-select-custom-diameter"
							className="ml-3 select-diameter"
							displayType="secondary"
						>
							Default Diameter
						</ClayButton>
					}
				>
					<ClayDropDown.ItemList className="diagram-header-picker">
						<ClayDropDown.Group header="SELECT COLOR">
							<ClayColorPicker
								colors={customColors}
								label="Custom Colors"
								max={100}
								name="diagram-color-picker"
								onColorsChange={setCustoms}
								onValueChange={(item) => {
									setColor(item.replace('#', ''));
									setAddNewPinState({
										color: item.replace('#', ''),
										radius: addNewPinState.radius,
									});
								}}
								showHex={true}
								spritemap={spritemap}
								step={1}
								useNative={newPinSettings.colorPicker.useNative}
								value={addNewPinState.fill}
							/>
						</ClayDropDown.Group>
					</ClayDropDown.ItemList>

					<ClayDropDown.Divider />

					<ClayDropDown.ItemList>
						<ClayDropDown.Group header="STANDARD">
							{radiusChoice.map((item, i) => (
								<ClayDropDown.Item
									key={i}
									onClick={(event) => {
										setAddNewPinState({
											fill: addNewPinState.fill,
											radius: item.value,
										});
									}}
								>
									{item.label}
								</ClayDropDown.Item>
							))}
						</ClayDropDown.Group>
					</ClayDropDown.ItemList>

					<ClayDropDown.Divider />
					<ClayDropDown.Caption>
						<div className="form-group">
							<label htmlFor="slider">CUSTOM</label>
							<ClaySlider
								id="slider"
								onValueChange={(item) =>
									setAddNewPinState({
										color,
										radius: item,
									})
								}
								value={addNewPinState.radius}
							/>
						</div>
						<ClayButton
							block="true"
							displayType="primary"
							onClick={() => setAddPinHandler(true)}
						>
							Add Pin
						</ClayButton>
					</ClayDropDown.Caption>
				</ClayDropDown>
			</div>

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

DiagramHeader.propTypes = {
	addNewPinState: PropTypes.shape({
		fill: PropTypes.string,
		radius: PropTypes.number,
	}),
	newPinSettings: PropTypes.shape({
		colorPicker: PropTypes.shape({
			defaultColors: PropTypes.array,
			selectedColor: PropTypes.string,
			useNative: PropTypes.bool,
		}),
		defautlRadius: PropTypes.number,
	}),
	radiusChoice: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.number,
		})
	),
	setAddNewPinState: PropTypes.func,
};

export default DiagramHeader;
