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

import {toggleDisabled} from 'frontend-js-web';


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

export default function ({
	commerceRegionCode,
	companyId,
	countryTwoLettersISOCode,
	namespace,
    isShippingUsedAsBilling
}) {
	new Liferay.DynamicSelect([
		{
			select: `${namespace}countryTwoLettersISOCode`,
			selectData: (callback) => {
				Liferay.Service(
					'/country/get-company-countries',
					{
						active: true,
						companyId,
					},
					callback
				);
			},
			selectDesc: 'nameCurrentValue',
			selectId: 'a2',
			selectSort: true,
			selectVal: countryTwoLettersISOCode,
		},
		{
			select: `${namespace}commerceRegionCode`,
			selectData: (callback, selectKey) => {
				Liferay.Service(
					'/region/get-regions',
					{
						a2: selectKey,
						active: true,
						companyId,
					},
					callback
				);
			},
			selectDesc: 'name',
			selectId: 'regionCode',
			selectVal: commerceRegionCode,
		},
	]);
}


export default function ({namespace }) {


    const chooseShippingAddress = document.getElementsByName(`${namespace}commerceAddress`)
    chooseShippingAddress.addEventListener('change',()=> {
			var commerceAddressParamName = A.one(
				'#<%= liferayPortletResponse.getNamespace() + paramName %>'
			);
			const newAddress = document.getElementById(`${namespace}newAddress`);

			if (newAddress && chooseShippingAddress && commerceAddressParamName) {

				if (chooseShippingAddress.value === '0') {
					clearAddressFields();
					toggleAddressFields(false);
				}
				else {
					updateAddressFields(
						chooseShippingAddress.get('selectedIndex')
					);
					Liferay.Form.get(
						`${namespace}fm`
					).formValidator.validate();
				}

				commerceAddressParamName.val(chooseShippingAddress.value);
				newAddress.val(Number(chooseShippingAddress.value === '0'));
			}
    })
	

	function toggleAddressFields(state) {

			Liferay.Util.toggleDisabled(A.all('.address-fields input'), state);
			Liferay.Util.toggleDisabled(A.all('.address-fields select'), state);

			var commerceRegionIdSelect = A.one(
				`#${namespace}regionId`
			).getDOMNode();
			var commerceRegionIdInput = A.one(
				`#${namespace}commerceRegionIdInput`
			).getDOMNode();
			var commerceRegionIdName = A.one(
				`#${namespace}commerceRegionIdName`
			).getDOMNode();

			commerceRegionIdSelect.setAttribute(
				'name',
				`${namespace}regionId`
			);
			commerceRegionIdSelect.parentElement.classList.remove('d-none');

			commerceRegionIdInput.setAttribute(
				'name',
				'commerceRegionIdInputDisabled'
			);
			commerceRegionIdInput.parentElement.classList.add('d-none');
			commerceRegionIdName.setAttribute(
				'name',
				'commerceRegionIdInputDisabled'
			);
			commerceRegionIdName.parentElement.classList.add('d-none');
		}
        function clearAddressFields() {
			var A = AUI();

			A.all('.address-fields select').set('selectedIndex', 0);
			A.all('.address-fields input').val('');

			var useAsBillingField = A.one('#${namespace}use-as-billing');

			if (useAsBillingField) {
				useAsBillingField.attr(
					'checked',
					isShippingUsedAsBilling
				);
			}
		}

	function updateAddressFields(selectedVal) {
			if (!selectedVal || selectedVal === '0') {
				return;
			}

			var commerceAddress = document.getElementById(`#${namespace}commerceAddress`);

			if (commerceAddress) {
				addStreetAddress();
				toggleAddressFields(true);

				var city = document.getElementById(`#${namespace}city`);
				var countryId = document.getElementById(`#${namespace}countryId`);
				var commerceRegionIdInput = document.getElementById(			`#${namespace}commerceRegionIdInput`
				).getDOMNode();
				var commerceRegionIdName = document.getElementById	(			`#${namespace}commerceRegionIdName`
				).getDOMNode();
				var commerceRegionIdSelect = document.getElementById(`#${namespace}regionId`
				).getDOMNode();
				var name = A.one('#${namespace}name');
				var phoneNumber = document.getElementById(`#${namespace}phoneNumber`);
				var street1 = document.getElementById(`#${namespace}street1`);
				var street2 = document.getElementById(`#${namespace}street2`);
				var street3 = document.getElementById(`#${namespace}street3`);
				var zip = document.getElementById(`#${namespace}zip`);

				if (
					city &&
					countryId &&
					commerceRegionIdInput &&
					commerceRegionIdSelect &&
					commerceRegionIdName &&
					name &&
					phoneNumber &&
					street1 &&
					street2 &&
					street3 &&
					zip
				) {
					var selectedOption = commerceAddress
						.get('options')
						.item(selectedVal);

					city.val(selectedOption.getData('city'));
					countryId.val(selectedOption.getData('country'));
					name.val(selectedOption.getData('name'));
					phoneNumber.val(selectedOption.getData('phone-number'));
					street1.val(selectedOption.getData('street-1'));
					street2.val(selectedOption.getData('street-2'));
					street3.val(selectedOption.getData('street-3'));
					zip.val(selectedOption.getData('zip'));

					commerceRegionIdSelect.setAttribute(
						'name',
						'commerceRegionIdSelectIgnore'
					);
					commerceRegionIdSelect.parentElement.classList.add('d-none');

					commerceRegionIdInput.value = selectedOption.getData('region');
					commerceRegionIdInput.setAttribute(
						'name',
						'${namespace}regionId'
					);
					commerceRegionIdInput.parentElement.classList.add('d-none');

					commerceRegionIdName.setAttribute(
						'name',
						'commerceRegionIdNameIgnore'
					);
					commerceRegionIdName.parentElement.classList.remove('d-none');

					Liferay.Service(
						'/region/get-regions',
						{
							active: true,
							countryId: parseInt(
								selectedOption.getData('country'),
								10
							),
						},
						function setUIOnlyInputRegionName(regions) {
							for (var i = 0; i < regions.length; i++) {
								if (
									regions[i].regionId ===
									selectedOption.getData('region')
								) {
									commerceRegionIdName.value = regions[i].name;

									break;
								}
							}
						}
					);
				}
			}
		}
        
        function addStreetAddress() {
			var A = AUI();

			var addStreetFields = A.one('.add-street-fields');
			var addStreetLink = A.one('.add-street-link');

			if (addStreetFields) {
				addStreetFields.show();
			}
			if (addStreetLink) {
				addStreetLink.hide();
			}
		}

}