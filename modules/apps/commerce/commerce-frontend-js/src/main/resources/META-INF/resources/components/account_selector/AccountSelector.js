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
import ClaySticker from '@clayui/sticker';
import ClayTable from '@clayui/table';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';

import DateRenderer from '../data_renderers/DateRenderer';
import StatusRenderer from '../data_renderers/StatusRenderer';
import {
	ACCOUNT_CHANGED,
	ORDER_CHANGED,
} from '../../utilities/eventsDefinitions';

import Autocomplete from './../autocomplete/Autocomplete';

function formatStickerName(name) {
	const words = name.split(' ');

	if (words.length === 1) {
		return words[0].substring(0, 2).toUpperCase();
	}

	return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

function AccountSelector(props) {
	const [active, setActive] = useState(false);
	const [selectedAccount, updateSelectedAccount] = useState(
		props.selectedAccount
	);
	const [selectedOrder, updateSelectedOrder] = useState(props.selectedOrder);
	const [currentView, setCurrentView] = useState('accounts');

	useEffect(() => {
		Liferay.fire(ORDER_CHANGED, {});
	}, [selectedOrder]);

	return (
		<ClayIconSpriteContext.Provider value={props.spritemap}>
			<ClayDropDown
				active={active}
				className="dropdown-wide dropdown-wide-container"
				onActiveChange={setActive}
				trigger={
					<button className="b-dropdown btn btn-secondary d-block d-flex">
						{selectedAccount.thumbnail ? (
							<ClaySticker shape="user-icon" size="xl">
								<ClaySticker.Image
									alt={selectedAccount.name}
									src={selectedAccount.thumbnail}
								/>
							</ClaySticker>
						) : (
							<ClaySticker shape="user-icon" size="xl">
								{formatStickerName(selectedAccount.name)}
							</ClaySticker>
						)}
						<div className="account-selector-info ml-3">
							<h6>
								{selectedAccount?.name ||
									Liferay.Language.get(
										'select-account-and-order'
									)}
							</h6>
							<div className="account-selector-info-details d-flex">
								<span className="info-order-id">
									{selectedOrder?.id}
								</span>
								<span className="info-order-status-label">
									{selectedOrder?.orderStatusInfo.label_i18n}
								</span>
							</div>
						</div>
					</button>
				}
			>
				{/* <CSSTransition
					className="menu-primary"
					in={currentView === 'accounts'}
					timeout={100}
					unmountOnExit
				> */}
				{currentView === 'accounts' && (
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
												'select-accounts'
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
															item
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
						inputClass="p-2"
						inputName="account-search"
						inputPlaceholder={Liferay.Language.get(
							'search-accounts'
						)}
						itemsKey="id"
						itemsLabel="name"
					/>
				)}
				{/* </CSSTransition> */}

				{/* <CSSTransition
					classNames="menu-secondary"
					in={currentView === 'orders'}
					timeout={100}
					unmountOnExit
				> */}
				{currentView === 'orders' && (
					<>
						<div className="inline-item p-2">
							<ClayButtonWithIcon
								displayType="secondary"
								onClick={() => {
									setCurrentView('accounts');
								}}
								symbol="angle-left-small"
							/>
							<h3 className="m-auto pl-4">
								{selectedAccount?.name}
							</h3>
						</div>

						<Autocomplete
							alwaysActive={true}
							apiUrl={`/o/headless-commerce-admin-order/v1.0/orders?sort=modifiedDate:desc&filter=(accountId/any(x:(x eq ${selectedAccount.id})))`}
							autofill={true}
							customView={(props) => {
								return props.items ? (
									<ClayDropDown.ItemList>
										<ClayDropDown.Group>
											<ClayTable borderless hover>
												<ClayTable.Head>
													<ClayTable.Row>
														<ClayTable.Cell
															headingCell
														>
															{Liferay.Language.get(
																'order-number'
															)}
														</ClayTable.Cell>
														<ClayTable.Cell
															headingCell
														>
															{Liferay.Language.get(
																'status'
															)}
														</ClayTable.Cell>
														<ClayTable.Cell
															headingCell
														>
															{Liferay.Language.get(
																'last-modified'
															)}
														</ClayTable.Cell>
													</ClayTable.Row>
												</ClayTable.Head>
												<ClayTable.Body>
													{props.items.map((item) => (
														<ClayTable.Row
															key={item.id}
														>
															<ClayTable.Cell
																headingTitle
															>
																<a href={'#'}>
																	{item.id}
																</a>
															</ClayTable.Cell>
															<ClayTable.Cell>
																<StatusRenderer
																	value={
																		item.orderStatusInfo
																	}
																/>
															</ClayTable.Cell>
															<ClayTable.Cell>
																<DateRenderer
																	value={
																		item.modifiedDate
																	}
																/>
															</ClayTable.Cell>
														</ClayTable.Row>
													))}
												</ClayTable.Body>
											</ClayTable>
										</ClayDropDown.Group>
									</ClayDropDown.ItemList>
								) : (
									<ClayDropDown.Caption>
										{'... or maybe not.'}
									</ClayDropDown.Caption>
								);
							}}
							infinityScrollMode={true}
							inputClass="p-2"
							inputName="order-search"
							inputPlaceholder={Liferay.Language.get(
								'search-order'
							)}
							itemsKey="id"
							itemsLabel="name"
							onItemsUpdated={(items) =>
								updateSelectedOrder(
									items?.length ? items[0] : null
								)
							}
						/>
					</>
				)}
				{/* </CSSTransition> */}
			</ClayDropDown>
		</ClayIconSpriteContext.Provider>
	);
}

AccountSelector.propTypes = {
	createNewOrderUrl: PropTypes.string,
	spritemap: PropTypes.string,
	viewOrderUrl: PropTypes.string,
};

export default AccountSelector;
