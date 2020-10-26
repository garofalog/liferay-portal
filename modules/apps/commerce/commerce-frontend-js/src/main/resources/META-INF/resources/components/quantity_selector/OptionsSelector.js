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
import PropTypes from 'prop-types';
import React, {createRef, useEffect, useState} from 'react';


// const THROTTLE_TIMEOUT = 1000;

const OptionsSelector = (props) => {

	const content = (
		<div className="options-selector">


			{props.options && props.options.map( (op,i) => {
				
				return op.selectOrDatalist === 'datalist' ? (
						<>
							<ClayInput
								aria-label={op.name + `-label`}
								className="options-selector-item"
								id={`order-select-` + i}
								list={`order-select-` + i + `-list`}
								onChange={e => {
									// if (e.target.value !== '') {
									// 	{
									// 		props.setSelectedQuantity([{
									// 			label: parseInt(e.target.value, 10),
									// 			value: parseInt(e.target.value, 10),
									// 		}])
									// 	}
									// }
									// if (props.disableAddToCartButton) {
									// 	props.setOption('??')
									// }
								}}
								type={op.type}
							>
							</ClayInput>
								<datalist id={`order-select-` + i + `-list`}>
								{op.options.map(it => (
									<option
										key={it.label.replace(/ /,'-')}
										label={it.label}
										value={it.value} />
								))}
							</datalist>
						</>
					) : (
						<ClaySelect
							aria-label={op.name + `-label`}
							className="options-selector-item"
							id={`order-select-` + i}
							onChange={e => {
								// props.setSelectedQuantity([{
								// 	label: parseInt(e.target.value, 10),
								// 	value: parseInt(e.target.value, 10),
								// }])
								// if (props.disableAddToCartButton) {
								// 	props.handleAddToCartData(props.orderId, props.skuId)
								// }
							}}
						>
							{op.options.map(item => (
								<ClaySelect.Option
									key={item.value.replace(/ /,'')}
									label={item.label}
									value={item.value}
								/>
							))}
						</ClaySelect>
					)
				

				
			})}
				
				
					
					
				
			
				 

		</div>		

		
	);

	return content
};

OptionsSelector.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		options: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		})),
		selectOrDatalist: PropTypes.oneOf(['select', 'datalist']),
		type: PropTypes.string
	})),
};

export default OptionsSelector;
