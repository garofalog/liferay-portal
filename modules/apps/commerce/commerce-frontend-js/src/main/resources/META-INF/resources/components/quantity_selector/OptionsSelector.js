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

import { ClayInput, ClaySelect } from '@clayui/form';
import ClayIcon, {ClayIconSpriteContext} from '@clayui/icon';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {createRef, useEffect, useState} from 'react';

import throttle from '../../utilities/throttle';

// const THROTTLE_TIMEOUT = 1000;

function OptionsSelector(props) {

	const content = (
		<div className="quantity-selector">

			{props.selectOrDatalist === 'datalist' && (
				<>
					<ClayInput
						aria-label="Select Label"
						className="quantitySelect"
						disabled={props.disabled} 
						id="quantitySelect"
						list="quantity-selector-list"
						onChange={ e => {
							if (e.target.value !== '') {
								{props.setSelectedQuantity([{
									label: parseInt(e.target.value, 10),
									value: parseInt(e.target.value, 10),
								}])}
							}
							if (props.disableAddToCartButton) {
								props.handleAddToCartData(props.orderId, props.skuId)
							}
						}}
						type="number"
					>
					</ClayInput>
					<datalist id="quantity-selector-list">
						{props.orderQuantity.map(item => (
							<option 
								key={item.value}
								label={item.label}
								value={item.value} />
							
						))}
					</datalist>
				</>
			)}
			
			{props.selectOrDatalist === 'select' && (
				<ClaySelect 
					aria-label="Select Label"
					className="quantitySelect"
					disabled={props.disabled}
					id="quantitySelect"
					onChange={ e => {
						props.setSelectedQuantity([{
							label: parseInt(e.target.value, 10),
							value: parseInt(e.target.value, 10),
						}])
						if (props.disableAddToCartButton){
							props.handleAddToCartData(props.orderId, props.skuId)
						}
					}}
				>	
					{props.orderQuantity.map(item => (
						<ClaySelect.Option
							key={item.value}
							label={item.label}
							value={item.value}
						/>
					))}
				</ClaySelect>
			)}

		</div>
	);

	return props.spritemap ? (
		<ClayIconSpriteContext.Provider value={props.spritemap}>
			{content}
		</ClayIconSpriteContext.Provider>
		) : (
		content
	)
}

OptionsSelector.propTypes = {
	// appendedIcon: PropTypes.string,
	// appendedText: PropTypes.string,

	disableAddToCartButton: PropTypes.bool,
	disableQuantitySelector: PropTypes.bool,
	disabled: PropTypes.bool,
	handleAddToCartData: PropTypes.func,
	inputName: PropTypes.string,
	orderQuantity: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.number,
		value: PropTypes.number
	})),

	// prependedIcon: PropTypes.string,
	// prependedText: PropTypes.string,

	selectOrDatalist: PropTypes.oneOf(['select', 'datalist']),
	setQuantity: PropTypes.func,
	setSelectedQuantity: PropTypes.func,
	settings: PropTypes.shape({
		allowedQuantity: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.number,
			value: PropTypes.number
		})),
		maxQuantity: PropTypes.number,
		minQuantity: PropTypes.number,
		multipleQuantity: PropTypes.number
	}),

	// size: PropTypes.oneOf(['large', 'medium', 'small']),

	skuId: PropTypes.number,
	spritemap: PropTypes.string,

	// style: PropTypes.oneOf(['default', 'simple']),
};

export default OptionsSelector;
