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

function AccountsTable(props) {
	return props.items && (
		<ul>
			{props.items.map(item => {
				return (
					<li key={item.id} onClick={(e) => console.log(e)}>
						{item.name}
					</li>
				)
			})}
		</ul>
	)
}

function AccountSelector(props) {
	const [active, setActive] = useState(false);
	const [accounts, setAccounts] = useState(null);
	const [orders, setOrders] = useState(null);

	const [activeMenu, setActiveMenu] = useState('main');
	const [menuHeight, setMenuHeight] = useState("200");
	const dropdownRef = useRef(null);

	useEffect(() => {
		const dropRef = dropdownRef.current ? dropdownRef.current.firstChild.offsetHeight : null
		setMenuHeight(dropRef)
	}, [])

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
				in={activeMenu === 'main'}
				onEnter={calcHeight}
				timeout={500}
				unmountOnExit
			>
				<h2>{Liferay.Language.get('accounts')}</h2>
				<Autocomplete
					alwaysActive={true}
					apiUrl="/o/headless-commerce-admin-account/v1.0/accounts/"
					autofill={true}
					customView={AccountsTable}
					infinityScrollMode={true}
					inputName="account-search"
					itemsKey="id"
					itemsLabel="name"
					onItemSelected={
						console.log
					}
				/>
			</CSSTransition>

			<CSSTransition
				classNames="menu-secondary"
				in={activeMenu === "account1"}
				key="account1"
				onEnter={calcHeight}
				timeout={100}
				unmountOnExit
			>
			</CSSTransition>
				<h2>{Liferay.Language.get('orders')}</h2>
				<Autocomplete
					alwaysActive={true}
					apiUrl="/o/headless-commerce-admin-account/v1.0/accounts/"
					autofill={true}
					customView={AccountsTable}
					infinityScrollMode={true}
					inputName="account-search"
					itemsKey="id"
					itemsLabel="name"
					onItemSelected={
						console.log
					}
				/>
		</ClayDropDown>
	);
}

AccountSelector.propTypes = {
	spritemap: PropTypes.string.isRequired
};

export default AccountSelector;
