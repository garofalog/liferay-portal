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

import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayInput } from '@clayui/form';
import { ClaySelect } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import { select } from 'd3'

import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import debounce from '../../utilities/debounce';
import Circles from './Circles'

// import DiagramFooter from './DiagramFooter';
// import DiagramHeader from './DiagramHeader';
// import ImageCanvas from './ImageCanvas'


const D3diagram = (props) => {

    const [data, setData] = useState([10, 20, 30, 40, 50, 60, 70, 80]);
    const updateData = useCallback(() => {
        const count = 5 + Math.round(Math.random() * 15);
        const values = [];
        for (let i = 0; i < count; i++) {
            values[i] = 10 + Math.round(Math.random() * 70);
        }
        setData(values);
    }, []);

    return (
        <>
            <button onClick={updateData}>Update Data</button>
            <Circles data={data} />
        </>
    );


}


D3diagram.defaultProps = {
    // imageSettings: {

    //     clicks: null, 
    //     ctx: null,
    //     imagePoints, 

    //     scaleFactor: 1,
    // }
};

D3diagram.propTypes = {
    // image: PropTypes.string,

    completeimageSettings: PropTypes.shape({
        height: PropTypes.number,
        lastX: PropTypes.number,
        lastY: PropTypes.number,
        scaleFactor: PropTypes.double,
        width: PropTypes.number,
    }),

    // myzoom: PropTypes.func,
    // setCanvas: PropTypes.func,
    // setCtxStore: PropTypes.func,
    // spritemap: PropTypes.string,
};

export default D3diagram;
