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
			color: '#f90e19',
			id: 0,
			linked_to_sku: 'sku',
			quantity: '',
			r: 5,
			sku: '',
			x: 35.902106833857765,
			y: 54.17876064769725,
		},
		{
			color: '#b6fb00',
			id: 1,
			linked_to_sku: 'sku',
			quantity: '',
			r: 10,
			sku: '',
			x: 353.6965532023335,
			y: 36.92566831583167,
		},
		{
			color: '#733edc',
			id: 2,
			linked_to_sku: 'sku',
			quantity: '',
			r: 21,
			sku: '',
			x: 100.38075900390436,
			y: 404.9651880080625,
		},
		{
			color: '#34fbe8',
			id: 3,
			linked_to_sku: 'sku',
			quantity: '',
			r: 12,
			sku: '',
			x: 225.42119508877246,
			y: 208.01679515257248,
		},
		{
			color: '#dc7aa5',
			id: 4,
			linked_to_sku: 'sku',
			quantity: '',
			r: 12,
			sku: '',
			x: 284.1028161914142,
			y: 179.06395973801364,
		},
		{
			color: '#2c3d34',
			id: 5,
			linked_to_sku: 'sku',
			quantity: '',
			r: 23,
			sku: '',
			x: 51.23146641116725,
			y: 130.62750589926333,
		},
		{
			color: '#96e135',
			id: 6,
			linked_to_sku: 'sku',
			quantity: '',
			r: 16,
			sku: '',
			x: 469.6902055639296,
			y: 111.82067084583896,
		},
		{
			color: '#ff7f0e',
			id: 7,
			linked_to_sku: 'sku',
			quantity: '',
			r: 18,
			sku: '',
			x: 343.7363091925929,
			y: 151.74109656223635,
		},
		{
			color: '#c60f0c',
			id: 8,
			linked_to_sku: 'sku',
			quantity: '',
			r: 5,
			sku: '',
			x: 463.6874080642692,
			y: 393.84202391797453,
		},
		{
			color: '#ad9520',
			id: 9,
			linked_to_sku: 'sku',
			quantity: '',
			r: 25,
			sku: '',
			x: 139.69729329671517,
			y: 195.0193289694761,
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
