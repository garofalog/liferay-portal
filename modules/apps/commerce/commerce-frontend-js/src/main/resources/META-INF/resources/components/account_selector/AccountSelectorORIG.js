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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { getData, getValueFromItem } from '../../utilities/index';
import Autocomplete from './../autocomplete/Autocomplete'

import AccountSearch from './AccountSearch';

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

			// <ClayDropDown.Item 
			// 	key={props.item.accountId}
			// 	onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
			// 	{props.item.name}
			// </ClayDropDown.Item>

		);
	}

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	return (

		// <div className="account-selector">

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

				// <ClayButtonWithIcon
				// 	aria-label="Cut"
				// 	className="ml-3"
				// 	spritemap={props.spritemap}
				// 	symbol="user" />

				// <ClayIconSpriteContext.Provider value={props.spritemap}>
				// 		<ClayIcon
				// 			className = "ml-3"
				// 			symbol = "users"
				// 			value={props.spritemap}
				// />
				// </ClayIconSpriteContext.Provider>
				// <button className="btn btn-primary">Click here!</button>

			}
		>

			{/* <div 
					className="dropdown-itemlist" 
					ref={dropdownRef} 
					> */}

			<ClayDropDown.ItemList>

				<CSSTransition
					className="menu-primary"
					in={activeMenu === 'main'}
					onEnter={calcHeight}
					timeout={500}
					unmountOnExit>

					<div className="menu">

						<h2>Accounts</h2>


						{/* <AccountSearch /> */}
						<Autocomplete
							apiUrl="/account-selector/search-accounts"
							autofill={true}
							id="accounts.accountId"
							inputName="account-search"
							itemsKey="accountId"
							itemsLabel="name"
							onItemSelected={item => {
								console.log(item)
								
							}}

						/>

						{/* {accounts && accounts.length > 0 && (
							<ClayDropDown.Group header="Accounts">
								{accounts.map((item) => (
									<ClayDropDown.Item 	goToMenu={item.accountId}
														key={item.accountId}
														onClick={() => getOrders(item.accountId) && props.goToMenu && setActiveMenu(props.goToMenu)}>
										{item.name}
									</ClayDropDown.Item>
								))}
							</ClayDropDown.Group>

						)} */}

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

				{orders && orders.length > 0 && (

					<CSSTransition
						classNames="menu-secondary"
						in={activeMenu === orders.orders[0].accountId}
						key={orders.orders[0].accountId}
						onEnter={calcHeight}
						timeout={100}
						unmountOnExit>

						<div className="menu">

							<DropdownItem
								goToMenu="main"
								leftIcon={<ClayIcon
								spritemap={props.spritemap} 
								symbol="order-arrow-left" />}
							>
								<h2>Orders</h2>
							</DropdownItem>
							<DropdownItem leftIcon={"<BoltIcon />"}>HTML</DropdownItem>
							<DropdownItem leftIcon={"<BoltIcon />"}>CSS</DropdownItem>
							<DropdownItem leftIcon={"<BoltIcon />"}>JavaScript</DropdownItem>
							<DropdownItem leftIcon={"<BoltIcon />"}>Awesome!</DropdownItem>
						</div>

					</CSSTransition>

				)} 


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

				{/* 
					<AccountSearch />

					{accounts && accounts.length > 0 && (
						<ClayDropDown.Group header="Group #1">
							{accounts.map((item) => (
								<ClayDropDown.Item key={item.accountId}>
									{item.name}
								</ClayDropDown.Item>
							))}
						</ClayDropDown.Group>

					)}

					{accounts && accounts.length === 0 && (
						<ClayDropDown.Group header="Group #1">
							<ClayDropDown.Item>
								No Accounts Found
									</ClayDropDown.Item>
						</ClayDropDown.Group>
					)}
				*/}

			</ClayDropDown.ItemList>

			{/* <ClayDropDown.Caption>
						{'... or maybe not.'}
					</ClayDropDown.Caption> */}

			{/* </div> */}

		</ClayDropDown>
	);
}

AccountSelector.propTypes = {
	spritemap: PropTypes.string.isRequired
};

export default AccountSelector;
