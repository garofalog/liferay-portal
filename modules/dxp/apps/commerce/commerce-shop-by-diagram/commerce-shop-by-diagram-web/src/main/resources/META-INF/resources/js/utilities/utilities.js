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

import {fetch} from 'frontend-js-web';

export const HEADERS = new Headers({
	Accept: 'application/json',
	'Content-Type': 'application/json',
});

const SKUS_ENDPOINT = '/o/headless-commerce-admin-catalog/v1.0/skus';
const DIAGRAMS_ENDPOINT = '/o/headless-commerce-admin-catalog/v1.0/products';

export function searchSkus(query) {
	const url = new URL(SKUS_ENDPOINT, themeDisplay.getPortalURL());

	url.searchParams.append('search', query);

	return fetch(url, {
		headers: HEADERS,
	}).then((response) => response.json());
}

export function searchDiagrams(query) {
	const url = new URL(DIAGRAMS_ENDPOINT, themeDisplay.getPortalURL());

	url.searchParams.append('search', query);
	url.searchParams.append('filter', `(productType eq 'diagram')`);

	return fetch(url, {
		headers: HEADERS,
	}).then((response) => response.json());
}

export const importPinSchema = (svgString) => {
	const textDatas = [];
	const pinDatas = [];
	const parser = new DOMParser();
	const xmlImage = parser.parseFromString(svgString, 'image/svg+xml');
	const rootLevel = xmlImage.getElementById('Livello_Testi');
	if (rootLevel) {
		const rects = rootLevel.getElementsByTagName('rect');
		console.log({rects});
		const texts = rootLevel.getElementsByTagName('text');
		console.log({texts})

		Array.from(rects).map((rect, i) => {
			rect.addEventListener('click', () =>
				console.log(`ciao ${i}`)
			);
		});
		Array.from(texts).map((text, i) => {
			textDatas.push({
				label: text.textContent,
			});
			text.addEventListener('click', () => {
				setVisible(true)
				const test1 = {
					details: {
						cx: null,
						cy: null,
						id: null,
						label: textDatas[i].label,
						linkedToSku: 'sku',
						quantity: null,
						sku: '',
						transform:
							'matrix(0.9999 0.0165 -0.0165 0.9999 86.0798 171.5356)',
					},
					tooltip: true,
				}
				// pinClickAction(test1);
				console.log(test1);
				setShowTooltip(test1);
			});
		});
		
		
		// Array.from(text).map((tex) => {
		// 	textDatas.push({
		// 		label: tex.textContent,
		// 	});
		// 	tex.addEventListener('click', () => {
		// 		setVisible(true)
		// 		const test1 = {
		// 			details: {
		// 				cx: null,
		// 				cy: null,
		// 				id: null,
		// 				label: textDatas[i].label,
		// 				linkedToSku: 'sku',
		// 				quantity: null,
		// 				sku: '',
		// 				transform:
		// 					'matrix(0.9999 0.0165 -0.0165 0.9999 86.0798 171.5356)',
		// 			},
		// 			tooltip: true,
		// 		}
		// 		console.log(test1)
		// 		// pinClickAction(test1);
		// 		// console.log(test1);
		// 		// setShowTooltip(test1);
		// 	});
		// });

		// Array.from(rects).map((r, i) => {
		// 	pinDatas.push({
		// 		cx: r.attributes.x.value / 2.78,
		// 		cy: r.attributes.y.value / 2.78,
		// 		id: i,
		// 		label: textDatas[i].label,
		// 	});
		// });
		return pinDatas;
	}
};