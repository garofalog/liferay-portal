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
import OptionsSelector from '../options_selector/OptionsSelector'

import QuantitySelector from '../quantity_selector/QuantitySelector'

import CustomSelect from '../quantity_selector/customSelect'

import AddToCartButton from './AddToCartButton';


const CartResource = ServiceProvider.DeliveryCartAPI('v1');

const AddToCartWrapper = (props) => {
    const [quantity, setQuantity] = useState(props.orderQuantity)
    const [options, setOptions] = useState([])
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

    // useEffect(() => {
    //     console.log(options)
    // }, [options])

    const handleOptions = (array) => {
        const a = options
        let updatedA = []
        if (a.length < 1){
            updatedA.push(array[0])
        } else {
            const cu = a.filter(o => o.optionName !== array[0].optionName)
            cu.push(array[0])
            updatedA = cu
        }
        setOptions(JSON.stringify(updatedA))
    }

    const handleAddToCartData = (id, sku) => {
        let qty
        try {
            qty = multipleQuantity === 1 ? selectedQuantity[0].value : multipleQuantity * selectedQuantity[0].value
        } catch (error) {
            showNotification('Insert Quantity', 'danger', true, 500);
            qty = 0
        }
        if (!id || id === 0 && qty !== 0) {
            CartResource.createCartByChannelId(props.addToCartButton.channelId, {
                accountId: props.addToCartButton.accountId,
                cartItems: [{
                    options,
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
                options,
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

            {/****************************************************/}

            {!props.disableQuantitySelector && !props.customQuantitySelector && (
                <QuantitySelector
                    disableAddToCartButton={props.disableAddToCartButton}
                    disableQuantitySelector={props.disableQuantitySelector}
                    handleAddToCartData={handleAddToCartData}
                    orderQuantity={quantity}
                    selectOrDatalist={props.quantitySelector.selectOrDatalist}
                    setQuantity={setQuantity}
                    setSelectedQuantity={setSelectedQuantity}

                    // size="small"

                    skuId={props.skuId}
                />
            )}

            {props.customQuantitySelector && (
                props.customQuantitySelector()
            )}

            {/****************************************************/}

            {!props.disableOptionsSelector && !props.customOptionsSelector && (
                <OptionsSelector
                    handleOptions={handleOptions}
                    options={props.optionsSelector.options}
                    size={props.optionsSelector.size}
                />
            )}

            {props.customOptionsSelector && (
                props.customOptionsSelector()
            )}

            {/****************************************************/}

            {!props.disableAddToCartButton && !props.customAddToCartButton && (
                <AddToCartButton 
                    accountId={props.addToCartButton.accountId}
                    block={props.addToCartButton.block}
                    cartSymbol={props.addToCartButton.cartSymbol}
                    channelId={props.addToCartButton.channelId}

                    // componentId={props.componentId} // ????

                    currencyCode={props.addToCartButton.currencyCode}
                    disableAddToCartButton={props.disableAddToCartButton}
                    disableQuantitySelector={props.disableQuantitySelector}
                    disabled={props.addToCartButton.disabled}
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
                />
            )}

            {props.customAddToCartButton && (
                props.customAddToCartButton()
            )}

            {/****************************************************/}

        </>
        )
    )
}

AddToCartWrapper.defaultProps = {
    addToCartButton: {
        block: false,
        buttonTextContent: 'Add to Cart',
        disabledProp: false,
        iconOnly: false,
        productInCart: true, // its fake
        rtl: false
    },

    // customAddToCartButton: (props) => <CustomSelect {...props} />,
    // customOptionsSelector: (props) => <CustomSelect {...props} />,
    // customQuantitySelector: (props) => <CustomSelect {...props} />,

    disableAddToCartButton: false,
    disableOptionsSelector: false,
    disableQuantitySelector: false,
    optionsSelector: {
        options: [
            {
                name: 'size',
                options: [
                    {
                        label: 'Small',
                        value: 'S'
                    },
                    {
                        label: 'Medium',
                        value: 'M'
                    },
                    {
                        label: 'Big',
                        value: 'XL'
                    },
                ],
                selectOrDatalist: 'select',
                type: 'string',
            },
            {
                name: 'color',
                options: [
                    {
                        label: 'Red',
                        value: 'f00'
                    },
                    {
                        label: 'Grey',
                        value: '333'
                    },
                    {
                        label: 'Violet',
                        value: 'ee82ee'
                    },
                    {
                        label: 'Porphyry Red',
                        value: '984149'
                    },
                    {
                        label: 'Mouse Grey',
                        value: '6c6e6b'
                    },
                ],
                selectOrDatalist: 'datalist',
                type: 'string'
            },
            {
                name: 'availability',
                options: [
                    {
                        label: 'Available',
                        value: 'available'
                    },
                    {
                        label: 'In store only',
                        value: 'store'
                    },
                    {
                        label: 'Online',
                        value: 'online'
                    },
                ],
                selectOrDatalist: 'select',
                type: 'string'
            }
        ],
        size: '400'
    },
    quantitySelector: {
        disabled: false,
        selectOrDatalist: 'datalist',

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
        disabled: PropTypes.bool,
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