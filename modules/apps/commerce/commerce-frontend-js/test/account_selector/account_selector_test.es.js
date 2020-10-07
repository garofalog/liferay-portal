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
import {cleanup, fireEvent, render, waitForElement} from '@testing-library/react';
import fetchMock from 'fetch-mock';
import React from 'react';
import ReactDOM from 'react-dom';
import { accountsList, ordersList } from '../test-utilities/headless-commerce-accounts'
import AccountSelector from '../../src/main/resources/META-INF/resources/components/account_selector/AccountSelector';

const WAIT_MS = 200

describe('AccountSelector', () => {

    let renderedComponent

    afterEach(() => { 
        cleanup()
        fetchMock.restore();
    })

    
    beforeEach(() => {
        fetchMock.mock(/o\/headless-commerce-admin-account\/v1.0\/accounts/, accountsList)

        renderedComponent = render(
            <AccountSelector
                apiUrl="/o/headless-commerce-admin-account/v1.0/accounts/"
                createNewOrderURL="/asdasdasd"
                id="Test"
                spritemap="./assets/icons.svg"
                viewOrderUrl="/test-url/{id}"
                setCurrentAccountURL="/account-selector/setCurrentAccounts"
                selectOrderURL="/test-url/{id}"
            />
        );
        // fireEvent.click(renderedComponent.getByText("select-account-and-order"))
    })


	it('display "select-account-and-order" the accountselect', () => {
        expect(renderedComponent.getByText('select-account-and-order')).toBeInTheDocument()
    });

    it('display "select-accounts"', async () => {

        fireEvent.click(renderedComponent.getByText("select-account-and-order"));
        const resolvedValue = await waitForElement(() => renderedComponent.getByText('select-accounts'))
        expect(resolvedValue).toBeInTheDocument()
        let li = renderedComponent.getAllByRole('listitem')
        expect(resolvedValue).toHaveClass('dropdown-subheader')
        expect(li.length).toBe(10)
        console.log(screen)
        // console.log(Object.getOwnPropertyNames(screen));
    })

});