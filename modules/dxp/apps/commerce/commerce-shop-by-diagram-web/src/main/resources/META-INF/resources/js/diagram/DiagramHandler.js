/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import {event as d3event, select as d3select, zoom as d3zoom} from 'd3';
import { getAbsolutePositions, getPercentagePositions } from './utilities';

import {DEFAULT_PINS_RADIUS, PINS_CIRCLE_RADIUS, ZOOM_VALUES} from './utilities/constants';

class DiagramHandler {
	constructor(
		diagramWrapper,
		zoomWrapper,
		imageURL,
		updateHtmlPins,
		updateZoomState,
		openTooltip,
	) {
		this._currentScale = 1;
		this._diagramWrapper = diagramWrapper;
		this._d3diagramWrapper = d3select(diagramWrapper);
		this._d3zoomWrapper = d3select(zoomWrapper);
		this._imageURL = imageURL;
		this._updateHtmlPins = updateHtmlPins;
		this._pinBackground = null;
		this._openTooltip = openTooltip;
		this._updateZoomState = updateZoomState;
		this._zoomWrapper = zoomWrapper;
		this._handleZoom = this._handleZoom.bind(this);
		this._handleWindowResize = this._handleWindowResize.bind(this);
		this._pinsRadius = DEFAULT_PINS_RADIUS;

		this._printImage();
		this._addZoom();
		this._addListeners();
	}

	_handleWindowResize() {
		if(this._imageHeightRatio) {
			const {width} = this._diagramWrapper.getBoundingClientRect();

			this._diagramWrapper.style.height = `${width * this._imageHeightRatio}px`;
		}
	}

	_addListeners() {
		window.addEventListener('resize', this._handleWindowResize)
	}

	_addZoom() {
		this._zoom = d3zoom()
			.scaleExtent([ZOOM_VALUES[0], ZOOM_VALUES[ZOOM_VALUES.length - 1]])
			.on('zoom', this._handleZoom);

		this._svg = this._d3diagramWrapper.call(this._zoom);
	}

	_handleZoom() {
		this._currentScale = d3event.transform.k;

		if (d3event.sourceEvent) {
			this._updateZoomState(
				this._currentScale,
				d3event.transform,
				d3event
			);
		}

		this._d3zoomWrapper.attr('transform', d3event.transform);
	}

	cleanUp() {
		window.removeEventListener('resize', this._handleWindowResize);
	}

	updateZoom(scale) {
		this._currentScale = scale;

		this._animateZoom();
	}

	_animateZoom() {
		const transition = this._d3diagramWrapper
			.transition()
			.duration(800)
			.tween(
				'resize',
				window.ResizeObserver
					? null
					: () => this._d3diagramWrapper.dispatch('toggle')
			);

		this._d3diagramWrapper
			.transition(transition)
			.call(this._zoom.scaleTo, this._currentScale);
	}

	_printImage() {
		this._image = this._d3zoomWrapper
			.append('image')
			.attr('href', this._imageURL)
			.attr('width', '100%')
			.attr('x', 0)
			.attr('y', 0)
			.on('load', (_d, index, nodes) => {
				const {height, width} = nodes[index].getBoundingClientRect();
				
				this._imageHeightRatio = height / width;

				this._diagramWrapper.style.height = `${height}px`;
			})
			.on('click', () => {
				const [x, y] = getAbsolutePositions(
					d3event.offsetX,
					d3event.offsetY,
					d3event.target,
					this._diagramWrapper
				);

				console.log('x ,y', x, y)
				
				this._openTooltip(x, y, d3event);
			})
			
	}

	updatePins(pins) {
		this._pins = pins;

		this._updatePrintedPins();
	}

	updatePinsRadius(pinsRadius) {
		this._pinsRadius = pinsRadius;

		if(this._radiusHandlers) {
			this._radiusHandlers
				.attr('transform', `translate(${PINS_CIRCLE_RADIUS / 2}) scale(${this._pinsRadius})`);
		}
	}

	_updatePrintedPins() {
		this._pinsGroups = this._d3zoomWrapper
			.selectAll('g')
			.data(this._pins, (d) => d.id)
			.enter()
			.append('g')
			.attr('class', 'pin-node')
			.attr('transform', (d) => 
				`translate(${getAbsolutePositions(d.positionX, d.positionY, this._diagramWrapper)})`
			);

		this._radiusHandlers = this._pinsGroups
			.append('g')
			.attr('class', 'pin-radius-handler')
			.attr('transform', `translate(${PINS_CIRCLE_RADIUS / 2}) scale(${this._pinsRadius})`);

		this._radiusHandlers
			.append('circle')
			.attr('class', 'pin-node-background')
			.attr('r', PINS_CIRCLE_RADIUS);

		this._radiusHandlers
			.append('text')
			.attr('y', 5)
			.attr('text-anchor', 'middle')
			.attr('class', 'pin-node-text')
			.text((d) => d.sequence);
	}
}

export default DiagramHandler;
