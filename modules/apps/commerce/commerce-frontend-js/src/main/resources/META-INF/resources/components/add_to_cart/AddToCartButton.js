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

// import ServiceProvider from '../../ServiceProvider/index';
// import showNotification from '../../utilities/notifications';
// const CartResource = ServiceProvider.DeliveryCartAPI('v1');


const AddToCartButton = (props) => {
	const [buttonText, setButtonText] = useState('')
	const [updatingTransition, setUpdatingTransition] = useState('')

	// const [quantity, setQuantity] = useState(1)

	const [orderId, setOrderId] = useState(props.orderId)

	const [skuId, setSkuId] = useState(props.skuId)

	useEffect(() => {
		console.log("props.orderQuantity", props.orderQuantity)
		props.setQuantity(props.orderQuantity)
	},[props.orderQuantity])

	useEffect(() => {
		if (props.buttonTextContent) {
			setButtonText(props.buttonTextContent.replace(/ /,"-"))
		}
	}, [props.buttonTextContent])


	let markerStatus = ''
	if (props.orderQuantity) {
		markerStatus = 'active'
	}
	if (updatingTransition === 'adding')  {
		markerStatus = 'adding'
	}
	if (updatingTransition === 'incrementing') {
		markerStatus = 'incrementing'
	}

	if (buttonText === '') {
		setButtonText('add-to-cart')
	}

	
	return (

		<div className="add-to-cart add-to-cart-block">
			{props.iconOnly ? (
				<ClayButtonWithIcon 
					disabled={!props.accountId || props.disabledProp}
					onClick={() => props.handleAddToCartData(orderId, skuId)}
					spritemap={props.spritemap} 
					symbol={props.cartSymbol}
				/>
			) : (
				<ClayButton
					block={props.block}
					className="btn-add-to-cart btn-lg"
					disabled={!props.accountId || props.disabledProp}
					onClick={() => props.handleAddToCartData(orderId, skuId)}
				>

					{Liferay.Language.get(buttonText)}

					<span className={classNames("add-to-cart-icon-container inline-item inline-item-after", props.orderQuantity && 'active')}>
						<span className="add-to-cart-icon">
								<ClayIcon 
									spritemap={props.spritemap}
									symbol={props.cartSymbol} 
								/>
						</span>
						{props.productInCart && (
							<span className={classNames("add-to-cart-quantity-marker", markerStatus)} ></span>
						)}
					</span>

				</ClayButton>
			)}
			
		</div>
	)
}

AddToCartButton.defaultProps = {
	block: false,

	// buttonTextContent: 'Add to Cart',

	disabled: false,
	iconOnly: false,
	options: [],
	orderQuantity: 1,
	productInCart: true, // its fake
	settings: {}
}

AddToCartButton.propTypes = {
	accountId: PropTypes.number,
	block: PropTypes.bool,
	buttonTextContent: PropTypes.string,
	cartSymbol: PropTypes.string,
	currencyCode: PropTypes.string,
	disabledProp: PropTypes.bool,
	handleAddToCartData: PropTypes.func,
	iconOnly: PropTypes.bool,
	isBlock: PropTypes.bool,
	orderId: PropTypes.number,
	orderQuantity: PropTypes.number,
	productId: PropTypes.number.isRequired,
	productInCart: PropTypes.bool,
	setQuantity: PropTypes.func,
	settings: PropTypes.shape({
		allowedQuantity: PropTypes.arrayOf(PropTypes.number),
		maxQuantity: PropTypes.number,
		minQuantity: PropTypes.number,
		multipleQuantity: PropTypes.number
	}),

	// skuId: PropTypes.number,

	spritemap: PropTypes.string.isRequired,
};

export default AddToCartButton;
