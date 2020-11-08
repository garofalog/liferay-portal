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
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { CURRENT_ORDER_UPDATED } from '../../utilities/eventsDefinitions'

import showNotification from '../../utilities/notifications';

const AddToCartButton = (props) => {
	const quantityMarkerRef = useRef(null)
	const [markerStatus, setMarkerStatus] = useState('')

	useEffect(() => {

		function _handleMarkerAnimation() {
			setMarkerStatus(null)
			quantityMarkerRef.current?.removeEventListener(
				'animationend',
				_handleMarkerAnimation
			);
		}

		if (props.quantity !== 0) {
			setMarkerStatus('adding')
		} 

		// else {
		// 	setmarkerStatus('incrementing')
		// }

		quantityMarkerRef.current?.addEventListener(
			'animationend',
			_handleMarkerAnimation
		);		
		
	}, [props.quantity])

	let markerStatusClass = ''
	if (markerStatus === 'adding')  {
		markerStatusClass = 'adding'
	} else if (markerStatus === 'incrementing') {
		markerStatusClass = 'incrementing'
	} else if (props.orderQuantity && props.orderQuantity > 0) {
		markerStatusClass = 'active'
	} 
	
	return (

		<div className="add-to-cart add-to-cart-block">
			{props.iconOnly ? (
				<ClayButtonWithIcon 
					block={props.block}
					disabled={props.disabled}
					onClick={() => props.updateQuantity('button', 1)}
					spritemap={props.spritemap} 
					symbol={props.cartSymbol}
				/>
			) : (
				<ClayButton
					block={props.block}
					className={
						classnames(
							'btn-add-to-cart',
							props.rtl ? 'rtl' : 'trl',
							props.size === 'small'
							? 'btn-sm'
							: props.size === 'large'
							? 'btn-lg'
							: null 
						)
					}
					disabled={props.disabledProp}
					onClick={() => props.updateQuantity('button', 1)}
				>

					{props.buttonTextContent  }

					<span className={
						classnames(
							"add-to-cart-icon-container inline-item", 
							props.orderQuantity && 'active', 
							props.rtl ? 'mr-2' : 'ml-2'
						)
					}>
						<span className="add-to-cart-icon">
								<ClayIcon 
									spritemap={props.spritemap}
									symbol={props.cartSymbol} 
								/>
						</span>
						<span className={classnames("add-to-cart-quantity-marker", markerStatusClass)} ref={quantityMarkerRef} ></span>
					</span>
				</ClayButton>
			)}
			
		</div>
	)
}

AddToCartButton.defaultProps = {
	block: false,
	buttonTextContent: Liferay.Language.get('add-to-cart'),
	cartSymbol: 'shopping-cart',
	disabled: false,
	iconOnly: false,
	rtl: false
}

AddToCartButton.propTypes = {
	block: PropTypes.bool,
	buttonTextContent: PropTypes.string,
	cartSymbol: PropTypes.string,
	disabled: PropTypes.bool,
	iconOnly: PropTypes.bool,
	orderQuantity: PropTypes.arrayOf(PropTypes.number),
	quantity: PropTypes.number,
	rtl: PropTypes.bool,
	spritemap: PropTypes.string.isRequired,
	updateQuantity: PropTypes.func
};

export default AddToCartButton;
