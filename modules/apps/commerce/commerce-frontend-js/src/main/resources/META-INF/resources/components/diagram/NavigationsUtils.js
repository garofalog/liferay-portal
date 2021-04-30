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
