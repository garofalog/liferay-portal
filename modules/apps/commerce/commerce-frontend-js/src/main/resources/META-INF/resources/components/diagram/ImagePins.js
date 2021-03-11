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
import NavigationButtons from './NavigationButtons'

import ZoomController from './ZoomController'


const ImagePins = ({ completeImageSettings, dragStep, enableDrag, enableZoomController, execResetZoom, image, navigationController, spritemap}) => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef(null);




    let container
    let resetZoom, zoomIn, zoomOut, moveLeft, moveRight, position, move, moveUp, moveDown, newPin, handleMoveUp, handleMoveDown, handleMoveLeft, handleMoveRight, handleZoomIn, handleZoomOut, handleResetZoom


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


    // useEffect(() => {
        
    // }, [execResetZoom, resetZoom])

    useLayoutEffect(() => {
        container = select('g')

        const zoomEV = zoom().on("zoom", () => {
            container.attr("transform", event.transform);
            console.log(event.transform)
        });

        const resetZoom = () => {
            container.attr("transform", "translate(" + 0 + ", " + 0 + ")");

        }

        const handleResetZoom = () => resetZoom();

        console.log('prima di if execResetZoom ')
        console.log('execResetZoom', execResetZoom)
        if (execResetZoom) {
            console.log('sono in imagepins > resetzoom is calling')
            handleResetZoom();
        }


        const zoomIn = () => {
            zoomEV.scaleBy(container.transition().duration(750), 1.3);
        }

        const zoomOut = () => {
            zoomEV.scaleBy(container.transition().duration(750), 0.8);

        }

        const handleZoomIn = () => zoomIn();
        
        const handleZoomOut = () => zoomOut();
        



        const moveRight = () => {
            position = container.attr("transform");
            const vai = position.match(/(-?[0-9]+[.,-]*)+/g)

            container.attr("transform", "translate(" + (parseFloat(vai[0], 10) + dragStep) + ", " + parseFloat(vai[1], 10) + ")");
        }               
        const moveLeft = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-]*)+/g)

            container.attr("transform", "translate(" + (parseFloat(vai[0], 10) - dragStep) + ", " + parseFloat(vai[1], 10) + ")")
        }
        const moveUp = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-]*)+/g)

            container.attr("transform", "translate(" + parseFloat(vai[0], 10) + ", " + (parseFloat(vai[1], 10) - dragStep) + ")")
        }
        const moveDown = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-]*)+/g)

            container.attr("transform", "translate(" + parseFloat(vai[0], 10) + ", " + (parseFloat(vai[1], 10) + dragStep) + ")")
        }


        const handleMoveUp = () => {
            moveUp()
        }
        const handleMoveDown = () => {
            moveDown()
        }
        const handleMoveLeft = () => {
            moveLeft()
        }
        const handleMoveRight = () => {
            moveRight()
        }

        


        

        function clicked(event, d) {
            if (event.defaultPrevented) {return;} // dragged

            select(this).transition()

                .attr("r", 20 * 2)
                .transition()
                .attr("r", 20)
                .attr("fill", schemeCategory10[d.index % 10]);
        }

        const pin = container.append("circle")

            // .transition()
            // .duration(500)
            // .attr("cx", 20)
            // .attr("cy", 20)
            // .attr("r", 20)
            // .style("fill", "pink")
            // .attr("stroke", "#039BE5")
            // .attr("stroke-width", "1px")
            // .attr("stroke", "#455A64")
            // .attr("stroke-width", "3px")
            // .attr("stroke", "#455A64")
            // .attr("stroke-width", "3px")
            // .classed("draggable", true)


        const newPin = () => {
            container.append("circle")
                .transition()
                .duration(500)
                .attr("cx", 20)
                .attr("cy", 20)
                .attr("r", 20)
                .style("fill", "pink")
                .attr("stroke", "#039BE5")
                .attr("stroke-width", "1px")
                .classed('draggable', true)
                .attr("stroke", "#455A64")
                .attr("stroke-width", "3px")
        }

        container.append("image")
            .attr("xlink:href", image)

            // .attr("width", props.completeImageSettings.width)

            .attr("height", completeImageSettings.height)

        const circ = range(10).map(i => ({
            // x: Math.random() * (width - radius * 2) + radius,

            color: getRandom(0, 9),
            r: getRandom(5,30),
            x: Math.random() * (500 - 20 * 2) + 20,

            // y: Math.random() * (heigth - 20 * 2) + 20,

            y: Math.random() * (450 - 20 * 2) + 20,
        }));

        

        
        if (enableDrag) {
            container.call(zoomEV)
        }

        

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

            pin
                .transition()
                .duration(500)
                .attr("transform", "translate(" + mouseEv[0] + "," + mouseEv[1] + ") scale(1)")
                .attr("x", mouseEv[0])
                .attr("y", mouseEv[1])
                .attr("transform", "scale(1)");
            
            // var dragHandler2 = drag().on("drag", function (d) {
            //     console.log('in dragHandler2')
            //     select(this)
            //         .attr("x", d.x = event.x)
            //         .attr("y", d.y = event.y);
            // });


            // dragHandler2(circ);

            


            

            pin.on("click", () => {
                console.log('sto  handlando')
                if (event.ctrlKey || event.metaKey) {
                    console.log('click con o ctrl metakey')
                    pin.transition()
                        .duration(500)
                        .attr("transform", "translate(" + pin.attr("x") + "," + pin.attr("y") + ") scale(0)")
                        .remove();
                } else {

                    var datum = pin.datum();
                    if (pin.datum().selected) {
                        console.log('datum selected')
                        datum.selected = false;
                        pin
                            .datum(datum)
                            .transition()
                            .duration(500)
                            .attr("stroke", "#039BE5")
                            .attr("stroke-width", "1px");
                    } else {
                        console.log('datum a cazz')
                        datum.selected = true;
                        pin
                            .datum(datum)
                            .transition()
                            .duration(500)
                            .attr("stroke", "#455A64")
                            .attr("stroke-width", "3px");
                    }

                }
                event.stopPropagation();
            });

            dragHandler(pin);

            dragHandler(container.selectAll('.draggable'));


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

        
        // register event
        
        select('#reset').on('click', resetZoom)
        select('#zoomIn').on('click', zoomIn)
        select('#zoomOut').on('click', zoomOut)

        select('#moveLeft').on('click', moveLeft)
        select('#moveRight').on('click', moveRight)
        select('#moveUp').on('click', moveUp)
        select('#moveDown').on('click', moveDown)

        select('.box.left').on('click', handleMoveLeft)
        select('.box.right').on('click', handleMoveRight)
        select('.box.top').on('click', handleMoveUp)
        select('.box.bottom').on('click', handleMoveDown)

        select('.box.hr').on('click', handleZoomOut)
        select('.box.plus').on('click', handleZoomIn)

        select('#newPin').on('click', newPin)


    }, [width, execResetZoom, resetZoom]);


    return (

        <div className="diagram-pins-container">

            <svg height={completeImageSettings.height} ref={containerRef} width="100%">
                <g transform="translate(0, 0)" />
                <g id="second" transform="translate(0, 0)" />
            </svg>
            
            {navigationController.enable && (
                <NavigationButtons moveDown={handleMoveDown} moveLeft={handleMoveLeft} moveRight={handleMoveRight} moveUp={handleMoveUp} spritemap={spritemap} />
            )}

            {enableZoomController && (
                <ZoomController zoomIn={handleZoomIn} zoomOut={handleZoomOut} />
            )}

        </div>
        
    )
};

export default ImagePins;

ImagePins.propTypes = {
    completeImageSettings: PropTypes.shape({
        height: PropTypes.number,
        lastX: PropTypes.number,
        lastY: PropTypes.number,
        scaleFactor: PropTypes.double,
        width: PropTypes.number,
    }),
    enableDrag: PropTypes.bool,
    navigationController: PropTypes.shape({
        dragStep: PropTypes.number,
        enable: PropTypes.bool,
    }),
    enableResetZoom: PropTypes.bool,
    enableZoomController: PropTypes.bool,
    execResetZoom: PropTypes.bool,
    image: PropTypes.string,

    // zommIn: PropTypes.from

}