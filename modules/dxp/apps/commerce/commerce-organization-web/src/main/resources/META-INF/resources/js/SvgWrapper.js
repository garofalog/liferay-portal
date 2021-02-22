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

const tree = (data, width) => {
	const root = d3.hierarchy(data);
	root.dx = 10;
	root.dy = width / (root.height + 1);

	return d3.tree().nodeSize([root.dx, root.dy])(root);
}

function generateLink(g, root) {
	g.append("g")
		.attr("fill", "none")
		.attr("stroke", "#555")
		.attr("stroke-opacity", 0.4)
		.attr("stroke-width", 1.5)
		.selectAll("path")
		.data(root.links())
		.join("path")
		.attr("d", d3.linkHorizontal()
		.x(d => d.y)
		.y(d => d.x));
}

function generateNode(g, root) {
	const node = g.append("g")
		.attr("stroke-linejoin", "round")
		.attr("stroke-width", 1)
		.selectAll("g")
		.data(root.descendants())
		.join("g")
		.attr("transform", d => `translate(${d.y},${d.x})`);
  
	node.append("circle")
		.attr("fill", d => d.children ? "#555" : "#999")
		.attr("r", 2.5);
  
	node.append("text")
		.attr("dy", "0.31em")
		.attr("x", d => d.children ? -6 : 6)
		.attr("text-anchor", d => d.children ? "end" : "start")
		.text(d => d.data.name)
		.clone(true).lower()
		.attr("stroke", "white");
}

function handleZoom(event, g, baseTranslateY, baseTranslateX) {
	debugger
	event.transform.rescaleX(baseTranslateX);
	event.transform.rescaleY(baseTranslateY);
    g.attr("transform", event.transform);
}

function handleChartUpdate(svgRef, data) {
	const {height, width} = svgRef.getBoundingClientRect()

	const root = tree(data, width);

	let x0 = Infinity;
	let x1 = -x0;

	root.each(d => {
	  if (d.x > x1) {x1 = d.x};
	  if (d.x < x0) {x0 = d.x};
	});
  
	const svg = d3.select(svgRef)
		.attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);

	const baseTranslateY = root.dy / 3;
	const baseTranslateX = root.dx - x0;

	const g = svg.append("g")
		.attr("font-family", "sans-serif")
		.attr("font-size", '14px')
		.attr("transform", `translate(${baseTranslateY},${baseTranslateX})`)
		// .on('click', handleClick)

	const zoom = d3.zoom()
		.scaleExtent([0.3, 2])
		.on("zoom", (e) => handleZoom(e, svg));

	// function handleClick(event, [x, y]) {
	// 	event.stopPropagation();
	// 	svg.transition().duration(750).call(
	// 		zoom.transform,
	// 		d3.zoomIdentity.translate(width / 2, height / 2).scale(40).translate(-x, -y),
	// 		d3.mouse(svg.node())
	// 	);
	// }
	
	svg.call(zoom)

	generateLink(g, root);
	generateNode(g, root);
	
	return Object.assign(svg.node(), {
		zoomIn: () => svg.transition().call(zoom.scaleBy, 2),
		zoomOut: () => svg.transition().call(zoom.scaleBy, 0.5),
	});
}

function SvgWrapper({chartSvgRef, data}) {
	useLayoutEffect(() => {
		if(data && chartSvgRef.current) {
			handleChartUpdate(chartSvgRef.current, data)
		}
	}, [chartSvgRef, data])

	return (
		<svg className="svg-chart" ref={chartSvgRef}/>
	);
}

export default SvgWrapper;
