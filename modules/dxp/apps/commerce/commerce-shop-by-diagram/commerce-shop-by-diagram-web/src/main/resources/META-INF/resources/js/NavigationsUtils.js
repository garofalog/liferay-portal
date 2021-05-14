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

export const moveRight = (container, navigationController) => {
	const getPosition = container.attr('transform');
	const scale = getPosition.match(/(-?[0-9]+[.,-\s]*)+/g);
	const coordinates = scale[0].split(',').map((x) => parseInt(x, 10));
	const newPosition = {
		k: parseFloat(scale[1]),
		x: coordinates[0] + navigationController.dragStep,
		y: coordinates[1],
	};
	container.attr(
		'transform',
		`translate(${newPosition.x},${newPosition.y}) scale(${newPosition.k})`
	);
};
export const moveLeft = (container, navigationController) => {
	const getPosition = container.attr('transform');
	const scale = getPosition.match(/(-?[0-9]+[.,-\s]*)+/g);
	const coordinates = scale[0].split(',').map((x) => parseInt(x, 10));
	const newPosition = {
		k: parseFloat(scale[1]),
		x: coordinates[0] - navigationController.dragStep,
		y: coordinates[1],
	};
	container.attr(
		'transform',
		`translate(${newPosition.x},${newPosition.y}) scale(${newPosition.k})`
	);
};
export const moveUp = (container, navigationController) => {
	const getPosition = container.attr('transform');
	const scale = getPosition.match(/(-?[0-9]+[.,-\s]*)+/g);
	const coordinates = scale[0].split(',').map((x) => parseInt(x, 10));
	const newPosition = {
		k: parseFloat(scale[1]),
		x: coordinates[0],
		y: coordinates[1] - navigationController.dragStep,
	};
	container.attr(
		'transform',
		`translate(${newPosition.x},${newPosition.y}) scale(${newPosition.k})`
	);
};
export const moveDown = (container, navigationController) => {
	const getPosition = container.attr('transform');
	const scale = getPosition.match(/(-?[0-9]+[.,-\s]*)+/g);
	const coordinates = scale[0].split(',').map((x) => parseInt(x, 10));
	const newPosition = {
		k: parseFloat(scale[1]),
		x: coordinates[0],
		y: coordinates[1] + navigationController.dragStep,
	};
	container.attr(
		'transform',
		`translate(${newPosition.x},${newPosition.y}) scale(${newPosition.k})`
	);
};

export const zoomIn = (container, panZoom) => {
	container.transition().duration(700).call(panZoom.scaleBy, 1.2);
};
export const zoomOut = (container, panZoom) => {
	container.transition().duration(700).call(panZoom.scaleBy, 0.8);
};
