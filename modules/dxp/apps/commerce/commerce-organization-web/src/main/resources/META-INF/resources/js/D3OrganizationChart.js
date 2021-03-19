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
import classNames from 'classnames';
import {ICON_RADIUS, RECT_PADDING, RECT_SIZES} from './utils/constants';
import { appendIcon } from './utils';

const symbolMap = {
	account: 'users',
	organization: 'organizations',
	user: 'user',
};

const dx = 90;
const dy = 400;

const diagonal = d3
	.linkHorizontal()
    .source(({source, target}, initialPosition) => {
        const sourceRectWidth = RECT_SIZES[source.data.type]?.width || 0;
		
        return [sourceRectWidth + source.y, source.x];
    })
    .target(({source, target}, initialPosition) => {

		return initialPosition ? [source.y, source.x] : [target.y, target.x]
    })

const tree = d3.tree().nodeSize([dx, dy]);

const marginLeft = 40;

const formatData = (rawData) => {
	const dataWithRoot = {
		children: rawData,
		id: 0,
		name: 'root',
	};

	return dataWithRoot;
};

function getNodeId(node) {
    const nodePathIds = []

    function parseNode(node) {
        if(node.parent) {
            parseNode(node.parent)
        }

        nodePathIds.push(node.data.id);        
    }

    parseNode(node)

    return nodePathIds.join('_')
}

function getLinkId(link) {
    return getNodeId(link.target)
}


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

function generateAddButtonContent(nodeEnter, spritemap) {
	const mainButtonWrapper = nodeEnter.append('g')
		.attr('class', 'main-action-wrapper')

	mainButtonWrapper
		.append('circle')
		.attr('r', 36)
		.attr('class', 'action-circle')

	appendIcon(mainButtonWrapper, `${spritemap}#times`, 18)

	const addOrganizationWrapper = nodeEnter.append('g')
		.attr('class', 'add-organization-wrapper')
		
	addOrganizationWrapper
		.append('circle')
		.attr('r', 16)
		.attr('class', 'action-circle')

	appendIcon(addOrganizationWrapper, `${spritemap}#organizations`, 18)

	const addAccountWrapper = nodeEnter.append('g')
		.attr('class', 'add-account-wrapper')
		
	addAccountWrapper
		.append('circle')
		.attr('r', 16)
		.attr('class', 'action-circle')

	appendIcon(addAccountWrapper, `${spritemap}#users`, 18)
	
	const addUserWrapper = nodeEnter.append('g')
		.attr('class', 'add-user-wrapper')

	addUserWrapper
		.append('circle')
		.attr('r', 16)
		.attr('class', 'action-circle')

	appendIcon(addUserWrapper, `${spritemap}#user`, 18)

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

	const iconWrappers = nodeEnter
		.append('g')
		.attr('class', 'icon-wrapper')
	
	iconWrappers.append('circle')
		.attr('class', 'icon-circle');

	appendIcon(iconWrappers, d => `${spritemap}#${symbolMap[d.data.type]}`, 16)

	const infos = nodeEnter.append('g')
		.attr('class', 'chart-item-info');

	infos.append('text')
		.attr('class', 'node-title')
		.text(d => d.data.name);

	infos.append('text')
		.attr('class', 'node-description')
		.text(formatItemDescription);
}

class D3OrganizationChart {
	constructor(rootRef, rawData, getChildren, spritemap) {
		this.spritemap = spritemap;
		this.rootRef = rootRef;
		this.data = formatData(rawData);
		this.getChildren = getChildren;
		const clientRect = this.rootRef.getBoundingClientRect();
		this.width = clientRect.width;
		this.height = clientRect.height;
		this.handleNodeClick = this.handleNodeClick.bind(this);

		this.createChart();
	}

	zoom() {
		this.svg.attr(
			'transform',
			`translate('${d3.event.translate}') scale('${d3.event.scale}')`
		);
	}

	updateLinks(source) {
        const links = this.root.links().filter((d) => d.source.depth);

		const link = this.links
			.selectAll('.chart-link')
			.data(links, getLinkId);

		const linkEnter = link
			.enter()
			.append('path')
			.attr('class', 'chart-link')
			.attr('d', d => {
				const o = {x: source.x0, y: source.y0, data: {type: source.data.type}};
				return diagonal({source: o, target: o});
			  });

		link.merge(linkEnter).transition(this.transition).attr('d', (d) => diagonal(d));

		link.exit()
			.transition(this.transition)
			.remove()
			.attr('d', d => {
				const o = {x: source.x, y: source.y, data: {type: source.data.type}};
				return diagonal({source: o, target: o});
			  });
	}

	addPlusButton(d) {}

	handleNodeClick(d) {
		if (d.data.type !== 'user' && d.children) {
			d._children = d.children;
            d.data._children = d.data.children; 
			d.children = null;
            d.data.children = null; 
			
			this.update(d);
		} else if (d.data.type !== 'user' && d._children) {
			d.children = d._children;
			d.data.children = d.data._children; 
			d._children = null;
			d.data._children = null; 
			
			this.update(d);
		} else if (d.data.type !== 'user' && !d.children) {
			this.getChildren(d.data.id, d.data.type).then((children) => {
				if(!children.length){
                    return;
                }

                d.children = [];
                d.data.children = [];
				
				children.unshift({
					type: 'add'
				})

                children.forEach(child => {
                    const newNode = d3.hierarchy(child, d => d.children);
    
                    newNode.parent = d;
                    newNode.depth = d.depth + 1;

                    d.children.push(newNode)
                    d.data.children.push(newNode)
                })

				this.update(d);
			});
		}
		else if (d.data.type === 'organization') {
			this.addPlusButton(d);
		}
	}

	updateNodes(source) {
        const nodes = this.root.descendants().filter((d) => d.depth !== 0).reverse();

		const node = this.nodes.selectAll('.chart-item').data(nodes, getNodeId);

        this.nodeEnter = node
			.enter()
			.append('g')
			.attr('transform', (_) => `translate(${source.y0},${source.x0})`)
			.attr('opacity', 0)
			.attr('class', (d) => `chart-item chart-item-${d.data.type}`)
			.on('click', this.handleNodeClick);

		const addButton = this.nodeEnter.filter((d) => d.data.type === 'add')
		const children = this.nodeEnter.filter(d => d.data.type !== 'add')
		
		generateAddButtonContent(addButton, this.spritemap);
		generateNodeContent(children, this.spritemap);

		node.merge(this.nodeEnter)
			.transition(this.transition)
			.attr('opacity', 1)
			.attr('transform', (d) => `translate(${d.y},${d.x})`);

		node.exit()
			.transition(this.transition)
			.remove()
			.attr('opacity', 0)
			.attr('transform', (_) => `translate(${source.y},${source.x})`);

	}

	createChart() {
		this.root = d3.hierarchy(this.data, d => d.children);

		this.root.x0 = dy / 2;
		this.root.y0 = 0;

		this.svg = d3
			.select(this.rootRef)
			.attr('viewBox', [0, 0, this.width, dx])
			.call(
				d3.zoom().on('zoom', () => {
					this.zoomHandler.attr('transform', d3.event.transform);
				})
			);

		this.zoomHandler = this.svg.append('g');

		this.wrapper = this.zoomHandler
			.append('g')
			.attr('transform', `translate(${marginLeft},${dx - this.root.x0})`);

		this.links = this.wrapper.append('g');
		this.nodes = this.wrapper.append('g');

		this.update(this.root);
	}

	update(source) {
		const duration = d3.event && d3.event.altKey ? 2500 : 1000;

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
}

export default D3OrganizationChart;
