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
import React, {useState} from 'react';

import DiagramFooter from './DiagramFooter';
import DiagramHeader from './DiagramHeader';
import ImageCanvas from './ImageCanvas'

import { handleScroll, redraw, start, trackTransforms, zoom } from './functions'

const Diagram = (props) => {
    const [canvas, setCanvas] = useState(null);
    const [ctxStore, setCtxStore] = useState(null)

    const completeimageSettings = {
        height: props.imageSettings.height,
        lastX: props.imageSettings.width / 2,
        lastY: props.imageSettings.height / 2,
        scale: 1.1, //props.imageSettings.scaleFactor,
        width: props.imageSettings.width,

    }

    const myzoom = () => {

        zoom(ctxStore, clicks, completeimageSettings.lastX, completeimageSettings.lastY, completeimageSettings.scaleFactor)
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


    return (
        <div className="diagram mx-auto">
            
            <DiagramHeader  />

            <div id="canvacontainer"></div>
            {/* <canvas id="imagecanvas"></canvas> */}
            <ImageCanvas image={props.image} imageSettings={completeimageSettings} setCanvas={setCanvas} setctxStore={setCtxStore}/>
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
