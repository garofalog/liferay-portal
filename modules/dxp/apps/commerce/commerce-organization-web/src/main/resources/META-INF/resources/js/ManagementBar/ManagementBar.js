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
import {ClayDropDownWithItems} from '@clayui/drop-down';
import {ClayInput} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayManagementToolbar from '@clayui/management-toolbar';
import Search from '@clayui/management-toolbar/lib/Search';
import React, {useState} from 'react';

import ViewSelector from './ViewSelector'

function ManagementBar() {
	const filterItems = [
		{label: 'Filter Action 1', onClick: () => alert('Filter clicked')},
		{label: 'Filter Action 2', onClick: () => alert('Filter clicked')},
	];

	const [searchMobile, setSearchMobile] = useState(false);

	return (
		<>
			<ClayManagementToolbar>
				<ClayManagementToolbar.ItemList>
					<ClayDropDownWithItems
						items={filterItems}
						trigger={
							<ClayButton
								className="nav-link"
								displayType="unstyled"
							>
								<span className="navbar-breakpoint-down-d-none">
									<span className="navbar-text-truncate">
										{Liferay.Language.get('Filter')}
									</span>

									<ClayIcon
										className="inline-item inline-item-after"
										symbol="caret-bottom"
									/>
								</span>
								<span className="navbar-breakpoint-d-none">
									<ClayIcon symbol="filter" />
								</span>
							</ClayButton>
						}
					/>
				</ClayManagementToolbar.ItemList>

				<ClayManagementToolbar.Search showMobile={searchMobile}>
					<Search />
				</ClayManagementToolbar.Search>

				<ClayManagementToolbar.ItemList>
					<ClayManagementToolbar.Item 
						className="navbar-breakpoint-d-none"
					>
						<ClayButtonWithIcon
							className="nav-link nav-link-monospaced"
							displayType="unstyled"
							onClick={() => setSearchMobile(true)}
							symbol="search"
						/>
					</ClayManagementToolbar.Item>

					<ClayManagementToolbar.Item>
						<ClayButton displayType="secondary">
							{Liferay.Language.get('collapse-all')}
						</ClayButton>
					</ClayManagementToolbar.Item>

					<ClayManagementToolbar.Item>
						<ViewSelector />
					</ClayManagementToolbar.Item>
				</ClayManagementToolbar.ItemList>
			</ClayManagementToolbar>
		</>
	);
}

export default ManagementBar;
