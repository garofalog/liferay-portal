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

import { ClaySelectWithOption } from '@clayui/form';
import ClayIcon, { ClayIconSpriteContext } from '@clayui/icon';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import ServiceProvider from '../../ServiceProvider/index';
import showNotification from '../../utilities/notifications';
import Autocomplete from '../autocomplete/Autocomplete'

import Datalist from '../datalist/Datalist';


const AdminoptionsSelector = (props) => {

	// missing apis
	// const CartResource = ServiceProvider.DeliveryCartAPI('v1');
	// CartResource.createCartByChannelId(props.channelId, {
	// 	accountId: props.accountId,
	// 	cartItems: [itemPayload],
	// 	currencyCode: props.currencyCode,
	// }).then((data) => {
	// 	if (orderId !== data.id) {
	// 		setOrderId(data.id);
	// 	}
	// });

	{
		props.options.map((op1) => {
		const oppp = op1
			{
				oppp.option.map((op2) => {
			if (props.type === 'select') {
				
				return (
					<ClaySelectWithOption
						aria-label="Select Label"
						id="admin-option"
						options={op2}
					/>
				);
			}

			if (props.type === 'datalist') {
				return (
					<Datalist
						aria-label="Select Label"
						item={op}
						type="string"
					/>
				);
			}

			if (props.type === 'autocomplete') {
				return (
					<Autocomplete
						items={props.options.options}
					/>
				);
			}
		})}
		
	})}
	
};

AdminoptionsSelector.defaultProps = {
	options: [
		{
			name: 'size',
			options: [
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
		}
	],
	type: 'select',

}

AdminoptionsSelector.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		options: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		})),
		style: PropTypes.oneOf(['select', 'autocomplete', 'datalist']),
		type: PropTypes.string
	})),
	style: PropTypes.oneOf(['select','autocomplete','datalist']),
	updateOptions: PropTypes.func,
};

export default AdminoptionsSelector;
