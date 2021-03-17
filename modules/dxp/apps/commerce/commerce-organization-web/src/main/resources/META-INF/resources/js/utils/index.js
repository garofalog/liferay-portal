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

function getColumns(items) {
	const columns = [];
	let depth = 0;

	function loopTroughItems(items) {
		if (!columns[depth]) {
			columns[depth] = [];
		}

		const children = [];

		items.forEach((item) => {
			columns[depth].push(item);

			if (item.children) {
				children.push(...item.children);
			}
		});

		if (children.length) {
			depth++;
			loopTroughItems(children);
		}
	}

	loopTroughItems(items);

	return columns;
}

export function formatHierachicalData(data) {
	const columns = getColumns(data);

	return columns;
}
