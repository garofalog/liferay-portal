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

import { drag, event, mouse, range, schemeCategory10, select, zoom } from 'd3';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import debounce from '../../utilities/debounce';

const ImagePins = (props) => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef(null);
    const [cont, setCont] = useState()

    const zoomStep = 0.2;
    const actualZoomLevel = 1.0;
    const MOVE_STEP = 100;



    let container
    let resetZoom, zoomIn, zoomOut, moveLeft, moveRight, position, move, moveTop, moveBottom


    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function roundFloat(value) {
        return value.toFixed(2);
    }


    


    // useEffect(() => {
    //     const updateWidth = () => {
    //         setWidth(containerRef.current.clientWidth / (data.length + 1));
    //     }
    //     const handleResize = debounce(updateWidth, 500);
    //     updateWidth();
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, [data.length]);

    function dragstarted (event, d) {
        console.log('drag started')
        const current = select(this);
        current.raise().attr("stroke", "red ");
    }

    function dragged() {
        const current = select(this);
        current
            .attr('cx', event.x)
            .attr('cy', event.y);
        console.log(`${event.x}, ${event.y}`);
    }
    function dragended (event, d)  {
        const current = select(this);
        current.attr("stroke", null);
    }

    var dragHandler = drag()
        .on('drag', dragged)
        .on("start", dragstarted)
        .on("end", dragended)


    useLayoutEffect(() => {
        container = select('g')

        const zoomEV = zoom().on("zoom", () => {
            container.attr("transform", event.transform);
            console.log(event.transform)
        });

        const resetZoom = () => {
            container.attr("transform", {
                k: 1,
                x: 0,
                y: 0
            });
        }



        function zoomIn() {
            zoomEV.scaleBy(container.transition().duration(750), 1.3);
        }

        const zoomOut = () => {
            zoomEV.scaleBy(container.transition().duration(750), 0.8);

        }

        const moveRight = () => {
            position = container.attr("transform");
            const vai = position.match(/(-?[0-9]+[.,-]*)+/g)

            // const values = vai[0].split(',')
            // console.log('vai', values)

            container.attr("transform", "translate(" + (parseFloat(vai[0], 10) + 10) + ", " + parseFloat(vai[1], 10) + ")");
        }            
            
        const moveLeft = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-]*)+/g)

            container.attr("transform", "translate(" + (parseFloat(vai[0], 10) - 10) + ", " + parseFloat(vai[1], 10) + ")")
        }

        const moveTop= () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-]*)+/g)

            container.attr("transform", "translate(" + parseFloat(vai[0], 10) + ", " + (parseFloat(vai[1], 10) - 10) + ")")
        }
        const moveBottom = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-]*)+/g)

            container.attr("transform", "translate(" + parseFloat(vai[0], 10) + ", " + (parseFloat(vai[1], 10) + 10) + ")")
        }

        

        function clicked(event, d) {
            if (event.defaultPrevented) {return;} // dragged

            select(this).transition()

                .attr("r", 20 * 2)
                .transition()
                .attr("r", 20)
                .attr("fill", schemeCategory10[d.index % 10]);
        }

        container.append("image")
            .attr("xlink:href", props.image)

            // .attr("width", props.completeimageSettings.width)

            .attr("height", props.completeimageSettings.height)

        const circ = range(10).map(i => ({
            // x: Math.random() * (width - radius * 2) + radius,

            color: getRandom(0, 9),
            r: getRandom(5,30),
            x: Math.random() * (500 - 20 * 2) + 20,

            // y: Math.random() * (heigth - 20 * 2) + 20,

            y: Math.random() * (450 - 20 * 2) + 20,
        }));

        

        

        container.call(zoomEV)

        container.append("circle")
                .attr("cx", 20)
                .attr("cy", 20)
                .attr("r", 20)
                .style("fill", "#ff0")
            .attr("stroke", "#039BE5")
            .attr("stroke-width", "1px")
                .classed('draggable', true)

        container.append("circle")
                .attr("cx", 30)
                .attr("cy", 30)
                .attr("r", 30)
                .style("fill", "#ae2")
            .attr("stroke", "#039BE5")
            .attr("stroke-width", "1px")
            .classed('draggable', true)

        

        container.on("click", function () {
            console.log('in click')

            const mouseEv = mouse(this);


            
            var dragHandler2 = drag().on("drag", function (d) {
                console.log('in dragHandler2')
                select(this)
                    .attr("x", d.x = event.x)
                    .attr("y", d.y = event.y);
            });


            dragHandler2(circ);

            dragHandler(container.selectAll('.draggable'));

            circ.on("click", () => {
                console.log('sto  handlando')
                if (event.ctrlKey || event.metaKey) {
                    console.log('click con o ctrl metakey')
                    circ.transition()
                        .duration(500)
                        .attr("transform", "translate(" + circ.attr("x") + "," + circ.attr("y") + ") scale(0)")
                        .remove();
                } else {

                    var datum = circ.datum();
                    if (circ.datum().selected) {
                        console.log('datum selected')
                        datum.selected = false;
                        circ
                            .datum(datum)
                            .transition()
                            .duration(500)
                            .attr("stroke", "#039BE5")
                            .attr("stroke-width", "1px");
                    } else {
                        console.log('datum a cazz')
                        datum.selected = true;
                        circ
                            .datum(datum)
                            .transition()
                            .duration(500)
                            .attr("stroke", "#455A64")
                            .attr("stroke-width", "3px");
                    }

                }
                event.stopPropagation();
            });

        });

        console.log('all the circles', circ)
        container.selectAll("circle")
            .data(circ)
            .join("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.r)

            // .style("fill", d => d.color)

            .attr("fill", d => schemeCategory10[d.color])

            .call(drag)
            .classed('draggable', true)
            .on("click", clicked);

        dragHandler(container.selectAll('.draggable'));

        select('#reset').on('click', resetZoom)
        select('#zoomIn').on('click', zoomIn)
        select('#zoomOut').on('click', zoomOut)

        select('#moveLeft').on('click', moveLeft)
        select('#moveRight').on('click', moveRight)
        select('#moveTop').on('click', moveTop)
        select('#moveBottom').on('click', moveBottom)


    }, [width]);


    return (
        <div className="diagram-pins-container">
            <svg height={props.completeimageSettings.height} ref={containerRef} width="100%">
                <g transform="translate(0, 0)" />
                <g id="second" transform="translate(0, 0)" />
            </svg>
            <br />
            <button id="zoomIn" onClick={zoomIn}>Zoom In</button>
            <button id="zoomOut" onClick={zoomOut}>Zoom Out</button>
            <button id="moveLeft" onClick={moveLeft}>Move left</button>
            <button id="moveRight" onClick={moveRight}>Move right</button>
            <button id="moveTop" onClick={moveTop}>Move top</button>
            <button id="moveBottom" onClick={moveBottom}>Move bottom</button>
            <button id="reset" onClick={resetZoom}>Reset bitch</button>
        </div>
    )
};

export default ImagePins;

ImagePins.propTypes = {
    completeimageSettings: PropTypes.shape({
        height: PropTypes.number,
        lastX: PropTypes.number,
        lastY: PropTypes.number,
        scaleFactor: PropTypes.double,
        width: PropTypes.number,
    }),
    image: PropTypes.string,

    // zommIn: PropTypes.from

}