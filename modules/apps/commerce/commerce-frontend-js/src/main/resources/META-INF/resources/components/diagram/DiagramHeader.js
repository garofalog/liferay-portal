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

import {ClayButton} from '@clayui/button';
import { ClayDropDownWithItems } from '@clayui/drop-down';
import { ClaySelect, ClaySelectWithOption} from '@clayui/form';
import ClaySlider from '@clayui/slider';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

const DiagramHeader = (props) => {
    const [value, setValue] = useState();
    const [range, setRange] = useState(10);

    const items = [
        {
            label: "clickable",
            onClick: () => {
                alert("you clicked!");
            }
        },
        {
            type: "divider"
        },
        {
            items: [
                {
                    label: "one",
                    type: "radio",
                    value: "one"
                },
                {
                    label: "two",
                    type: "radio",
                    value: "two"
                }
            ],
            label: "radio",
            name: "radio",
            onChange: (value) => alert("New Radio checked", value),
            type: "radiogroup"
        },
        {
            items: [
                {
                    checked: true,
                    label: "checkbox",
                    onChange: () => alert("checkbox changed"),
                    type: "checkbox"
                },
                {
                    checked: true,
                    label: "checkbox 1",
                    onChange: () => alert("checkbox changed"),
                    type: "checkbox"
                }
            ],
            label: "checkbox",
            type: "group"
        },
        {
            href: "#",
            label: "linkable"
        }
    ];

    
        
    
    
    return (
        <>
            <label>Circle Diagram:</label>
            {/* <ClaySelectWithOption
                aria-label="Select Label"
                id="mySelectId"
                options={props.options}
            /> */}
            
            <ClayDropDownWithItems
                caption="Showing 7 of 203 Structures"
                footerContent={
                    <>
                        <div className="form-group">
                            <label htmlFor="decadeSlider">{"Decades"}</label>

                            <ClaySlider
                                id="decadeSlider"
                                max={2020}
                                onValueChange={setRange}
                                step={10}
                                value={range}
                            />
                        </div>
                        {/* <ClayButton displayType="secondary">{"Cancel"}</ClayButton>
                        <ClayButton>{"Done"}</ClayButton> */}
                    </>
                }
                helpText="You can customize this menu or see all you have by pressing 'more'."
                items={items}
                onSearchValueChange={setValue}
                searchValue={value}
                searchable={true}
                spritemap={props.spritemap}
                trigger={
                    <ClaySelect aria-label="Select Label" id="mySelectId">

                        <ClaySelect.Option
                            key={1}
                            label={1}
                            value={'nuun'}
                        />

                    </ClaySelect>
                }
            />
            <ClayButton displayType="secondary">
                Auto mapping
			</ClayButton>
        </>
    )
}

DiagramHeader.defaultProps = {
    options: [
        {
            label: "Option 1",
            value: "1"
        },
        {
            label: "Option 2",
            value: "2"
        }
  ]
}

DiagramHeader.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number
        })
    )
}

export default DiagramHeader;