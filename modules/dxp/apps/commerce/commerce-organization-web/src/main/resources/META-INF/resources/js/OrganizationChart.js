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
import React, {useCallback, useEffect, useRef, useState} from 'react';

import OrganizationChartContext from './OrganizationChartContext';
import SvgWrapper from './SvgWrapper';
import ZoomControls from './ZoomControls';

const avatarRadius = 24;
const categoryHeight = 48;
const categoryWidth = 184;
const currentScale = 1;
const duration = 750;
const idCount = 0;
const margin = 24;
const nodeCenterOffset = 100;
const nodeDepth = 400;
const nodeHeight = 72;
const nodePadding = 12;
const nodeWidth = 310;
const selectedIdPath = null;
const svgHeight = '100%';
const svgWidth = '100%';

function enrichArrayItemsWithType(array = [], type) {
	return array.map((item) => ({...item, type}))
}

function formatRawData({
	accounts,
	organizations,
	users,
	...entry
}) {
	const formattedOrganizations = enrichArrayItemsWithType(organizations, 'organization');
	const formattedAccounts = enrichArrayItemsWithType(accounts, 'accounts');
	const formattedUsers = enrichArrayItemsWithType(users, 'users');

	return {
		...entry,
		children: [
			...formattedOrganizations,
			...formattedAccounts,
			...formattedUsers
		]
	}
}

function OrganizationChartApp({
	accountEndpointURL,
	organizationEndpointURL,
	spritemap
}) {
	const [zoomPercentage, updateZoomPercentage] = useState(100);
	const [data, updateData] = useState(null);
	const chartSvgRef = useRef();
	const tree = useRef();
	const zoomPercent = useRef();
	const treeNode = useRef();
	const zoomRef = useRef();
	const zoomInterface = useRef();

	const getChildren = useCallback((id, type = 'organization') => {
		const endpoint = type === 'organization' ? organizationEndpointURL : accountEndpointURL;
	
		const url = new URL(`${endpoint}/${id || ''}`, themeDisplay.getPortalURL());
	
		return fetch(url)
			.then(res => res.json())
			.then(jsonResponse => {
				if(!id) {
					const formattedData = Array.isArray(jsonResponse) 
						? jsonResponse.map(formatRawData)
						: formatRawData(jsonResponse);

					updateData(() => formattedData);
				}
			})
	}, [accountEndpointURL, organizationEndpointURL])

	useEffect(() => {
		getChildren()
	}, [getChildren])

	function zoomIn() {
		zoomInterface.current.transition()
			.duration(duration)
			.call(zoomRef.current.scaleBy, 2);
	}

	function zoomOut() {
		zoomInterface.current.transition()
			.duration(duration)
			.call(zoomRef.current.scaleBy, 0.5);
	}

	return (
		<ClayIconSpriteContext.Provider value={spritemap}>
			<OrganizationChartContext.Provider value={
				zoomIn,
				zoomOut,
				getChildren
			}>
				<div className="org-chart-container">
					<SvgWrapper
						chartSvgRef={chartSvgRef}
						data={data}
						zoomInterface={zoomInterface}
						zoomPercentage={zoomPercentage}
					/>
					<ZoomControls
						zoomIn={zoomIn}
						zoomOut={zoomOut}
						zoomPercentage={zoomPercentage}
						zoomRef={zoomRef}
					/>
				</div>
			</OrganizationChartContext.Provider>
		</ClayIconSpriteContext.Provider>
	);
}

export default OrganizationChartApp;
