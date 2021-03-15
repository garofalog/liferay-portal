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
import { ClaySelect, ClaySelectWithOption } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import DiagramFooter from './DiagramFooter';
import DiagramHeader from './DiagramHeader';
import ImagePins from './ImagePins'

import NavigationButtons from './NavigationButtons'

import ZoomContainer from './ZoomController'


const Diagram = ({ 
    completeImageSettings, 
    enableResetZoom, 
    image, 
    navigationController, 
    pins, 
    spritemap,
    zoomController
}) => {
    const [resetHandler, setResetHandler] = useState(false)
    const [imageState, setImageState] = useState({
        k: 1,
        x: 0,
        y: 0,
    })
    const [scale, setScale] = useState(1)


    useEffect(() => {
        setTimeout(() => {
            console.log('è un debbounce')
            setResetHandler(false)
        }, 500);
    })

    useEffect(() => {

    }, [imageState])


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

    function handleZoomChange(event) {
        setScale(parseFloat(event.target.value / 100))
    }
    
    const handleImageState = (p) => {
        console.log("cliccato +")
        setImageState({
            k: p.k,
            x: p.x,
            y: p.y,
        })
    }


    return (
        <div className="diagram mx-auto">

            <DiagramHeader />

            <ImagePins 
                completeImageSettings={completeImageSettings}
                execResetZoom={resetHandler}
                image={image}
                imageState={imageState}
                navigationController={navigationController} 
                pins={pins}
                scale={scale}
                setImageState={handleImageState}
                setScale={setScale}
                zoomController={zoomController}
                />
            

            {/* <DiagramFooter infos={forfooter} myzoom={myzoom} spritemap={spritemap}/> */}
            <div className="d-flex diagram-footer justify-content-end mt-3">

                <ClayButton className="mr-3">
                    <span className="inline-item inline-item-before">
                        <ClayIcon spritemap={spritemap} symbol="expand" />
                    </span>

                    {"Expand"}
                </ClayButton>

                <div className="d-flex">

                    <ClayButton
                        className=""
                        displayType="secondary"

                        onClick={() => handleImageState({
                            k: imageState.k - .5,
                            x: imageState.x,
                            y: imageState.y,
                        })}
                    >
                        {"-"}
                    </ClayButton>

                    <ClaySelect
                        aria-label="Select Label"
                        className="ml-3 mr-3"
                        id="mySelectId"
                        onChange={handleZoomChange}>
                        {options.map(item => (
                            <ClaySelect.Option
                                
                                key={item.value}
                                label={item.label}
                                selected={item.value === '100' ? true : false}
                                value={item.value}
                            />
                        ))}
                    </ClaySelect>

                    <ClayButton
                        className=""
                        displayType="secondary"

                        onClick={() => handleImageState({
                            k: imageState.k + .5,
                            x: imageState.x,
                            y: imageState.y,
                        })}

                    >
                        {"+"}
                    </ClayButton>

                    {/* <Datalist items={options} /> */}


                </div>

                {enableResetZoom && (
                    <ClayButton
                        className="ml-3 reset-zoom"
                        displayType="secondary"
                        id="reset"
                        onClick={() => setResetHandler(true)}

                    >{"Reset Zoom"}</ClayButton>
                )}

                



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

    completeImageSettings: PropTypes.shape({
        height: '300px',
        width: '100%',
    }),
    enableResetZoom: true,
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
    pins: [],
    zoomController: {
        enable: true,
        position: {
            bottom: '0px',
            left: '',
            right: '200px',
            top: ''
        }
    },
};

Diagram.propTypes = {
    // image: PropTypes.string,

    completeImageSettings: PropTypes.shape({
        height: PropTypes.string,
        lastX: PropTypes.number,
        lastY: PropTypes.number,
        scaleFactor: PropTypes.double,
        width: PropTypes.string,
    }),
    enableResetZoom: PropTypes.bool,
    navigationController: PropTypes.shape({
        dragStep: PropTypes.number,
        enable: PropTypes.bool,
        enableDrag: PropTypes.bool,
        position: PropTypes.shape({
            bottom: PropTypes.string,
            left: PropTypes.string,
            right: PropTypes.string,
            top: PropTypes.string,
        }),
    }),
    pins: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.number,
            r: PropTypes.number,
            x: PropTypes.double,
            y: PropTypes.double,
        })
    ),
    spritemap: PropTypes.string,
    zoomController: PropTypes.shape({
        enable: PropTypes.bool,
        enablePanZoom: PropTypes.true,
        position: PropTypes.shape({
            bottom: PropTypes.string,
            left: PropTypes.string,
            right: PropTypes.string,
            top: PropTypes.string,
        }),
    }),
};

export default Diagram;
