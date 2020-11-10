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

import {ClayInput, ClaySelect} from '@clayui/form';
import ClayIcon, {ClayIconSpriteContext} from '@clayui/icon';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {createRef, useEffect, useState} from 'react';

import Datalist from '../datalist/Datalist';

function generateOptions(min, max, multiple = 1, allowedQuantity) {
	if(allowedQuantity !== [-1]) {
		return Array.from({length: allowedQuantity.length}).map((_, i) => <option key={i} value={allowedQuantity[i]}>{allowedQuantity[i]}</option>)
	}
	const optionsList = []
	for (let i = min; i <= max; i + multiple) {
		optionsList.push(<option key={i} value={i}>{i}</option>)
	}

	return optionsList;
}

function QuantitySelector(props) {
	const options = generateOptions(
		props.settings.min,
		props.settings.max,
		props.settings.multiple,
		props.settings.allowedQuantity
	)

	const content = (
		<div className="input-group input-group-sm quantity-selector simple">
			{(props.prependedIcon || props.prependedText) && (
				<div className="input-group-item input-group-item-shrink input-group-prepend">
					<span className="input-group-text">
						{props.prependedIcon ? (
							<ClayIcon
								spritemap={props.spritemap}
								symbol={props.prependedIcon}
							/>
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
					<Datalist
						disabled={props.disabled}
						size={props.size}
						updateQuantity={(e) => props.updateQuantity(e.target.value)}
					>
						{options}
					</Datalist>
				)}

				{props.style === 'select' && (
					<ClaySelect
						aria-label="Select Label"
						classnames={classnames(
							'quantitySelect',
							props.size === 'small' && 'form-control-sm',
							props.size === 'large' && 'form-control-lg'
						)}
						disabled={props.disabled}
						id="quantitySelect"
						onChange={(e) => props.updateQuantity('select', e.target.value)}
					>
						{options}
					</ClaySelect>
				)}
			</div>

			{(props.appendedIcon || props.appendedText) && (
				<div className="input-group-append input-group-item input-group-item-shrink">
					<span className="input-group-text">
						{props.appendedIcon ? (
							<ClayIcon
								spritemap={props.spritemap}
								symbol={props.appendedIcon}
							/>
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
	);
}

QuantitySelector.defaultProps = {
	disabled: false,
	style: 'datalist',
};

QuantitySelector.propTypes = {
	appendedIcon: PropTypes.string,
	appendedText: PropTypes.string,
	disableAddToCartButton: PropTypes.bool,
	disableQuantitySelector: PropTypes.bool,
	disabled: PropTypes.bool,
	inputName: PropTypes.string,
	orderQuantity: PropTypes.arrayOf(PropTypes.number),
	prependedIcon: PropTypes.string,
	prependedText: PropTypes.string,
	rtl: PropTypes.bool,
	settings: PropTypes.shape({
		allowedQuantity: PropTypes.arrayOf(PropTypes.number),
		maxQuantity: PropTypes.number,
		minQuantity: PropTypes.number,
		multipleQuantity: PropTypes.number,
	}),
	size: PropTypes.oneOf(['large', 'medium', 'small']),
	spritemap: PropTypes.string.isRequired,
	style: PropTypes.oneOf(['select', 'datalist']),
	updateQuantity: PropTypes.func,
};

export default QuantitySelector;
