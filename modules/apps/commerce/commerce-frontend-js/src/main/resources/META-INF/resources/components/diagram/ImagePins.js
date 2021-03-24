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

import ClayButton from '@clayui/button';
import { drag, event, mouse, schemeCategory10, select, zoom } from 'd3';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import NavigationButtons from './NavigationButtons';
import ZoomController from './ZoomController';


const ImagePins = ({ 
    completeImageSettings, 
    execZoomIn,
    image,
    imageState,
    navigationController,
    pins,
    resetZoom, 
    setCpins,
    setImageState, 
    setResetZoom,
    setZoomInHandler,
    setZoomOutHandler, 
    spritemap,
    zoomController,
    zoomInHandler,
    zoomOutHandler,
}) => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef(null);
    let svg, container, position, newPin, handleMoveUp, handleMoveDown, handleMoveLeft, handleMoveRight, handleZoomIn, handleZoomOut;

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
        let t 

        if (!event) {
            t = {
                k: imageState.k,
                x: imageState.x,
                y: imageState.y,
            } 
            
        }else{

            t = {
                k: event.transform.k,
                x: event.transform.x,
                y: event.transform.y,
            }
        }

        if (resetZoom) {
            
            console.log("reset true")
            setResetZoom(false)
            setImageState({
                k: 1,
                x: 0,
                y: 0,
            })

            console.log("!== t==imageState ->", t)
            container.attr("transform", "translate(0,0)scale(1)");
        } else {
            setImageState(t)

            // if (imageState.x === event.transform.x) {
            //     console.log("===")
            //     container.attr("transform", event.transform)
            //     setImageState(t)
            // } else {

            console.log("!== t ->", t)
            console.log('imageState ->', imageState)
            container.attr("transform", `translate(${t.x},${t.y}) scale(${t.k})`)
        }

        // }
    }, [resetZoom])


    useLayoutEffect(() => {
        svg = select('svg')
        container = select('g')

        // .attr("viewBox", [0, 0, completeImageSettings.width, completeImageSettings.height]);


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

        const panZoom = zoom().on("zoom", () => {

            // container.attr("transform", `translate(${s.x},${s.y}) scale(${s.k})`);

            const t = {
                k: event.transform.k,
                x: event.transform.x,
                y: event.transform.y,
            }
            const v = {
                k: imageState.k,
                x: imageState.x,
                y: imageState.y,
            }

            if (t === v) {
                // console.log("===")
                // console.log("resetZoom ==", resetZoom)

                container.attr("transform", t)
                setImageState(t)
            } else {
                // console.log("!== v ->", v)
                // console.log("resetZoom !=", resetZoom)
                // console.log('imageState ->', event.transform)

                setImageState(event.transform)
                container.attr("transform", event.transform);

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
            svg.call(panZoom)
        }

        ////////////////////////////////////////////////

        const zoomIn = () => {
            panZoom.scaleBy(container.transition().duration(400), 1.2);
        }
        const handleZoomIn = () => zoomIn();
        const zoomOut = () => {
            panZoom.scaleBy(container.transition().duration(400), 0.8);
        }
        const handleZoomOut = () => zoomOut();
        
        if (execZoomIn) {
            handleZoomIn();
        }

        if (zoomOutHandler) {
            setZoomOutHandler(false)
            zoomOut();
        }

        if (zoomInHandler) {
            setZoomInHandler(false)
            zoomIn();
        }

        ////////////////////////////////////////////////
    
        const moveRight = () => {
            position = container.attr("transform");
            const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
            const co = vai[0].split(',').map(x => parseInt(x, 10))
            const s = {
                k: parseFloat(vai[1]),
                x: co[0] + navigationController.dragStep,
                y: co[1],
            }
            setImageState(s)       
            container.attr("transform", `translate(${s.x},${s.y}) scale(${s.k})`);
        }               
        const moveLeft = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
            const co = vai[0].split(',').map(x => parseInt(x, 10))
            const s = {
                k: parseFloat(vai[1]),
                x: co[0] - navigationController.dragStep,
                y: co[1],
            }
            setImageState(s)       
            container.attr("transform", `translate(${s.x},${s.y}) scale(${s.k})`);
        }
        const moveUp = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
            const co = vai[0].split(',').map(x => parseInt(x, 10))
            const s = {
                k: parseFloat(vai[1]),
                x: co[0],
                y: co[1] - navigationController.dragStep,
            }    
            setImageState(s)       
            container.attr("transform", `translate(${s.x},${s.y}) scale(${s.k})`);
        }
        const moveDown = () => {
            position = container.attr("transform")
            const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
            const co = vai[0].split(',').map(x => parseInt(x, 10))
            const s = {
                k: parseFloat(vai[1]),
                x: co[0],
                y: co[1] + navigationController.dragStep,
            }
            setImageState(s)   
            container.attr("transform", `translate(${s.x},${s.y}) scale(${s.k})`);    
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


        function dragstarted(event, d) {
            const current = select(this);
            current.raise().attr("stroke", "red");
        }

        function dragged() {
            const current = select(this);
            current
                .attr('cx', event.x)
                .attr('cy', event.y);
        }
        
        function dragended(event, d) {
            const current = select(this);
            const newPos = current._groups[0].[0].attributes
            const beSure = [...newPos]

            const id = beSure.filter(d => {
                if (d.name === "id") {
                    return d
                }
            })
            const x = beSure.filter(d => {
                if (d.name === "cx") {
                    return d
                }
            })
            const y = beSure.filter(d => {
                if (d.name === "cy") {
                    return d
                }
            })
            const r = beSure.filter(d => {
                if (d.name === "r") {
                    return d
                }
            })
            const color = beSure.filter(d => {
                if (d.name === "fill") {
                    return d
                }
            })

            const newCoords = {
                color: color[0].value,
                id: parseInt(id[0].value,10),
                r: parseInt(r[0].value, 10),
                x: parseFloat(x[0].value,10),
                y: parseFloat(y[0].value,10),
            }

            current.attr("stroke", null);
            current.attr("fill", color[0].value)
            const newState = pins.map(element => element.id === newCoords.id ? newCoords : element);
            setCpins(newState)
        }

        //////////////////////////// 

        const dragHandler = drag()
            .on('drag', dragged)
            .on("start", dragstarted)
            .on("end", dragended)

        ///////////////////////////////////////////////////////////////////// 

        const clicked = (event, d) => {
            if (event.defaultPrevented) { return; } // dragged
            select(this).transition()
                .attr("r", 20 * 2)
                .transition()
                .attr("r", 20)
                .attr("fill", schemeCategory10[d.index % 10]);
        }

        const addPin = () => {
            setCpins(pins.concat({
                color: "#FFFF00",
                id: pins.length + 1,
                r: 30,
                x: 50,
                y: 50, 
            }))
        }

        ////////////////////////////////////////////////

        const pinnn = container.selectAll("circle")
            .data(pins)
            .join("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.r)
            .attr("id", d => d.id)
            .attr("fill", d => d.color)
            .classed('draggable', true);

        dragHandler(pinnn);


        // pinnn.on("click", () => {
        //     console.log('sto  handlando')

        //         var datum = pinnn.datum();
        //         if (pinnn.datum().selected) {
        //             console.log('datum selected')
        //             datum.selected = false;
        //             pinnn
        //                 .datum(datum)
        //                 .transition()
        //                 .duration(500)
        //                 .attr("stroke", "#039BE5")
        //                 .attr("stroke-width", "1px");
        //         } else {
        //             console.log('datum')
        //             datum.selected = true;
        //             pinnn
        //                 .datum(datum)
        //                 .transition()
        //                 .duration(500)
        //                 .attr("stroke", "#455A64")
        //                 .attr("stroke-width", "3px");
        //         }


        //     event.stopPropagation();
        // });

        // dragHandler(svg);

        
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

        select('#newPin').on('click', addPin)

        // dragHandler2(container.selectAll('.draggable'));
        // dragHandler(container.selectAll('.draggable'));

    }, [
        width, 
        imageState,
        setResetZoom,
        resetZoom, 
        zoomOutHandler, 
        zoomInHandler, 
        pins,
    ]);


    const diagramStyle = {
        height: `${completeImageSettings.height}`,
        width: `${completeImageSettings.width}`,
    }

    return (
        <div className="diagram-pins-container" style={diagramStyle}>
            <svg height={completeImageSettings.height} ref={containerRef} width={completeImageSettings.width}>
                <g transform={"translate(" + imageState.x + ", " + imageState.y + ") scale(" + imageState.k + ")"}>
                    <image height={completeImageSettings.height} href={image}></image>
                </g>    
            </svg>

            {navigationController.enable && (
                <NavigationButtons 
                    moveDown={handleMoveDown} 
                    moveLeft={handleMoveLeft} 
                    moveRight={handleMoveRight} 
                    moveUp={handleMoveUp} 
                    position={navigationController.position} 
                    spritemap={spritemap} />
            )}

            {zoomController.enable && (
                <ZoomController 
                position={zoomController.position} 
                zoomIn={handleZoomIn} 
                zoomOut={handleZoomOut} />
            )}

            <ClayButton id="newPin"></ClayButton>
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
    pins: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string,
            id: PropTypes.number,
            r: PropTypes.number,
            x: PropTypes.double,
            y: PropTypes.double,
        })
    ),
    setCpins: PropTypes.func,
    setImageState: PropTypes.func,
    setZoomInHandler: PropTypes.func,
    setZoomOutHandler: PropTypes.func,
    
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
    zoomIn: PropTypes.func,
    zoomInHandler: PropTypes.bool,
    zoomOut: PropTypes.func,
    zoomOutHandler: PropTypes.bool,
}