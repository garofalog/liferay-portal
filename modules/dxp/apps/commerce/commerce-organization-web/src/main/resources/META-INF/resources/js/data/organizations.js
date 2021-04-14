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

import {
     ACCOUNTS_PROPERTY_NAME,
     ORGANIZATIONS_PROPERTY_NAME,
     USERS_PROPERTY_NAME
} from '../utils/constants';
 
const ORGANIZATIONS_ROOT_ENDPOINT = '/o/headless-admin-user/v1.0/organizations';
 
export function getOrganizations(query) {
     const url = new URL(
         ORGANIZATIONS_ROOT_ENDPOINT,
         themeDisplay.getPortalURL()
     )
 
     url.searchParams.append('search', query)
 
     return fetch(url)
         .then(data => data.json())
}
 
export function getOrganization(id) {
    const url = new URL(
        `${ORGANIZATIONS_ROOT_ENDPOINT}/${id}`,
        themeDisplay.getPortalURL()
    )

    url.searchParams.append('nestedFields', `${ORGANIZATIONS_PROPERTY_NAME},${ACCOUNTS_PROPERTY_NAME},${USERS_PROPERTY_NAME}`)

    return fetch(url)
        .then(data => data.json())
}

export function deleteOrganization(id) {
    const url = new URL(
        `${ORGANIZATIONS_ROOT_ENDPOINT}/${id}`,
        themeDisplay.getPortalURL()
    )

    return fetch(url, {method: 'DELETE'})
        .then(data => data.json())
}