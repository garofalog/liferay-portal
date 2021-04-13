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

import ClayDropDown from '@clayui/drop-down';
import React, {useEffect, useRef, useState} from 'react';

function NodeMenu({alignElementRef, data: propData, setFocusOnNode}) {
	const [active, setActive] = useState(false);
	const [data, updateData] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		setActive(false);
		updateData(propData);
	}, [propData]);

	useEffect(() => {
		if (data) {
			setActive(true);
		}
	}, [data]);

	return (
		<ClayDropDown.Menu
			active={active}
			alignElementRef={alignElementRef}
			onSetActive={() => {
				updateData(null);
				setActive(false);
			}}
			ref={menuRef}
		>
			<ClayDropDown.Item>View Details</ClayDropDown.Item>
			<ClayDropDown.Item
				onClick={() => {
					setActive(false);
					setFocusOnNode(data);
				}}
			>
				{Liferay.Language.get('set-focus')}
			</ClayDropDown.Item>
			<ClayDropDown.Item>Remove</ClayDropDown.Item>
			<ClayDropDown.Item>Delete</ClayDropDown.Item>
		</ClayDropDown.Menu>
	);
}

export default NodeMenu;
