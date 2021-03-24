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
import { ClaySelect } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import PropTypes from 'prop-types';
import React from 'react';

import Datalist from '../datalist/Datalist'

const DiagramFooter = (props) => {
    const options = [
        {
            label: "175%",
            value: "175"
        },
        {
            label: "150%",
            value: "150"
        },
        {
            label: "125%",
            value: "125"
        },
        {
            label: "100%",
            value: "100"
        },
        {
            label: "75%",
            value: "75"
        },
        {
            label: "50%",
            value: "50"
        }
    ];
    
    return (
        <div className="d-flex diagram-footer justify-content-end mt-3">

            <ClayButton className="mr-3">
                <span className="inline-item inline-item-before">
                    <ClayIcon spritemap={props.spritemap} symbol="pin" />
                </span>
                Add Pin
            </ClayButton>

            <ClayButton className="mr-3">
                <span className="inline-item inline-item-before">
                    <ClayIcon spritemap={props.spritemap} symbol="expand" />
                </span>

                Expand
            </ClayButton>
            
            <div className="d-flex">

                <ClayButton 
                    className="" 
                    displayType="secondary" 
                >
                    -
                </ClayButton>
            
                <ClaySelect 
                    aria-label="Select Label" 
                    className="ml-3 mr-3" 
                    id="mySelectId">
                    {options.map(item => (
                        <ClaySelect.Option
                            key={item.value}
                            label={item.label}
                            value={item.value}
                        />
                    ))}
                </ClaySelect>

                <ClayButton 
                    className="" 
                    displayType="secondary">
                        +
                </ClayButton>

                {/* <Datalist items={options} /> */}


            </div>

            <ClayButton 
                className="ml-3 reset-zoom" 
                displayType="secondary"
                onClick={() => resetZoom()}>Reset Zoom</ClayButton>

        </div>     
        
    )
}

DiagramFooter.defaultProps = {

}

DiagramFooter.propTypes = {
    infos: PropTypes.shape({
        canvas: PropTypes.any,
        ctxStore: PropTypes.any
    }),
    myzoom: PropTypes.func,
    resetZoom: PropTypes.func
}

export default DiagramFooter;