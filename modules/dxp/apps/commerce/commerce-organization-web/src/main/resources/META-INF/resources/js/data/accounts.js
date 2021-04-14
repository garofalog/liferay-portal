/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import {fetch} from 'frontend-js-web';

import {USERS_PROPERTY_NAME} from '../utils/constants';

const ACCOUNTS_ROOT_ENDPOINT = '/o/account-rest/v1.0/accounts';

export function getAccounts(query) {
    const url = new URL(
        ACCOUNTS_ROOT_ENDPOINT,
        themeDisplay.getPortalURL()
    )

    url.searchParams.append('search', query)

    return fetch(url)
        .then(data => data.json())
}

export function getAccount(id) {
    const accountUrl = new URL(
        `${ACCOUNTS_ROOT_ENDPOINT}/${id}`,
        themeDisplay.getPortalURL()
    )

    const accountUsers = new URL(
        `${ACCOUNTS_ROOT_ENDPOINT}/${id}/account-users`,
        themeDisplay.getPortalURL()
    )

    return Promise.all([
        fetch(accountUrl).then(data => data.json()),
        fetch(accountUsers).then(data => data.json()),
    ]).then(([item, accounts]) => {
        item[USERS_PROPERTY_NAME] = accounts.items

        return item;
    })
}
 