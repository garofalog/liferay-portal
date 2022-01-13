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

export default function ({itemSelectedEventName, namespace}) {
	var searchContainer = Liferay.SearchContainer.get(
		`${namespace}commerceAccounts`
	);

	searchContainer.on('rowToggled', (event) => {
		var allSelectedElements = event.elements.allSelectedElements;
		var allSelectedElementsData = [];

		allSelectedElements.each(function () {
			var row = this.ancestor('tr');

			var data = row.getDOM().dataset;

			allSelectedElementsData.push({
				commerceAccountId: data.commerceAccountId,
				name: data.name,
			});
		});

		Liferay.Util.getOpener().Liferay.fire(itemSelectedEventName, {
			data: allSelectedElementsData,
		});
	});
}
