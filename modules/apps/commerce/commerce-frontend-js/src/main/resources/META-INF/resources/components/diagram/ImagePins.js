/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

//  import * as d3 from 'd3';
//  console.log(d3)

import {drag, event, mouse, select, zoom} from 'd3';
import PropTypes from 'prop-types';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

import AdminTooltip from './AdminTooltip';
import NavigationButtons from './NavigationButtons';
import ZoomController from './ZoomController';

const ImagePins = ({
	addNewPinState,
	addPinHandler,
	cPins,
	completeImageSettings,
	execZoomIn,
	image,
	imageState,
	navigationController,
	resetZoom,
	setAddPinHandler,
	setCpins,
	setImageState,
	setResetZoom,
	setShowTooltip,
	setZoomInHandler,
	setZoomOutHandler,
	showTooltip,
	spritemap,
	zoomController,
	zoomInHandler,
	zoomOutHandler,
}) => {
	const [width, setWidth] = useState(0);
	const containerRef = useRef(null);
	let div, 
		svg,
		container,
		position,
		handleAddPin,
		handleMoveUp,
		handleMoveDown,
		handleMoveLeft,
		handleMoveRight,
		handleZoomIn,
		handleZoomOut;

	// useEffect(() => {
	//     setImageState({
	//         k: imageState.k,
	//         x: imageState.x,
	//         y: imageState.y,
	//     })
	// }, [imageState])

	// useEffect(() => {
	//     const updateWidth = () => {
	//         setWidth(containerRef.current.clientWidth / (data.length + 1));
	//     }
	//     const handleResize = debounce(updateWidth, 500);
	//     updateWidth();
	//     window.addEventListener('resize', handleResize);
	//     return () => window.removeEventListener('resize', handleResize);
	// }, [data.length]);

	useEffect(() => {
		let t;

		if (!event) {
			t = {
				k: imageState.k,
				x: imageState.x,
				y: imageState.y,
			};
		}
		else {
			t = {
				k: event.transform.k,
				x: event.transform.x,
				y: event.transform.y,
			};
		}

		if (resetZoom) {
			console.log('reset true');
			setResetZoom(false);
			setImageState({
				k: 1,
				x: 0,
				y: 0,
			});

			container.attr('transform', 'translate(0,0)scale(1)');
		}
		else {
			setImageState(t);

			// if (imageState.x === event.transform.x) {
			//     console.log("===")
			//     container.attr("transform", event.transform)
			//     setImageState(t)
			// } else {
			// console.log('!== t ->', t);
			// console.log('imageState ->', imageState);

			container.attr(
				'transform',
				`translate(${t.x},${t.y}) scale(${t.k})`
			);
		}

		// }

	}, [resetZoom]);


	useLayoutEffect(() => {
		div = select('.diagram-pins-container')
		svg = select('svg');
		container = select('g#container');

		const panZoom = zoom().on('zoom', () => {
			const t = {
				k: event.transform.k,
				x: event.transform.x,
				y: event.transform.y,
			};
			const v = {
				k: imageState.k,
				x: imageState.x,
				y: imageState.y,
			};

			if (t === v) {

				// console.log("===")
				// console.log("resetZoom ==", resetZoom)

				container.attr('transform', t);
				setImageState(t);
			}
			else {

				// console.log("!== v ->", v)
				// console.log("resetZoom !=", resetZoom)
				// console.log('imageState ->', event.transform)

				setImageState(event.transform);
				container.attr('transform', event.transform);

				// if (resetZoom) {
				//     console.log("reset true")
				//     event.transform = {
				//         k: imageState.k,
				//         x: imageState.x,
				//         y: imageState.y,
				//     }
				//     setResetZoom(false)
				//     setImageState({
				//         k: 1,
				//         x: 0,
				//         y: 0,
				//     })
				//     console.log("!== v ->", v)
				//     console.log("!== t ->", t)
				//     console.log('imageState ->', imageState)
				//     container.attr("transform", "translate(0,0)scale(1)");
				// } else {
				//     console.log("reset false")
				//     setImageState(t)
				//     // if (imageState.x === event.transform.x) {
				//     //     console.log("===")
				// setImageState(t)
				//     // } else {

			}
		});

		if (zoomController.enablePanZoom) {
			svg.call(panZoom);
		}

		////////////////////////////////////////////////

		const zoomIn = () => {
			panZoom.scaleBy(container.transition().duration(400), 1.2);
		};
		const handleZoomIn = () => zoomIn();
		const zoomOut = () => {
			panZoom.scaleBy(container.transition().duration(400), 0.8);
		};
		const handleZoomOut = () => zoomOut();

		if (execZoomIn) {
			handleZoomIn();
		}

		if (zoomOutHandler) {
			setZoomOutHandler(false);
			zoomOut();
		}

		if (zoomInHandler) {
			setZoomInHandler(false);
			zoomIn();
		}

		////////////////////////////////////////////////

		const moveRight = () => {
			position = container.attr('transform');
			const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
			const co = vai[0].split(',').map((x) => parseInt(x, 10));
			const s = {
				k: parseFloat(vai[1]),
				x: co[0] + navigationController.dragStep,
				y: co[1],
			};
			setImageState(s);
			container.attr(
				'transform',
				`translate(${s.x},${s.y}) scale(${s.k})`
			);
		};
		const moveLeft = () => {
			position = container.attr('transform');
			const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
			const co = vai[0].split(',').map((x) => parseInt(x, 10));
			const s = {
				k: parseFloat(vai[1]),
				x: co[0] - navigationController.dragStep,
				y: co[1],
			};
			setImageState(s);
			container.attr(
				'transform',
				`translate(${s.x},${s.y}) scale(${s.k})`
			);
		};
		const moveUp = () => {
			position = container.attr('transform');
			const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
			const co = vai[0].split(',').map((x) => parseInt(x, 10));
			const s = {
				k: parseFloat(vai[1]),
				x: co[0],
				y: co[1] - navigationController.dragStep,
			};
			setImageState(s);
			container.attr(
				'transform',
				`translate(${s.x},${s.y}) scale(${s.k})`
			);
		};
		const moveDown = () => {
			position = container.attr('transform');
			const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
			const co = vai[0].split(',').map((x) => parseInt(x, 10));
			const s = {
				k: parseFloat(vai[1]),
				x: co[0],
				y: co[1] + navigationController.dragStep,
			};
			setImageState(s);
			container.attr(
				'transform',
				`translate(${s.x},${s.y}) scale(${s.k})`
			);
		};

		const handleMoveUp = () => {
			moveUp();
		};
		const handleMoveDown = () => {
			moveDown();
		};
		const handleMoveLeft = () => {
			moveLeft();
		};
		const handleMoveRight = () => {
			moveRight();
		};

		////////////////////////////////////////////////

		// const editPin = (d) => {


		// 	d.on('click', (el) => {
		// 		console.log("clicking on", el);

		// 		// const clickedId = d._parents[0].attributes[0].nodeType
		// 		// console.log(clickedId)
		// 	})
		// };

		function dragstarted(d) {
			const current = select(this);
			current.raise().classed("active", true);
		}

		function dragged(d) {
			const current = select(this);
			current.attr("transform", "translate(" + event.x + ',' + event.y + ')');
		}

		function dragended(d) {

			const current = select(this);
			const newPos = current._groups[0][0].attributes;
			const beSure = [...newPos];
			
			const arr = [
				'cx',
				'cy',
				'draggable',
				'fill',
				'id',
				'linked_to_sku',
				'quantity',
				'r',
				'sku',
			];
			const newww = {};
			
			arr.map((el) => {
				beSure.filter(d => {
					
					if (d.name === el) {
						if (el === 'cx'){
							newww[`${d.name}`] = parseFloat(event.x)
						} else if (el === 'cy') {
							newww[`${d.name}`] = parseFloat(event.y)
						} else if (el === 'quantity' || el === 'r' || el === 'id') {
							newww[`${d.name}`] = parseInt(d.value, 10)
						} else if (el === 'draggable') {
							newww[`${d.name}`] = d.value ? true : false
						} else {
							newww[`${d.name}`] = d.value;
						}
					}
				});
			});
			
			current.classed("active", false);
			current.attr('stroke', null);
			current.attr('fill', event.fill);

			const newState = cPins.map((element) =>
				element.id === newww.id ? newww : element
			);

			setCpins(newState);
		}

		////////////////////////////

		// const editPinHandler = () => {};

		const dragHandler = drag()
			.on('start', dragstarted)
			.on('drag', dragged)
			.on('end', dragended);

		// const clickHandler = cont.on('click', el => {
		// 	console.log(el)
		// })

		/////////////////////////////////////////////////////////////////////

		const addPin = () => {
			setCpins(
				cPins.concat({
					cx: 50,
					cy: 50,
					draggable: true,
					fill: '#' + addNewPinState.color,
					id: cPins.length + 1,
					linked_to_sku: "sku",
					quantity: 1,
					r: addNewPinState.radius,
					sku: addNewPinState.sku,
				})
			);
		};

		if (addPinHandler) {
			setAddPinHandler(false);
			addPin();
		}

		////////////////////////////////////////////////

		const cont = container
			.selectAll('g')
			.data(cPins)
			.enter()
			.append('g')
			.attr('transform', d => "translate(" + d.cx + "," + d.cy + ")")
			.attr('cx', d => d.cx)
			.attr('cy', d => d.cy)
			.attr('id', d => d.id)
			.attr('linked_to_sku', d => d.linked_to_sku)
			.attr('quantity', d => d.quantity)
			.attr('sku', d => d.sku)
			.attr('id', d => d.id)
			.attr('class', 'circle_pin')
			.attr('draggable', (d) => (d.draggable ? true : false))
			.call(dragHandler)
			.on('click', (d) => {
				console.log('event pin', event)
				event.path.map(el => {
					if (el.classList && el.classList[0] === 'circle_pin' ) {
						const id = parseInt(el.id)
						console.log(cPins[id])
						setShowTooltip({
							details: {
								cx: cPins[id].cx,
								cy: cPins[id].cy,
								id: cPins[id].id,
								linked_to_sku: cPins[id].linked_to_sku,
								quantity: cPins[id].quantity,
								sku: cPins[id].sku
							},
							tooltip: true
						})
					}
				})
			})

		
			cont.append('circle')
				.attr('r', d => d.r)
				.attr('fill', "#ffffff")
				.attr('r', d => d.r)
				.attr('stroke', d => d.fill)
				.attr('stroke-width', 2)
		
			cont.append('text')
				.text(d => d.id)
				.attr('font-size', d => d.r)
				.attr('text-anchor', 'middle')
				.attr('fill', '#000000')
				.attr('alignment-baseline', 'central');
		


			
		// cont.selectAll('.circle_pin').on('click', d => {
		// 	console.log("clicking on", d.id);

		// 	// setShowTooltip({
		// 	// 	details: {
		// 	// 		cx: d.cx,
		// 	// 		cy: d.cy,
		// 	// 		id: d.id,
		// 	// 		linked_to_sku: d.sku,
		// 	// 		quantity: d.quantity,
		// 	// 		sku: d.sku
		// 	// 	},
		// 	// 	tooltip: true
		// 	// })


		// 	// return tooltip2.style("visibility", "visible")

		// })

		// pinnn.on("click", (d) => {
		//     console.log('cu')

		//     // const mouseEV = mouse(this);

		//     container.append("div")
		//         .style("position", "absolute")
		//         .style("visibility", "hidden")
		//         .style("background-color", "white")
		//         .style("border", "solid")
		//         .style("border-width", "1px")
		//         .style("border-radius", "5px")
		//         .style("padding", "10px")
		//         .html(`<AdminTooltip/>`)


		//     // debugger;
		//     // console.log('sto facendo altre cose')
		//     // console.log(d)
		//     // select(this)
		//     //     .attr("fill", "rgb(0," + d + ",0)")

		// })

		// container.selectAll("circle")
		//     .on("click", function (d) {
		//         console.log('sto facendo altre cose')
		//         console.log(d)
		//         select(this)
		//             .attr("fill", "rgb(0," + d + ",0)")
		//     })

		//     // .on("mouseover", function () {
		//     //     select(this)
		//     //         .style("background-color", "orange");

		//     //     // Get current event info

		//     //     console.log(event);

		//     //     // Get x & y co-ordinates

		//     //     console.log(mouse(this));
		//     // })

		//     .on("mouseout", () => {
		//         console.log('mouseout')

		//         // select(this)
		//         //     .style("background-color", "steelblue")
		//     });

		// container.on("click", () => {
		//     pinnn.on("click", () => {
		//         console.log('stocazzo')
		//     })
		// })


		// editPinHandler(circleContainer);

		// pinnn._groups[0].forEach((p) => {

		//     p.on("click", () => {
		//         console.log('sto facendocose')

		//         var tooltip2 = select("#div_customContent")
		//             .append("div")
		//             .style("position", "absolute")
		//             .style("visibility", "hidden")
		//             .style("background-color", "white")
		//             .style("border", "solid")
		//             .style("border-width", "1px")
		//             .style("border-radius", "5px")
		//             .style("padding", "10px")
		//             .html("<p>I'm a tooltip written in HTML</p><img src='https://github.com/holtzy/D3-graph-gallery/blob/master/img/section/ArcSmal.png?raw=true'></img><br>Fancy<br><span style='font-size: 40px;'>Isn't it?</span>");

		//         select("#circleCustomTooltip")
		//             .on("mouseover", () => { return tooltip2.style("visibility", "visible"); })
		//             .on("mousemove", () => { return tooltip2.style("top", (event.pageY - 2390) + "px").style("left", (event.pageX - 800) + "px"); })
		//             .on("mouseout", () => { return tooltip2.style("visibility", "hidden"); });

		//         // var datum = pinnn.datum();
		//         // if (pinnn.datum().selected) {
		//         //     console.log('datum selected')
		//         //     datum.selected = false;
		//         //     pinnn
		//         //         .datum(datum)
		//         //         .transition()
		//         //         .duration(500)
		//         //         .attr("stroke", "#039BE5")
		//         //         .attr("stroke-width", "1px");
		//         // } else {
		//         //     console.log('datum')
		//         //     datum.selected = true;
		//         //     pinnn
		//         //         .datum(datum)
		//         //         .transition()
		//         //         .duration(500)
		//         //         .attr("stroke", "#455A64")
		//         //         .attr("stroke-width", "3px");
		//         // }

		//         event.stopPropagation();
		//     });

		// })

		dragHandler(svg);

		////////////////////// register event //////////////////////////

		select('#moveLeft').on('click', moveLeft);
		select('#moveRight').on('click', moveRight);
		select('#moveUp').on('click', moveUp);
		select('#moveDown').on('click', moveDown);

		select('.box.left').on('click', handleMoveLeft);
		select('.box.right').on('click', handleMoveRight);
		select('.box.top').on('click', handleMoveUp);
		select('.box.bottom').on('click', handleMoveDown);

		select('.box.hr').on('click', handleZoomOut);
		select('.box.plus').on('click', handleZoomIn);

		select('#newPin').on('click', handleAddPin);

		// select('.circle_pin').on('click', editPin)

		// dragHandler2(container.selectAll('.draggable'));
		// dragHandler(container.selectAll('.draggable'));

	}, [
		addPinHandler,

		// imageState,

		cPins,

		resetZoom,
		setResetZoom,

		// setCpins,

		showTooltip,
		width,
		zoomOutHandler,
		zoomInHandler,
	]);

	const diagramStyle = {
		height: `${completeImageSettings.height}`,
		width: `${completeImageSettings.width}`,
	};

	return (
		<div className="diagram-pins-container" style={diagramStyle}>
			<svg
				height={completeImageSettings.height}
				ref={containerRef}
				width={completeImageSettings.width}
			>
				<g	id="container"
					transform={
						'translate(' +
						imageState.x +
						', ' +
						imageState.y +
						') scale(' +
						imageState.k +
						')'
					}
				>
					<image
						height={completeImageSettings.height}
						href={image}
					></image>
				</g>
			</svg>

			{showTooltip.tooltip && (
				<AdminTooltip 
					setShowTooltip={setShowTooltip}
					showTooltip={showTooltip}
				/>
			)}

			{navigationController.enable && (
				<NavigationButtons
					moveDown={handleMoveDown}
					moveLeft={handleMoveLeft}
					moveRight={handleMoveRight}
					moveUp={handleMoveUp}
					position={navigationController.position}
					spritemap={spritemap}
				/>
			)}

			{zoomController.enable && (
				<ZoomController
					position={zoomController.position}
					zoomIn={handleZoomIn}
					zoomOut={handleZoomOut}
				/>
			)}
		</div>
	);
};

