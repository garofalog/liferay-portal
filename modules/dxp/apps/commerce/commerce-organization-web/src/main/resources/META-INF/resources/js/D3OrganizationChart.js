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

import classNames from 'classnames';
import * as d3 from 'd3';

import {
	formatData,
	generateAddButtonContent,
	generateNodeContent,
	getLinkDiagonal,
	getLinkId,
	getMinWidth,
	getNodeId,
	insertAddButton,
	insertChildrenIntoNode,
	toggleChildren,
	tree,
} from './utils';
import {DY, RECT_SIZES, ZOOM_EXTENT} from './utils/constants';
import {highlight, removeHighlight} from './utils/highlight';

class D3OrganizationChart {
	_selectedId = null;

	constructor(rawData, refs, getChildren, spritemap, openModal) {
		this.spritemap = spritemap;
		this.refs = refs;
		this.data = formatData(rawData);
		this.getChildren = getChildren;
		const clientRect = this.refs.svg.getBoundingClientRect();
		this.width = clientRect.width;
		this.height = clientRect.height;
		this._handleNodeClick = this._handleNodeClick.bind(this);
		this._handleZoomIn = this._handleZoomIn.bind(this);
		this._handleZoomOut = this._handleZoomOut.bind(this);
		this._handleNodeClick = this._handleNodeClick.bind(this);
		this._currentScale = 1;
		this._openModal = openModal;

		this._initialiseZoomListeners(this.refs);

		this._createChart();
	}

	_initialiseZoomListeners() {
		this.refs.zoomIn.disabled = true;

		this.refs.zoomIn.addEventListener('click', this._handleZoomIn);
		this.refs.zoomOut.addEventListener('click', this._handleZoomOut);
	}

	_handleZoom(event) {
		this._currentScale = event.transform.k;
		this.zoomHandler.attr('transform', event.transform);
	}

	_handleZoomIn() {
		this._currentScale = this._currentScale * 2;

		if (this._currentScale >= ZOOM_EXTENT[1]) {
			this.refs.zoomOut.disabled = true;
		}

		this.refs.zoomOut.disabled = false;
		this.svg
			.transition()
			.duration(700)
			.call(this._zoom.scaleTo, this._currentScale);
	}

	_handleZoomOut() {
		this._currentScale = this._currentScale * 0.5;

		if (this._currentScale <= ZOOM_EXTENT[0]) {
			this.refs.zoomOut.disabled = true;
		}

		this.refs.zoomIn.disabled = false;
		this.svg
			.transition()
			.duration(700)
			.call(this._zoom.scaleTo, this._currentScale);
	}

	_handleNodeClick(event, d) {
		event.stopPropagation();

		this._selectedNode = d;

		if (d.data.type !== 'user') {
			if (!d.data.fetched) {
				return this.getChildren(d.data.id, d.data.type)
					.then((children) => insertChildrenIntoNode(children, d))
					.then(() => {
						d.data.fetched = true;

						this.update(d);
					});
			}
			else {
				toggleChildren(d);
			}
		}

		this.update(d);
	}

	_createChart() {
		this.root = d3.hierarchy(this.data, (d) => d.children);

		this.root.x0 = DY / 2;
		this.root.y0 = 0;

		this._zoom = d3
			.zoom()
			.scaleExtent(ZOOM_EXTENT)
			.on('zoom', this._handleZoom.bind(this));

		this.svg = d3.select(this.refs.svg).call(this._zoom);

		this.zoomHandler = this.svg.append('g');

		this.dataWrapper = this.zoomHandler.append('g');

		this.linksGroup = this.dataWrapper.append('g');
		this.nodesGroup = this.dataWrapper.append('g');

		this.update(this.root);
	}

	update(source) {
		const duration = d3.event && d3.event.altKey ? 2500 : 800;

		insertAddButton(this.root, this._selectedNode);

		tree(this.root);

		this.transition = this.svg
			.transition()
			.duration(duration)
			.tween(
				'resize',
				window.ResizeObserver
					? null
					: () => () => this.svg.dispatch('toggle')
			);

		this.updateLinks(source);
		this.updateNodes(source);

		this.root.eachBefore((d) => {
			d.x0 = d.x;
			d.y0 = d.y;
		});

		this.updateTransform(source);
	}

	updateTransform(source) {
		const {height, width} = this.refs.svg.getBoundingClientRect();

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

	updateLinks(source) {
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

	updateNodes(source) {
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
			.attr('class', (d) =>
				classNames('chart-item', `chart-item-${d.data.type}`)
			);

		const addButton = this.bindedChartItems.filter(
			(d) => d.data.type === 'add'
		);
		const children = this.bindedChartItems.filter(
			(d) => d.data.type !== 'add'
		);

		addButton.attr('transform', (d) => `translate(${d.y},${d.x}) scale(0)`);
		children.attr(
			'transform',
			() => `translate(${source.y0},${source.x0})`
		);

		generateAddButtonContent(addButton, this.spritemap, this._openModal);
		generateNodeContent(children, this.spritemap);

		children
			.on('mouseenter', (_event, d) => {
				highlight(d, this.nodesGroup, this.linksGroup);
			})
			.on('mouseleave', () => {
				removeHighlight();
			})
			.on('mousedown', this._handleNodeClick);

		bindedNodes
			.merge(this.bindedChartItems)
			.transition(this.transition)
			.attr('opacity', 1)
			.attr('transform', (d) =>
				d.data.type !== 'add'
					? `translate(${d.y},${d.x})`
					: `translate(${d.y},${d.x}) scale(1)`
			);

		bindedNodes.classed(
			'selected',
			(d) => d.data.id === this._selectedNode?.data?.id
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
