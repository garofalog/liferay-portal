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

import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import {ClayIconSpriteContext} from '@clayui/icon';
import classnames from 'classnames';
import {fetch} from 'frontend-js-web';
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

import ChartContext from './ChartContext';
import ConnectEntityModal from './ConnectEntityModal';
import D3OrganizationChart from './D3OrganizationChart';
import ManagementBar from './ManagementBar/ManagementBar';
import NodeMenu from './NodeMenu';
import {ACCOUNTS_PROPERTY_NAME, ORGANIZATIONS_PROPERTY_NAME, USERS_PROPERTY_NAME, VIEWS} from './utils/constants'

function formatChildren(item, type) {
	item.type = type;
	item.children = [...item[USERS_PROPERTY_NAME].map((user) => ({...user, type: 'user'}))];

	if (type === 'organization') {
		item.children.push(
			...item[ACCOUNTS_PROPERTY_NAME].map((account) => ({...account, type: 'account'})),
			...item[ORGANIZATIONS_PROPERTY_NAME].map((organization) => ({
				...organization,
				type: 'organization',
			}))
		);
	}

	return item;
}

function OrganizationChartApp({
	accountEndpointURL,
	organizationEndpointURL,
	rootOrganizationId,
	spritemap,
}) {
	const [modalParentNode, updateModalParentNode] = useState(false);
	const [modalEntityType, updateModalEntityType] = useState(null);
	const [currentView, updateCurrentView] = useState(VIEWS[0])
	const [expanded, updateExpanded] = useState(false);
	const [nodeMenuData, updateNodeMenuData] = useState(null);
	const [data, updateData] = useState(null);
	const clickedMenuButtonRef = useRef(null);
	const chartSvgRef = useRef(null);
	const chartInstanceRef = useRef(null);
	const zoomOutRef = useRef(null);
	const zoomInRef = useRef(null);

	const getData = useCallback(
		(id, type) => {
			const endpoint =
				type === 'organization'
					? organizationEndpointURL
					: accountEndpointURL;
			const url = new URL(
				`${endpoint}/${id}`,
				themeDisplay.getPortalURL()
			);

			return fetch(url)
				.then((res) => res.json())
				.then((item) => formatChildren(item, type));
		},
		[accountEndpointURL, organizationEndpointURL]
	);

	useEffect(() => {
		getData(rootOrganizationId, 'organization').then(updateData);
	}, [getData, rootOrganizationId]);

	useLayoutEffect(() => {
		if (data && chartSvgRef.current) {
			chartInstanceRef.current = new D3OrganizationChart(
				data,
				{
					svg: chartSvgRef.current,
					zoomIn: zoomInRef.current,
					zoomOut: zoomOutRef.current,
				},
				getData,
				spritemap,
				{
					open: (node, entityType) => {
						updateModalEntityType(entityType);
						updateModalParentNode(() => node);
					},
				},
				{
					close: () => {
						clickedMenuButtonRef.current = null;
						updateNodeMenuData(null);
					},
					open: (target, data) => {
						clickedMenuButtonRef.current = target;
						updateNodeMenuData(data);
					},
				}
			);
		}
	}, [data, getData, spritemap]);

	return (
		<ClayIconSpriteContext.Provider value={spritemap}>
			<ChartContext.Provider value={{
				currentView,
				updateChartRoot: (d) => chartInstanceRef.current.updateRoot(d),
				updateCurrentView,
			}}>
				<ManagementBar />
				<div
					className={classnames(
						'org-chart-container',
						{expanded}
					)}
				>
					<svg className="svg-chart" ref={chartSvgRef} />
					<div className="zoom-controls">
						<ClayButtonWithIcon
							displayType="secondary"
							onClick={() => updateExpanded(!expanded)}
							small
							symbol="expand"
						/>
						<ClayButton.Group className="ml-3">
							<ClayButtonWithIcon
								displayType="secondary"
								ref={zoomOutRef}
								small
								symbol="hr"
							/>
							<ClayButtonWithIcon
								displayType="secondary"
								ref={zoomInRef}
								small
								symbol="plus"
							/>
						</ClayButton.Group>
					</div>
				</div>
				<NodeMenu
					alignElementRef={clickedMenuButtonRef}
					data={nodeMenuData}
				/>
				<ConnectEntityModal
					newEntityType={modalEntityType}
					parentNode={modalParentNode}
					updateModalEntityType={updateModalEntityType}
					updateModalParentNode={updateModalParentNode}
				/>
			</ChartContext.Provider>
		</ClayIconSpriteContext.Provider>
	);
}

export default OrganizationChartApp;
