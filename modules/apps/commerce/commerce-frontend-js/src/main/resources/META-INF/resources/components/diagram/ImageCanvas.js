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

import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react'

import { handleScroll, redraw, start, trackTransforms, zoom} from './functions'

const ImageCanvas = (props) => {
    const gkhead = new Image;


    // const [ctx, setCtx] = useState('2d')


    const canvasRef = useRef(null)


    

    const renderImage = (ctx) => {
        gkhead.src = props.image
        ctx.drawImage(gkhead, 0, 0, props.imageSettings.width, props.imageSettings.height);

        // ctx.drawImage(gkhead, 0, 0, 56 , 600);


    }

    useEffect(() => {
        // setCanvas(canvasRef.current)
        // canvas.getContext('2d')xr

        let dragStart, dragged;

        // const lastX = props.imageSettings.width / 2, lastY = canvasDim.height / 2;

        const canvas = canvasRef.current
        props.setCanvas(canvas)
        const ctx = canvas.getContext('2d');
        props.setctxStore(ctx)

        trackTransforms(ctx);
        console.log(props.imageSettings)

        // gkhead.src = props.image


        redraw(ctx, props.imageSettings.width, props.imageSettings.height)



        start(ctx, props.imageSettings.lastX, props.imageSettings.lastY, dragStart, dragged, props.imageSettings.scaleFactor, canvas)
        renderImage(ctx)
 
    }, []) //[canvas])

    // redraw(ctxStore, canvasDim.width, canvasDim.height)


    return (
        <canvas height={props.imageSettings.lastY*2} id="imagecanvas" ref={canvasRef} width={props.imageSettings.lastX*2} ></canvas>
    )

}

export default ImageCanvas;

ImageCanvas.propTypes = {
    image: PropTypes.string,
    imageSettings: PropTypes.shape({
        lastX: PropTypes.number,
        lastY: PropTypes.number,
        scaleFactor: PropTypes.double,
    }),
    setCanvas: PropTypes.func,
    setctxStore: PropTypes.func,
}