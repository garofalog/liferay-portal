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

import {ClayIconSpriteContext} from '@clayui/icon';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import ServiceProvider from '../../ServiceProvider/index';
import {
	CURRENT_ACCOUNT_UPDATED,
	CURRENT_ORDER_UPDATED,
	CURRENT_PRODUCT_STATUS_CHANGED,
	PRODUCT_REMOVED_FROM_CART,
} from '../../utilities/eventsDefinitions';
import showNotification from '../../utilities/notifications';
import QuantitySelector from '../quantity_selector/QuantitySelector';
import AddToCartButton from './AddToCartButton';

const CartResource = ServiceProvider.DeliveryCartAPI('v1');

const AddToCartWrapper = (props) => {
	const [accountId, setAccountId] = useState(props.accountId);
    const [orderQuantity, setOrderQuantity] = useState(props.orderQuantity);
	const [orderId, setOrderId] = useState(props.orderId);
	
	const [multipleQuantity, setMultipleQuantity] = useState(props.settings.multipleQuantity)

	const [selectedQuantity, setSelectedQuantity] = useState()
	const [disabled, setDisabled] = useState()
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
		return (
			Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val === b[index])
		);
	};

	useEffect(() => {
		if (props.skuId !== skuId) {
			setSkuId(props.skuId)
		}
		function handleAccountUpdated({id}) {
			setAccountId(id);
		}
		if (props.accountId !== accountId) {
			setAccountId(props.accountId);
		}
		if (accountId === undefined || skuId === undefined) {
			setDisabled(true)
		} else {
			setDisabled(false)
		}
		Liferay.on(CURRENT_ACCOUNT_UPDATED, handleAccountUpdated);

		return () => {
			Liferay.detach(CURRENT_ACCOUNT_UPDATED, handleAccountUpdated);
		};
	}, [accountId, props.accountId]);

	useEffect(() => {
		if (!accountId || !props.skuId || !orderId) {
			setDisabled(true)
			showNotification('no-account-selected', 'danger',true, 500);
		} else {
			setDisabled(false)
		}
		props.addToCartButton.disabled = disabled
		props.quantitySelector.disabled = disabled
	}, [accountId, props.skuId, orderId])


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
    }, [orderId, props.orderId]);
    
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
                    quantity: qty,
                    sku
                }],
                currencyCode: props.currencyCode
            }).then((data) => {
                if (id !== data.id) {
                    setOrderId(data.id)
                }
            })
        } else {
            CartResource.createItemByCartId(id, {
                productId: props.productId,
                quantity: qty,
                sku,
            })
        }
    }

	return props.disableAddToCartButton && props.disableQuantitySelector ? (
		'all Add To Cart components disabled'
	) : (
		<ClayIconSpriteContext.Provider value={props.spritemap}>
			<div>
				{!arrayEquals(props.settings.allowedQuantity, [-1]) && (
					<span className="">
						{Liferay.Language.get(
							'select-the-product-quantity-allowed-per-order'
						)}
					</span>
				)}
				{props.settings.minQuantity > 1 && (
					<span className="">
						{Liferay.Language.get(
							'select-the-product-quantity-allowed-per-order'
						)}
						:&nbsp;{props.settings.minQuantity}
					</span>
				)}
				{props.settings.maxQuantity < 999 && (
					<span className="">
						{Liferay.Language.get('maximum-quantity-per-order')}
						:&nbsp;{props.settings.maxQuantity}
					</span>
				)}
				{props.settings.multipleQuantity > 1 && (
					<span className="">
						{Liferay.Language.get('multiple-quantity-per-order')}
						:&nbsp;{props.settings.multipleQuantity}
					</span>
				)}
			</div>

			{!props.disableQuantitySelector && !props.customQuantitySelector && (
				<QuantitySelector
					orderQuantity={orderQuantity}
					settings={props.settings}
					spritemap={props.spritemap}
					updateQuantity={updateQuantity}
				/>
			)}

			{props.customQuantitySelector && props.customQuantitySelector()}

			{!props.disableAddToCartButton && !props.customAddToCartButton && (
				<AddToCartButton
					block={props.addToCartButton.block}
					cartSymbol={props.addToCartButton.cartSymbol}
					disabled={disabled}
					iconOnly={props.iconOnly}
					rtl={props.addToCartButton.rtl}
                    updateQuantity={updateQuantity}
                />
            )}

			{props.customAddToCartButton && props.customAddToCartButton()}
		</ClayIconSpriteContext.Provider>
	);
};

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
	},
};

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
	orderId: PropTypes.number.isRequired,
	orderQuantity: PropTypes.arrayOf(PropTypes.number),
	productId: PropTypes.string.isRequired,
	quantitySelector: PropTypes.shape({
		appendedIcon: PropTypes.string,
		appendedText: PropTypes.string,
		disabled: PropTypes.bool,
		inputName: PropTypes.string,
        onUpdate: PropTypes.func,
		prependedIcon: PropTypes.string,
		prependedText: PropTypes.string,
		spritemap: PropTypes.string,
		style: PropTypes.oneOf(['select', 'datalist']),
	}),
	settings: PropTypes.shape({
		allowedQuantity: PropTypes.arrayOf(PropTypes.number),
		maxQuantity: PropTypes.number,
		minQuantity: PropTypes.number,
		multipleQuantity: PropTypes.number,
	}),
	skuId: PropTypes.number.isRequired,
	spritemap: PropTypes.string.isRequired,
};

export default AddToCartWrapper;
