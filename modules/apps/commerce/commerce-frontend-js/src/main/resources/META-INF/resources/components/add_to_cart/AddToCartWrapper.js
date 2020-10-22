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
    const [quantity, setQuantity] = useState(props.orderQuantity)
    const [orderId, setOrderId] = useState(props.addToCartButton.orderId)
    const [multipleQuantity, setMultipleQuantity] = useState(props.settings.multipleQuantity)
    const [selectedQuantity, setSelectedQuantity] = useState()

    useEffect(() => {
        setMultipleQuantity(props.settings.multipleQuantity)
        if (props.settings.allowedQuantity[0].value !== -1) {
            setQuantity(props.settings.allowedQuantity)
            setMultipleQuantity(1) 
        }
        if (props.multipleQuantity === undefined) {
            setMultipleQuantity(1) 
        }
    }, [props.settings])

    const handleAddToCartData = (id, sku) => {
        const qty = multipleQuantity === 1 ? selectedQuantity[0].value : multipleQuantity * selectedQuantity[0].value
        if (!id || id === 0) {
            CartResource.createCartByChannelId(props.addToCartButton.channelId, {
                accountId: props.addToCartButton.accountId,
                cartItems: [{
                    quantity: qty,
                    sku
                }],
                currencyCode: props.addToCartButton.currencyCode
            }).then((data) => {
                if (id !== data.id) {
                    setOrderId(data.id)
                }
            }).catch(err => {
                showNotification(err, 'danger', true, 500);
            })
        } else {
            CartResource.createItemByCartId(id, {
                productId: props.addToCartButton.productId,
                quantity: qty,
                sku,
            })
        }
    }

    return (
        props.disableAddToCartButton && props.disableQuantitySelector ? "all Add To Cart components disabled" : (
        <>
            {/* move all the props HERE - outside child components */}
            <div>
                {props.settings.allowedQuantity[0].value !== -1 && (<span className="">Select the product quantity allowed per order</span>)}
                {props.settings.minQuantity > 1 && (<span className="">Minimum quantity per order: {props.settings.minQuantity}</span>)}
                {props.settings.maxQuantity < 999 && (<span className="">Maximum quantity per order: {props.settings.maxQuantity}</span>)}
                {multipleQuantity > 1 && (<span className="">Multiple quantity per order: {props.settings.multipleQuantity}</span>)}
            </div>

            {!props.disableQuantitySelector && (<QuantitySelector
                disableAddToCartButton={props.disableAddToCartButton}
                disableQuantitySelector={props.disableQuantitySelector}
                handleAddToCartData={handleAddToCartData}
                orderQuantity={quantity}
                setQuantity={setQuantity}
                setSelectedQuantity={setSelectedQuantity}
                size="small"
                skuId={props.skuId}
            />)}

            {!props.disableAddToCartButton && (<AddToCartButton 
                accountId={props.addToCartButton.accountId}
                cartSymbol={props.addToCartButton.cartSymbol}
                channelId={props.addToCartButton.channelId}
                componentId={props.componentId} // ????
                currencyCode={props.addToCartButton.currencyCode}
                disableAddToCartButton={props.disableAddToCartButton}
                disableQuantitySelector={props.disableQuantitySelector}
                disabled={props.addToCartButton.disabled}
                handleAddToCartData={handleAddToCartData}
                iconOnly={props.iconOnly}
                orderId={orderId}
                orderQuantity={quantity}
                productId={props.addToCartButton.productId}
                setQuantity={setQuantity}
                setSelectedQuantity={setSelectedQuantity}
                skuId={props.skuId}
                spritemap={props.addToCartButton.spritemap}
            />)}
        </>
        )
    )
}

AddToCartWrapper.defaultProps = {
    addToCartButton: {
        block: true,

        // buttonTextContent: 'Add to Cart'

        disabled: false,
        iconOnly: false,
        options: [],
        productInCart: true, // its fake
    },
    disableAddToCartButton: false,
    disableQuantitySelector: false,
    quantitySelector: {
        disabled: false,

        // style: 'default',
    },
    settings: {
        maxQuantity: 999,
        minQuantity: 1,
        multipleQuantity: 1,
    }
    
}

AddToCartWrapper.propTypes = {
    addToCartButton: PropTypes.shape({
        accountId: PropTypes.number,
        block: PropTypes.bool,
        buttonTextContent: PropTypes.string,
        cartSymbol: PropTypes.string,
        currencyCode: PropTypes.string,
        disabledProp: PropTypes.bool,
        handleAddToCartData: PropTypes.func,
        iconOnly: PropTypes.bool,
        orderId: PropTypes.number,
        productId: PropTypes.number.isRequired,
        productInCart: PropTypes.bool,
        spritemap: PropTypes.string.isRequired,
    }),
    disableAddToCartButton: PropTypes.bool,
    disableQuantitySelector: PropTypes.bool,
    orderQuantity: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.number,
        value: PropTypes.number
    })),
    quantitySelector: PropTypes.shape({
        appendedIcon: PropTypes.string,
        appendedText: PropTypes.string,
        disabled: PropTypes.bool,
        handleAddToCartData: PropTypes.func,
        inputName: PropTypes.string,
        onUpdate: PropTypes.func,
        prependedIcon: PropTypes.string,
        prependedText: PropTypes.string,
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        spritemap: PropTypes.string,
        style: PropTypes.oneOf(['default', 'simple']),
        throttleOnUpdate: PropTypes.bool,
    }),
    setQuantity: PropTypes.func,
    settings: PropTypes.shape({
        allowedQuantity: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.number,
            value: PropTypes.number
        })),
        maxQuantity: PropTypes.number,
        minQuantity: PropTypes.number,
        multipleQuantity: PropTypes.number
    }),
    skuId: PropTypes.number,
}

export default AddToCartWrapper;