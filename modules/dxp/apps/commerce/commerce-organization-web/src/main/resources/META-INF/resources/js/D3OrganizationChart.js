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

import * as d3 from 'd3';

import {
	formatData,
	generateAddButtonContent,
	generateNodeContent,
	getLinkDiagonal,
	getLinkId,
	getMinWidth,
	getNodeId,
	hideChildren,
	insertAddButtons,
	insertChildrenIntoNode,
	showChildren,
	tree,
} from './utils';
import {DY, RECT_SIZES, ZOOM_EXTENT} from './utils/constants';
import {handleDnd} from './utils/dnd';
import {highlight, removeHighlight} from './utils/highlight';

class D3OrganizationChart {
	constructor(rawData, refs, getChildren, spritemap, openModal) {
		this._spritemap = spritemap;
		this._refs = refs;
		this._getChildren = getChildren;
		this._handleZoomIn = this._handleZoomIn.bind(this);
		this._handleZoom = this._handleZoom.bind(this);
		this._handleZoomOut = this._handleZoomOut.bind(this);
		this._handleNodeClick = this._handleNodeClick.bind(this);
		this._handleNodeMouseDown = this._handleNodeMouseDown.bind(this);
		this._currentScale = 1;
		this._openModal = openModal;
		this._selectedNodeIds = new Set();

		this._initialiseZoomListeners(this._refs);
		this._createChart(formatData(rawData));
	}

	_initialiseZoomListeners() {
		this._refs.zoomIn.disabled = true;

		this._refs.zoomIn.addEventListener('click', this._handleZoomIn);
		this._refs.zoomOut.addEventListener('click', this._handleZoomOut);
	}

	_handleZoom(event) {
		this._currentScale = event.transform.k;

		this.zoomHandler.attr('transform', event.transform);
	}

	_handleZoomIn() {
		this._refs.zoomOut.disabled = false;
		this._currentScale = this._currentScale * 2;

		if (this._currentScale >= ZOOM_EXTENT[1]) {
			this._refs.zoomIn.disabled = true;
		}

		this.svg
			.transition()
			.duration(700)
			.call(this._zoom.scaleTo, this._currentScale);
	}

	_handleZoomOut() {
		this._refs.zoomIn.disabled = false;
		this._currentScale = this._currentScale * 0.5;

		if (this._currentScale <= ZOOM_EXTENT[0]) {
			this._refs.zoomOut.disabled = true;
		}

		this.svg
			.transition()
			.duration(700)
			.call(this._zoom.scaleTo, this._currentScale);
	}

	_handleNodeMouseDown(event, d) {
		event.stopPropagation();

		handleDnd(
			event,
			d,
			this._handleNodeClick,
			this._selectedNodeIds,
			this._refs.svg,
			this.nodesGroup,
			this._currentScale
		);
	}

	_handleNodeClick(event, d) {
		event.stopPropagation();

		let expanded = true;

		if (this._selectedNodeIds.has(d.data.id)) {
			expanded = false;
		}

		if (!event.shiftKey) {
			this._selectedNodeIds.clear();
		}

		if (expanded) {
			this._selectedNodeIds.add(d.data.id);
		}
		else {
			this._selectedNodeIds.delete(d.data.id);
		}

		if (!d.data.fetched) {
			return this._getChildren(d.data.id, d.data.type)
				.then((children) => insertChildrenIntoNode(children, d))
				.then(() => {
					d.data.fetched = true;

					this._update(d);
				});
		}

		if (expanded) {
			showChildren(d);
		}
		else {
			hideChildren(d);
		}

		this._update(d);
	}

	_createChart(initialData) {
		this.root = d3.hierarchy(initialData, (d) => d.children);
		this.root.x0 = DY / 2;
		this.root.y0 = 0;

		this._zoom = d3
			.zoom()
			.scaleExtent(ZOOM_EXTENT)
			.on('zoom', this._handleZoom);

		this.svg = d3.select(this._refs.svg).call(this._zoom);
		this.zoomHandler = this.svg.append('g');
		this.dataWrapper = this.zoomHandler.append('g');
		this.linksGroup = this.dataWrapper.append('g');
		this.nodesGroup = this.dataWrapper.append('g');

		this._update(this.root);
	}

