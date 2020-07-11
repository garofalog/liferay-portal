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

import {ClayButton, ClayButtonWithIcon} from '@clayui/button';
import ClayForm, {ClayInput} from '@clayui/form';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useRef, useState} from 'react';

function AccountSearch(props) {
	const [text, setText] = useState('');

	return (
		<ClayForm.Group>
			<ClayInput.Group>
				<ClayInput.GroupItem prepend>
					<ClayInput
						classname="m-2"
						placeholder="Search Account"
						type="text"
					/>
				</ClayInput.GroupItem>
				<ClayInput.GroupItem append shrink>
					<ClayButtonWithIcon
						aria-label="Search"
						displayType="secondary"
						spritemap={props.spritemap}
						symbol="search"
					/>
				</ClayInput.GroupItem>
			</ClayInput.Group>
		</ClayForm.Group>
	);
}

// AccountSearch.propTypes = {
// };

export default AccountSearch;
