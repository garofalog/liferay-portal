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

// import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import ServiceProvider from '../../ServiceProvider/index';
const CartResource = ServiceProvider.DeliveryCartAPI('v1');


function AddToCart(props) {
	const [updatingTransition, setUpdatingTransition] = useState('')
	const [quantity, setQuantity] = useState(props.orderQuantity)
	const [orderId, setOrderId] = useState(props.orderId)



	useEffect(() => {
		console.log(quantity)
	},[quantity, orderId])


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
	

	return (

	// props.iconOnly ? (
	// 	<ClayButtonWithIcon spritemap={props.spritemap} symbol="shopping-cart" />
	// ) : 

		<div className="add-to-cart add-to-cart-block">
			<ClayButton
				block={props.block}
				className="btn-add-to-cart btn-lg"

				// className="b-0 d-flex flex-row-reverse justify-content-center px-3 py-2"

				disabled={!props.accountId}
				onClick={() => {
					CartResource.createItemByCartId(props.orderId, {
						productId: props.productId,
						quantity,
						skuId: props.skuId,
					})
				}}
			>
				{/* missing no-product > icona spenta */}
				{/* <span className="ml-2"> */}
				{Liferay.Language.get(
					'add-to-cart'
				)}


				<span className={classNames("add-to-cart-icon-container inline-item inline-item-after", quantity && 'active')}>
					<span className="add-to-cart-icon">
						<ClayIcon spritemap={props.spritemap} symbol="shopping-cart" />
					</span>
					<span className={classNames("add-to-cart-quantity-marker", markerStatus)} ></span>
				</span>

				

					{/* <div>
						<ClayIcon spritemap={props.spritemap} symbol="shopping-cart" />
						
						<svg className="cart-circle-container" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
							<circle className="cart-circle" cx="50" cy="50" r="50" />
						</svg>
						
					</div>
				{/* </span> */}

				
			</ClayButton>
		</div>
	)
}

AddToCart.defaultProps = {
	block: false,

	disabled: false,

	// displayStyle: "block",

	iconOnly: false,
	options: [],
	settings: {}
}

AddToCart.propTypes = {
	accountId: PropTypes.number,

	block: PropTypes.bool,

	// displayStyle: PropTypes.oneOf(['block', 'inline']),

	iconOnly: PropTypes.bool,
	isBlock: PropTypes.bool,
	orderId: PropTypes.number,
	orderQuantity: PropTypes.number,
	productId: PropTypes.number.isRequired,
	settings: PropTypes.shape({
		allowedQuantity: PropTypes.arrayOf(PropTypes.number),
		maxQuantity: PropTypes.number,
		minQuantity: PropTypes.number,
		multipleQuantity: PropTypes.number
	}),
	spritemap: PropTypes.string.isRequired,

	// textContent: PropTypes.string,
	// updatingTransition: PropTypes.oneOf(['adding', 'incrementing']),
};

export default AddToCart;
