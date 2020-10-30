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

// import classNames from 'classnames';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import ServiceProvider from '../../ServiceProvider/index';
import showNotification from '../../utilities/notifications';
import QuantitySelector from '../quantity_selector/QuantitySelector'

// import CustomSelect from '../quantity_selector/customSelect'

import AddToCartButton from './AddToCartButton';



const CartResource = ServiceProvider.DeliveryCartAPI('v1');

const AddToCartWrapper = (props) => {
    const [accountId, setAccountId] = useState(props.accountId)
    const [quantity, setQuantity] = useState(props.orderQuantity)

    // const [options, setOptions] = useState([])

    const [orderId, setOrderId] = useState(props.addToCartButton.orderId)
    const [multipleQuantity, setMultipleQuantity] = useState(props.settings.multipleQuantity)
    const [selectedQuantity, setSelectedQuantity] = useState()
    const [skuId, setSkuId] = useState(props.skuId)

    useEffect(() => {
        setMultipleQuantity(props.settings.multipleQuantity)
        if (props.settings.allowedQuantity[0].value !== -1) {
            setQuantity(props.settings.allowedQuantity)
            setMultipleQuantity(1) 
        }
        if (props.settings.multipleQuantity === undefined) {
            setMultipleQuantity(1) 
        }
    }, [props.settings])

    useEffect(() => {
        setQuantity(quantity)
    }, [props.orderQuantity])
        

    useEffect(() => {
        if (props.skuId !== skuId) {
            setSkuId(props.skuId)
        }
        if (props.accountId !== accountId) {
            setAccountId(props.accountId)
        }
        
    }, [accountId, props.accountId, props.skuId, skuId])

    // useEffect(() => {
    //     function handleOrderUpdated(data) {
    //         setOrderId(data.id)
    //     }
    //     Liferay.on(CURRENT_ORDER_UPDATED, handleOrderUpdated)

    //     return () => Liferay.detach(CURRENT_ORDER_UPDATED, handleOrderUpdated);
    // }, [])

    const updatedQuantity = (who, value) => {
        if (who === 'button') {
            handleAddToCartData(orderId, skuId)
        } else if (who === 'selector' && props.disableAddToCartButton) {
            handleAddToCartData(orderId, skuId)
        } else if (who === 'selector' && !props.disableAddToCartButton) {
            setSelectedQuantity(value)
        }
    }
    
    useEffect(() => {
        if (props.disableAddToCartButton) {
            props.handleAddToCartData(props.orderId, props.skuId)
        }
        console.log("trigg setSelectedQuantity")
    }, [props.setSelectedQuantity])

    const handleAddToCartData = (id, sku) => {
        let qty
        try {
            qty = multipleQuantity === 1 ? selectedQuantity : multipleQuantity * selectedQuantity
        } catch (error) {
            showNotification('Insert Quantity', 'danger', true, 500);
            qty = 0
        }
        if (!id || id === 0 && qty !== 0) {
            CartResource.createCartByChannelId(props.addToCartButton.channelId, {
                accountId: props.addToCartButton.accountId,
                cartItems: [{
                    // options: JSON.stringify(options),

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
                // options: JSON.stringify(options),

                productId: props.addToCartButton.productId,
                quantity: qty,
                sku,
            })
        }
    }

    return (
        props.disableAddToCartButton && props.disableQuantitySelector ? "all Add To Cart components disabled" : (
        <>
            <div>
                {props.settings.allowedQuantity[0].value !== -1 && (
                    <span className="">{Liferay.Language.get('select-the-product-quantity-allowedper-order')}</span>
                )}
                {props.settings.minQuantity > 1 && (
                    <span className="">{Liferay.Language.get('select-the-product-quantity-allowedper-order')}:&nbsp;{props.settings.minQuantity}</span>
                    )}
                {props.settings.maxQuantity < 999 && (
                    <span className="">{Liferay.Language.get('maximum-quantity-per-order')}:&nbsp;{props.settings.maxQuantity}</span>
                )}
                {multipleQuantity > 1 && (
                    <span className="">{Liferay.Language.get('multiple-quantity-per-order')}:&nbsp;{props.settings.multipleQuantity}</span>
                )}
            </div>

            {!props.disableQuantitySelector && !props.customQuantitySelector && (
                <QuantitySelector
                    disableAddToCartButton={props.disableAddToCartButton}
                    disableQuantitySelector={props.disableQuantitySelector}
                    orderQuantity={quantity}
                    setQuantity={setQuantity}
                    setSelectedQuantity={setSelectedQuantity}

                    // size="small"

                    skuId={props.skuId}
                    updatedQuantity={updatedQuantity}

                />
            )}

            {props.customQuantitySelector && (
                props.customQuantitySelector()
            )}

            {!props.disableAddToCartButton && !props.customAddToCartButton && (
                <AddToCartButton 
                    accountId={props.addToCartButton.accountId}
                    block={props.addToCartButton.block}
                    cartSymbol={props.addToCartButton.cartSymbol}
                    channelId={props.addToCartButton.channelId}
                    currencyCode={props.addToCartButton.currencyCode}
                    disableAddToCartButton={props.disableAddToCartButton}
                    disableQuantitySelector={props.disableQuantitySelector}
                    disabled={props.addToCartButton.disabledProp}
                    handleAddToCartData={handleAddToCartData}
                    iconOnly={props.iconOnly}
                    orderId={orderId}
                    orderQuantity={quantity}
                    productId={props.addToCartButton.productId}
                    rtl={props.addToCartButton.rtl}
                    setQuantity={setQuantity}
                    setSelectedQuantity={setSelectedQuantity}
                    skuId={props.skuId}
                    spritemap={props.addToCartButton.spritemap}
                    updatedQuantity={updatedQuantity}
                />
            )}

            {props.customAddToCartButton && (
                props.customAddToCartButton()
            )}

        </>
        )
    )
}

AddToCartWrapper.defaultProps = {
    // customAddToCartButton: (props) => <CustomSelect {...props} />,
    // customOptionsSelector: (props) => <CustomSelect {...props} />,
    // customQuantitySelector: (props) => <CustomSelect {...props} />,

    disableAddToCartButton: false,
    disableOptionsSelector: false,
    disableQuantitySelector: false,
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
        channelId: PropTypes.number.isRequired,
        currencyCode: PropTypes.string,
        disabledProp: PropTypes.bool,
        handleAddToCartData: PropTypes.func,
        iconOnly: PropTypes.bool,
        orderId: PropTypes.number.isRequired,
        productId: PropTypes.number.isRequired,
        productInCart: PropTypes.bool,
        rtl: PropTypes.bool,
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        spritemap: PropTypes.string.isRequired,
    }),
    customAddToCartButton: PropTypes.func,
    customOptionsSelector: PropTypes.func,
    customQuantitySelector: PropTypes.func,
    disableAddToCartButton: PropTypes.bool,
    disableOptionsSelector: PropTypes.bool,
    disableQuantitySelector: PropTypes.bool,
    optionsSelector: PropTypes.shape({
        handleOptions: PropTypes.func,
        options: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            options: PropTypes.arrayOf(PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            })),
            selectOrDatalist: PropTypes.oneOf(['select', 'datalist']),
            type: PropTypes.string
        })),
        size: PropTypes.string,
    }),
    orderQuantity: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.number,
        value: PropTypes.number
    })),
    quantitySelector: PropTypes.shape({
        appendedIcon: PropTypes.string,
        appendedText: PropTypes.string,
        disabledProp: PropTypes.bool,
        handleAddToCartData: PropTypes.func,
        inputName: PropTypes.string,
        onUpdate: PropTypes.func,
        prependedIcon: PropTypes.string,
        prependedText: PropTypes.string,
        selectOrDatalist: PropTypes.oneOf(['select', 'datalist']),
        spritemap: PropTypes.string,
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
    skuId: PropTypes.number.isRequired,
}

export default AddToCartWrapper;