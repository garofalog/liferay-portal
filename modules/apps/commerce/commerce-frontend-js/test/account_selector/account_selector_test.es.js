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

import '@testing-library/jest-dom/extend-expect';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import React from 'react';

import AccountSelector from '../../src/main/resources/META-INF/resources/components/account_selector/AccountSelector';

describe('AccountSelector', () => {
    let accounts
    let orders

    
	afterEach(cleanup);

    beforeAll(() => {
        // fetchMock.mock("account-mock", () => {
        //     accounts = 
        // })
    })
	beforeEach(() => {});

	it('render "select-account-and-order" the accountselect', () => {
        const component = render(
			<AccountSelector
				createNewOrderUrl="/asdasdasd"
				id="Test"
				spritemap="./assets/icons.svg"
				viewOrderUrl="/test-url/{id}"
			/>
        );
        const { container, getByText } = render(component)
        expect(component.getByText('select-account-and-order')).toBeInTheDocument()

	});
});



// expect(screen.getByRole('button')).toHaveTextContent(
// 	'select-account-and-order'
// );

// fireEvent.load(screen.load())