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

import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayInput } from '@clayui/form';
import { ClaySelect } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import DiagramFooter from './DiagramFooter';
import DiagramHeader from './DiagramHeader';
import ImageCanvas from './ImageCanvas'

// import { handleScroll, redraw, resetZoom, start, trackTransforms , zoom} from './functions'

let gimg, gclicks



const Diagram = (props) => {
    const [canvas, setCanvas] = useState(null);

    const [ctxStore, setCtxStore] = useState(null)

    const [event, setEvent] = useState(null)
    const [height, setHeight] = useState(props.imageSettings.height)
    const [width, setWidth] = useState(props.imageSettings.width)
    const [img, setImg] = useState(null)
    const [lastCoordinates, setLastCoordinates] = useState([null, null])

    const [dragStart, setDragStart] = useState(null)
    const [dragged, setDragged] = useState(null)

    // const gkhead = new Image;

    // const ball = new Image;

    // let dragStart, dragged;

    // const canvasRef = useRef(null)

    const redraw = (ctx, width, height, img) => {

        // const p1 = ctx.transformedPoint(0, 0);
        // const p2 = ctx.transformedPoint(width, height);
        // ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.restore();

        ctx.drawImage(img, 0, 0);


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

    const zoom = (ctx, clicks, lastX, lastY, scaleFactor, img) => {
        const pt = ctx.transformedPoint(lastX, lastY);
        ctx.translate(pt.x, pt.y);
        const factor = Math.pow(scaleFactor, clicks);
        ctx.scale(factor, factor);
        ctx.translate(-pt.x, -pt.y);
        redraw(ctx, lastX * 2, lastY * 2, img);
    }

    const resetZoom = (ctx, width, height, img) => {
        // var p1 = ctx.transformedPoint(0, 0);
        // var p2 = ctx.transformedPoint(width, height);
        // ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

        // ctx.save();
        // ctx.setTransform(1, 0, 0, 1, 0, 0);
        // ctx.clearRect(0, 0, width, height);
        // ctx.restore();

        ctx.drawImage(img, 0, 0, width, height);

        // redraw(ctx, width, height, img);
    }

    const trackTransforms = (ctx) => {
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

    const handleScroll = (ctx, event, lastX, lastY, img) => {
        const delta = event.wheelDelta ? event.wheelDelta / 40 : event.detail ? -event.detail : 0;
        if (delta) {
            console.log('delta', delta)
            setEvent(event)
            setLastCoordinates([lastX, lastY])

            // setAssets({event, lastX, lastY});

            zoom(ctx, delta, lastX, lastY, 1.1, img)
        }

        return event.preventDefault() && false;
    };

    const start = (ctx, canvas, lastX, lastY, dragStart, dragged, scaleFactor, img) => {

        // trackTransforms(ctx);

        const context = ctx

        canvas.addEventListener('mousedown', (event) => {
            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';

            setLastCoordinates([
                event.offsetX || (event.pageX - canvas.offsetLeft),
                event.offsetY || (event.pageY - canvas.offsetTop)
            ])

            //dragStart =

            setDragStart( () => {
                console.log(event.offsetX || (event.pageX - canvas.offsetLeft), event.offsetY || (event.pageY - canvas.offsetTop))
 
                return context.transformedPoint(event.offsetX || (event.pageX - canvas.offsetLeft), event.offsetY || (event.pageY - canvas.offsetTop))
            })

            // setDragged(false)

            setDragged(false)
        }, false);

        canvas.addEventListener('mouseup', (event) => {
            dragStart = null
            const cli = event.shiftKey ? -1 : 1

            if (!dragged) { zoom(ctx, cli, lastX, lastY, scaleFactor); }
        }, false);

        canvas.addEventListener('mousemove', (event) => {
            setLastCoordinates([
                event.offsetX || (event.pageX - canvas.offsetLeft),
                event.offsetY || (event.pageY - canvas.offsetTop)
            ])

            lastX = event.offsetX || (event.pageX - canvas.offsetLeft);
            lastY = event.offsetY || (event.pageY - canvas.offsetTop);

            dragged = true
            if (dragStart) {
                const pt = ctx.transformedPoint(lastX, lastY);
                ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
                redraw(ctx, lastX * 2, lastY * 2, img);
            }
        }, false);

        canvas.addEventListener('DOMMouseScroll', (event) => handleScroll(ctx, event, lastCoordinates[0], lastCoordinates[1], img), false);
        canvas.addEventListener('mousewheel', (event) => handleScroll(ctx, event, lastX, lastY, img), false);

        console.log('dragStart', dragStart)
        console.log('dragged', dragged)
    }

    



    // window.onload = () => {

    //     const canvasContainer = canvasRef.current
    //     const gkhead = new Image();
    //     gkhead.src = props.image

    //     const ctx = canvasContainer.getContext('2d');


    //     console.log('stocazzo')
    //     redraw(ctx, width, height, gkhead)

    //     start(ctx, canvasContainer, lastCoordinates[0], lastCoordinates[1], dragStart, dragged, props.imageSettings.scaleFactor, gkhead)

    // }
    

    // useEffect(() => {

    //     setTimeout(() => {
            

            // setCanvas(canvas)


            

            // setCtxStore(ctx)

            // trackTransforms(ctx);

            
            
            // console.log(props.imageSettings)



            // ball.src = './assets/alphaball.png';

            // setCtx(ctx)

            // setImg(gkhead)

            // ctx.drawImage(gkhead, 0, 0, props.imageSettings.width, props.imageSettings.height);
            // ctx.scale(.5, .5)
            // ctx.drawImage(gkhead, props.imageSettings.width / 2, props.imageSettings.height / 2, props.imageSettings.width, props.imageSettings.height);


            
    //     },2000)
        
    // }, [])

    const completeimageSettings = {
        height: props.imageSettings.height,
        lastX: props.imageSettings.width / 2,
        lastY: props.imageSettings.height / 2,
        scale: 1.1, //props.imageSettings.scaleFactor,
        width: props.imageSettings.width,

    }


    const options = [
        {
            label: "175%",
            value: "175"
        },
        {
            label: "150%",
            value: "150"
        },
        {
            label: "125%",
            value: "125"
        },
        {
            label: "100%",
            value: "100"
        },
        {
            label: "75%",
            value: "75"
        },
        {
            label: "50%",
            value: "50"
        }
    ];


    return (
        <div className="diagram mx-auto">

            <DiagramHeader />

            <div id="canvacontainer"></div>
            {/* <canvas id="imagecanvas"></canvas> */}

            <ImageCanvas completeimageSettings={completeimageSettings} image={props.image} setCanvas={setCanvas} setctxStore={setCtxStore}/>
            
            {/* <canvas
                height={completeimageSettings.lastY * 2}
                id="imagecanvas"
                ref={canvasRef}
                width={completeimageSettings.lastX * 2}>
            </canvas> */}


            {/* <DiagramFooter infos={forfooter} myzoom={myzoom} spritemap={props.spritemap}/> */}
            <div className="d-flex diagram-footer justify-content-end mt-3">

                <ClayButton className="mr-3">
                    <span className="inline-item inline-item-before">
                        <ClayIcon spritemap={props.spritemap} symbol="expand" />
                    </span>

                    {"Expand"}
                </ClayButton>

                <div className="d-flex">

                    <ClayButton
                        className=""
                        displayType="secondary"

                    // onclick={() => zoom()}

                    >
                        {"-"}
                    </ClayButton>

                    <ClaySelect
                        aria-label="Select Label"
                        className="ml-3 mr-3"
                        id="mySelectId">
                        {options.map(item => (
                            <ClaySelect.Option
                                key={item.value}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </ClaySelect>

                    <ClayButton
                        className=""
                        displayType="secondary"

                    // onClick={() => zoom(ctxStore, canvas, 250+10, 350+10, 1.1)}

                    >
                        {"+"}
                    </ClayButton>

                    {/* <Datalist items={options} /> */}


                </div>

                <ClayButton
                    className="ml-3 reset-zoom"
                    displayType="secondary"

                    onClick={() => resetZoom(ctxStore, width, height, img)}

                >{"Reset Zoom"}</ClayButton>

            </div>

        </div>
    );
};

Diagram.defaultProps = {
    // imageSettings: {

    //     clicks: null, 
    //     ctx: null,
    //     imagePoints, 

    //     scaleFactor: 1,
    // }
};

Diagram.propTypes = {
    // image: PropTypes.string,

    completeimageSettings: PropTypes.shape({
        height: PropTypes.number,
        lastX: PropTypes.number,
        lastY: PropTypes.number,
        scaleFactor: PropTypes.double,
        width: PropTypes.number,
    }),

    // myzoom: PropTypes.func,
    // setCanvas: PropTypes.func,
    // setCtxStore: PropTypes.func,
    // spritemap: PropTypes.string,
};

export default Diagram;