	_update(source) {
		insertAddButtons(this.root, this._selectedNodeIds);
		tree(this.root);

		this.root.eachBefore((d) => {
			d.x0 = d.x;
			d.y0 = d.y;
		});

		const duration = d3.event && d3.event.altKey ? 2500 : 800;

		this.transition = this.svg
			.transition()
			.duration(duration)
			.tween(
				'resize',
				window.ResizeObserver
					? null
					: () => () => this.svg.dispatch('toggle')
			);

		this._recenterViewport(source);
		this._updateLinks(source);
		this._updateNodes(source);
	}

	_recenterViewport(source) {
		const {height, width} = this._refs.svg.getBoundingClientRect();
		const k = this._currentScale;

		let y0;

		if (source.depth) {
			y0 = source.y0 + RECT_SIZES[source.data.type].width / 2;
		}
		else {
			y0 = source.children[0].y0 + getMinWidth(source.children) / 2;
		}

		const x = -y0 * k + width / 2;
		const y = -source.x0 * k + height / 2;

		this.svg
			.transition()
			.duration(700)
			.call(
				this._zoom.transform,
				d3.zoomIdentity.translate(x, y).scale(k)
			);
	}

	_updateLinks(source) {
		const links = this.root.links().filter((d) => d.source.depth);
		const bindedLinks = this.linksGroup
			.selectAll('.chart-link')
			.data(links, getLinkId);

		this.bindedChartLink = bindedLinks
			.enter()
			.append('path')
			.attr('class', 'chart-link')
			.attr('d', (d) => getLinkDiagonal(d, source, 'enter'))
			.attr('opacity', 0);

		bindedLinks
			.merge(this.bindedChartLink)
			.transition(this.transition)
			.attr('d', (d) => getLinkDiagonal(d, source))
			.attr('opacity', 1);

		bindedLinks
			.exit()
			.transition(this.transition)
			.remove()
			.attr('d', (d) =>
				getLinkDiagonal(
					d,
					source,
					d.target.data.type !== 'add' ? 'exit' : null
				)
			)
			.attr('opacity', 0);
	}

	_updateNodes(source) {
		const dataNodes = this.root
			.descendants()
			.filter((d) => d.depth !== 0)
			.reverse();

		const bindedNodes = this.nodesGroup
			.selectAll('.chart-item')
			.data(dataNodes, getNodeId);

		this.bindedChartItems = bindedNodes
			.enter()
			.append('g')
			.attr('opacity', 0)
			.attr('class', (d) => `chart-item chart-item-${d.data.type}`);

		const addButton = this.bindedChartItems.filter(
			(d) => d.data.type === 'add'
		);

		const children = this.bindedChartItems.filter(
			(d) => d.data.type !== 'add'
		);

		addButton.attr('transform', (d) => `translate(${d.y},${d.x}) scale(0)`);
		children.attr('transform', `translate(${source.y0},${source.x0})`);

		generateAddButtonContent(addButton, this._spritemap, this._openModal);
		generateNodeContent(children, this._spritemap);

		children
			.on('mouseenter', (_event, d) => {
				highlight(d, this.nodesGroup, this.linksGroup);
			})
			.on('mouseleave', removeHighlight)
			.on('mousedown', (event, d) => {
				event.stopPropagation();

				if(d.data.type === 'user') {
					this._recenterViewport(d);
				} else {
					this._handleNodeMouseDown(event, d);
					// this._handleNodeClick(event, d);
				}
			}
			);

		bindedNodes
			.merge(this.bindedChartItems)
			.transition(this.transition)
			.attr('opacity', 1)
			.attr('transform', (d) =>
				d.data.type !== 'add'
					? `translate(${d.y},${d.x})`
					: `translate(${d.y},${d.x}) scale(1)`
			);

		bindedNodes.classed('selected', (d) =>
			this._selectedNodeIds.has(d.data.id)
		);

		bindedNodes
			.exit()
			.transition(this.transition)
			.remove()
			.attr('opacity', 0)
			.attr('transform', (d) =>
				d.data.type !== 'add'
					? `translate(${source.y},${source.x})`
					: `translate(${d.y},${d.x}) scale(0)`
			);
	}
}

export default D3OrganizationChart;
