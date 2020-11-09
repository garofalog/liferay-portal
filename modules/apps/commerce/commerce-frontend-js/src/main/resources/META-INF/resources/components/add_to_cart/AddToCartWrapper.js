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
    const [orderQuantity, setOrderQuantity] = useState(props.orderQuantity)
    const [disabled, setDisabled] = useState(undefined)

    // const [options, setOptions] = useState([])

    const [orderId, setOrderId] = useState(props.orderId)
    const [multipleQuantity, setMultipleQuantity] = useState(props.settings.multipleQuantity)
    const [selectedQuantity, setSelectedQuantity] = useState()
    const [skuId, setSkuId] = useState(props.skuId)

    useEffect(() => {
        setMultipleQuantity(props.settings.multipleQuantity)
        if (!arrayEquals(props.settings.allowedQuantity, [-1]) && props.settings.allowedQuantity !== undefined) {
            setOrderQuantity(props.settings.allowedQuantity)
            setMultipleQuantity(1) 
        } else {
            const quantities = Array.from({ length: props.settings.maxQuantity }, (_, i) => i + 1)
            setOrderQuantity(quantities)
        }
        if (props.settings.multipleQuantity === undefined) {
            setMultipleQuantity(1) 
        }

    }, [props.settings, props.orderQuantity])

        
    

    const arrayEquals = (a, b) => {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    useEffect(() => {
        if (props.skuId !== skuId) {
            setSkuId(props.skuId)
        }
        if (props.accountId !== accountId) {
            setAccountId(props.accountId)
        }

        if (accountId === undefined || skuId === undefined) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        
    }, [accountId, props.accountId, props.skuId, skuId])

    useEffect(() => {
        if (orderId !== props.orderId) {
            setOrderId(props.orderId)
            setSelectedQuantity(0)

            // resetinputquantity
        }
        console.log("c")

    }, [orderId, props.orderId])

    const updateQuantity = (who, value) => {
        if (who === 'button') {
            handleAddToCartData(orderId, skuId)
        } else if (who === 'select' && props.disableAddToCartButton) {
            handleAddToCartData(orderId, skuId)
        } else if (who === 'select' && !props.disableAddToCartButton) {
            setSelectedQuantity(value)
        }
    }
    
    useEffect(() => {
        if (props.disableAddToCartButton) {
            props.handleAddToCartData(props.orderId, props.skuId)
        }
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
            CartResource.createCartByChannelId(props.channelId, {
                accountId: props.accountId,
                cartItems: [{
                    // options: JSON.stringify(options),

                    quantity: qty,
                    sku
                }],
                currencyCode: props.currencyCode
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

                productId: props.productId,
                quantity: qty,
                sku,
            })
        }
    }

    // useEffect(() => {
    //     if (disabled) {
    //         showNotification('no-account-selected', 'danger',true, 500);
    //     }
    // }, [disabled])

    useEffect(() => {

    },[props.productId])


    // credo la logica sia cambiata
    // function _handleCartProductRemoval({ skuId }) {
    //     if (skuId === parseInt(this.productId, 10) || skuId === 'all') {
    //         quantity = 0;
    //         _resetInputQuantity();
    //     }
    // }

    // function _doSubmit() {

    //     // return fetch(this.cartAPI, {
    //     //     body: formData,
    //     //     method: 'POST',
    //     // }).then((response) => response.json()).then((jsonResponse) => {

    //         if (jsonResponse.success) {

    //             Liferay.fire(CURRENT_ORDER_UPDATED, {
    //                 id: jsonResponse.orderId,
    //                 orderStatusInfo: jsonResponse.orderStatusInfo,
    //             });

    //             this._animateMarker(this.quantity);
    //             this.quantity = this.inputQuantity;
    //             this._resetInputQuantity(this);
    //         }
    //         else if (jsonResponse.errorMessages) {
    //             showNotification(jsonResponse.errorMessages[0], 'danger');
    //         }
    //         else {
    //             const validatorErrors = jsonResponse.validatorErrors;

    //             if (validatorErrors) {
    //                 validatorErrors.forEach((validatorError) => {
    //                     showNotification(validatorError.message, 'danger');
    //                 });
    //             }
    //             else {
    //                 showNotification(jsonResponse.error, 'danger');
    //             }
    //         }

    //     // })
    //     //     .catch(console.error);
    // }

    return (
        props.disableAddToCartButton && props.disableQuantitySelector ? "all Add To Cart components disabled" : (
        <>
            <div>
                {!arrayEquals(props.settings.allowedQuantity,[-1]) && (
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
                    orderQuantity={orderQuantity}
                    setOrderQuantity={setOrderQuantity}
                    setSelectedQuantity={setSelectedQuantity}
                    spritemap={props.spritemap}
                    updateQuantity={updateQuantity}
                />
            )}

            {props.customQuantitySelector && (
                props.customQuantitySelector()
            )}

            {!props.disableAddToCartButton && !props.customAddToCartButton && (
                <AddToCartButton 
                    block={props.addToCartButton.block}
                    cartSymbol={props.addToCartButton.cartSymbol}
                    disabled={props.addToCartButton.disabled}
                    iconOnly={props.iconOnly}
                    orderQuantity={orderQuantity}
                    rtl={props.addToCartButton.rtl}
                    setOrderQuantity={setOrderQuantity}
                    spritemap={props.spritemap}
                    updateQuantity={updateQuantity}
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
        maxQuantity: 100,
        minQuantity: 1,
        multipleQuantity: 1,
    }
}

AddToCartWrapper.propTypes = {
    accountId: PropTypes.number.isRequired,
    addToCartButton: PropTypes.shape({
        block: PropTypes.bool,
        buttonTextContent: PropTypes.string,
        cartSymbol: PropTypes.string,
        disabled: PropTypes.bool,
        iconOnly: PropTypes.bool,
        rtl: PropTypes.bool,
        size: PropTypes.oneOf(['large', 'medium', 'small']),
    }),
    channelId: PropTypes.string.isRequired,
    currencyCode: PropTypes.string,
    customAddToCartButton: PropTypes.func,
    customOptionsSelector: PropTypes.func,
    customQuantitySelector: PropTypes.func,
    disableAddToCartButton: PropTypes.bool,
    disableQuantitySelector: PropTypes.bool,
    orderId: PropTypes.number,
    orderQuantity: PropTypes.arrayOf(PropTypes.number),
    productId: PropTypes.string,
    quantitySelector: PropTypes.shape({
        appendedIcon: PropTypes.string,
        appendedText: PropTypes.string,
        disabled: PropTypes.bool,
        inputName: PropTypes.string,
        onUpdate: PropTypes.func,
        orderQuantity: PropTypes.arrayOf(PropTypes.number),
        prependedIcon: PropTypes.string,
        prependedText: PropTypes.string,
        spritemap: PropTypes.string,
        style: PropTypes.oneOf(['select', 'datalist']),
    }),
    setOrderQuantity: PropTypes.func,
    settings: PropTypes.shape({
        allowedQuantity: PropTypes.arrayOf(PropTypes.number),
        maxQuantity: PropTypes.number,
        minQuantity: PropTypes.number,
        multipleQuantity: PropTypes.number
    }),
    skuId: PropTypes.number.isRequired,
    spritemap: PropTypes.string.isRequired,
}

export default AddToCartWrapper;