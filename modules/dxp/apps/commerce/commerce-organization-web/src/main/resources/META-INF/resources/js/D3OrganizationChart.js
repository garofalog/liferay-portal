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

const symbolMap = {
	account: 'users',
	organization: 'organizations',
	user: 'user',
};

const dx = 90;
const dy = 400;

const treeLink = d3
	.linkHorizontal()
	.x((d) => {
		if (d.height === 1) {
			const value = RECT_SIZES[d.data.type].width + d.y;

			return value;
		}

		return d.y;
	})
	.y((d) => d.x);

const tree = d3.tree().nodeSize([dx, dy]);

const highlight = () => false;

const marginLeft = 40;

const formatData = (rawData) => {
	const dataWithRoot = {
		children: rawData,
		id: 0,
		name: 'root',
	};

	return d3.hierarchy(dataWithRoot, d => d.children);
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

	createLinks() {
		this.links = this.wrapper
			.append('g')

			.selectAll('path')
			.data(this.root.links().filter((d) => d.source.depth))
			.join('path')
			.attr('class', 'chart-link')
			.attr('stroke', (d) =>
				highlight(d.source) && highlight(d.target) ? 'red' : null
			)
			.attr('d', treeLink);
	}

	addPlusButton(d) {}

	handleNodeClick(d) {
		if (d.data.type !== 'user' && !d.children) {
			this.getChildren(d.data.id, d.data.type).then((children) => {
				d.children = children;
                this.createNodes()
                this.createLinks()
			});
		}
		else if (d.data.type === 'organization') {
			this.addPlusButton(d);
		}
	}

	createNodes() {
		this.nodes = this.wrapper
			.append('g')
			.selectAll('g')
			.data(this.root.descendants().filter((d) => d.depth !== 0))
			.join('g')
			.attr('transform', (d) => `translate(${d.y},${d.x})`)
			.attr('class', (d) => `chart-item chart-item-${d.data.type}`)
			.on('click', this.handleNodeClick);

		this.nodes
			.append('rect')
			.attr('width', (d) => RECT_SIZES[d.data.type].width)
			.attr('height', (d) => RECT_SIZES[d.data.type].height)
			.attr(
				'transform',
				(d) => `translate(0, ${RECT_SIZES[d.data.type].height * -0.5})`
			)
			.attr('rx', (d) => RECT_SIZES[d.data.type].height / 2)
			.attr('class', 'chart-rect');

		this.iconWrappers = this.nodes
			.append('g')
			.attr('class', 'icon-wrapper');

		this.iconWrappers.append('circle').attr('class', 'icon-circle');

		this.iconWrappers
			.append('svg')
			.attr('class', `lexicon-icon lexicon-icon-emoji`)
			.attr('role', 'presentation')
			.append('use')
			.attr(
				'xlink:href',
				(d) => `${this.spritemap}#${symbolMap[d.data.type]}`
			);

		this.infos = this.nodes.append('g').attr('class', 'chart-item-info');

		this.infos
			.append('text')
			.attr('class', 'node-title')
			.text((d) => d.data.name);

		this.infos
			.append('text')
			.attr('class', 'node-description')
			.text(formatItemDescription);
	}

	createChart() {
		let x0 = Infinity;
		let x1 = -x0;
		this.root = tree(this.data);

		this.root.each((d) => {
			if (d.x > x1) {
				x1 = d.x;
			}
			if (d.x < x0) {
				x0 = d.x;
			}
		});

		this.svg = d3
			.select(this.rootRef)
			.attr('viewBox', [0, 0, this.width, x1 - x0 + dx * 2])
			.call(
				d3.zoom().on('zoom', () => {
					this.zoomHandler.attr('transform', d3.event.transform);
				})
			);

		this.zoomHandler = this.svg.append('g');

		this.wrapper = this.zoomHandler
			.append('g')
			.attr('transform', `translate(${marginLeft},${dx - x0})`);

		this.createLinks();
		this.createNodes();

		// this.svg = this.svg.node();

	}

    update(source) {

    }
}

export default D3OrganizationChart;
