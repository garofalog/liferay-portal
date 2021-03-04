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

import launcher from '../../../src/main/resources/META-INF/resources/components/d3diagram/entry';

import '../../../src/main/resources/META-INF/resources/styles/main.scss';

import '../../../src/main/resources/META-INF/resources/components/diagram/_diagram.scss';


launcher('d3diagram', 'd3diagram', {
    // image: './assets/diagram.jpg',

    image: 'https://i0.wp.com/detoxicrecenze.com/wp-content/uploads/2018/05/straight-6-engine-diagram-460-ford-engine-diagram-wiring-info-e280a2-of-straight-6-engine-diagram.jpg',
    imageSettings: {
        height: 500,
        lastX: 250,
        lastY: 350,
        scaleFactor: 1.1,
        width: 700,
    },
    spritemap: './assets/clay/icons.svg',
});

