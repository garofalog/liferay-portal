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

import { ClayInput, ClaySelect } from '@clayui/form';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { createRef, useEffect, useState } from 'react';

import ClayDatalist from '../clay_datalist/ClayDatalist'

const OptionsSelector = (props) => {

    let optionStyle
    if (props.size === 'block') {
        optionStyle = {
            display: 'block',
            width: '100%',
        }
    } else if (props.size === 'limited') {
        optionStyle = {
            display: 'block',
            width: '176px',
        }
    } else {
        const n = parseInt(props.size, 10)
        const wid = n + 'px'
        optionStyle = {
            display: 'block',
            width: wid,
        }
    }

    const content = (
        <div className='options-selector' style={optionStyle}>

            {props.options && props.options.map((op, i) => {
                if (op.selectOrDatalist === 'datalist'){           
                    return (
                    <ClayDatalist
                        handleOptions={props.handleOptions}
                        options={op} />
                    ) 
                }
                if (op.selectOrDatalist === 'select') {
                    return (
                        <ClaySelect
                            aria-label={op.name + `-label`}
                            className="options-selector-item"
                            id={`order-select-` + i}
                            onChange={e => {
                                props.handleOptions([{
                                    label: e.target.value,
                                    optionName: op.name,
                                    value: e.target.value,
                                }])
                            }}
                        >
                            {op.options.map((item, i) => (
                                <ClaySelect.Option
                                    key={item.value.replace(/ /,'') + i}
                                    label={item.label}
                                    value={item.value}
                                />
                            ))}
                        </ClaySelect>
                    )
                }
                
            })}

        </div>

    );

    return content
};

OptionsSelector.defaultProps = {
    options: {
        options: [
            {
                name: 'size',
                options: [
                    {
                        label: 'Select a size',
                        value: ''
                    },
                    {
                        label: 'Small',
                        value: 'S'
                    },
                    {
                        label: 'Medium',
                        value: 'M'
                    },
                    {
                        label: 'Big',
                        value: 'XL'
                    },
                ],
                selectOrDatalist: 'select',
                type: 'string',
            },
            {
                name: 'color',
                options: [
                    {
                        label: 'Red',
                        value: 'f00'
                    },
                    {
                        label: 'Grey',
                        value: '333'
                    },
                    {
                        label: 'Violet',
                        value: 'ee82ee'
                    },
                    {
                        label: 'Porphyry Red',
                        value: '984149'
                    },
                    {
                        label: 'Mouse Grey',
                        value: '6c6e6b'
                    },
                ],
                selectOrDatalist: 'datalist',
                type: 'string'
            },
            {
                name: 'availability',
                options: [
                    {
                        label: 'Select Availability',
                        value: ''
                    },
                    {
                        label: 'Available',
                        value: 'available'
                    },
                    {
                        label: 'In store only',
                        value: 'store'
                    },
                    {
                        label: 'Online',
                        value: 'online'
                    },
                ],
                selectOrDatalist: 'select',
                type: 'string'
            }
        ],
        size: 'limited',
    },
}

OptionsSelector.propTypes = {
    handleOptions: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })),
        selectOrDatalist: PropTypes.oneOf(['select', 'datalist']),
        type: PropTypes.string
    })),
    size: PropTypes.string
};

export default OptionsSelector;
