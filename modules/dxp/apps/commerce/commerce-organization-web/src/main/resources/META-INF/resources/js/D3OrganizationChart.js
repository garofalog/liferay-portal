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

import {getAccount} from './data/accounts';
import {getOrganization } from './data/organizations';
import {
	formatRootData,
	formatItemChildren,
	generateAddButtonContent,
	generateNodeContent,
	getLinkDiagonal,
	getMinWidth,
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
	constructor(
		rawData,
		refs,
		spritemap,
		modalActions,
		nodeMenuActions
	) {
		this._spritemap = spritemap;
		this._refs = refs;
		this._handleZoomIn = this._handleZoomIn.bind(this);
		this._handleZoom = this._handleZoom.bind(this);
		this._handleZoomOut = this._handleZoomOut.bind(this);
		this._handleNodeClick = this._handleNodeClick.bind(this);
		this._handleNodeMouseDown = this._handleNodeMouseDown.bind(this);
		this._currentScale = 1;
		this._nodeMenuActions = nodeMenuActions;
		this._modalActions = modalActions;
		this._selectedNodeIds = new Set();

		this._initialiseZoomListeners(this._refs);
		this._createChart();
		this._initializeData(formatRootData(rawData));
		this._update(this._root);
	}

	updateRoot(root) {
		this._initializeData(formatRootData(root))
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

	_handleNodeClick(event, d) {
		event.stopPropagation();

		if (d.data.type === 'user') {
			return this._recenterViewport(d);
		}

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
			const getData = d.data.type === 'organization' ? getOrganization : getAccount;

			return getData(d.data.id, d.data.type)
				.then((rawData) => formatItemChildren(rawData, d.data.type))
				.then((data) => insertChildrenIntoNode(data, d))
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

	_createChart() {
		this._zoom = d3
			.zoom()
			.scaleExtent(ZOOM_EXTENT)
			.on('zoom', this._handleZoom);

		this.svg = d3
			.select(this._refs.svg)
			.on('mousedown', this._nodeMenuActions.close)
			.call(this._zoom);

		this.zoomHandler = this.svg.append('g');
		this.dataWrapper = this.zoomHandler
			.append('g')
			.attr('class', 'chart-data-wrapper');
		this.linksGroup = this.dataWrapper.append('g');
		this.nodesGroup = this.dataWrapper.append('g');
	}

	_initializeData(initialData) {
		this._root = d3.hierarchy(initialData, (d) => d.children);
		this._root.x0 = DY / 2;
		this._root.y0 = 0;
	}

	_handleNodeMouseDown(event, d) {
		event.stopPropagation();
		this._nodeMenuActions.close();

		if (d.data.type === 'user') {
			this._recenterViewport(d);
		}
		else {
			handleDnd(
				event,
				d,
				this._handleNodeClick,
				this._selectedNodeIds,
				this._refs.svg,
				this.nodesGroup,
				this._currentScale,
				this._root
			);
		}
	}

	_update(source) {
		insertAddButtons(this._root, this._selectedNodeIds);
		tree(this._root);

		this._root.eachBefore((d) => {
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
		const links = this._root.links().filter((d) => d.source.depth);
		const bindedLinks = this.linksGroup
			.selectAll('.chart-link')
			.data(links, (d) => d.target.data.chartNodeId);

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
		const dataNodes = this._root
			.descendants()
			.filter((d) => d.depth !== 0)
			.reverse();

		const bindedNodes = this.nodesGroup
			.selectAll('.chart-item')
			.data(dataNodes, (d) => d.data.chartNodeId);

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

		generateAddButtonContent(
			addButton,
			this._spritemap,
			this._modalActions.open
		);
		generateNodeContent(
			children,
			this._spritemap,
			this._nodeMenuActions.open
		);

		children
			.on('mouseenter', (_event, d) => {
				highlight(d, this.nodesGroup, this.linksGroup);
			})
			.on('mouseleave', removeHighlight)
			.on('mousedown', this._handleNodeMouseDown);

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
