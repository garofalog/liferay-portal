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

import ClayIcon from '@clayui/icon';
import PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';


const ZoomController = ({ 
    position, 
    spritemap, 
    zoomIn, 
    zoomOut 
}) => {

    const zoomButtonStyle = {
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        top: position.top,
    }

    return (
        <div id="zoom-controller" style={zoomButtonStyle}>

            <div className="box plus" onClick={() => zoomIn}>
                <ClayIcon className="icon" spritemap={spritemap} symbol="plus" />
            </div>

            <div className="box hr" onClick={() => zoomOut}>
                <ClayIcon className="icon" spritemap={spritemap} symbol="hr" />
            </div>

        </div>

    )
}

export default ZoomController;

ZoomController.propTypes = {
    position: PropTypes.shape({
        bottom: PropTypes.string,
        left: PropTypes.string,
        right: PropTypes.string,
        top: PropTypes.string,
    }),
    spritemap: PropTypes.string,
    zoomIn: PropTypes.func,
    zoomOut: PropTypes.func,
}

