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

import {hierarchy, linkHorizontal} from 'd3';

import {RECT_SIZES} from './constants';

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
	if(children.length) {
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
	const dataChildren = node.data.children || node.data._children

	if(!children) {
		return
	}

	if(children[0]?.data?.type === 'add') {
		children.shift();
		dataChildren.shift();
	}

	if(Array.isArray(node.children) && !node.children.length) {
		node.children = null;
		node.data.children = null;
	}
	if(Array.isArray(node._children) && !node._children.length) {
		node._children = null;
		node.data._children = null;
	}
}

function getAllNodes(root) {
	const nodes = [];

	function parseNode(node) {
		const children = node.children || node._children;
		if(children) {
			children.forEach(parseNode);

			nodes.push(...children);
		}
		
	} 

	parseNode(root);

	return nodes;
}

let prevSelectedNode = null

export function insertAddButton(root, selectedNode) {
	if(
		!selectedNode 
		|| (prevSelectedNode?.data?.id === selectedNode.data.id)
	) {
		return;
	}

	getAllNodes(root).forEach(d => {
		if(d.data.id === prevSelectedNode?.data?.id) {
			removeAddButton(d)
		} else if (d.data.id === selectedNode.data.id && d.data.type !== 'user') {
			if(!d.children && d._children) {
				toggleChildren(d)
			}

			if(!d.children) {
				d.children = [];
				d.data.children = [];
			}

			const newNode = hierarchy({
				id: Math.random(),
				type: 'add',
			}, (node) => node.children)

			newNode.parent = d;
			newNode.depth = d.depth + 1;

			d.children.unshift(newNode);
			d.data.children.unshift(newNode);

			return;
		} 
	});

	prevSelectedNode = selectedNode;
}
