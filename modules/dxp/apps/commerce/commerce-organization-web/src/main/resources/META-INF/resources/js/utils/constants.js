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

export const RECT_SIZES = {
	account: {
		height: 64,
		width: 260,
	},
	organization: {
		height: 72,
		width: 280,
	},
	user: {
		height: 56,
		width: 240,
	},
};

export const RECT_PADDING = 16;
export const ICON_RADIUS = 16;

export const COLUMN_SIZE = RECT_SIZES.organization[0];

export const COLUMN_GAP = 60;

export const MARGIN_LEFT = 40;

export const SYMBOLS_MAP = {
	account: 'users',
	organization: 'organizations',
	user: 'user',
};

export const DX = 90;
export const DY = 400;
