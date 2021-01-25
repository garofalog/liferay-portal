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

const DiagramFooter = (props) => {
    const options = [
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
        <div className="d-flex diagram-footer justify-content-end">

            <ClayButton>
                <span className="inline-item inline-item-before">
                    <ClayIcon spritemap={props.spritemap} symbol="expand" />
                </span>

                {"Expand"}
            </ClayButton>
            
            <div className="d-flex">
                <ClayButton className="" displayType="secondary">{"-"}</ClayButton>
                <ClaySelect aria-label="Select Label" id="mySelectId">
                    {options.map(item => (
                        <ClaySelect.Option
                            key={item.value}
                            label={item.label}
                            value={item.value}
                        />
                    ))}
                </ClaySelect>
                <ClayButton className="" displayType="secondary">{"+"}</ClayButton>
            </div>

        </div>     
        
    )
}

DiagramFooter.defaultProps = {

}

DiagramFooter.propTypes = {
}

export default DiagramFooter;