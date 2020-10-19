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

import ServiceProvider from '../../ServiceProvider/index';
import showNotification from '../../utilities/notifications';
import QuantitySelector from '../quantity_selector/QuantitySelector'

import AddToCartButton from './AddToCartButton';


const CartResource = ServiceProvider.DeliveryCartAPI('v1');

const AddToCartWrapper = (props) => {
    const [quantity, setQuantity] = useState()
    const [orderId, setOrderId] = useState(props.orderId)

    // const [skuId, setSkuId] = useState(props.skuId)



    const handleAddToCartData = (id, sku) => {

        useEffect(() => {
            quantity = props.orderQuantity
        }, [quantity])

        // if (props.disableAddToCartButton) {
        //     console.log('quantity>', quantity)
        //     setQuantity(quantity-1)
        // } else {
        //     // se 'addocart' button non cé
        //     // il submit parte cliccando su + o -
        // }

        if (!id || id === 0) {
            CartResource.createCartByChannelId(props.channelId, {
                accountId: props.accountId,
                cartItems: [{
                    quantity,
                    sku
                }],
                currencyCode: props.currencyCode
            }).then((data) => {
                // console.log(data)

                if (id !== data.id) {
                    setOrderId(data.id)
                }
            }).catch(err => {
                showNotification(err, 'danger', true, 500);
            })

        } else {
            CartResource.createItemByCartId(id, {
                productId: props.productId,
                quantity,
                sku,
            })
        }
    }

    // useEffect(() => {
    //     console.log(quantity)
    //     console.log("hello from wrapper component!")
    // },[quantity])

    return (
        <>
            {/* move all the props HERE - outside child components */}
            {/* <div>
                    {props.settings.allowedQuantity < [-1] && (<span className="">Select the product quantity allowed per order</span>)}
                    {props.settings.minQuantity > 1 && (<span className="">Minimum quantity per order: {props.settings.minQuantity}</span>)}
                    {props.settings.maxQuantity < 999 && (<span className="">Maximum quantity per order: {props.settings.maxQuantity}</span>)}
                    {props.settings.multipleQuantity > 1 && (<span className="">Multiple quantity per order: {props.settings.multipleQuantity}</span>)}
            </div> */}

            <QuantitySelector
                disableAddToCartButton={props.disableAddToCartButton}
                disableQuantitySelector={props.disableQuantitySelector}
                handleAddToCartData={handleAddToCartData}
                orderQuantity={quantity}
                setQuantity={setQuantity}
                size="small"
                skuId={props.skuId}
                spritemap={props.spritemap}

            />

            <AddToCartButton 
                accountId={props.accountId}
                cartSymbol={props.cartSymbol}
                channelId={props.channelId}
                componentId={props.componentId}
                currencyCode={props.currencyCode}
                disableAddToCartButton={props.disableAddToCartButton}
                disabledProp={props.disabledProp}
                handleAddToCartData={handleAddToCartData}
                iconOnly={props.iconOnly}
                orderId={orderId}
                orderQuantity={quantity}
                productId={props.productId}
                setQuantity={setQuantity}
                skuId={props.skuId}
                spritemap={props.spritemap}
            />
        </>
    )
}

AddToCartWrapper.defaultProps = {
    orderQuantity:1
}

AddToCartWrapper.propTypes = {
    orderId: PropTypes.number,
    skuId: PropTypes.number,
}

export default AddToCartWrapper;