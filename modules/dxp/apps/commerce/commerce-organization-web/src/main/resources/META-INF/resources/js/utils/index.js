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

import {hierarchy, linkHorizontal, tree as d3Tree} from 'd3';
import {node} from 'prop-types';

import {DX, DY, RECT_SIZES, SYMBOLS_MAP} from './constants';

export function appendIcon(node, symbol, size, className) {
	return node
		.append('use')
		.attr('class', className)
		.attr('width', size)
		.attr('height', size)
		.attr('href', symbol);
}

export const getLinkDiagonal = linkHorizontal()
	.source(({source}, origin, state) => {
		let sourceRectWidth = origin.data.type
			? RECT_SIZES[origin.data.type].width
			: 0;

		switch (state) {
			case 'enter':
				return [sourceRectWidth + origin.y0, origin.x0];
			case 'exit':
				return [sourceRectWidth + origin.y, origin.x];
			default:
				sourceRectWidth = source.data.type
					? RECT_SIZES[source.data.type].width
					: 0;

				return [sourceRectWidth + source.y, source.x];
		}
	})
	.target(({target}, origin, state) => {
		const sourceRectWidth = origin.data.type
			? RECT_SIZES[origin.data.type].width
			: 0;

		switch (state) {
			case 'enter':
				return [sourceRectWidth + origin.y0, origin.x0];
			case 'exit':
				return [sourceRectWidth + origin.y, origin.x];
			default:
				return [target.y, target.x];
		}
	});

export function getNodeId(node) {
	const nodePathIds = [];

	function parseNode(node) {
		if (node.parent) {
			parseNode(node.parent);
		}

		nodePathIds.push(node.data.id);
	}

	parseNode(node);

	return nodePathIds.join('_');
}

export function getLinkId(link) {
	return getNodeId(link.target);
}

export function toggleChildren(d) {
	if (d.children) {
		d._children = d.children;
		d.data._children = d.data.children;
		d.children = null;
		d.data.children = null;
	}
	else {
		d.children = d._children;
		d.data.children = d.data._children;
		d._children = null;
		d.data._children = null;
	}
}

export function insertChildrenIntoNode(children, node) {
	if (children.length) {
		node.children = [];
		node.data.children = [];

		children.forEach((child) => {
			const newNode = hierarchy(child, (node) => node.children);

			newNode.parent = node;
			newNode.depth = node.depth + 1;

			node.children.push(newNode);
			node.data.children.push(newNode);
		});
	}

	return node.children;
}

function removeAddButton(node) {
	const children = node.children || node._children;
	const dataChildren = node.data.children || node.data._children;

	if (!children) {
		return;
	}

	if (children[0]?.data?.type === 'add') {
		children.shift();
		dataChildren.shift();
	}

	if (Array.isArray(node.children) && !node.children.length) {
		node.children = null;
		node.data.children = null;
	}
	if (Array.isArray(node._children) && !node._children.length) {
		node._children = null;
		node.data._children = null;
	}
}

function getAllNodes(root) {
	const nodes = [];

	function parseNode(node) {
		const children = node.children || node._children;
		if (children) {
			children.forEach(parseNode);

			nodes.push(...children);
		}
	}

	parseNode(root);

	return nodes;
}

let prevSelectedNode = null;

export function insertAddButton(root, selectedNode) {
	if (!selectedNode || prevSelectedNode?.data?.id === selectedNode.data.id) {
		return;
	}

	getAllNodes(root).forEach((d) => {
		if (d.data.id === prevSelectedNode?.data?.id) {
			removeAddButton(d);
		}
		else if (
			d.data.id === selectedNode.data.id &&
			d.data.type !== 'user'
		) {
			if (!d.children && d._children) {
				toggleChildren(d);
			}

			if (!d.children) {
				d.children = [];
				d.data.children = [];
			}

			const newNode = hierarchy(
				{
					id: Math.random(),
					type: 'add',
				},
				(node) => node.children
			);

			newNode.parent = d;
			newNode.depth = d.depth + 1;

			d.children.unshift(newNode);
			d.data.children.unshift(newNode);

			return;
		}
	});

	prevSelectedNode = selectedNode;
}

export const tree = d3Tree().nodeSize([DX, DY]);

export const formatData = (rawData) => {
	const dataWithRoot = {
		children: rawData,
		id: 0,
		name: 'root',
		type: 'root',
	};

	return dataWithRoot;
};

export const formatItemDescription = (d) => {
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

export function appendCircle(node, size, className) {
	return node.append('circle').attr('r', size).attr('class', className);
}

export function generateAddButtonContent(nodeEnter, spritemap, openModal) {
	const actionsWrapper = nodeEnter
		.append('g')
		.attr('class', 'actions-wrapper');

	const openActionsWrapper = actionsWrapper
		.append('g')
		.attr('class', 'open-actions-wrapper')
		.on('mousedown', (_event, node) => {
			if (node.parent.data.type === 'account') {
				openModal(node.parent.data, 'account');
			}
			else {
				actionsWrapper.node().classList.toggle('menu-open');
			}
		});

	appendCircle(openActionsWrapper, 36, 'action-circle');
	appendIcon(openActionsWrapper, `${spritemap}#plus`, 18, 'action-icon');

	const addOrganizationWrapper = actionsWrapper
		.append('g')
		.attr('class', 'add-action-wrapper organization')
		.on('mousedown', (_event, node) => {
			openModal(node.parent.data, 'organization');
		});

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
		.on('mousedown', (_event, node) => {
			openModal(node.parent.data, 'account');
		});

	appendCircle(addAccountWrapper, 16, 'action-circle');
	appendIcon(addAccountWrapper, `${spritemap}#users`, 16, 'action-icon');

	const addUserWrapper = actionsWrapper
		.append('g')
		.attr('class', 'add-action-wrapper user')
		.on('mousedown', (_event, node) => {
			openModal(node.parent.data, 'user');
		});

	appendCircle(addUserWrapper, 16, 'action-circle');
	appendIcon(addUserWrapper, `${spritemap}#user`, 16, 'action-icon');
}

export function generateNodeContent(nodeEnter, spritemap) {
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

export function getMinWidth(nodes) {
	return nodes.reduce((maxWidth, node) => {
		const width = RECT_SIZES[node.data.type].width;

		return maxWidth > width ? maxWidth : width;
	}, 0);
}
