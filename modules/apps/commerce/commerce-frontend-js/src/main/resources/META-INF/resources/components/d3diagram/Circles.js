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

// import * as d3 from "d3";
// console.log(d3)

import { drag, event, mouse, select, zoom } from 'd3';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import debounce from '../../utilities/debounce';

const Circles = ({ data }) => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef(null);

    // const [maxZoomIn, setMaxZoomIn] = useState(2.0)
    // const [maxZoomOut, setMaxZoomOut] = useState(0.2)
    // const [zoomStep, setZoomStep] = useState(0.2)

    // const [actualZoomLevel, setActualZoomLevel] = useState(1.0)

    // const [moveStep, setMoveStep] = useState(100)
    // const actualZoomLevel = 1.0

    // const [nodes, serNodes] = useState()




    const [nodesData, setNodesData] = useState([
        {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }
    ])

    // const [zoomableLayer, setZoomableLayer] = useState()
    // const [zoom, setZoom] = useState()

    let container


    useEffect(() => {

        const updateWidth = () => {
            setWidth(containerRef.current.clientWidth / (data.length + 1));
        }

        const handleResize = debounce(updateWidth, 500);

        updateWidth();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

        


    }, [data.length]);
    

    
    function dragged() {
        var current = select(this);
        current
            .attr('cx', event.x)
            .attr('cy', event.y);
        console.log(`${event.x}, ${event.y}`);
    }

    // const handleDrag = drag()
    //     .subject(function () {
    //         const me = select(this);

    //         return { x: me.attr('cx'), y: me.attr('cy') }
    //     })
    //     .on('drag', () => {
    //         const me = select(this);
    //         me.attr('cx', event.x);
    //         me.attr('cy', event.y);
    //     });
    
    var dragHandler = drag()
        .on('drag', dragged);
    

    useLayoutEffect(() => {

        

        var zoomEV = zoom()
            .on("zoom", () => {
                container.attr("transform", event.transform);
            });

        container = select('g')
 
        container.append("image")
            .attr("xlink:href", "https://www.zooplus.it/magazine/wp-content/uploads/2020/10/1-37-768x512.jpg")
            .attr("width", 960)
            .attr("height", 450)

        container.call(zoomEV)

        const circ = container.append("circle")
            .attr("cx", 50)
            .attr("cy", 50)
            .attr("r", 50)
            .style("fill", "#ff0")
            .classed('draggable', true)

        if (Array.isArray(data)) {


            

            select('g').append("circle")
                .attr("cx", 50)
                .attr("cy", 50)
                .attr("r", 50)
                .style("fill", "#ff0")
                .classed('draggable', true)

            select('g').append("circle")
                .attr("cx", 50)
                .attr("cy", 50)
                .attr("r", 50)
                .style("fill", "#ae2")
                .classed('draggable', true)

        }

        container.on("click", function () {
            console.log('in click')

            const mouseEv = mouse(this);
            
            var pointer = container.append("circle")

                // .datum({
                //     selected: false,
                //     x: mouseEv[0], 
                //     y: mouseEv[1] 
                // })
            //     .attr("transform", "translate(" + mouseEv[0] + "," + mouseEv[1] + ")scale(0)")

                .attr("cx", mouseEv[0] || 50)
                .attr("cy", mouseEv[1] || 50)
                .attr("r", 50)
                .style("fill", "#ff0")
                .classed('draggable', true)

            // container
            //     .append("use")
            //     .datum({ x: mouseEv[0], y: mouseEv[1], selected: false })
            //     .attr("id", "currentPointer")
            //     .attr("href", "#pointer")
            //     .attr("transform", "translate(" + mouseEv[0] + "," + mouseEv[1] + ")scale(0)")
            //     .attr("fill", "#039BE5")
            //     .attr("stroke", "#039BE5")
            //     .attr("stroke-width", "1px");

            circ
                .transition()
                .duration(500)

                .attr("transform", "translate(" + mouseEv[0] + "," + mouseEv[1] + ") scale(1)")

                .attr("x", mouseEv[0])
                .attr("y", mouseEv[1])
                .attr("transform", "scale(1)");

            circ.on("click", () => {

                if (event.ctrlKey) {
                    circ.transition()
                        .duration(500)
                        .attr("transform", "translate(" + circ.attr("x") + "," + circ.attr("y") + ") scale(0)")
                        .remove();
                } else {
                    
                    var datum = circ.datum();
                    if (circ.datum().selected) {
                        datum.selected = false;
                        circ
                            .datum(datum)
                            .transition()
                            .duration(500)
                            .attr("stroke", "#039BE5")
                            .attr("stroke-width", "1px");
                    } else {
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

            var dragHandler2 = drag().on("drag", function (d) {
                    console.log('in dragHandler2')
                    select(this)
                        .attr("x", d.x = event.x)
                        .attr("y", d.y = event.y);
                });
            

            dragHandler2(circ);
            dragHandler(container.selectAll('.draggable'));

        });

        dragHandler(container.selectAll('.draggable'));
        
    }, [data, width]);


    return (
        <div>
            <svg height="350" ref={containerRef} width="100%">
                <g transform="translate(0, 100)" />
                <g id="second" transform="translate(0, 100)" />
            </svg>
            <br/>
            {/* <button id="zoomIn" onClick={zoomIn}>Zoom In</button>
            <button id="zoomOut" onClick={zoomOut}>Zoom Out</button>
            <button id="moveLeft" onClick={moveDrawLeft}>Move left</button>
            <button id="moveRight" onClick={moveDrawRight}>Move right</button>
            <button id="moveTop" onClick={moveDrawTop}>Move top</button>
            <button id="moveBottom" onClick={moveDrawBottom}>Move bottom</button> */}
        </div>
    )
};

export default Circles;