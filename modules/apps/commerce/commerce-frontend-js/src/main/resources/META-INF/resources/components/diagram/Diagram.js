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
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import DiagramFooter from './DiagramFooter';
import DiagramHeader from './DiagramHeader';

const Diagram = (props) => {

    const style = {
        backgroundImage: `url(${props.image})`,
        backgroundPosition: `center center`,
        backgroundSize: `contain`,
        height: '500px',
        maxheight: '500px',
        maxwidth: '500px',
        width: '100%'
    }

    return (
        <div className="diagram mx-auto">
            <DiagramHeader/>

            <div style={style}></div>

            <DiagramFooter spritemap={props.spritemap}/>
        </div>
    );
};

Diagram.defaultProps = {
    
};

Diagram.propTypes = {
    image: PropTypes.string,
    spritemap: PropTypes.string,
};

export default Diagram;
