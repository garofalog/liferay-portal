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

	return (
		<ClaySelectWithOption
			aria-label="Select Label"
			id="admin-option"
			options={props.options}
		/>
	);
};



AdminoptionsSelector.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.string
		})
	)
};

export default AdminoptionsSelector;
