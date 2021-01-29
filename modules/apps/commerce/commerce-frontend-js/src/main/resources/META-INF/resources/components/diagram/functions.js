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

let gimg, gclicks

export const redraw = (ctx, width, height, img) => {
    console.log('gimg> ', gimg)
    gimg = img
    
    const p1 = ctx.transformedPoint(0, 0);
    const p2 = ctx.transformedPoint(width, height);
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.restore();


    ctx.drawImage(img, 0,0, width, height);


    // ctx.beginPath();
    // ctx.lineWidth = 6;
    // ctx.moveTo(399, 250);
    // ctx.lineTo(474, 256);
    // ctx.stroke();

    // ctx.save();
    // ctx.translate(4, 2);
    // ctx.beginPath();
    // ctx.lineWidth = 1;
    // ctx.moveTo(436, 253);
    // ctx.lineTo(437.5, 233);
    // ctx.stroke();

    // ctx.save();
    // ctx.translate(438.5, 223);
    // ctx.strokeStyle = '#06c';
    // ctx.beginPath();
    // ctx.lineWidth = 0.05;
    // for (var i = 0; i < 60; ++i) {
    //     ctx.rotate(6 * i * Math.PI / 180);
    //     ctx.moveTo(9, 0);
    //     ctx.lineTo(10, 0);
    //     ctx.rotate(-6 * i * Math.PI / 180);
    // }
    // ctx.stroke();
    // ctx.restore();

    // ctx.beginPath();
    // ctx.lineWidth = 0.2;
    // ctx.arc(438.5, 223, 10, 0, Math.PI * 2);
    // ctx.stroke();
    // ctx.restore();

    // ctx.drawImage(ball, 379, 233, 40, 40);
    // ctx.drawImage(ball, 454, 239, 40, 40);
    // ctx.drawImage(ball, 310, 295, 20, 20);
    // ctx.drawImage(ball, 314.5, 296.5, 5, 5);
    // ctx.drawImage(ball, 319, 297.2, 5, 5);
}

export const zoom = (ctx, clicks, lastX, lastY, scaleFactor) => {
    const pt = ctx.transformedPoint(lastX, lastY);
    ctx.translate(pt.x, pt.y);
    const factor = Math.pow(scaleFactor, clicks);
    ctx.scale(factor, factor);
    ctx.translate(-pt.x, -pt.y);
    
}

// export const resetZoom = () => {
//     redraw(ctx, lastX * 2, lastY * 2, gimg);
// }

export const trackTransforms = (ctx) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
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
        xform = xform.rotate(radians * 180 / Math.PI);

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
        m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
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
        pt.x = x; pt.y = y;

        return pt.matrixTransform(xform.inverse());
    }
}

export const handleScroll = (ctx, evt) => {
    const delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
    if (delta) {
        console.log(delta)
        gclicks = delta
        zoom(ctx, delta, 350, 250, 1)
    }

    return evt.preventDefault() && false;
};

export const start = (ctx, canvas, lastX, lastY, dragStart, dragged, scaleFactor) => {

    // trackTransforms(ctx);

    canvas.addEventListener('mousedown', (evt) => {
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragStart = ctx.transformedPoint(lastX, lastY);
        dragged = false;
    }, false);

    canvas.addEventListener('mouseup', (evt) => {
        dragStart = null;
        const cli = evt.shiftKey ? -1 : 1
        console.log(cli)
        gclicks = cli
        if (!dragged) { zoom(ctx, cli, lastX, lastY, scaleFactor); }
    }, false);

    canvas.addEventListener('mousemove', (evt) => {
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;
        if (dragStart) {
            var pt = ctx.transformedPoint(lastX, lastY);
            ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
            redraw(ctx, lastX*2, lastY*2 );
        }
    }, false);

    canvas.addEventListener('DOMMouseScroll', (evt) => handleScroll(ctx, evt), false);
    canvas.addEventListener('mousewheel', (evt) => handleScroll(ctx, evt), false);

}