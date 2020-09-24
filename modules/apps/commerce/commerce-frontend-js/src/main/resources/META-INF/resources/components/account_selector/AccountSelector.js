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

// import {ClayButtonWithIcon, ClayButton} from '@clayui/button';

import ClayDropDown from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';

// import ClayIcon, {ClayIconSpriteContext} from '@clayui/icon';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { getData, getValueFromItem } from '../../utilities/index';
import Autocomplete from './../autocomplete/Autocomplete'

function AccountSelector(props) {
	const [active, setActive] = useState(false);
	const [accounts, setAccounts] = useState(null);
	const [orders, setOrders] = useState(null);

	const [activeMenu, setActiveMenu] = useState('main');
	const [menuHeight, setMenuHeight] = useState("200");
	const dropdownRef = useRef(null);

	// function _getAccounts() {
	// 	return getData(props.accountsAPI + 'search-accounts').then(data => {
	// 		setAccounts(data.accounts);
	// 	});
	// }

	const getOrders = (id) => {
		getData(props.accountsAPI + 'search-accounts/' + id + "/orders").then(data => {
			setOrders(data.accounts);
		});
	}

	useEffect(() => {
		if (active && !accounts) {
			getData(props.accountsAPI + 'search-accounts/').then(data => {
				setAccounts(data.accounts);
			});
		}
	}, [accounts, active, props.accountsAPI])

	useEffect(() => {
		const dropRef = dropdownRef.current ? dropdownRef.current.firstChild.offsetHeight : null
		setMenuHeight(dropRef)
	}, [])

	function DropdownItem(props) {
		return (
			<a className="menu-item"
				href="#"
				onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
				<span className="icon-button">{props.leftIcon}</span>
				{props.children}
				<span className="icon-right">{props.rightIcon}</span>
			</a>

		);
	}

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	return (


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
					{/* <span className="b-dropdown-initials my-auto p-2">FS</span> */}
					<div className="account-selector-info ml-3">
						<h6>Forward Auto Service</h6>
						<div className="account-selector-info-details d-flex">
							<p>AR567834</p>&nbsp;|&nbsp;<p>Draft</p>
						</div>
					</div>
				</button>

			}
		>

			<ClayDropDown.ItemList>

				<CSSTransition
					className="menu-primary"
					in={activeMenu === 'main'}
					onEnter={calcHeight}
					timeout={500}
					unmountOnExit>

					<div className="menu">

						<h2>Accounts</h2>

						<Autocomplete
							apiUrl="/account-selector/search-accounts"
							autofill={true}
							id="cul"
							infinityScrollMode={true}
							inputName="account-search"
							itemsKey="accountId"
							itemsLabel="name"
							onItemSelected={item => 
							// 	{
							// 	<DropdownItem
							// 		goToMenu="settings"
							// 		leftIcon={"CogIcon"}
							// 		rightIcon={"<ChevronIcon />"}>
							// 		{item.accountId}
							// 	</DropdownItem>
							// 	}
							// }

								{
								console.log(item)

								// goToMenu("secondary")

								getOrders(item.accountId)
							}}

						/>

						{accounts && accounts.length === 0 && (
							<ClayDropDown.Group header="Group #1">
								<ClayDropDown.Item>
									No Accounts Found
										</ClayDropDown.Item>
							</ClayDropDown.Group>
						)}

						<DropdownItem
							goToMenu="settings"
							leftIcon={"CogIcon"}
							rightIcon={"<ChevronIcon />"}>
							Settings
						</DropdownItem>
						<DropdownItem
							goToMenu="animals"
							leftIcon="🦧"
							rightIcon={"<ChevronIcon />"}>
							Animals
						</DropdownItem>

					</div>
				</CSSTransition>

				{/* orders.orders[0].accountId */}
				<CSSTransition
					classNames="menu-secondary"
					in={activeMenu === "account1"}
					key="account1"
					onEnter={calcHeight}
					timeout={100}
					unmountOnExit>

					<Autocomplete
						apiUrl="/account-selector/search-accounts"
						autofill={true}
						id="yoyo"
						infinityScrollMode={true}
						inputName="account-search"
						itemsKey="accountId"
						itemsLabel="name"
						onItemSelected={item => {
							console.log(item)

						}}

					/>

				</CSSTransition>

				<CSSTransition
					classNames="menu-secondary"
					in={activeMenu === 'settings'}
					onEnter={calcHeight}
					timeout={500}
					unmountOnExit>
					<div className="menu">
						<DropdownItem
							goToMenu="main"
							leftIcon={
								<ClayIcon spritemap={props.spritemap} symbol="order-arrow-left" />
							}
						>
							<h2>My Tutorial</h2>
						</DropdownItem>
						<DropdownItem leftIcon={"<BoltIcon />"}>HTML</DropdownItem>
						<DropdownItem leftIcon={"<BoltIcon />"}>CSS</DropdownItem>
						<DropdownItem leftIcon={"<BoltIcon />"}>JavaScript</DropdownItem>
						<DropdownItem leftIcon={"<BoltIcon />"}>Awesome!</DropdownItem>
					</div>
				</CSSTransition>

				<CSSTransition
					classNames="menu-secondary"
					in={activeMenu === 'animals'}
					onEnter={calcHeight}
					timeout={500}
					unmountOnExit>
					<div className="menu">
						<DropdownItem goToMenu="main" leftIcon={"<ArrowIcon />"}>
							<h2>Animals</h2>
						</DropdownItem>
						<DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
						<DropdownItem leftIcon="🐸">Frog</DropdownItem>
						<DropdownItem leftIcon="🦋">Horse?</DropdownItem>
						<DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
					</div>
				</CSSTransition>

			</ClayDropDown.ItemList>

		</ClayDropDown>
	);
}

AccountSelector.propTypes = {
	spritemap: PropTypes.string.isRequired
};

export default AccountSelector;
