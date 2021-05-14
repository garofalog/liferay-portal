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

import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import DiagramFooter from './DiagramFooter';
import DiagramHeader from './DiagramHeader';
import ImagePins from './ImagePins';

const Diagram = ({
	enablePanZoom,
	enableResetZoom,
	image,
	imageSettings,
	navigationController,
	newPinSettings,
	pins,
	spritemap,
	zoomController,
}) => {
	const [addPinHandler, setAddPinHandler] = useState(false);
	const [removePinHandler, setRemovePinHandler] = useState({
		handler: false,
		pin: null,
	});
	const [resetZoom, setResetZoom] = useState(false);
	const [zoomInHandler, setZoomInHandler] = useState(false);
	const [zoomOutHandler, setZoomOutHandler] = useState(false);
	const [changedScale, setChangedScale] = useState(false);
	const [scale, setScale] = useState(1);
	const [selectedOption, setSelectedOption] = useState(1);
	const [cPins, setCpins] = useState(pins);
	const [showTooltip, setShowTooltip] = useState({
		details: {
			cx: 0,
			cy: 0,
			id: null,
			label: '',
			linked_to_sku: 'sku',
			quantity: null,
			sku: '',
		},
		tooltip: null,
	});
	const [addNewPinState, setAddNewPinState] = useState({
		fill: newPinSettings.colorPicker.selectedColor,
		radius: newPinSettings.defaultRadius,
	});

	useEffect(() => {
		if (!showTooltip.tooltip && showTooltip.details.id) {
			const myNewState = cPins.map((element) => {
				if (element.id === showTooltip.details.id) {
					return {
						cx: cPins[element.id].cx,
						cy: cPins[element.id].cy,
						draggable: cPins[element.id].draggable,
						fill: cPins[element.id].fill,
						id: showTooltip.details.id,
						label: showTooltip.details.label,
						linked_to_sku: showTooltip.details.linked_to_sku,
						quantity: showTooltip.details.quantity,
						r: cPins[element.id].r,
						sku: showTooltip.details.sku,
					};
				}
				else {
					return element;
				}
			});
			setCpins(myNewState);
		}
	}, [showTooltip, setShowTooltip]);

	return (
		<div className="diagram mx-auto">
			<DiagramHeader
				addNewPinState={addNewPinState}
				newPinSettings={newPinSettings}
				setAddNewPinState={setAddNewPinState}
				setAddPinHandler={setAddPinHandler}
				setSelectedOption={setSelectedOption}
			/>

			<ImagePins
				addNewPinState={addNewPinState}
				addPinHandler={addPinHandler}
				cPins={cPins}
				changedScale={changedScale}
				enablePanZoom={enablePanZoom}
				enableResetZoom={enableResetZoom}
				image={image}
				imageSettings={imageSettings}
				navigationController={navigationController}
				removePinHandler={removePinHandler}
				resetZoom={resetZoom}
				scale={scale}
				selectedOption={selectedOption}
				setAddPinHandler={setAddPinHandler}
				setChangedScale={setChangedScale}
				setCpins={setCpins}
				setRemovePinHandler={setRemovePinHandler}
				setResetZoom={setResetZoom}
				setScale={setScale}
				setSelectedOption={setSelectedOption}
				setShowTooltip={setShowTooltip}
				setZoomInHandler={setZoomInHandler}
				setZoomOutHandler={setZoomOutHandler}
				showTooltip={showTooltip}
				zoomController={zoomController}
				zoomInHandler={zoomInHandler}
				zoomOutHandler={zoomOutHandler}
			/>

			<DiagramFooter
				changedScale={changedScale}
				enableResetZoom={enableResetZoom}
				selectedOption={selectedOption}
				setAddPinHandler={setAddPinHandler}
				setChangedScale={setChangedScale}
				setResetZoom={setResetZoom}
				setSelectedOption={setSelectedOption}
				setZoomInHandler={setZoomInHandler}
				setZoomOutHandler={setZoomOutHandler}
				spritemap={spritemap}
			/>
		</div>
	);
};

Diagram.defaultProps = {
	cPins: [],
	enablePanZoom: true,
	enableResetZoom: true,
	imageSettings: {
		height: '300px',
		width: '100%',
	},
	navigationController: {
		dragStep: 10,
		enable: true,
		enableDrag: false,
		position: {
			bottom: '15px',
			left: '',
			right: '50px',
			top: '',
		},
	},
	newPinSettings: {
		colorPicker: {
			defaultColors: [
				'AC68D7',
				'96D470',
				'F2EE8F',
				'F4C4A9',
				'F1A3BB',
				'67DC19',
				'959FEF',
				'A6C198',
				'FED998',
				'#38F95',
				'FD9945',
				'1A588B',
			],
			selectedColor: '0B5FFF',
			useNative: true,
		},
		defaultRadius: 15,
	},
	zoomController: {
		enable: true,
		position: {
			bottom: '0px',
			left: '',
			right: '200px',
			top: '',
		},
	},
};

Diagram.propTypes = {
	cPins: PropTypes.arrayOf(
		PropTypes.shape({
			cx: PropTypes.double,
			cy: PropTypes.double,
			draggable: PropTypes.bool,
			fill: PropTypes.string,
			id: PropTypes.number,
			label: PropTypes.string,
			linked_to_sku: PropTypes.oneOf(['sku', 'diagram']),
			quantity: PropTypes.number,
			r: PropTypes.number,
			sku: PropTypes.string,
		})
	),
	enablePanZoom: PropTypes.bool,
	enableResetZoom: PropTypes.bool,
	imageSettings: PropTypes.shape({
		height: PropTypes.string,
		width: PropTypes.string,
	}),
	navigationController: PropTypes.shape({
		dragStep: PropTypes.number,
		enable: PropTypes.bool,
		enableDrag: PropTypes.bool,
		position: PropTypes.shape({
			bottom: PropTypes.string,
			left: PropTypes.string,
			right: PropTypes.string,
			top: PropTypes.string,
		}),
	}),
	newPinSettings: PropTypes.shape({
		colorPicker: PropTypes.shape({
			defaultColors: PropTypes.array,
			selectedColor: PropTypes.string,
			useNative: PropTypes.bool,
		}),
		defaultRadius: PropTypes.number,
	}),
	setPins: PropTypes.func,
	showTooltip: PropTypes.shape({
		details: PropTypes.shape({
			cx: PropTypes.double,
			cy: PropTypes.double,
			id: PropTypes.number,
			label: PropTypes.string,
			linked_to_sku: PropTypes.oneOf(['sku', 'diagram']),
			quantity: PropTypes.number,
			sku: PropTypes.string,
		}),
		tooltip: PropTypes.bool,
	}),
	spritemap: PropTypes.string,
	zoomController: PropTypes.shape({
		enable: PropTypes.bool,
		position: PropTypes.shape({
			bottom: PropTypes.string,
			left: PropTypes.string,
			right: PropTypes.string,
			top: PropTypes.string,
		}),
	}),
};

export default Diagram;
