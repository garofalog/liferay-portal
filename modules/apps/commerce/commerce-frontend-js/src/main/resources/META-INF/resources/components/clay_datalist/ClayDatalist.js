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
import React from 'react';

const ClayDatalist = (props) => {
    const op = props.options
    const gHash = string => {
        const h = 0;
        if (string.length == 0)
            {return h}
        Array.from(string.length).forEach((h,i) => {
            var charCode = string.charCodeAt(i);
            h = ((h << 7) - h) + charCode;
            h = h & h;
        });

        return h
    }
    
    return (
        <>
            <ClayInput
                aria-label={op.name + `-`+ gHash(op.name) + `-label`}
                className="options-selector-item"
                id={`order-select-`}
                list={`order-select-` + gHash(op.name) + `-list`}
                onChange={e => {
                    if (e.target.value !== '') {
                        props.handleOptions([{
                            label: e.target.value,
                            optionName: op.name,
                            value: e.target.value,
                        }])
                    }
                }}
                type={op.type}
            >
            </ClayInput>
            <datalist id={`order-select-` + gHash(op.name) + `-list`}>
                {op.options.map((it, i) => (
                    <option
                        key={it.label.replace(/ /, '-') + i}
                        label={it.value}
                        value={it.label} />
                ))}
            </datalist>
        </>
    )
}

ClayDatalist.propTypes = {
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
};

export default ClayDatalist;