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

import {ZOOM_VALUES} from './utilities/constants';

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

		this._printImage();
		this._addZoom();
		this._addListeners();
	}

	_addListeners() {
		this._d3diagramWrapper.on('click', () => {
			const {offsetX: clickX, offsetY: clickY} = d3event;
			const {height: SVGHeight, width: SVGWidth} = this._diagramWrapper.getBoundingClientRect();

			const pinX = clickX * 100 / SVGWidth;
			const pinY = clickY * 100 / SVGHeight;

			this._openTooltip(pinX, pinY)
		})
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
		this._d3zoomWrapper
			.append('image')
			.attr('href', this._imageURL)
			.attr('width', '100%')
			.attr('x', 0)
			.attr('y', 0)

	}

	updatePins(pins) {
		this._pins = pins;

		this._printPins();
	}

	_printPins() {
		const pinsGroups = this._d3diagramWrapper
			.selectAll('g')
			.data(this._pins)
			.enter()
			.append('g')
			.attr('class', 'pin-node')
			.attr('transform', (attr) => {

				return `translate(${attr.cx},${attr.cy})`
			});

		pinsGroups
			.append('circle')
			.attr('class', 'pin-node-background')
			.attr('r', 15);

		pinsGroups
			.append('text')
			.attr('class', 'pin-node-text')
			.text((d) => d.sequence);
	}
}

export default DiagramHandler;
