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

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import QuantitySelector from '../quantity_selector/QuantitySelector'

import AddToCartButton from './AddToCartButton'

const AddToCartWrapper = (props) => {
    const [quantity, setQuantity] = useState(props.quantity)

    // useEffect(() => {
    //     console.log(quantity)
    //     console.log("hello from wrapper component!")
    // },[quantity])

    return (
        <>
            <QuantitySelector

                // changeQuantity={setQuantity}

                disableQuantitySelector={props.disableQuantitySelector}
                orderQuantity={quantity}
                setQuantity={setQuantity}
                size="small"
                spritemap={props.spritemap}

            />
            <AddToCartButton 
                accountId={props.accountId}
                channelId={props.channelId}
                componentId={props.componentId}
                currencyCode={props.currencyCode}
                disableAddToCartButton={props.disableAddToCartButton}
                orderId={props.orderId}
                orderQuantity={quantity}
                productId={props.productId}
                skuId={props.skuId}
                spritemap={props.spritemap}
            />
        </>
    )
}

AddToCartWrapper.propTypes = {
    order: PropTypes.number
}

export default AddToCartWrapper;