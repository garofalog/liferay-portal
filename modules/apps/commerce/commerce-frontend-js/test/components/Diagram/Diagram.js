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

import '@testing-library/jest-dom/extend-expect';
import {cleanup, render} from '@testing-library/react';
import React from 'react';

import Diagram from '../../../src/main/resources/META-INF/resources/components/diagram/Diagram';

describe('Diagram 1 of 5 features', () => {
	const initialProps = {
		image:
			'https://i0.wp.com/detoxicrecenze.com/wp-content/uploads/2018/05/straight-6-engine-diagram-460-ford-engine-diagram-wiring-info-e280a2-of-straight-6-engine-diagram.jpg',
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		cleanup();
	});

	it('Diagram image loads', () => {
		const {container} = render(<Diagram {...initialProps} />);
		const image = container.querySelector('image');
		expect(image.href).toBe(initialProps.href);
	});

	it('If Zoom Controller is enabled, will render the component', () => {
		const {container} = render(
			<Diagram
				{...initialProps}
				zoomController={{
					enable: true,
					position: {
						bottom: '0px',
						left: '',
						right: '200px',
						top: '',
					},
				}}
			/>
		);

		const controller = container.querySelector('#zoom-controller');

		expect(controller).toBeTruthy();
	});

	it("If Zoom Controller is disabled, it won't be rendered", () => {
		const {container} = render(
			<Diagram {...initialProps} zoomController={{enable: false}} />
		);

		const controller = container.querySelector('#zoom-controller');

		expect(controller).toBeFalsy();
	});

	it('If Navigation Controller is enabled, will render the component', () => {
		const {container} = render(
			<Diagram
				{...initialProps}
				navigationController={{
					dragStep: 10,
					enable: true,
					enableDrag: false,
					position: {
						bottom: '15px',
						left: '',
						right: '50px',
						top: '',
					},
				}}
			/>
		);

		const controller = container.querySelector('#move-controller');

		expect(controller).toBeTruthy();
	});

	it("If Navigation Controller is disabled, it won't be rendered", () => {
		const {container} = render(
			<Diagram {...initialProps} navigationController={{enable: false}} />
		);

		const controller = container.querySelector('#move-controller');

		expect(controller).toBeFalsy();
	});
});
