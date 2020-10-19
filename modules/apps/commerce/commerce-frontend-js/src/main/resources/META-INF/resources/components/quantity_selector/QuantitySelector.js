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

import { ClaySelect } from '@clayui/form';
import ClayIcon, {ClayIconSpriteContext} from '@clayui/icon';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {createRef, useEffect, useState} from 'react';

import throttle from '../../utilities/throttle';

const THROTTLE_TIMEOUT = 1000;

function QuantitySelector(props) {
	// const [currentQuantity, setCurrentQuantity] = useState(props.orderQuantity);

	const defaultQuantity = [
		{
			label: 1,
			value: 1
		},
		{
			label: 2,
			value: 2
		},
		{
			label: 3,
			value: 3
		},
		{
			label: 4,
			value: 4
		},
		{
			label: 5,
			value: 5
		},
		{
			label: 6,
			value: 6
		},
		{
			label: 7,
			value: 7
		},
		{
			label: 8,
			value: 8
		},
		{
			label: 9,
			value: 9
		},
	]
	const [quantitySelector, setQuantitySelector] = useState(defaultQuantity)

	// useEffect(() => {
		
	// }, [quantitySelector])

	setTimeout(() => {
		console.log("partito")
		insertAllQuantity(1)
	},2000)

	const insertAllQuantity = async (n) => {
		const completeArray = []
		for (n; n < 99; n++) {
			completeArray.push({ 
				label: n,
				value: n 
			})
		}
		setQuantitySelector(completeArray)
	}





	

	useEffect(() => {
		if (props.throttleOnUpdate) {
			setIsThrottling(true);

			props.onUpdate(props.orderQuantity).then(() => setIsThrottling(false));
		}
		else {
			props.onUpdate(props.orderQuantity);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.orderQuantity]);


	const content = (
		<div className="quantity-selector">

			{props.settings.multipleQuantity > 1 ? <span className="Bundled quantity">{props.settings.multipleQuantity}</span> : null}
			
			<ClaySelect aria-label="Select Label" id="mySelectId">
				{quantitySelector.map(item => (
					<ClaySelect.Option
						key={item.value}
						label={item.label}
						onClick={() => props.setQuantity(item.value)}
						value={item.value}
					/>
				))}
			</ClaySelect>
		</div>
	);

	return !props.disableQuantitySelector && (
		props.spritemap ? (
			<ClayIconSpriteContext.Provider value={props.spritemap}>
				{content}
			</ClayIconSpriteContext.Provider>
		) : (
			content
		)
	)
}

QuantitySelector.propTypes = {
	appendedIcon: PropTypes.string,
	appendedText: PropTypes.string,
	disableAddButton: PropTypes.bool,
	disableQuantitySelector: PropTypes.bool,
	disabled: PropTypes.bool,
	handleAddToCartData: PropTypes.func,
	inputName: PropTypes.string,
	onUpdate: PropTypes.func,
	orderQuantity: PropTypes.number,
	prependedIcon: PropTypes.string,
	prependedText: PropTypes.string,
	setQuantity: PropTypes.func,
	settings: PropTypes.shape({
		allowedQuantity: PropTypes.arrayOf(PropTypes.number),
		maxQuantity: PropTypes.number,
		minQuantity: PropTypes.number,
		multipleQuantity: PropTypes.number
	}),
	size: PropTypes.oneOf(['large', 'medium', 'small']),
	skuId: PropTypes.number,
	spritemap: PropTypes.string,
	style: PropTypes.oneOf(['default', 'simple']),
	throttleOnUpdate: PropTypes.bool,
};

QuantitySelector.defaultProps = {
	disabled: false,
	onUpdate: () => {},
	orderQuantity: 1,
	settings: {
		allowedQuantity: [-1],
		maxQuantity: 999,
		minQuantity: 1,
		multipleQuantity: 4,
	},
	style: 'default',
	throttleOnUpdate: false,
};

export default QuantitySelector;
