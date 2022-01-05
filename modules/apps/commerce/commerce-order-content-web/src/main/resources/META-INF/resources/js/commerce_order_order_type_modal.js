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

import ServiceProvider from 'commerce-frontend-js/ServiceProvider/index';
import * as Events from 'commerce-frontend-js/utilities/eventsDefinitions';

export default function ({
	commerceAccountId,
	commerceChannelId,
	commerceCurrencyCode,
	editCommerceOrderRenderURL,
	namespace,
}) {
	const addOrderForm = document.getElementById(`${namespace}fm`);
	const orderTypeId = addOrderForm.querySelector(
		`#${namespace}commerceOrderTypeId`
	).value;

	const CartResource = ServiceProvider.default.DeliveryCartAPI('v1');

	addOrderForm.addEventListener('submit', () => {
		window.parent.Liferay.fire(Events.IS_LOADING_MODAL, {
			isLoading: true,
		});

		CartResource.createCartByChannelId(commerceChannelId, {
			accountId: commerceAccountId,
			currencyCode: commerceCurrencyCode,
			orderTypeId,
		})
			.then((order) => {
				Liferay.fire(Events.CURRENT_ORDER_UPDATED, {...order});

				var redirectURL = new Liferay.Util.PortletURL.createPortletURL(
					editCommerceOrderRenderURL,
					{
						commerceOrderId: order.id,
						p_auth: Liferay.authToken,
						p_p_state:
							'<%= LiferayWindowState.MAXIMIZED.toString() %>',
					}
				);
				window.parent.Liferay.fire(Events.CLOSE_MODAL, {
					redirectURL: redirectURL.toString(),
					successNotification: {
						message: Liferay.Language.get(
							'your-request-completed-successfully'
						),
						showSuccessNotification: true,
					},
				});
			})
			.catch((error) => {
				return Promise.reject(error);
			});
	});
}
