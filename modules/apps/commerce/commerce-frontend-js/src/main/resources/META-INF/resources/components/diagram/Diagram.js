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

import { ClayInput } from '@clayui/form';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState } from 'react';

import DiagramFooter from './DiagramFooter';
import DiagramHeader from './DiagramHeader';

// import ImageCanvas from './ImageCanvas'

import { handleScroll, redraw, resetZoom, start, trackTransforms , zoom} from './functions'

const Diagram = (props) => {
    const [canvas, setCanvas] = useState(null);
    const [ctxStore, setCtxStore] = useState(null)
    const gkhead = new Image;
    const ball = new Image;


    const canvasRef = useRef(null)

    // const renderImage = (ctx) => {
    //     gkhead.src = props.image
    //     ctx.drawImage(gkhead, 0, 0, props.imageSettings.width, props.imageSettings.height);
    //     ctx.scale(.5,.5)
    //     ctx.drawImage(gkhead, props.imageSettings.width / 2, props.imageSettings.height/2, props.imageSettings.width, props.imageSettings.height);

    //     // ctx.drawImage(gkhead, 0, 0, 56 , 600);

    //     ctx.drawImage(gimg, 0, 0, width, height);

    // }

    useEffect(() => {

        let dragStart, dragged;

        // const lastX = props.imageSettings.width / 2, lastY = canvasDim.height / 2;

        const canvas = canvasRef.current
        setCanvas(canvas)
        const ctx = canvas.getContext('2d');
        setCtxStore(ctx)

        trackTransforms(ctx);

        // console.log(props.imageSettings)
        // gkhead.src = props.image

        gkhead.src = props.image
        props.image = gkhead
        ball.src = './assets/alphaball.png';

        // ctx.drawImage(gkhead, 0, 0, props.imageSettings.width, props.imageSettings.height);
        // ctx.scale(.5, .5)
        // ctx.drawImage(gkhead, props.imageSettings.width / 2, props.imageSettings.height / 2, props.imageSettings.width, props.imageSettings.height);

        redraw(ctx, props.imageSettings.width, props.imageSettings.height, gkhead)

        // redraw(ctx, props.imageSettings.width, props.imageSettings.height, ball)



        start(ctx, canvas, props.imageSettings.lastX, props.imageSettings.lastY, dragStart, dragged, props.imageSettings.scaleFactor)

        // renderImage(ctx)

    }, []) //[canvas])

    const completeimageSettings = {
        height: props.imageSettings.height,
        lastX: props.imageSettings.width / 2,
        lastY: props.imageSettings.height / 2,
        scale: 1.1, //props.imageSettings.scaleFactor,
        width: props.imageSettings.width,

    }

    const myzoom = () => {

        zoom(ctxStore, .5, completeimageSettings.lastX, completeimageSettings.lastY, completeimageSettings.scaleFactor)
    }

    const forfooter = {
        canvas,
        ctxStore
    }

    // const settingsObj = {
    //     ctx,
    //     clicks,
    //     lastX: props.imageSettings.width / 2,
    //     lastY: props.imageSettings.height / 2,
    //     scaleFactor: props.imageSettings.scaleFactor
    // }

    // const settingsObj = {
      
    //     lastX: props.imageSettings.lastX,
    //     lastY: props.imageSettings.lastY,
    //     scaleFactor: props.imageSettings.scaleFactor
    // }

    // const resetZoom = () => {
    //     ctxStore.drawImage(pr)
    // }


    return (
        <div className="diagram mx-auto">
            
            <DiagramHeader  />

            <div id="canvacontainer"></div>
            {/* <canvas id="imagecanvas"></canvas> */}
            {/* <ImageCanvas image={props.image} imageSettings={completeimageSettings} setCanvas={setCanvas} setctxStore={setCtxStore}/> */}
            <canvas
                height={completeimageSettings.lastY * 2}
                id="imagecanvas"
                ref={canvasRef}
                width={completeimageSettings.lastX * 2}>
            </canvas>
            {/* <div style={style}></div> */}

            <DiagramFooter infos={forfooter} myzoom={myzoom} spritemap={props.spritemap}/>

        </div>
    );
};

Diagram.defaultProps = {
    // imageSettings: {

    //     clicks: null, 
    //     ctx: null,
    //     imagePoints, 
        
    //     scaleFactor: 1,
    // }
};

Diagram.propTypes = {
    image: PropTypes.string,
    imageSettings: PropTypes.shape({
        height: PropTypes.number,
        scaleFactor: PropTypes.double,
        width: PropTypes.number,
    }),
    myzoom: PropTypes.func,
    setCanvas: PropTypes.func,
    setCtxStore: PropTypes.func,
    spritemap: PropTypes.string,
};

export default Diagram;
