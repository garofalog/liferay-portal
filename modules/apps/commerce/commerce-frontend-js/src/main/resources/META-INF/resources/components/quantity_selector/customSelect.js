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
import ClayIcon, { ClayIconSpriteContext } from '@clayui/icon';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { createRef, useEffect, useState } from 'react';

const CustomSelect = (props) => <ClaySelect {...props}/>

// {
//     const content = (
//         <div className="quantity-selector">

//             {props.style === 'datalist' && (
//                 <>
//                     <ClayInput
//                         aria-label="Select Label"
//                         className="quantitySelect"
//                         disabled={props.disabled}
//                         id="quantitySelect"
//                         list="quantity-selector-list"
//                         onChange={e => {
//                             if (e.target.value !== '') {
//                                 {
//                                     props.setSelectedQuantity([{
//                                         label: parseInt(e.target.value, 10),
//                                         value: parseInt(e.target.value, 10),
//                                     }])
//                                 }
//                             }
//                             if (props.disableAddToCartButton) {
//                                 props.handleAddToCartData(props.orderId, props.skuId)
//                             }
//                         }}
//                         type="number"
//                     >
//                     </ClayInput>
//                     <datalist id="quantity-selector-list">
//                         {props.orderQuantity.map(item => (
//                             <option
//                                 key={item.value}
//                                 label={item.label}
//                                 value={item.value} />

//                         ))}
//                     </datalist>
//                 </>
//             )}

//             {props.selectOrDatalist === 'select' && (
//                 <ClaySelect
//                     aria-label="Select Label"
//                     className="quantitySelect"
//                     disabled={props.disabled}
//                     id="quantitySelect"
//                     onChange={e => {
//                         props.setSelectedQuantity([{
//                             label: parseInt(e.target.value, 10),
//                             value: parseInt(e.target.value, 10),
//                         }])
//                         if (props.disableAddToCartButton) {
//                             props.handleAddToCartData(props.orderId, props.skuId)
//                         }
//                     }}
//                 >
//                     {props.orderQuantity.map(item => (
//                         <ClaySelect.Option
//                             key={item.value}
//                             label={item.label}
//                             value={item.value}
//                         />
//                     ))}
//                 </ClaySelect>
//             )}

//         </div>
//     );

//     return content
// }

export default CustomSelect;