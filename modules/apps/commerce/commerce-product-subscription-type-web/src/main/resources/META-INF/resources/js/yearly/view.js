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


export default function ({modeExactdayOfYear, namespace}) {
	function changeYearlyDeliveryCPSubscriptionTypeSettingsMode() {
const deliveryYearlyMode = document.getElementById(`${namespace}deliveryYearlyMode`).value
				if (
					deliveryYearlyMode === modeExactdayOfYear
				) {
					document.getElementById(`${namespace}deliveryExactDayOfYearInputContainer`).style.display = 'block'
					
				}
				else if 
					(
						document.getElementById(`${namespace}deliveryExactDayOfYearInputContainer`).style.display === 'none'
					) {
						document.getElementById(`${namespace}deliveryExactDayOfYearInputContainer`
						).style.display = 'none'
					}
				}
			}

