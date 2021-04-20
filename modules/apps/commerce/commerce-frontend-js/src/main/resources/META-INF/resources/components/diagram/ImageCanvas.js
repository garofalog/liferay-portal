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

import PropTypes from 'prop-types';
import React, {useRef, useState} from 'react';

const redraw = (ctx, width, height, img) => {

	// const p1 = ctx.transformedPoint(0, 0);
	// const p2 = ctx.transformedPoint(width, height);
	// ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

	ctx.save();

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, width, height);
	ctx.restore();

	ctx.drawImage(img, 0, 0);
};

const zoom = (ctx, clicks, lastX, lastY, scaleFactor, img) => {
	const pt = ctx.transformedPoint(lastX, lastY);
	ctx.translate(pt.x, pt.y);
	const factor = Math.pow(scaleFactor, clicks);
	ctx.scale(factor, factor);
	ctx.translate(-pt.x, -pt.y);
	redraw(ctx, lastX * 2, lastY * 2, img);
};

const handleScroll = (ctx, event, lastX, lastY, img) => {
	const delta = event.wheelDelta
		? event.wheelDelta / 40
		: event.detail
		? -event.detail
		: 0;
	if (delta) {
		console.log('delta', delta);
		zoom(ctx, delta, lastX, lastY, 1.1, img);
	}

	return event.preventDefault() && false;
};

const start = (ctx, canvas, lastX, lastY, scaleFactor, img) => {
	let dragged, dragStart;

	// trackTransforms(ctx);

	canvas.addEventListener(
		'mousedown',
		(event) => {
			document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect =
				'none';

			lastX = event.offsetX || event.pageX - canvas.offsetLeft;
			lastY = event.offsetY || event.pageY - canvas.offsetTop;

			dragStart = ctx.transformedPoint(lastX, lastY);

			dragged = false;
		},
		false
	);

	canvas.addEventListener(
		'mouseup',
		(event) => {
			dragStart = null;
			const cli = event.shiftKey ? -1 : 1;

			if (!dragged) {
				zoom(ctx, cli, lastX, lastY, scaleFactor);
			}
		},
		false
	);

	canvas.addEventListener(
		'mousemove',
		(event) => {
			lastX = event.offsetX || event.pageX - canvas.offsetLeft;
			lastY = event.offsetY || event.pageY - canvas.offsetTop;
			dragged = true;
			if (dragStart) {
				const pt = ctx.transformedPoint(lastX, lastY);
				ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
				redraw(ctx, lastX * 2, lastY * 2, img);
			}
		},
		false
	);

	canvas.addEventListener(
		'DOMMouseScroll',
		(event) => handleScroll(ctx, event, lastX, lastY, img),
		false
	);
	canvas.addEventListener(
		'mousewheel',
		(event) => handleScroll(ctx, event, lastX, lastY, img),
		false
	);

	console.log('dragStart', dragStart);
	console.log('dragged', dragged);
};

const trackTransforms = (ctx) => {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	let xform = svg.createSVGMatrix();
	ctx.getTransform = () => xform;

	const savedTransforms = [];
	const save = ctx.save;
	ctx.save = () => {
		savedTransforms.push(xform.translate(0, 0));

		return save.call(ctx);
	};

	const restore = ctx.restore;
	ctx.restore = () => {
		xform = savedTransforms.pop();

		return restore.call(ctx);
	};

	const scale = ctx.scale;
	ctx.scale = (sx, sy) => {
		xform = xform.scaleNonUniform(sx, sy);

		return scale.call(ctx, sx, sy);
	};

	const rotate = ctx.rotate;
	ctx.rotate = (radians) => {
		xform = xform.rotate((radians * 180) / Math.PI);

		return rotate.call(ctx, radians);
	};

	const translate = ctx.translate;
	ctx.translate = (dx, dy) => {
		xform = xform.translate(dx, dy);

		return translate.call(ctx, dx, dy);
	};

	const transform = ctx.transform;
	ctx.transform = (a, b, c, d, e, f) => {
		const m2 = svg.createSVGMatrix();
		m2.a = a;
		m2.b = b;
		m2.c = c;
		m2.d = d;
		m2.e = e;
		m2.f = f;
		xform = xform.multiply(m2);

		return transform.call(ctx, a, b, c, d, e, f);
	};

	const setTransform = ctx.setTransform;
	ctx.setTransform = (a, b, c, d, e, f) => {
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;

		return setTransform.call(ctx, a, b, c, d, e, f);
	};

	const pt = svg.createSVGPoint();
	ctx.transformedPoint = (x, y) => {
		pt.x = x;
		pt.y = y;

		return pt.matrixTransform(xform.inverse());
	};
};

