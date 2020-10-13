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

import '../test_utilities/polyfills';

import '@testing-library/jest-dom/extend-expect';
import {
	cleanup,
	fireEvent,
	render,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import React from 'react';

import ServiceProvider from '../../src/main/resources/META-INF/resources/ServiceProvider/index';
import AccountSelector from '../../src/main/resources/META-INF/resources/components/account_selector/AccountSelector';
import {
	accountTemplate,
	getAccounts,
} from '../test_utilities/fake_data/accounts';
import {getOrders} from '../test_utilities/fake_data/orders';

const ACCOUNTS_HEADLESS_API_ENDPOINT = ServiceProvider.AdminAccountAPI('v1')
	.baseURL;
const ORDERS_HEADLESS_API_ENDPOINT = ServiceProvider.AdminOrderAPI('v1')
	.baseURL;

describe('AccountSelector', () => {
	beforeEach(() => {
		const accountsEndpointRegexp = new RegExp(
			ACCOUNTS_HEADLESS_API_ENDPOINT
		);
		const ordersEndpointRegexp = new RegExp(ORDERS_HEADLESS_API_ENDPOINT);

		fetchMock.mock(accountsEndpointRegexp, (url) => getAccounts(url));
		fetchMock.mock(ordersEndpointRegexp, (url) => getOrders(url));
	});

	afterEach(() => {
		fetchMock.restore();
	});

	describe('When no account is selected', () => {
		let renderedComponent;

		beforeEach(() => {
			renderedComponent = render(
				<AccountSelector
					createNewOrderURL="/order-link"
					selectOrderURL="/test-url/{id}"
					setCurrentAccountURL="/account-selector/setCurrentAccounts"
					spritemap="./assets/icons.svg"
				/>
			);
		});

		afterEach(() => {
			cleanup();
		});

		it('if allowedQuantity is different from default [-1] multipleQuantity shuould be set to 1"', () => {
			expect(
				
			).toBeInTheDocument();
		});

		it('the user can inset only digits in the input', () => {
			expect(
				renderedComponent.getByText('select-account-and-order')
			).toBeInTheDocument();
		});

		it('if addToCartButton is disabled (unrendered) quantitySelector should send th right quantity after onChange event', () => {
			expect(
				renderedComponent.getByText('select-account-and-order')
			).toBeInTheDocument();
		});

	});

});
