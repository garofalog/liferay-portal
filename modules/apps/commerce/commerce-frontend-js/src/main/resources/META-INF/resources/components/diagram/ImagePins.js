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

import { drag, event, mouse, range, schemeCategory10, select, zoom } from 'd3';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import debounce from '../../utilities/debounce';

const ImagePins = (props) => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef(null);

    let container

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
        var current = select(this);
        current.raise().attr("stroke", "red");
    }

    function dragged() {
        var current = select(this);
        current
            .attr('cx', event.x)
            .attr('cy', event.y);
        console.log(`${event.x}, ${event.y}`);
    }
    function dragended (event, d)  {
        var current = select(this);
        current.attr("stroke", null);
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
        .on('drag', dragged)
        .on("start", dragstarted)
        .on("end", dragended)


    useLayoutEffect(() => {

        var zoomEV = zoom()
            .on("zoom", () => {
                container.attr("transform", event.transform);
                console.log(event.transform)
            });

        container = select('g')

        function clicked(event, d) {
            if (event.defaultPrevented) {return;} // dragged

            select(this).transition()
                .attr("fill", "black")
                .attr("r", 20 * 2)
                .transition()
                .attr("r", 20)
                .attr("fill", schemeCategory10[d.index % 10]);
        }

        container.append("image")
            .attr("xlink:href", props.image)
            .attr("width", 960)
            .attr("height", 450)

        const circ = range(10).map(i => ({
            // x: Math.random() * (width - radius * 2) + radius,

            color: schemeCategory10[i % 10],
            x: Math.random() * (500 - 20 * 2) + 20,

            // y: Math.random() * (heigth - 20 * 2) + 20,

            y: Math.random() * (450 - 20 * 2) + 20,
        }));

        

        

        container.call(zoomEV)

        // const circ = container.append("circle")
        //     .attr("cx", 10)
        //     .attr("cy", 10)
        //     .attr("r", 10)
        //     .style("fill", "#ff0")
        //     .classed('draggable', true)


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

            // var pointer = container.append("circle")

            //     // .datum({
            //     //     selected: false,
            //     //     x: mouseEv[0], 
            //     //     y: mouseEv[1] 
            //     // })
            //     //     .attr("transform", "translate(" + mouseEv[0] + "," + mouseEv[1] + ")scale(0)")

            //     .attr("cx", mouseEv[0] || 20)
            //     .attr("cy", mouseEv[1] || 20)
            //     .attr("r", 20)
            //     .style("fill", "#ff0")
            //     .classed('draggable', true)

            // container
            //     .append("use")
            //     .datum({ x: mouseEv[0], y: mouseEv[1], selected: false })
            //     .attr("id", "currentPointer")
            //     .attr("href", "#pointer")
            //     .attr("transform", "translate(" + mouseEv[0] + "," + mouseEv[1] + ")scale(0)")
            //     .attr("fill", "#039BE5")
            //     .attr("stroke", "#039BE5")
            //     .attr("stroke-width", "1px");

            

            
            // circ
            //     .transition()
            //     .duration(500)

            //     .attr("transform", "translate(" + mouseEv[0] + "," + mouseEv[1] + ") scale(1)")

            //     .attr("x", mouseEv[0])
            //     .attr("y", mouseEv[1])
            //     .attr("transform", "scale(1)");


            


            
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
                    console.log('in metakey')
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

            // drag()
            //     .on("start", dragstarted)
            //     .on("drag", dragged)
            //     .on("end", dragended);

        });

        // const drag = () => {

        //     const dragstarted = (event, d) => {
        //         select(this).raise().attr("stroke", "black");
        //     }

        //     const dragged = (event, d) => {
        //         select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
        //     }

        //     const dragended = (event, d) => {
        //         select(this).attr("stroke", null);
        //     }

        //     return drag()
        //         .on("start", dragstarted)
        //         .on("drag", dragged)
        //         .on("end", dragended)
        // }

        container.selectAll("circle")
            .data(circ)
            .join("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 20)
            .attr("fill", d => schemeCategory10[d.index % 10])
            .call(drag)
            .classed('draggable', true)
            .on("click", clicked);

        dragHandler(container.selectAll('.draggable'));

   

    }, [width]);


    return (
        <div>
            <svg height="450" ref={containerRef} width="100%">
                <g transform="translate(0, 100)" />
                <g id="second" transform="translate(0, 100)" />
            </svg>
            <br />
            {/* <button id="zoomIn" onClick={zoomIn}>Zoom In</button>
            <button id="zoomOut" onClick={zoomOut}>Zoom Out</button>
            <button id="moveLeft" onClick={moveDrawLeft}>Move left</button>
            <button id="moveRight" onClick={moveDrawRight}>Move right</button>
            <button id="moveTop" onClick={moveDrawTop}>Move top</button>
            <button id="moveBottom" onClick={moveDrawBottom}>Move bottom</button> */}
        </div>
    )
};

export default ImagePins;

ImagePins.propTypes = {
    image: PropTypes.string,

}