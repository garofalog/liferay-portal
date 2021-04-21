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

import {drag, event, mouse, select, zoom} from 'd3';
import PropTypes from 'prop-types';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
	moveRight,
	moveLeft,
	moveUp,
	moveDown,
	zoomIn,
	zoomOut,
} from './NavigationsUtils'
import {
	// addPin,
	// removePin,
	updatePin
} from './PinsUtils'

import AdminTooltip from './AdminTooltip';
import NavigationButtons from './NavigationButtons';
import ZoomController from './ZoomController';

const ImagePins = ({
	addNewPinState,
	addPinHandler,
	cPins,
	completeImageSettings,
	execZoomIn,
	image,
	imageState,
	navigationController,
	removePinHandler,
	resetZoom,
	setAddPinHandler,
	setCpins,
	setImageState,
	setRemovePinHandler,
	setResetZoom,
	setShowTooltip,
	setZoomInHandler,
	setZoomOutHandler,
	showTooltip,
	spritemap,
	zoomController,
	zoomInHandler,
	zoomOutHandler,
}) => {
	const [width, setWidth] = useState(0);
	const containerRef = useRef(null);
	let div,
		svg,
		container,
		position,
		handleAddPin,
		handleMoveUp,
		handleMoveDown,
		handleMoveLeft,
		handleMoveRight,
		handleZoomIn,
		handleZoomOut
	
	useEffect(() => {
		let t;
		// debugger;
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

		const panZoom = zoom().on('zoom', () => container.attr('transform', event.transform));

		if (zoomController.enablePanZoom) {
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

		////////////////////////////////////////////////

		function dragstarted(d) {
			const current = select(this);
			current.raise().classed('active', true);
		}

		function dragged(d) {
			const current = select(this);
			current.attr(
				'transform',
				'translate(' + event.x + ',' + event.y + ')'
			);
		}

		function dragended(d) {
			const current = select(this);
			const newPos = current._groups[0][0].attributes;
			const beSure = [...newPos];

			const arr = [
				'cx',
				'cy',
				'draggable',
				'fill',
				'id',
				'linked_to_sku',
				'quantity',
				'r',
				'sku',
			];
			const newww = {};

			arr.map((el) => {
				beSure.filter((d) => {
					if (d.name === el) {
						if (el === 'cx') {
							newww[`${d.name}`] = parseFloat(event.x);
						}
						else if (el === 'cy') {
							newww[`${d.name}`] = parseFloat(event.y);
						}
						else if (
							el === 'quantity' ||
							el === 'r' ||
							el === 'id'
						) {
							newww[`${d.name}`] = parseInt(d.value, 10);
						}
						else if (el === 'draggable') {
							newww[`${d.name}`] = d.value ? true : false;
						}
						else {
							newww[`${d.name}`] = d.value;
						}
					}
				});
			});

			current.classed('active', false);
			current.attr('stroke', null);
			current.attr('fill', event.fill);

			const newState = cPins.map((element) =>
				element.id === newww.id ? newww : element
			);

			setCpins(newState);
		}

		const dragHandler = drag()
			.on('start', dragstarted)
			.on('drag', dragged)
			.on('end', dragended);

		/////////////////////////////////////////////////////////////////////

		const addPin = () => {
			setCpins(
				cPins.concat({
					cx: 50,
					cy: 50,
					draggable: true,
					fill: '#' + addNewPinState.fill,
					id: cPins.length,
					linked_to_sku: 'sku',
					quantity: 0,
					r: addNewPinState.radius,
					sku: addNewPinState.sku,
				})
			);
		};

		const removePin = (id) => {
			// const poppedState = cPins.filter((el) => el.id !== id);
			console.log('clo');
			setCpins(cPins.filter((el) => el.id !== id));
		};

		if(removePinHandler.handler) {
			setRemovePinHandler({
				handler: false,
				pin: null
			})
			removePin(removePinHandler.pin)
		}

		if (addPinHandler) {
			setAddPinHandler(false);
			addPin();
		}

		////////////////////////////////////////////////

		const cont = container
			.selectAll('g')
			.data(cPins)
			.enter()
			.append('g')
			.attr('transform', (d) => 'translate(' + d.cx + ',' + d.cy + ')')
			.attr('cx', (d) => d.cx)
			.attr('cy', (d) => d.cy)
			.attr('id', (d) => d.id)
			.attr('linked_to_sku', (d) => d.linked_to_sku)
			.attr('quantity', (d) => d.quantity)
			.attr('sku', (d) => d.sku)
			.attr('id', (d) => d.id)
			.attr('class', 'circle_pin')
			.attr('draggable', (d) => (d.draggable ? true : false))
			.call(dragHandler)
			.on('click', (d) => {
				console.log('event pin', event);
				event.path.map((el) => {
					if (el.classList && el.classList[0] === 'circle_pin') {
						const id = parseInt(el.textContent, 10);

						console.log('id', cPins[id].id);
						console.log('cx cy', cPins[id].cx, cPins[id].cy);
						console.log('cPins', cPins);

						setShowTooltip({
							details: {
								cx: cPins[id].cx,
								cy: cPins[id].cy,
								id: cPins[id].id,
								linked_to_sku: cPins[id].linked_to_sku,
								quantity: cPins[id].quantity,
								sku: cPins[id].sku,
							},
							tooltip: true,
						});
					}
				});
			});

		cont.append('circle')
			.attr('r', (d) => d.r)
			.attr('fill', '#ffffff')
			.attr('r', (d) => d.r)
			.attr('stroke', (d) => d.fill)
			.attr('stroke-width', 2);

		cont.append('text')
			.text((d) => d.id)
			.attr('font-size', (d) => d.r)
			.attr('text-anchor', 'middle')
			.attr('fill', '#000000')
			.attr('alignment-baseline', 'central');


		////////////////////// register event //////////////////////////

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
		select('#newPin').on('click', handleAddPin);

	}, [
		addPinHandler,
		removePinHandler,
		// imageState,

		cPins,
		resetZoom,
		setResetZoom,
		setCpins,
		showTooltip,
		width,
		zoomOutHandler,
		zoomInHandler,
	]);

	const diagramStyle = {
		height: `${completeImageSettings.height}`,
		width: `${completeImageSettings.width}`,
	};

	return (
		<div className="diagram-pins-container" style={diagramStyle}>
			<svg
				height={completeImageSettings.height}
				ref={containerRef}
				width={completeImageSettings.width}
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
						height={completeImageSettings.height}
						href={image}
					></image>
				</g>
			</svg>

			{showTooltip.tooltip && (
				<AdminTooltip
					removePinHandler={removePinHandler}
					setRemovePinHandler={setRemovePinHandler}
					setShowTooltip={setShowTooltip}
					showTooltip={showTooltip}
				/>
			)}

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
	addPinHandler: PropTypes.bool,
	removePinHandler: PropTypes.shape({
		handler: PropTypes.bool,
		pin: PropTypes.number,
	}),
	cPins: PropTypes.arrayOf(
		PropTypes.shape({
			cx: PropTypes.double,
			cy: PropTypes.double,
			draggable: PropTypes.bool,
			fill: PropTypes.string,
			id: PropTypes.number,
			linked_to_sku: PropTypes.oneOf(['sku', 'diagram']),
			quantity: PropTypes.number,
			r: PropTypes.number,
			sku: PropTypes.string,
		})
	),
	completeImageSettings: PropTypes.shape({
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
	setAddPinHandler: PropTypes.func,
	setCpins: PropTypes.func,
	setImageState: PropTypes.func,
	setShowTooltip: PropTypes.func,
	setZoomInHandler: PropTypes.func,
	setZoomOutHandler: PropTypes.func,
	showTooltip: PropTypes.shape({
		details: PropTypes.shape({
			cx: PropTypes.double,
			cy: PropTypes.double,
			id: PropTypes.number,
			linked_to_sku: PropTypes.oneOf(['sku', 'diagram']),
			quantity: PropTypes.number,
			sku: PropTypes.string,
		}),
		tooltip: PropTypes.bool,
	}),
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
