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

import {drag, event, select, zoom} from 'd3';
import PropTypes from 'prop-types';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
	moveRight,
	moveLeft,
	moveUp,
	moveDown,
	zoomIn,
	zoomOut,
} from './NavigationsUtils';
import NavigationButtons from './NavigationButtons';
import ZoomController from './ZoomController';

const ImagePins = ({
	imageSettings,
	enablePanZoom,
	execZoomIn,
	image,
	imageState,
	navigationController,
	resetZoom,
	setResetZoom,
	setZoomInHandler,
	setZoomOutHandler,
	spritemap,
	zoomController,
	zoomInHandler,
	zoomOutHandler,
}) => {
	const [width, setWidth] = useState(0);
	let div,
		svg,
		container,
		handleMoveUp,
		handleMoveDown,
		handleMoveLeft,
		handleMoveRight,
		handleZoomIn,
		handleZoomOut;

	useEffect(() => {
		let t;
		if (!event) {
			t = {
				k: imageState.k,
				x: imageState.x,
				y: imageState.y,
			};
		}
		else {
			t = {
				k: event.transform.k,
				x: event.transform.x,
				y: event.transform.y,
			};
		}

		if (resetZoom) {
			setResetZoom(false);
			container.attr('transform', 'translate(0,0)scale(1)');
		}
		else {
			container.attr(
				'transform',
				`translate(${t.x},${t.y}) scale(${t.k})`
			);
		}
	}, [resetZoom]);

	useLayoutEffect(() => {
		div = select('.diagram-pins-container');
		svg = select('svg');
		container = select('g#container');

		const panZoom = zoom().on('zoom', () =>
			container.attr('transform', event.transform)
		);

		if (enablePanZoom) {
			svg.call(panZoom);
		}

		handleZoomIn = () => zoomIn(container, panZoom);
		handleZoomOut = () => zoomOut(container, panZoom);

		if (execZoomIn) {
			handleZoomIn();
		}

		if (zoomOutHandler) {
			setZoomOutHandler(false);
			zoomOut(container, panZoom);
		}

		if (zoomInHandler) {
			setZoomInHandler(false);
			zoomIn(container, panZoom);
		}

		handleMoveUp = () => {
			moveUp(container, navigationController);
		};
		handleMoveDown = () => {
			moveDown(container, navigationController);
		};
		handleMoveLeft = () => {
			moveLeft(container, navigationController);
		};
		handleMoveRight = () => {
			moveRight(container, navigationController);
		};
	
		////////////////////// register events //////////////////////////

		select('#moveLeft').on('click', moveLeft);
		select('#moveRight').on('click', moveRight);
		select('#moveUp').on('click', moveUp);
		select('#moveDown').on('click', moveDown);
		select('.box.left').on('click', handleMoveLeft);
		select('.box.right').on('click', handleMoveRight);
		select('.box.top').on('click', handleMoveUp);
		select('.box.bottom').on('click', handleMoveDown);
		select('.box.hr').on('click', handleZoomOut);
		select('.box.plus').on('click', handleZoomIn);
	}, [
		resetZoom,
		setResetZoom,
		width,
		zoomOutHandler,
		zoomInHandler,
	]);

	const diagramStyle = {
		height: `${imageSettings.height}`,
		width: `${imageSettings.width}`,
	};

	return (
		<div className="diagram-pins-container" style={diagramStyle}>
			<svg
				height={imageSettings.height}
				width={imageSettings.width}
			>
				<g
					id="container"
					transform={
						'translate(' +
						imageState.x +
						', ' +
						imageState.y +
						') scale(' +
						imageState.k +
						')'
					}
				>
					<image
						height={imageSettings.height}
						href={image}
					></image>
				</g>
			</svg>

			{navigationController.enable && (
				<NavigationButtons
					moveDown={handleMoveDown}
					moveLeft={handleMoveLeft}
					moveRight={handleMoveRight}
					moveUp={handleMoveUp}
					position={navigationController.position}
					spritemap={spritemap}
				/>
			)}

			{zoomController.enable && (
				<ZoomController
					position={zoomController.position}
					zoomIn={handleZoomIn}
					zoomOut={handleZoomOut}
				/>
			)}
		</div>
	);
};

export default ImagePins;

ImagePins.default = {
	scale: 1,
};

ImagePins.propTypes = {
	imageSettings: PropTypes.shape({
		height: PropTypes.string,
		lastX: PropTypes.number,
		lastY: PropTypes.number,
		scaleFactor: PropTypes.double,
		width: PropTypes.string,
	}),
	enableResetZoom: PropTypes.bool,
	execResetZoom: PropTypes.bool,
	handleZoomIn: PropTypes.func,
	handleZoomOut: PropTypes.func,
	image: PropTypes.string,
	imageState: PropTypes.shape({
		k: PropTypes.double,
		x: PropTypes.double,
		y: PropTypes.double,
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
	setImageState: PropTypes.func,
	setZoomInHandler: PropTypes.func,
	setZoomOutHandler: PropTypes.func,
	zoomController: PropTypes.shape({
		enable: PropTypes.bool,
		position: PropTypes.shape({
			bottom: PropTypes.string,
			left: PropTypes.string,
			right: PropTypes.string,
			top: PropTypes.string,
		}),
	}),
	zoomIn: PropTypes.func,
	zoomInHandler: PropTypes.bool,
	zoomOut: PropTypes.func,
	zoomOutHandler: PropTypes.bool,
};