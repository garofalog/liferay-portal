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

import ClayDatalist from '../clay_datalist/ClayDatalist'

function QuantitySelector(props) {

	const content = (
		<div className="input-group input-group-sm quantity-selector simple">
			{(props.prependedIcon || props.prependedText) && (
				<div className="input-group-item input-group-item-shrink input-group-prepend">
					<span className="input-group-text">
						{props.prependedIcon ? (
							<ClayIcon 
								spritemap={props.spritemap}
								symbol={props.prependedIcon} />
						) : (
							props.prependedText
						)}
					</span>
				</div>
			)}
			<div
				className={classnames(
					'input-group-item input-group-item-shrink',
					(props.appendedIcon || props.appendedText) &&
					'input-group-prepend'
				)}
			>

			{props.style === 'datalist' && (
				<ClayDatalist
					disabledProp={props.disabledProp}
					options={props.orderQuantity}
					size={props.size}
					updatedQuantity={props.updatedQuantity}
				/>
			)}
			
			{props.style === 'select' && (
					<ClaySelect 
						aria-label="Select Label"
						classnames={classnames(
							'quantitySelect',
							props.size === 'small' 
							? 'form-control-sm' 
							: props.size === 'large' 
							? 'form-control-lg' 
							: null 
						)}
						disabled={props.disabledProp}
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
			
			{(props.appendedIcon || props.appendedText) && (
				<div className="input-group-append input-group-item input-group-item-shrink">
					<span className="input-group-text">
						{props.appendedIcon ? (
							<ClayIcon
								spritemap={props.spritemap} 
								symbol={props.appendedIcon} />
						) : (
								props.appendedText
							)}
					</span>
				</div>
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
	style: 'datalist',

}

QuantitySelector.propTypes = {
	appendedIcon: PropTypes.string,
	appendedText: PropTypes.string,
	disableAddToCartButton: PropTypes.bool,
	disableQuantitySelector: PropTypes.bool,
	disabledProp: PropTypes.bool,
	inputName: PropTypes.string,
	orderQuantity: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.number,
		value: PropTypes.number
	})),
	prependedIcon: PropTypes.string,
	prependedText: PropTypes.string,
	rtl: PropTypes.bool,
	settings: PropTypes.shape({
		allowedQuantity: PropTypes.arrayOf(PropTypes.number),
		maxQuantity: PropTypes.number,
		minQuantity: PropTypes.number,
		multipleQuantity: PropTypes.number
	}),

	size: PropTypes.oneOf(['large', 'medium', 'small']),

	skuId: PropTypes.number,
	
	spritemap: PropTypes.string.isRequired,
	style: PropTypes.oneOf(['select', 'datalist']),

	updatedQuantity: PropTypes.func
};

export default QuantitySelector;
