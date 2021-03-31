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

import ClayAutocomplete from '@clayui/autocomplete';
import ClayButton from '@clayui/button';
import ClayCard from '@clayui/card';
import { useResource } from '@clayui/data-provider';
import ClayDropDown from '@clayui/drop-down';
import ClayForm, { ClayInput, ClayRadio, ClayRadioGroup } from '@clayui/form';
import PropTypes from 'prop-types';
import React, {useState} from 'react'


const AdminTooltip = ({
    
}) => {
    const [value, setValue] = useState('sku');
    const [loading] = useState(true);
    const [autoValue, setAutoValue] = useState("");

    const [atValue, setAtValue] = useState("");
    const [networkStatus, setNetworkStatus] = useState(4);
    const { resource } = useResource({
        fetchPolicy: "cache-first",
        link: "https://rickandmortyapi.com/api/character/",
        onNetworkStatusChange: setNetworkStatus,
        variables: { name: value }
    });

    const initialLoading = networkStatus === 1;
    const loadingAd = networkStatus < 4;
    const error = networkStatus === 5;

    return (
        <div className="admin-tooltip">

            <ClayCard>
                <ClayCard.Body>

                    <ClayCard.Description displayType="text" truncate={false}>
                        
                        <ClayForm.Group className="row">
                            <div className="col-12 text-left">
                                <label htmlFor="basicInputText">Position</label>
                                <ClayInput
                                    id="basicInputText"
                                    placeholder="Insert your name here"
                                    type="text"
                                />
                            </div>
                            
                            <div className="col-12">
                                <ClayRadioGroup
                                    className="d-flex justify-content-start mt-4"
                                    inline
                                    onSelectedValueChange={val => setValue(val)}
                                    selectedValue={value}
                                >
                                    <ClayRadio label="Linked to SKU" value="sku" />
                                    <ClayRadio label="Linked to Diagram" value="diagram" />
                                </ClayRadioGroup>
                            </div>

                            <div className="col-10 text-left">
                                <label htmlFor="basicInputText">SKU</label>
                                <ClayAutocomplete>
                                    <ClayAutocomplete.Input
                                        onChange={event => setValue(event.target.value)}
                                        placeholder="Type here"
                                        value={value}
                                    />
                                    <ClayAutocomplete.DropDown
                                        active={(!!resource && !!value) || initialLoading}
                                    >
                                        <ClayDropDown.ItemList>
                                            {(error || (resource && resource.error)) && (
                                                <ClayDropDown.Item className="disabled">
                                                    No Results Found
                                                </ClayDropDown.Item>
                                            )}
                                            {!error &&
                                                resource &&
                                                resource.results &&
                                                resource.results.map(item => (
                                                    <ClayAutocomplete.Item
                                                        key={item.id}
                                                        match={value}
                                                        value={item.name}
                                                    />
                                                ))}
                                        </ClayDropDown.ItemList>
                                    </ClayAutocomplete.DropDown>
                                    {loadingAd && <ClayAutocomplete.LoadingIndicator />}
                                </ClayAutocomplete>
                            </div>

                            <div className="col-2">
                                <label htmlFor="basicInputText">Qty</label>
                                <ClayInput
                                    id="basicInputText"
                                    type="number"
                                />
                            </div>

                            <div className="col-6 d-flex justify-content-start mt-4">
                                <ClayButton displayType="link">
                                    Delete
			                    </ClayButton>
                            </div>
                            <div className="col-6 d-flex justify-content-between mt-4">
                                <ClayButton displayType="secondary">
                                    Cancel
                                </ClayButton>
                                <ClayButton displayType="primary">
                                    Save
			                    </ClayButton>
                            </div>
                            
                        </ClayForm.Group>

                    </ClayCard.Description>
                </ClayCard.Body>
            </ClayCard>

        </div>
    )
}

AdminTooltip.defaultProps = {

}

AdminTooltip.propTypes = {

}

export default AdminTooltip;

