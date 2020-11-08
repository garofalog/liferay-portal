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

const ClayDatalist = (props) => {
    const name = props.options?.name || 'qty-datalist'
    const gHash = s => {
        const h = 0;
        if (s.length == 0)
            {return h}
        Array.from(s.length).forEach((h,i) => {
            var charCode = s.charCodeAt(i);
            h = ((h << 7) - h) + charCode;
            h = h & h;
        });

        return h
    }
    
    return (
        <>
            <ClayInput
                aria-label={name + `-` + gHash(name) + `-label`}
                className={classnames(
                    "quantitySelect",
                    "text-center",
                    props.size === 'small'
                        ? 'form-control-sm'
                        : props.size === 'large'
                            ? 'form-control-lg'
                            : null
                )}
                disabled={props.disabledProp}
                id={`cs-`}
                list={`cs-` + gHash(name) + `-list`}
                onChange={e => {
                    // eslint-disable-next-line no-unused-expressions
                    name === 'qty-datalist' && e.target.value !== ''
                    ? props.updateQuantity('select', parseInt(e.target.value, 10)) 
                    : props.updateOption()
                }}
                pattern={props.pattern}
                type={props.type}
            >
            </ClayInput>
            <datalist id={`cs-` + gHash(name) + `-list`}>
                {props.options.map( it => (
                    <option
                        key={it + gHash(name)}
                        label={it}
                        value={it} />
                ))}
            </datalist>
        </>
    )
}

ClayDatalist.defaultProps = {
    type: 'number'
}

ClayDatalist.propTypes = {
    handleOptions: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.number),
        pattern: PropTypes.string,
        style: PropTypes.oneOf(['select', 'datalist']),
        type: PropTypes.string
    })),
    size: PropTypes.string,
    type: PropTypes.string,
    updateOption: PropTypes.func,
    updateQuantity: PropTypes.func,
};

export default ClayDatalist;