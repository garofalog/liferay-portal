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

import {
	ACCOUNTS_PROPERTY_NAME,
	DRAGGING_THRESHOLD,
	DX,
	DY,
	NODE_BUTTON_WIDTH,
	NODE_PADDING,
	ORGANIZATIONS_PROPERTY_NAME,
	RECT_SIZES,
	SYMBOLS_MAP,
	USERS_PROPERTY_NAME,
} from './constants';

let chartNodesCounter = 0;

export function hasPositionChanged(start, end) {
	if (!end) {
		return false;
	}

	const diff = Math.max(Math.abs(start.x - end.x), Math.abs(start.y - end.y));

	return diff > DRAGGING_THRESHOLD;
}

export function formatItemChildren(item, type) {
	item.type = type;
	item.children = [...item[USERS_PROPERTY_NAME].map((user) => ({...user, type: 'user'}))];

	if (type === 'organization') {
		item.children.unshift(
			...item[ORGANIZATIONS_PROPERTY_NAME].map((organization) => ({
				...organization,
				type: 'organization',
			})),
			...item[ACCOUNTS_PROPERTY_NAME].map((account) => ({...account, type: 'account'})),
		);
	}

	return item;
}

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

export function showChildren(d) {
	if (d.children && !d._children) {
		return;
	}
	d.children = d._children;
	d.data.children = d.data._children;
	d._children = null;
	d.data._children = null;
}

export function hideChildren(d) {
	if (d._children && !d.children) {
		return;
	}
	d._children = d.children;
	d.data._children = d.data.children;
	d.children = null;
	d.data.children = null;
}

export function insertChildrenIntoNode(data, node) {
	if (data.children.length) {
		node.children = [];
		node.data.children = [];

		data.children.forEach((child) => {
			child.chartNodeId = ++chartNodesCounter;
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

export function insertAddButtons(root, selectedNodesIds) {
	if (!selectedNodesIds.size) {
		return;
	}

	root.each((d) => {
		if (selectedNodesIds.has(d.data.id) && d.data.type !== 'user') {
			showChildren(d);

			if (!d.children) {
				d.children = [];
				d.data.children = [];
			}

			if (d.children.length && d.children[0].data.type === 'add') {
				return;
			}

			const newNode = hierarchy(
				{
					chartNodeId: ++chartNodesCounter,
					id: Math.random(),
					type: 'add',
				},
				(node) => node.children
			);

			newNode.parent = d;
			newNode.depth = d.depth + 1;

			d.children.unshift(newNode);
			d.data.children.unshift(newNode);
		}
		else {
			removeAddButton(d);
		}
	});
}

export const tree = d3Tree().nodeSize([DX, DY]);

export const formatRootData = (rootData, visible = true) => {
	const dataWithRoot = {
		chartNodeId: ++chartNodesCounter,
		id: 'root',
		name: 'root',
		type: 'root',
	};

	rootData.children.forEach((child) => {
		child.chartNodeId = ++chartNodesCounter;
	});

	if(visible) {
		rootData.chartNodeId = ++chartNodesCounter;
		rootData.fetched = true;
		dataWithRoot.children = [rootData]
	} else {
		dataWithRoot.children = rootData.children
	}
	
	return dataWithRoot;
};

export const formatOrganizationDescription = (d) => {
	return `${d.data.numberOfOrganizations} ${Liferay.Language.get('org')} | ${d.data.numberOfAccounts} ${Liferay.Language.get('acc')} | ${d.data.numberOfUsers} ${Liferay.Language.get('users')}`
}

export const formatAccountDescription = (d) => {
	return `${d.data.numberOfUsers} ${Liferay.Language.get('users')}`
}

export const formatUserDescription = (d) => {
	return d.data.jobTitle || Liferay.Language.get('user')
}

const formatDescriptionMap = {
	account: formatAccountDescription,
	organization: formatOrganizationDescription,
	user: formatUserDescription,
}

export const formatItemName = (d) => {
	const name = d.data.name || `${d.data.firstName} ${d.data.lastName}`;

	return name
}

export const formatItemDescription = (d) => {
	return formatDescriptionMap[d.data.type](d);
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

export function generateNodeContent(nodeEnter, spritemap, openMenu) {
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

	const iconWrapper = nodeEnter.append('g').attr('class', 'icon-wrapper');

	iconWrapper.append('circle').attr('class', 'icon-circle');

	appendIcon(
		iconWrapper,
		(d) => `${spritemap}#${SYMBOLS_MAP[d.data.type]}`,
		16,
		'node-type-icon'
	);

	const infos = nodeEnter.append('g').attr('class', 'chart-item-info');

	infos
		.append('text')
		.attr('class', 'node-title')
		.text(formatItemName);

	infos
		.append('text')
		.attr('class', 'node-description')
		.text(formatItemDescription);

	const menuWrapper = nodeEnter
		.append('g')
		.attr('class', 'node-menu-wrapper')
		.attr('transform', (d) => {
			const x =
				RECT_SIZES[d.data.type].width -
				NODE_BUTTON_WIDTH -
				NODE_PADDING;

			return `translate(${x}, -14)`;
		})
		.on('mousedown', (event, d) => {
			event.stopPropagation();

			openMenu(event.currentTarget, d);
		});

	menuWrapper.append('rect').attr('class', 'node-menu-btn');

	appendIcon(menuWrapper, `${spritemap}#ellipsis-v`, 16, 'node-menu-icon');
}

export function getMinWidth(nodes) {
	return nodes.reduce((maxWidth, node) => {
		const width = RECT_SIZES[node.data.type].width;

		return maxWidth > width ? maxWidth : width;
	}, 0);
}
