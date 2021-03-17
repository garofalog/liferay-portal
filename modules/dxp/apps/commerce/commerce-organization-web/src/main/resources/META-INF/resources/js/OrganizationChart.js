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

import ClayIcon, {ClayIconSpriteContext} from '@clayui/icon';
import classnames from 'classnames';
import * as d3 from 'd3';
import {fetch} from 'frontend-js-web';
import PropTypes from 'prop-types';
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

import D3OrganizationChart from './D3OrganizationChart';

function enrichArrayItemsWithType(array = [], type) {
	return array.map((item) => ({...item, type}));
}

function formatRawData({accounts, organizations, users, ...entry}, type) {
	const formattedOrganizations = enrichArrayItemsWithType(
		organizations,
		'organization'
	);
	const formattedAccounts = enrichArrayItemsWithType(accounts, 'account');
	const formattedUsers = enrichArrayItemsWithType(users, 'user');

	return {
		...entry,
		children: [
			...formattedOrganizations,
			...formattedAccounts,
			...formattedUsers,
		],
		type,
	};
}

function OrganizationChartApp({
	accountEndpointURL,
	organizationEndpointURL,
	spritemap,
}) {
	const [data, updateData] = useState(null);
	const chartSvgRef = useRef(null);

	const getChildren = useCallback(
		(id, type) => {
			const endpoint =
				type === 'organization'
					? organizationEndpointURL
					: accountEndpointURL;
			const url = new URL(
				`${endpoint}/${id}`,
				themeDisplay.getPortalURL()
			);

			return fetch(url).then((res) => res.json());
		},
		[accountEndpointURL, organizationEndpointURL]
	);

	const getInitialData = useCallback(() => {
		const url = new URL(
			organizationEndpointURL,
			themeDisplay.getPortalURL()
		);

		return fetch(url)
			.then((res) => res.json())
			.then((jsonResponse) => {
				const formattedData = jsonResponse.map((item) =>
					formatRawData(item, 'organization')
				);

				updateData(formattedData);
			});
	}, [organizationEndpointURL]);

	useEffect(() => {
		getInitialData();
	}, [getInitialData]);

	useLayoutEffect(() => {
		if (data && chartSvgRef.current) {
			new D3OrganizationChart(
				chartSvgRef.current,
				data,
				getChildren,
				spritemap
			);
		}
	}, [data, getChildren, spritemap]);

	return (
		<div className="org-chart-container">
			<svg className="svg-chart" ref={chartSvgRef} />
		</div>
	);
}

export default OrganizationChartApp;
