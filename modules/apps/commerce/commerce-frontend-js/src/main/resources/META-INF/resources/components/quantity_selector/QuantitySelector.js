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

function QuantitySelector(props) {

	const content = (
		<div className="quantity-selector">

			{props.selectOrDatalist === 'datalist' && (
				<>
					<ClayInput
						aria-label="Select Label"
						className="quantitySelect"
						disabled={props.disabledProp}
						id="quantitySelect"
						list="quantity-selector-list"
						onChange={ e => {
							if (e.target.value !== '') {
								props.updatedQuantity('selector', parseInt(e.target.value, 10))
							}
						}}
						pattern="[0-9]+" 
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
						props.updatedQuantity('selector', parseInt(e.target.value,10))	
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

QuantitySelector.defaultProps = {
	disabledProp: false,
	selectOrDatalist: 'datalist',
}

QuantitySelector.propTypes = {
	disableAddToCartButton: PropTypes.bool,
	disableQuantitySelector: PropTypes.bool,
	disabledProp: PropTypes.bool,
	inputName: PropTypes.string,
	orderQuantity: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.number,
		value: PropTypes.number
	})),
	rtl: PropTypes.bool,
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
	updatedQuantity: PropTypes.func

};

export default QuantitySelector;
