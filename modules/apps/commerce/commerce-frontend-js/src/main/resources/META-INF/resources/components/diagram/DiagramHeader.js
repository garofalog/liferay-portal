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

import ClayButton from '@clayui/button';
import ClayDropDown from '@clayui/drop-down';
import { ClaySelect, ClaySelectWithOption} from '@clayui/form';
import ClaySlider from '@clayui/slider';
import PropTypes from 'prop-types';
import React, { useState } from 'react';



const DiagramHeader = (props) => {
    const [active, setActive] = useState(false);
    const [diameter, setDiameter] = useState(0)

    const diameters = [
        {
            label: "Small",
            value: 10,
        },
        {
            label: "Medium",
            value: 20,
        },
        {
            label: "Large",
            value: 30,
        }
    ];
    
    return (
        <div className="d-flex diagram diagram-header justify-content-between">
            <div className="d-flex text-align-center">

                <label className="align-middle my-auto">Circle Diagram:</label>

                <ClayDropDown
                    active={active}
                    className="my-auto"
                    onActiveChange={setActive}
                    trigger={
                        <ClayButton 
                            alt={'Click-to-select-custom-diameter'} 
                            className="ml-3 select-diameter"
                            displayType="secondary">
                            {diameter || 'Default-diameter'}
			            </ClayButton>
                    }
                >
                    <ClayDropDown.ItemList>
                        <ClayDropDown.Group header="STANDARD">
                            {diameters.map((item, i) => (
                            
                                <ClayDropDown.Item 
                                    key={i} 
                                    onClick={(event) => {
                                        // console.log(item.value)

                                        console.log(item.value)

                                        setDiameter(item.value)
                                    }}>
                                    {item.label}
                                </ClayDropDown.Item>
                            ))}
                        </ClayDropDown.Group>
                    </ClayDropDown.ItemList>
                    <ClayDropDown.Divider></ClayDropDown.Divider>
                    <ClayDropDown.Caption>
                        <div className="form-group">
                            <label htmlFor="slider">CUSTOM</label>
                            <ClaySlider id="slider" onValueChange={setDiameter} value={diameter} />
                        </div>

                    </ClayDropDown.Caption>
                </ClayDropDown>
            </div>

            <ClayButton className="auto-mapping my-auto pull-right" displayType="secondary">
                {'Auto-mapping'}
			</ClayButton>
        </div>
    )
}

DiagramHeader.defaultProps = {
//     options: [
//         {
//             label: "Option 1",
//             value: "1"
//         },
//         {
//             label: "Option 2",
//             value: "2"
//         }
//   ]
}

DiagramHeader.propTypes = {
    // options: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string,
    //         value: PropTypes.number
    //     })
    // )
}

export default DiagramHeader;