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
	image: 'https://i0.wp.com/detoxicrecenze.com/wp-content/uploads/2018/05/straight-6-engine-diagram-460-ford-engine-diagram-wiring-info-e280a2-of-straight-6-engine-diagram.jpg',
	navigationController: {
		dragStep: 10,
		enable: true,
		enableDrag: true,
		position: {
			bottom: '15px',
			left: '',
			right: '50px',
			top: ''
		
		}
	},
	pins: [
		{ color: 4, r: 5, x: 35.902106833857765, y: 54.17876064769725 }, 
		{ color: 6, r: 10, x: 353.6965532023335, y: 36.92566831583167 }, 
		{ color: 3, r: 21, x: 100.38075900390436, y: 404.9651880080625 }, 
		{ color: 3, r: 12, x: 225.42119508877246, y: 208.01679515257248 }, 
		{ color: 3, r: 12, x: 284.1028161914142, y: 179.06395973801364 }, 
		{ color: 9, r: 23, x: 51.23146641116725, y: 130.62750589926333 }, 
		{ color: 0, r: 16, x: 469.6902055639296, y: 111.82067084583896 }, 
		{ color: 1, r: 18, x: 343.7363091925929, y: 151.74109656223635 }, 
		{ color: 1, r: 5, x: 463.6874080642692, y: 393.84202391797453 }, 
		{ color: 8, r: 25, x: 139.69729329671517, y: 195.0193289694761 }
	],
	spritemap: './assets/clay/icons.svg',
	zoomController: {
		enable: true,
		enablePanZoom: true,
		position: {
			bottom: '0px',
			left: '',
			right: '200px',
			top: ''

		}
	},
});

