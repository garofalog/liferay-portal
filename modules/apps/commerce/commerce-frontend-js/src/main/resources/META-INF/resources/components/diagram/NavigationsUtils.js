export const moveRight = (container, navigationController) => {
	const position = container.attr('transform');
	const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
	const co = vai[0].split(',').map((x) => parseInt(x, 10));
	const s = {
		k: parseFloat(vai[1]),
		x: co[0] + navigationController.dragStep,
		y: co[1],
	};
	container.attr('transform', `translate(${s.x},${s.y}) scale(${s.k})`);
};
export const moveLeft = (container, navigationController) => {
	const position = container.attr('transform');
	const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
	const co = vai[0].split(',').map((x) => parseInt(x, 10));
	const s = {
		k: parseFloat(vai[1]),
		x: co[0] - navigationController.dragStep,
		y: co[1],
	};
	container.attr('transform', `translate(${s.x},${s.y}) scale(${s.k})`);
};
export const moveUp = (container, navigationController) => {
	const position = container.attr('transform');
	const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
	const co = vai[0].split(',').map((x) => parseInt(x, 10));
	const s = {
		k: parseFloat(vai[1]),
		x: co[0],
		y: co[1] - navigationController.dragStep,
	};
	container.attr('transform', `translate(${s.x},${s.y}) scale(${s.k})`);
};
export const moveDown = (container, navigationController) => {
	const position = container.attr('transform');
	const vai = position.match(/(-?[0-9]+[.,-\s]*)+/g);
	const co = vai[0].split(',').map((x) => parseInt(x, 10));
	const s = {
		k: parseFloat(vai[1]),
		x: co[0],
		y: co[1] + navigationController.dragStep,
	};
	container.attr('transform', `translate(${s.x},${s.y}) scale(${s.k})`);
};

export const zoomIn = (container, panZoom) => {
	panZoom.scaleBy(container.transition().duration(400), 1.2);
};
export const zoomOut = (container, panZoom) => {
	panZoom.scaleBy(container.transition().duration(400), 0.8);
};
