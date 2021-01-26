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

import { handleScroll, redraw, trackTransforms, zoom} from './functions'

const ImageCanvas = (props) => {
    const [canvas, setCanvas] = useState(null);

    const gkhead = new Image;


    // const [ctx, setCtx] = useState('2d')


    const canvasRef = useRef(null)

    // const container = document.getElementById('canvacontainer')

    // const canvas //= canvasRef.current
    // const  ctx = '' //= canvas.getContext('2d');

    
    const canvasDim = {
        height: 600,
        width: 800,
    }

    const start = (ctx, lastX, lastY, dragStart, dragged, scaleFactor) => {
        trackTransforms(ctx);

        canvas.addEventListener('mousedown', (evt) => {
            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
            lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
            lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
            dragStart = ctx.transformedPoint(lastX, lastY);
            dragged = false;
        }, false);

        canvas.addEventListener('mouseup', (evt) => {
            dragStart = null;
            if (!dragged) { zoom(ctx, evt.shiftKey ? -1 : 1, lastX, lastY, scaleFactor); }
        }, false);

        canvas.addEventListener('mousemove', (evt) => {
            lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
            lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
            dragged = true;
            if (dragStart) {
                var pt = ctx.transformedPoint(lastX, lastY);
                ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
                redraw(ctx, canvasDim.width, canvasDim.height);
            }
        }, false);

        canvas.addEventListener('DOMMouseScroll', handleScroll, false);
        canvas.addEventListener('mousewheel', handleScroll, false);

    }

    const renderImage = (ctx) => {
        ctx.drawImage(gkhead, 0, 0);
        gkhead.src = props.image


    }


    
    let dragStart, dragged;


    useEffect((dragStart, dragged) => {
        // setCanvas(canvasRef.current)
        // canvas.getContext('2d')

        const scaleFactor = 1.1;
        const lastX = canvasDim.width / 2, lastY = canvasDim.height / 2;

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d');

        gkhead.src = props.image

        renderImage(ctx)


        // redraw(ctx, canvasDim.width, canvasDim.height)

        // start(ctx, lastX, lastY, dragStart, dragged, scaleFactor)

    }, []) //[canvas])

    
    // canvas.setAttribute('id', 'imagecanvas')

    // container.appendChild(canvas)

    // const canvas = document.getElementById('imagecanvas');

  
    
    

    



    


    return (
        <canvas height={canvasDim.height} id="imagecanvas" ref={canvasRef} width={canvasDim.width} ></canvas>
    )

}

export default ImageCanvas;

ImageCanvas.propTypes = {
    image: PropTypes.string,
}