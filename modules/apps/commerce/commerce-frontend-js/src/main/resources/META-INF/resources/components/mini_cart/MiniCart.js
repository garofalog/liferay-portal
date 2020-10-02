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

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';

import ServiceProvider from '../../ServiceProvider/index';
import {
	CURRENT_ACCOUNT_UPDATED,
	CURRENT_ORDER_UPDATED,
} from '../../utilities/eventsDefinitions';
import {showErrorNotification} from '../../utilities/notifications';
import CartItemsList from './CartItemsList';
import MiniCartContext from './MiniCartContext';
import Opener from './Opener';
import Wrapper from './Wrapper';
import {regenerateOrderDetailURL, resolveView} from './util/index';

const AJAX = ServiceProvider.DeliveryCartAPI('v1');
function MiniCart({
	cartActionURLs,
	cartItemsListView,
	cartView,
	displayDiscountLevels,
	orderId,
	spritemap,
}) {
	const [isOpen, setIsOpen] = useState(false),
		[isUpdating, setIsUpdating] = useState(false),
		[cartState, updateCartState] = useState({}),
		[actionURLs, setActionURLs] = useState(cartActionURLs),
		[CartView, setCartView] = useState(null);

	const closeCart = () => setIsOpen(false),
		openCart = () => setIsOpen(true);

	const updateCartModel = useCallback((orderId) => {
		AJAX.getCartByIdWithItems(orderId)
			.then((model) => {
				if (model.id !== orderId) {
					setActionURLs((prevActions) => {
						return {
							...prevActions,
							orderDetailURL: regenerateOrderDetailURL(
								prevActions.orderDetailURL,
								model.orderUUID
							),
						};
					});
				}
				updateCartState((prevState) => ({...prevState, ...model}));
			})
			.catch((error) => {
				showErrorNotification(error);
			});
	}, []);

	useEffect(() => {
		if (!CartView) {
			resolveView(cartView).then((view) => setCartView(() => view));
		}
	}, [CartView, cartView]);

	useEffect(() => {
		function handleOrderUpdated({id}) {
			updateCartModel(id);
		}

		Liferay.on(CURRENT_ORDER_UPDATED, handleOrderUpdated);

		return () => Liferay.detach(CURRENT_ORDER_UPDATED, handleOrderUpdated);
	}, [updateCartModel]);

	useEffect(() => {
		if (orderId && orderId !== 0) {
			updateCartModel(orderId);
		}
	}, [orderId, updateCartModel]);

	useEffect(() => {
		const resetCartState = () => updateCartState({});

		Liferay.on(CURRENT_ACCOUNT_UPDATED, resetCartState);

		return () => {
			Liferay.detach(CURRENT_ACCOUNT_UPDATED, resetCartState);
		};
	}, []);

	return (
		<MiniCartContext.Provider
			value={{
				AJAX,
				actionURLs,
				cartState,
				closeCart,
				displayDiscountLevels,
				isOpen,
				isUpdating,
				setIsUpdating,
				spritemap,
				updateCartModel,
				updateCartState,
			}}
		>
			{!!CartView && (
				<div className={classnames('mini-cart', isOpen && 'is-open')}>
					<div
						className="mini-cart-overlay"
						onClick={() => setIsOpen(false)}
					/>

					<Opener openCart={openCart} />

					<CartView cartItemsListView={cartItemsListView} />
				</div>
			)}
		</MiniCartContext.Provider>
	);
}

MiniCart.defaultProps = {
	cartItemsListView: {
		component: CartItemsList,
	},
	cartView: {
		component: Wrapper,
	},
	displayDiscountLevels: false,
};

MiniCart.propTypes = {
	cartActionURLs: PropTypes.shape({
		checkoutURL: PropTypes.string,
		orderDetailURL: PropTypes.string,
	}).isRequired,
	cartItemsListView: PropTypes.shape({
		component: PropTypes.func,
		contentRendererModuleUrl: PropTypes.string,
	}),
	cartView: PropTypes.shape({
		component: PropTypes.func,
		contentRendererModuleUrl: PropTypes.string,
	}),
	displayDiscountLevels: PropTypes.bool,
	orderId: PropTypes.number,
	spritemap: PropTypes.string,
};

export default MiniCart;
