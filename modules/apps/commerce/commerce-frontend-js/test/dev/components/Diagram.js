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

import launcher from '../../../src/main/resources/META-INF/resources/components/diagram/entry';

import '../../../src/main/resources/META-INF/resources/styles/main.scss';

import '../../../src/main/resources/META-INF/resources/components/diagram/_diagram.scss';

launcher('diagram', 'diagram', {
	completeImageSettings: {
		height: '500px',
		lastX: 250,
		lastY: 350,
		scaleFactor: 1.1,
		width: '100%',
	},
	dragStep: 50,
	image:
		'https://i0.wp.com/detoxicrecenze.com/wp-content/uploads/2018/05/straight-6-engine-diagram-460-ford-engine-diagram-wiring-info-e280a2-of-straight-6-engine-diagram.jpg',
	navigationController: {
		dragStep: 10,
		enable: true,
		enableDrag: false,
		position: {
			bottom: '15px',
			left: '',
			right: '50px',
			top: '',
		},
	},
	pins: [
		{
			cx: 50,
			cy: 50,
			draggable: true,
			fill: '#f90e19',
			id: 0,
			linked_to_sku: 'sku',
			quantity: 0,			
			r: 25,
			sku: '0bskoi0o',
		},
		{
			cx: 353.6965532023335,
			cy: 36.92566831583167,
			draggable: true,
			fill: '#b6fb00',
			id: 1,
			linked_to_sku: 'sku',
			quantity: 11,			
			r: 10,
			sku: '1nonlo',
		},
		{
			cx: 100.38075900390436,
			cy: 404.9651880080625,
			draggable: true,
			fill: '#733edc',
			id: 2,
			linked_to_sku: 'sku',
			quantity: 2,			
			r: 21,
			sku: '2npiomnn',
		},
		{
			cx: 225.42119508877246,
			cy: 208.01679515257248,
			draggable: true,
			fill: '#34fbe8',
			id: 3,
			linked_to_sku: 'sku',
			quantity: 0,			
			r: 18,
			sku: '3nionmoiv3',
		},
		{
			cx: 284.1028161914142,
			cy: 179.06395973801364,
			draggable: true,
			fill: '#dc7aa5',
			id: 4,
			linked_to_sku: 'sku',
			quantity: 33,			
			r: 12,
			sku: '4n4oin',
		},
		{
			cx: 51.23146641116725,
			cy: 130.62750589926333,
			draggable: true,
			fill: '#2c3d34',
			id: 5,
			linked_to_sku: 'sku',
			quantity: 10,			
			r: 23,
			sku: 'fmwfo5in',
		},
		{
			cx: 469.6902055639296,
			cy: 111.82067084583896,
			draggable: true,
			fill: '#96e135',
			id: 6,
			linked_to_sku: 'sku',
			quantity: 6,			
			r: 16,
			sku: '6nkljnwsd6',
		},
		{
			cx: 343.7363091925929,
			cy: 151.74109656223635,
			draggable: true,
			fill: '#ff7f0e',
			id: 7,
			linked_to_sku: 'sku',
			quantity: 3,			
			r: 18,
			sku: 'no7i7n',
		},
		{
			cx: 463.6874080642692,
			cy: 393.84202391797453,
			draggable: true,
			fill: '#c60f0c',
			id: 8,
			linked_to_sku: 'sku',
			quantity: 1,			
			r: 5,
			sku: 'ca8daaa',
		},
		{
			cx: 139.69729329671517,
			cy: 195.0193289694761,
			draggable: true,
			fill: '#ad9520',
			id: 9,
			linked_to_sku: 'sku',
			quantity: 0,			
			r: 25,
			sku: '999999jjujn',
		},
	],
	spritemap: './assets/clay/icons.svg',
	zoomController: {
		enable: true,
		enablePanZoom: true,
		position: {
			bottom: '0px',
			left: '',
			right: '200px',
			top: '',
		},
	},
});