const ImageCanvas = (props) => {
	const [lastX, setLastX] = useState(props.completeimageSettings.lastX);
	const [lastY, setLastY] = useState(props.completeimageSettings.lastX);

	const [ctxStore, setCtxStore] = useState(null);

	// const lastX = props.completeimageSettings.width / 2, lastY = props.completeimageSettings.height / 2;

	const canvasRef = useRef(null);

	window.onload = () => {
		const canvas = canvasRef.current;
		const gkhead = new Image();
		gkhead.src = props.image;

		const ctx = canvas.getContext('2d');
		setCtxStore(ctx);

		console.log(gkhead);
		redraw(
			ctx,
			props.completeimageSettings.width,
			props.completeimageSettings.height,
			gkhead
		);

		// start(ctx, canvas, props.completeimageSettings.lastX, props.completeimageSettings.lastX.lastY, props.completeimageSettings.scaleFactor, gkhead)

		let dragged, dragStart;
		canvas.addEventListener(
			'mousedown',
			(event) => {
				document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect =
					'none';

				setLastX(event.offsetX || event.pageX - canvas.offsetLeft);
				setLastY(event.offsetY || event.pageY - canvas.offsetTop);

				dragStart = ctx.transformedPoint(lastX, lastY);

				dragged = false;
			},
			false
		);

		canvas.addEventListener(
			'mouseup',
			(event) => {
				dragStart = null;
				const cli = event.shiftKey ? -1 : 1;

				if (!dragged) {
					zoom(
						ctx,
						cli,
						lastX,
						lastY,
						props.completeimageSettings.scaleFactor
					);
				}
			},
			false
		);

		canvas.addEventListener(
			'mousemove',
			(event) => {
				setLastX(event.offsetX || event.pageX - canvas.offsetLeft);
				setLastY(event.offsetY || event.pageY - canvas.offsetTop);
				dragged = true;
				if (dragStart) {
					const pt = ctx.transformedPoint(lastX, lastY);
					ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
					redraw(ctx, lastX * 2, lastY * 2, gkhead);
				}
			},
			false
		);

		canvas.addEventListener(
			'DOMMouseScroll',
			(event) => handleScroll(ctx, event, lastX, lastY, gkhead),
			false
		);
		canvas.addEventListener(
			'mousewheel',
			(event) => handleScroll(ctx, event, lastX, lastY, gkhead),
			false
		);

		console.log('dragStart', dragStart);
		console.log('dragged', dragged);
	};

	return (
		<canvas
			height={props.completeimageSettings.height}
			id="imagecanvas"
			ref={canvasRef}
			width={props.completeimageSettings.width}
		></canvas>
	);
};

export default ImageCanvas;

ImageCanvas.propTypes = {
	completeimageSettings: PropTypes.shape({
		height: PropTypes.number,
		lastX: PropTypes.number,
		lastY: PropTypes.number,
		scaleFactor: PropTypes.double,
		width: PropTypes.number,
	}),
	image: PropTypes.string,
	setCanvas: PropTypes.func,
	setctxStore: PropTypes.func,
};
