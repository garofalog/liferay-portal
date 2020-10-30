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

import { CURRENT_ORDER_UPDATED } from '../../utilities/eventsDefinitions'

const AddToCartButton = (props) => {
	const [updatingTransition, setUpdatingTransition] = useState('') // <--

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
	
	return (

		<div className="add-to-cart add-to-cart-block">
			{props.iconOnly ? (
				<ClayButtonWithIcon 
					block={props.block}
					disabled={props.disabledProp}
					onClick={() => props.updatedQuantity('button', 1)}
					spritemap={props.spritemap} 
					symbol={props.cartSymbol}
				/>
			) : (
				<ClayButton
					block={props.block}
						className={classNames('btn-add-to-cart btn-lg', props.rtl ? 'rtl' : 'trl')}
					disabled={!props.accountId || props.disabled}
					onClick={() => props.updatedQuantity('button', 1)}
				>

					{props.buttonTextContent || Liferay.Language.get('add-to-cart')}

					<span className={classNames("add-to-cart-icon-container inline-item", props.orderQuantity && 'active', props.rtl ? 'mr-2' : 'ml-2')}>
						<span className="add-to-cart-ƒicon">
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
	buttonTextContent: 'Add to Cart',
	disabledProp: false,
	iconOnly: false,
	productInCart: true, // its fake
	rtl: false
}

AddToCartButton.propTypes = {
	accountId: PropTypes.number,
	block: PropTypes.bool,
	buttonTextContent: PropTypes.string,
	cartSymbol: PropTypes.string,
	disableAddToCartButton: PropTypes.bool,
	disableQuantitySelector: PropTypes.bool,
	disabledProp: PropTypes.bool,
	iconOnly: PropTypes.bool,
	orderId: PropTypes.number,
	orderQuantity: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.number,
		value: PropTypes.number
	})),
	productId: PropTypes.number.isRequired,
	productInCart: PropTypes.bool,
	rtl: PropTypes.bool,
	skuId: PropTypes.number,
	spritemap: PropTypes.string.isRequired,
	updatedQuantity: PropTypes.func
};

export default AddToCartButton;
