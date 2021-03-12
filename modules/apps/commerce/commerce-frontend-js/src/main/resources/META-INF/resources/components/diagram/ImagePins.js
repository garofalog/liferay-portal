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

import NavigationButtons from './NavigationButtons';
import ZoomController from './ZoomController';


const ImagePins = ({ 
    completeImageSettings, 
    execResetZoom, 
    image, 
    imageState,
    navigationController, 
    pins, 
    scale,
    setImageState,
    spritemap,
    zoomController
}) => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef(null);
    let container, resetZoom, zoomIn, zoomOut, moveLeft, moveRight, position, move, moveUp, moveDown, newPin, handleMoveUp, handleMoveDown, handleMoveLeft, handleMoveRight, handleZoomIn, handleZoomOut, handleResetZoom

    useEffect(() => {
        setImageState({
            k: scale,
            x: imageState.x,
            y: imageState.y,
        })
    }, [scale])

    useEffect(() => {
        console.log(imageState)
    }, [imageState])
    
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
        console.log('blabla', `${event.x}, ${event.y}`);
    }
    function dragended (event, d)  {
        const current = select(this);
        current.attr("stroke", null);
    }

    const dragHandler = drag()
        .on('drag', dragged)
        .on("start", dragstarted)
        .on("end", dragended)


    useLayoutEffect(() => {
        container = select('g')

        // const getRandom = (min, max) => {
        //     min = Math.ceil(min);
        //     max = Math.floor(max);

        //     return Math.floor(Math.random() * (max - min + 1)) + min;
        // }
        // const roundFloat = (value) => value.toFixed(2);
        // const pins = range(10).map(i => ({
        //     color: getRandom(0, 9),
        //     r: getRandom(5, 30),
        //     x: Math.random() * (completeImageSettings.width - 20 * 2) + 20,
        //     y: Math.random() * (completeImageSettings.height - 20 * 2) + 20,
        // }));

        const zoomEV = zoom().on("zoom", () => {
            container.attr("transform", event.transform);

            console.log(event.transform)
            setImageState({
                k: event.transform.k,
                x: event.transform.x,
                y: event.transform.y,
            })

        });

        ////////////////////////////////////////////////

        const resetZoom = () => {
            setImageState({
                k: 1,
                x: 0,
                y: 0,
            })
            container.attr("transform", "translate(" + 0 + ", " + 0 + ")" + "scale(" + 1 + ")");

        }

        const handleResetZoom = () => resetZoom();

        console.log('prima di if execResetZoom ')
        console.log('execResetZoom', execResetZoom)
        if (execResetZoom) {
            console.log('sono in imagepins > resetzoom is calling')
            handleResetZoom();
        }


        ////////////////////////////////////////////////


        const zoomIn = () => {
            zoomEV.scaleBy(container.transition().duration(400), 1.2);
            console.log("transform zoomin", event.transform);

        }
        const handleZoomIn = () => zoomIn();
        const zoomOut = () => {
            zoomEV.scaleBy(container.transition().duration(400), 0.8);
            console.log("transform zoomout", event.transform);

        }
        const handleZoomOut = () => zoomOut();
        

        ////////////////////////////////////////////////
    
        
        const moveRight = () => {
            position = container.attr("transform");
            const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
            const co = vai[0].split(',')
            const s = {
                k: vai[1],
                x: co[0],
                y: co[1],
            }
            setImageState(s)       
            container.attr("transform", "translate(" + (parseFloat(s.x, 10) + navigationController.dragStep) + ", " + parseFloat(s.y, 10) + ")" + "scale(" + s.k + ")");
        }               
        const moveLeft = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
            const co = vai[0].split(',')
            const s = {
                k: vai[1],
                x: co[0],
                y: co[1],
            }
            setImageState(s)       
            container.attr("transform", "translate(" + (parseFloat(s.x, 10) - navigationController.dragStep) + ", " + parseFloat(s.y, 10) + ")" + "scale(" + s.k + ")")
        }
        const moveUp = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
            const co = vai[0].split(',')
            const s = {
                k: vai[1],
                x: co[0],
                y: co[1],
            }    
            setImageState(s)       
            container.attr("transform", "translate(" + parseFloat(s.x, 10) + ", " + (parseFloat(s.y, 10) - navigationController.dragStep) + ")" + "scale(" + s.k + ")")
        }
        const moveDown = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
            const co = vai[0].split(',')
            const s = {
                k: vai[1],
                x: co[0],
                y: co[1],
            }
            setImageState(s)       
            container.attr("transform", "translate(" + parseFloat(s.x, 10) + ", " + (parseFloat(s.y, 10) + navigationController.dragStep) + ")" + "scale(" + s.k + ")")
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

        
        ////////////////////////////////////////////////

        const clicked = (event, d) => {
            if (event.defaultPrevented) { return; } // dragged
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



        ////////////////////////////////////////////////
        
        if (navigationController.enableDrag) {
            console.log('ok enabled')
            container.call(zoomEV)
            console.log("transform dragzzom", container);


        }

        ////////////////////////////////////////////////

        


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




        console.log('all the circles', pins)
        container.selectAll("circle")
            .data(pins)
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

        
        ////////////////////// register event //////////////////////////
        

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


    const diagramStyle = {
        height: `${completeImageSettings.height}`,
        width: `${completeImageSettings.width}`,
    }

    const imageStyle = {
        transform: `translate(0, 0) scale(${scale})`
    }

    return (
        <div className="diagram-pins-container" style={diagramStyle}>
            <svg height={completeImageSettings.height} ref={containerRef} width={completeImageSettings.width}>
                <g transform={"translate(" + imageStyle.x + ", " + imageStyle.y + "0) scale(" + imageState.k + ")"}
                 />
            </svg>

            {navigationController.enable && (
                <NavigationButtons moveDown={handleMoveDown} moveLeft={handleMoveLeft} moveRight={handleMoveRight} moveUp={handleMoveUp} position={navigationController.position} spritemap={spritemap} />
            )}

            {zoomController.enable && (
                <ZoomController position={zoomController.position} zoomIn={handleZoomIn} zoomOut={handleZoomOut} />
            )}
        </div>
    )
};

export default ImagePins;

ImagePins.default = {
    scale: 1
}

ImagePins.propTypes = {
    completeImageSettings: PropTypes.shape({
        height: PropTypes.string,
        lastX: PropTypes.number,
        lastY: PropTypes.number,
        scaleFactor: PropTypes.double,
        width: PropTypes.string,
    }),
    enableResetZoom: PropTypes.bool,
    execResetZoom: PropTypes.bool,
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
    pins: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.number,
            r: PropTypes.number,
            x: PropTypes.double,
            y: PropTypes.double,
        })
    ),
    scale: PropTypes.double,
    setImageState: PropTypes.func,

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
        })
    }),
}