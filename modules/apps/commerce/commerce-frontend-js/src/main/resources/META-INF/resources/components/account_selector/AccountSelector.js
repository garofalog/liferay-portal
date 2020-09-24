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
import ClayLabel from '@clayui/label';
import ClayTable from '@clayui/table';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {CSSTransition} from 'react-transition-group';

import DateRenderer from '../../../../../../../../../frontend-taglib/frontend-taglib-clay/src/main/resources/META-INF/resources/data_set_display/data_renderers/DateRenderer';
import StatusRenderer from '../../../../../../../../../frontend-taglib/frontend-taglib-clay/src/main/resources/META-INF/resources/data_set_display/data_renderers/StatusRenderer';
import Autocomplete from './../autocomplete/Autocomplete';


function AccountSelector(props) {

	const [active, setActive] = useState(false);
	const [selectedAccount, updateSelectedAccount] = useState([null, null]);
	const [currentView, setCurrentView] = useState('accounts');

	const [value, setValue] = useState("one");

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
							<h6>{selectedAccount[1] || Liferay.Language.get('select-account-and-order') }</h6>
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
														updateSelectedAccount([
															item.id,
															item.name
														]);
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
						inputPlaceholder={Liferay.Language.get("search-accounts")}
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
					<>
						<div className="inline-item p-2">
							<ClayButtonWithIcon
								displayType="secondary"
								onClick={() => {
									setCurrentView('accounts');
								}}
								symbol="angle-left-small"
							/>
							<h3 className="m-auto pl-4">{selectedAccount[1]}</h3>
						</div>
						
						<Autocomplete
							alwaysActive={true}
							apiUrl={`/o/headless-commerce-admin-order/v1.0/orders?filter=(accountId/any(x:(x eq ${selectedAccount[0]})))`}
							autofill={true}
							customView={(props) => {
								return props.items ? (
										<ClayDropDown.ItemList>
											<ClayDropDown.Group

												// header={Liferay.Language.get('orders')}

											>
											<ClayTable 
												borderless
												hover
											>
												<ClayTable.Head>
													<ClayTable.Row>
														<ClayTable.Cell headingCell>
															{Liferay.Language.get("order-number")}
														</ClayTable.Cell>
														<ClayTable.Cell headingCell>
															{Liferay.Language.get("status")}
															</ClayTable.Cell>
														<ClayTable.Cell headingCell>
															{Liferay.Language.get("last-modified")}
														</ClayTable.Cell>
													</ClayTable.Row>
												</ClayTable.Head>
												<ClayTable.Body>

													{props.items.map((item) => (
														<ClayTable.Row key={item.id}>
															<ClayTable.Cell headingTitle>{item.id}</ClayTable.Cell>
															<ClayTable.Cell>
																
																<StatusRenderer
																	value={item.orderStatusInfo}
																/>
															</ClayTable.Cell>
															<ClayTable.Cell>
																<DateRenderer value={item.modifiedDate} />
															</ClayTable.Cell>
														</ClayTable.Row>
													))}
													
												</ClayTable.Body>
											</ClayTable>
												
										</ClayDropDown.Group>
									</ClayDropDown.ItemList>

								) : (
										<ClayDropDown.Caption>{'... or maybe not.'}</ClayDropDown.Caption>
								)
							}}
							infinityScrollMode={true}
							inputClass="p-2"
							inputName="order-search"
							inputPlaceholder={Liferay.Language.get("search-order")}
							itemsKey="id"
							itemsLabel="name"
						/>
					</>
				</CSSTransition>
			</ClayDropDown>
		</ClayIconSpriteContext.Provider>
	);
}

AccountSelector.propTypes = {
	spritemap: PropTypes.string.isRequired,
};

export default AccountSelector;
