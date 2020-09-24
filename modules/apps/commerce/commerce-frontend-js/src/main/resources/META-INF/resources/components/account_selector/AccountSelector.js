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

import {ClayButtonWithIcon} from '@clayui/button';
import ClayDropDown from '@clayui/drop-down';
import {ClayIconSpriteContext} from '@clayui/icon';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {CSSTransition} from 'react-transition-group';

import Autocomplete from './../autocomplete/Autocomplete';

function AccountSelector(props) {
	const [active, setActive] = useState(false);
	const [selectedAccount, updateSelectedAccount] = useState(null);
	const [currentView, setCurrentView] = useState('accounts');

	return (
		<ClayIconSpriteContext.Provider value={props.spritemap}>
			<ClayDropDown
				active={active}
				onActiveChange={setActive}
				trigger={
					<button className="b-dropdown btn d-block d-flex">
						<img
							alt="FS"
							className="my-auto rounded-circle"
							height="40"
							src="http://lorempixel.com/75/50/abstract/"
							width="40"
						/>
						<div className="account-selector-info ml-3">
							<h6>Forward Auto Service</h6>
							<div className="account-selector-info-details d-flex">
								<p>AR567834</p>&nbsp;|&nbsp;<p>Draft</p>
							</div>
						</div>
					</button>
				}
			>
				<CSSTransition
					className="menu-primary"
					in={currentView === 'accounts'}
					timeout={100}
					unmountOnExit
				>
					<Autocomplete
						alwaysActive={true}
						apiUrl="/o/headless-commerce-admin-account/v1.0/accounts/"
						autofill={true}
						customView={(props) => {
							return (
								props.items && (
									<ClayDropDown.ItemList>
										<ClayDropDown.Group
											header={Liferay.Language.get(
												'accounts'
											)}
										>
											{props.items.map((item) => (
												<ClayDropDown.Item
													key={item.id}
													onClick={(_) => {
														setCurrentView(
															'orders'
														);
														updateSelectedAccount(
															item.id
														);
													}}
												>
													{item.name}
												</ClayDropDown.Item>
											))}
										</ClayDropDown.Group>
									</ClayDropDown.ItemList>
								)
							);
						}}
						infinityScrollMode={true}
						inputName="account-search"
						itemsKey="id"
						itemsLabel="name"
					/>
				</CSSTransition>

				<CSSTransition
					classNames="menu-secondary"
					in={currentView === 'orders'}
					timeout={100}
					unmountOnExit
				>
					<ClayButtonWithIcon
						displayType="secondary"
						onClick={() => {
							setCurrentView('accounts');
						}}
						symbol="angle-left-small"
					/>
					<Autocomplete
						alwaysActive={true}
						apiUrl={`/o/headless-commerce-admin-order/v1.0/orders?filter=(accountId/any(x:(x eq ${selectedAccount})))`}
						autofill={true}
						customView={(props) => {
							return props.items ? (
								<ClayDropDown.ItemList>
									<ClayDropDown.Group
										header={Liferay.Language.get('orders')}
									>
										{props.items.map((item) => (
											<ClayDropDown.Item key={item.id}>
												{item.id}
											</ClayDropDown.Item>
										))}
									</ClayDropDown.Group>
								</ClayDropDown.ItemList>
							) : null;
						}}
						infinityScrollMode={true}
						inputName="order-search"
						itemsKey="id"
						itemsLabel="name"
					/>
				</CSSTransition>
			</ClayDropDown>
		</ClayIconSpriteContext.Provider>
	);
}

AccountSelector.propTypes = {
	spritemap: PropTypes.string.isRequired,
};

export default AccountSelector;
