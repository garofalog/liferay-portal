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

import ClayIcon, {ClayIconSpriteContext} from '@clayui/icon';
import classnames from 'classnames';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {COLUMN_GAP, COLUMN_SIZE, NODE_PADDING, RECT_SIZES} from './utils/constants';
import {formatHierachicalData} from './utils/index';

function generateNodes(chart, columns, chartWidth, chartHeight) {

	columns.forEach((columnNodes, columnCount) => {

		const columnGroup = chart
			.append('g')
			.classed('org-chart-column', true);

		let columnHeight = 0; 

		const nodes = columnGroup	
			.selectAll('.org-chart-item')
			.data(columnNodes)
			.enter()
			.append('rect')
			.classed('org-chart-item', true)
			.attr('x', columnCount * (COLUMN_SIZE + COLUMN_GAP))
			.attr('y', (nodeData, nodeCount) => {
				const y = columnHeight;

				columnHeight += RECT_SIZES[nodeData.type][1] + (nodeCount < columnNodes.length ? NODE_PADDING : 0);
			
				return y
			})
			.attr('width', nodeData => RECT_SIZES[nodeData.type][0])
			.attr('height', nodeData => RECT_SIZES[nodeData.type][1])

		columnGroup
			.attr('transform', `translate(0, ${chartHeight / 2 - columnHeight / 2})`)
	})

	
		// return columns
	// const nodes = columns.each((columnData, i) => {
	// 	const column = columns.selectChild(i)

	// 	column.selectAll('.org-chart-item')
	// 		.data(columnData[i])
	// 		.enter()
	// 		.append('rect')
	// 		.classed('org-chart-item', true)
	// 		.attr('width', d => RECT_SIZES[d.type][0])
	// 		.attr('height', d => RECT_SIZES[d.type][1])
	// })

	// return nodes
}

function createChart(svgRef, data) {
	const {height, width} = svgRef.getBoundingClientRect();

	const formattedData = formatHierachicalData(data);

	const chart = d3.select(svgRef)
		.attr('width', width)
		.attr('height', height)
		.attr('viewBox', `0 0 ${width} ${height}`)

	const nodes = generateNodes(chart, formattedData, width, height);

	// generateLinks(links);

	// return {
	// 	columns,
	// 	nodes
	// }
}

function SvgWrapper({chartSvgRef, data}) {
	useLayoutEffect(() => {
		if(data && chartSvgRef.current) {
			createChart(chartSvgRef.current, data)
		}
	}, [chartSvgRef, data])

	return (
		<svg className="svg-chart" ref={chartSvgRef} />
	);
}

export default SvgWrapper;
