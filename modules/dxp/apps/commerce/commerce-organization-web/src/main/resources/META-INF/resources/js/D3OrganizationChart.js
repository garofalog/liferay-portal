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
	appendIcon,
	getLinkDiagonal,
	getLinkId,
	getNodeId,
	insertAddButton,
	insertChildrenIntoNode,
	toggleChildren,
} from './utils';
import {DX, DY, RECT_SIZES, SYMBOLS_MAP} from './utils/constants';
import {highlight, removeHighlight} from './utils/highlight';

const tree = d3.tree().nodeSize([DX, DY]);

const MARGIN_LEFT = 40;

const formatData = (rawData) => {
	const dataWithRoot = {
		children: rawData,
		id: 0,
		name: 'root',
	};

	return dataWithRoot;
};

const formatItemDescription = (d) => {
	switch (d.data.type) {
		case 'organization':
			return '3 Org. | 4 Acc. | 0 Users';
		case 'account':
			return '4 Users';
		case 'user':
			return 'User Role';
		default:
			break;
	}
};

function appendCircle(node, size, className) {
	return node.append('circle').attr('r', size).attr('class', className);
}

function generateAddButtonContent(nodeEnter, spritemap, openModal) {
	const actionsWrapper = nodeEnter
		.append('g')
		.attr('class', 'actions-wrapper');

	const openActionsWrapper = actionsWrapper
		.append('g')
		.attr('class', 'open-actions-wrapper')
		.on('click', (d, node) => {
			if (node.parent.data.type === 'account') {
				openModal(node.parent.data, 'account')
			} else {
				actionsWrapper.node().classList.toggle('menu-open');
			}
		});

	appendCircle(openActionsWrapper, 36, 'action-circle');
	appendIcon(openActionsWrapper, `${spritemap}#plus`, 18, 'action-icon');

	const addOrganizationWrapper = actionsWrapper
		.append('g')
		.attr('class', 'add-action-wrapper organization')
		.on('click', (_event, node) => {
			openModal(node.parent.data, 'organization')
		})

	appendCircle(addOrganizationWrapper, 16, 'action-circle');
	appendIcon(
		addOrganizationWrapper,
		`${spritemap}#organizations`,
		16,
		'action-icon'
	);

	const addAccountWrapper = actionsWrapper
		.append('g')
		.attr('class', 'add-action-wrapper account')
		.on('click', (_event, node) => {
			openModal(node.parent.data, 'account')
		})

	appendCircle(addAccountWrapper, 16, 'action-circle');
	appendIcon(addAccountWrapper, `${spritemap}#users`, 16, 'action-icon');

	const addUserWrapper = actionsWrapper
		.append('g')
		.attr('class', 'add-action-wrapper user')
		.on('click', (_event, node) => {
			openModal(node.parent.data, 'user')
		})

	appendCircle(addUserWrapper, 16, 'action-circle');
	appendIcon(addUserWrapper, `${spritemap}#user`, 16, 'action-icon');
}

function generateNodeContent(nodeEnter, spritemap) {
	nodeEnter
		.append('rect')
		.attr('width', (d) => RECT_SIZES[d.data.type].width)
		.attr('height', (d) => RECT_SIZES[d.data.type].height)
		.attr(
			'transform',
			(d) => `translate(0, ${RECT_SIZES[d.data.type].height * -0.5})`
		)
		.attr('rx', (d) => RECT_SIZES[d.data.type].height / 2)
		.attr('class', 'chart-rect');

	const iconWrappers = nodeEnter.append('g').attr('class', 'icon-wrapper');

	iconWrappers.append('circle').attr('class', 'icon-circle');

	appendIcon(
		iconWrappers,
		(d) => `${spritemap}#${SYMBOLS_MAP[d.data.type]}`,
		16,
		'node-type-icon'
	);

	const infos = nodeEnter.append('g').attr('class', 'chart-item-info');

	infos
		.append('text')
		.attr('class', 'node-title')
		.text((d) => d.data.name);

	infos
		.append('text')
		.attr('class', 'node-description')
		.text(formatItemDescription);
}

class D3OrganizationChart {
	_selectedId = null;

	constructor(rootRef, rawData, getChildren, spritemap, openModal) {
		this.spritemap = spritemap;
		this.rootRef = rootRef;
		this.data = formatData(rawData);
		this.getChildren = getChildren;
		const clientRect = this.rootRef.getBoundingClientRect();
		this.width = clientRect.width;
		this.height = clientRect.height;
		this.handleNodeClick = this.handleNodeClick.bind(this);
		this._openModal = openModal;
		this.createChart();
	}

	handleNodeClick(event, d) {
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

	createChart() {
		this.root = d3.hierarchy(this.data, (d) => d.children);

		this.root.x0 = DY / 2;
		this.root.y0 = 0;

		this.svg = d3
			.select(this.rootRef)
			.attr('viewBox', [0, 0, this.width, DX])
			.call(
				d3.zoom().on('zoom', (event) => {
					this.zoomHandler.attr('transform', event.transform);
				})
			);

		this.zoomHandler = this.svg.append('g');

		this.dataWrapper = this.zoomHandler
			.append('g')
			.attr(
				'transform',
				`translate(${MARGIN_LEFT},${DX - this.root.x0})`
			);

		this.linksGroup = this.dataWrapper.append('g');
		this.nodesGroup = this.dataWrapper.append('g');

		this.update(this.root);
	}

	update(source) {
		const duration = d3.event && d3.event.altKey ? 2500 : 800;

		insertAddButton(this.root, this._selectedNode);

		tree(this.root);

		let left = this.root;
		let right = this.root;
		this.root.eachBefore((node) => {
			if (node.x < left.x) {
				left = node;
			}
			if (node.x > right.x) {
				right = node;
			}
		});

		const height = right.x - left.x;

		this.transition = this.svg
			.transition()
			.duration(duration)
			.attr('viewBox', [0, left.x, this.width, height])
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
			.attr('d', (d) => getLinkDiagonal(d, source, d.target.data.type !== 'add' ? 'exit' : null))
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

		addButton.attr('transform', (d) => `translate(${d.y},${d.x}) scale(0)`)
		children.attr('transform', () => `translate(${source.y0},${source.x0})`)

		generateAddButtonContent(addButton, this.spritemap, this._openModal);
		generateNodeContent(children, this.spritemap);

		children
			.on('mouseenter', (_event, d) => {
				highlight(d, this.nodesGroup, this.linksGroup);
			})
			.on('mouseleave', () => {
				removeHighlight();
			})
			.on('click', this.handleNodeClick);

		bindedNodes
			.merge(this.bindedChartItems)
			.transition(this.transition)
			.attr('opacity', 1)
			.attr('transform', (d) => d.data.type !== 'add' ? `translate(${d.y},${d.x})` : `translate(${d.y},${d.x}) scale(1)`);

		bindedNodes.classed('selected', (d) => d.data.id === this._selectedNode?.data?.id);

		bindedNodes
			.exit()
			.transition(this.transition)
			.remove()
			.attr('opacity', 0)
			.attr('transform', (d) => d.data.type !== 'add' ? `translate(${source.y},${source.x})` : `translate(${d.y},${d.x}) scale(0)`);
	}

	zoom() {
		this.svg.attr(
			'transform',
			`translate('${d3.event.translate}') scale('${d3.event.scale}')`
		);
	}
}

export default D3OrganizationChart;