export default ImagePins;

ImagePins.default = {
	scale: 1,
};

ImagePins.propTypes = {
	addPinHandler: PropTypes.bool,
	cPins: PropTypes.arrayOf(
		PropTypes.shape({
			cx: PropTypes.double,
			cy: PropTypes.double,
			draggable: PropTypes.bool,
			fill: PropTypes.string,
			id: PropTypes.number,
			linked_to_sku: PropTypes.oneOf(['sku', 'diagram']),
			quantity: PropTypes.number,
			r: PropTypes.number,
			sku: PropTypes.string,
		})
	),
	completeImageSettings: PropTypes.shape({
		height: PropTypes.string,
		lastX: PropTypes.number,
		lastY: PropTypes.number,
		scaleFactor: PropTypes.double,
		width: PropTypes.string,
	}),
	enableResetZoom: PropTypes.bool,
	execResetZoom: PropTypes.bool,
	handleZoomIn: PropTypes.func,
	handleZoomOut: PropTypes.func,
	image: PropTypes.string,
	imageState: PropTypes.shape({
		k: PropTypes.double,
		x: PropTypes.double,
		y: PropTypes.double,
	}),
	navigationController: PropTypes.shape({
		dragStep: PropTypes.number,
		enable: PropTypes.bool,
		enableDrag: PropTypes.bool,
		position: PropTypes.shape({
			bottom: PropTypes.string,
			left: PropTypes.string,
			right: PropTypes.string,
			top: PropTypes.string,
		}),
	}),
	setAddPinHandler: PropTypes.func,
	setCpins: PropTypes.func,
	setImageState: PropTypes.func,
	setShowTooltip: PropTypes.func,
	setZoomInHandler: PropTypes.func,
	setZoomOutHandler: PropTypes.func,
	showTooltip: PropTypes.shape({
		details: PropTypes.shape({
			cx: PropTypes.double,
			cy: PropTypes.double,
			id: PropTypes.number,
			linked_to_sku: PropTypes.oneOf(['sku', 'diagram']),
			quantity: PropTypes.number,
			sku: PropTypes.string,
		}),
		tooltip: PropTypes.bool
	}),

	// PropTypes.shape({
	//     k: PropTypes.double,
	//     x: PropTypes.double,
	//     y: PropTypes.double,
	// }),

	zoomController: PropTypes.shape({
		enable: PropTypes.bool,
		position: PropTypes.shape({
			bottom: PropTypes.string,
			left: PropTypes.string,
			right: PropTypes.string,
			top: PropTypes.string,
		}),
	}),
	zoomIn: PropTypes.func,
	zoomInHandler: PropTypes.bool,
	zoomOut: PropTypes.func,
	zoomOutHandler: PropTypes.bool,
};
