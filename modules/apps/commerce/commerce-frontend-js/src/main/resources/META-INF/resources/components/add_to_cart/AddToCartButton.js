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

import ClayButton, {ClayButtonWithIcon} from '@clayui/button'

import ClayIcon, { ClayIconSpriteContext } from '@clayui/icon';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import ServiceProvider from '../../ServiceProvider/index';
import showNotification from '../../utilities/notifications';
const CartResource = ServiceProvider.DeliveryCartAPI('v1');


const AddToCartButton = (props) => {
	const [buttonText, setButtonText] = useState('')
	const [updatingTransition, setUpdatingTransition] = useState('')
	const [quantity, setQuantity] = useState(1)
	const [orderId, setOrderId] = useState(props.orderId)
	const [skuId, setSkuId] = useState(props.skuId)

	useEffect(() => {
		setQuantity(props.orderQuantity)
	},[props.orderQuantity, orderId])

	useEffect(() => {
		if (props.buttonTextContent) {
			setButtonText(props.buttonTextContent.replace(/ /,"-"))
		}
	}, [props.buttonTextContent])


	let markerStatus = ''
	if (quantity) {
		markerStatus = 'active'
	}
	if (updatingTransition === 'adding')  {
		markerStatus = 'adding'
	}
	if (updatingTransition === 'incrementing') {
		markerStatus = 'incrementing'
	}

	const createOrAddtoCart = id => {
		if (!id || id === 0 ) {	
			CartResource.createCartByChannelId(props.channelId, {
				accountId: props.accountId,
				cartItems: [{
					quantity,
					skuId
				}],
				currencyCode: props.currencyCode
			}).then((data) => {
				// console.log(data)

				if (id !== data.id) {
					setOrderId(data.id)
				}
			}).catch(err => {
				showNotification(err, 'danger', true, 500);
			})

		} else {
			CartResource.createItemByCartId(id, {
				productId: props.productId,
				quantity,
				skuId,
			})
		}
	}

	if (buttonText === '') {
		setButtonText('add-to-cart')
	}

	

	return (

	// props.iconOnly ? (
	// 	<ClayButtonWithIcon spritemap={props.spritemap} symbol="shopping-cart" />
	// ) : 

		<div className="add-to-cart add-to-cart-block">
			<ClayButton
				block={props.block}
				className="btn-add-to-cart btn-lg"
				disabled={!props.accountId}
				onClick={() => createOrAddtoCart(orderId)}
			>
				
				{/* { buttonText !== '' ? (
					{Liferay.Language.get(buttonText)})
				: (
					{Liferay.Language.get('add-to-cart')})
				}} */}
				{Liferay.Language.get(buttonText)}

				<span className={classNames("add-to-cart-icon-container inline-item inline-item-after", quantity && 'active')}>
					<span className="add-to-cart-icon">
						<ClayIcon spritemap={props.spritemap} symbol="shopping-cart" />
					</span>

					{props.productInCart && ( 
					<span className={classNames("add-to-cart-quantity-marker", markerStatus)} ></span>
					)}
				</span>
		
			</ClayButton>
		</div>
	)
}

AddToCartButton.defaultProps = {
	block: false,

	// buttonTextContent: 'Add to Cart',

	disabled: false,
	iconOnly: false,
	options: [],
	productInCart: true, // its fake
	settings: {}
}

AddToCartButton.propTypes = {
	accountId: PropTypes.number,
	block: PropTypes.bool,
	buttonTextContent: PropTypes.string,
	currencyCode: PropTypes.string,
	iconOnly: PropTypes.bool,
	isBlock: PropTypes.bool,
	orderId: PropTypes.number,
	orderQuantity: PropTypes.number,
	productId: PropTypes.number.isRequired,
	productInCart: PropTypes.bool,
	settings: PropTypes.shape({
		allowedQuantity: PropTypes.arrayOf(PropTypes.number),
		maxQuantity: PropTypes.number,
		minQuantity: PropTypes.number,
		multipleQuantity: PropTypes.number
	}),
	skuId: PropTypes.number,
	spritemap: PropTypes.string.isRequired,
};

export default AddToCartButton;
