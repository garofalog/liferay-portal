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
	imageSettings,
	enableResetZoom,
	image,
	navigationController,
	spritemap,
	zoomController,
}) => {
	const [resetZoom, setResetZoom] = useState(false);
	const [zoomInHandler, setZoomInHandler] = useState(false);
	const [zoomOutHandler, setZoomOutHandler] = useState(false);
	const [imageState, setImageState] = useState({
		k: 1,
		x: 0,
		y: 0,
	});
	const [scale, setScale] = useState(1);
	const [selectedOption, setSelectedOption] = useState(1);

	useEffect(() => {
		setSelectedOption(imageState.k);
	}, [imageState]);

	return (
		<div className="diagram mx-auto">
			<DiagramHeader
				setImageState={setImageState}
				setSelectedOption={setSelectedOption}
			/>

			<ImagePins
				imageSettings={imageSettings}
				image={image}
				imageState={imageState}
				navigationController={navigationController}
 				resetZoom={resetZoom}
				scale={scale}
				setImageState={setImageState}
				setResetZoom={setResetZoom}
				setScale={setScale}
				setZoomInHandler={setZoomInHandler}
				setZoomOutHandler={setZoomOutHandler}
				zoomController={zoomController}
				zoomInHandler={zoomInHandler}
				zoomOutHandler={zoomOutHandler}
			/>

			<DiagramFooter
				enableResetZoom={enableResetZoom}
				imageState={imageState}
				setImageState={setImageState}
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
	imageSettings: PropTypes.shape({
		height: '300px',
		width: '100%',
	}),
	enableResetZoom: true,
	navigationController: {
		dragStep: 10,
		enable: true,
		enableDrag: true,
		position: {
			bottom: '15px',
			left: '',
			right: '50px',
			top: '',
		},
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
	imageSettings: PropTypes.shape({
		height: PropTypes.string,
		lastX: PropTypes.number,
		lastY: PropTypes.number,
		scaleFactor: PropTypes.double,
		width: PropTypes.string,
	}),
	enableResetZoom: PropTypes.bool,
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
	spritemap: PropTypes.string,
	zoomController: PropTypes.shape({
		enable: PropTypes.bool,
		enablePanZoom: PropTypes.true,
		position: PropTypes.shape({
			bottom: PropTypes.string,
			left: PropTypes.string,
			right: PropTypes.string,
			top: PropTypes.string,
		}),
	}),
};

export default Diagram;
