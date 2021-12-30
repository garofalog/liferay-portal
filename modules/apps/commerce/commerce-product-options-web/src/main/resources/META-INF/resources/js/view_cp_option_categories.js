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

export default function ({cmd, editCPOptionCategoryActionURL, namespace}) {
	const deleteCPOptionCategoriesLink = document.getElementById(
		`${namespace}deleteCPOptionCategories`
	);

	deleteCPOptionCategoriesLink.addEventListener('click', (event) => {
		event.preventDefault();
		if (
			confirm(
				Liferay.Language.get(
					'are-you-sure-you-want-to-delete-the-selected-specification-groups'
				)
			)
		) {
			const form = document.getElementById(`${namespace}fm`);

			form.setAttribute('method', 'post');
			const cmdInput = document.getElementById(`${namespace}cmd`);
			cmdInput.value = cmd;

			const deleteForm = document.querySelector(
				`input[type=hidden][name="deleteCPOptionCategoryIds"]`
			);

			deleteForm.value = Liferay.Util.listCheckedExcept(
				form,
				`${namespace}allRowIds`
			);

			submitForm(form, editCPOptionCategoryActionURL);
		}
	});
}
