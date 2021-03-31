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
import ClayColorPicker from '@clayui/color-picker';
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
    newPinSettings,
    pins, 
    spritemap,
    zoomController
}) => {
    const [addPinHandler, setAddPinHandler] = useState(false)
    const [resetZoom, setResetZoom] = useState(false)
    const [zoomInHandler, setZoomInHandler] = useState(false)
    const [zoomOutHandler, setZoomOutHandler ] = useState(false)
    const [imageState, setImageState] = useState({
        k: 1,
        x: 0,
        y: 0,
    })
    const [scale, setScale] = useState(1)
    const  [seletedOption, setSeletedOption] = useState(1)
    const [cPins, setCpins] = useState(pins)

    const [addNewPinState, setAddNewPinState] = useState({
        color: newPinSettings.colorPicker.selectedColor,
        radius: newPinSettings.defaultRadius,
    })


    // const [customColors, setCustoms] = useState(["008000", "00FFFF", "0000FF"]);
    // const [color, setColor] = useState(customColors[0]);

    useEffect(() => {
        setSeletedOption(imageState.k)
    }, [imageState])


    const options = [
        {
            label: "200%",
            value: "200"
        },
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
        console.log('handleZoom')
        setSeletedOption(event.target.value / 100)
        setImageState({
            k: parseFloat(event.target.value / 100),
            x: imageState.x,
            y: imageState.y,
        })
    }
    
    const handleImageState = (p) => {
        setImageState({
            k: p.k,
            x: p.x,
            y: p.y,
        })
    }

    return (
        <div className="diagram mx-auto">
            {/* <ClayColorPicker
                colors={customColors}
                label="Custom Colors"
                name="colorPicker2"
                onColorsChange={setCustoms}
                onValueChange={setColor}
                showHex={true}
                spritemap={spritemap}
                title="Custom Colors"
                value={color}
            /> */}
            <DiagramHeader 
                addNewPinState={addNewPinState}
                newPinSettings={newPinSettings}
                setAddNewPinState={setAddNewPinState}
                setAddPinHandler={setAddPinHandler}
            />

            <ImagePins 
                addNewPinState={addNewPinState}
                addPinHandler={addPinHandler}
                cPins={cPins}
                completeImageSettings={completeImageSettings}
                image={image}
                imageState={imageState}
                navigationController={navigationController}
                resetZoom={resetZoom}
                scale={scale}
                setAddPinHandler={setAddPinHandler} 
                setCpins={setCpins}
                setImageState={setImageState}
                setResetZoom={setResetZoom}
                setScale={setScale}
                setZoomInHandler={setZoomInHandler}
                setZoomOutHandler={setZoomOutHandler}
                zoomController={zoomController}
                zoomInHandler={zoomInHandler}
                zoomOutHandler={zoomOutHandler}/>
            

            {/* <DiagramFooter infos={forfooter} myzoom={myzoom} spritemap={spritemap}/> */}
            <div className="d-flex diagram-footer justify-content-end mt-3">

                <ClayButton 
                    className="mr-3"
                    onClick={() => setAddPinHandler(true)
                    }>
                    <span className="inline-item inline-item-before">
                        <ClayIcon spritemap={spritemap} symbol="pin" />
                    </span>
                    Add Pin
                </ClayButton>

                <ClayButton className="mr-3">
                    <span className="inline-item inline-item-before">
                        <ClayIcon spritemap={spritemap} symbol="expand" />
                    </span>

                    Expand
                </ClayButton>

                <div className="d-flex">

                    <ClayButton
                        className=""
                        displayType="secondary"

                        onClick={() => {
                            setZoomOutHandler(true)
                        }}

                    >
                        -
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

                        onClick={() => {
                            setZoomInHandler(true)
                        }}

                    >
                        +
                    </ClayButton>

                    {/* <Datalist items={options} /> */}


                </div>

                {enableResetZoom && (
                    <ClayButton
                        className="ml-3 reset-zoom"
                        displayType="secondary"
                        id="reset"
                        onClick={() => setResetZoom(true)}

                    >Reset Zoom</ClayButton>
                )}

            </div>


        </div>
    );
};

Diagram.defaultProps = {
    cPins: [],
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
    newPinSettings: {
        colorPicker: {
            defaultColors: ['AC68D7', '96D470', 'F2EE8F', 'F4C4A9', 'F1A3BB', '67DC19', '959FEF', 'A6C198', 'FED998', '#38F95', 'FD9945', '1A588B'],
            selectedColor: 'F1A3BB',
            useNative: false
        },
        defaultRadius: 15,
    },
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
    cPins: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string,
            id: PropTypes.number,
            r: PropTypes.number,
            x: PropTypes.double,
            y: PropTypes.double,
        })
    ),
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
    newPinSettings: PropTypes.shape({
        colorPicker: PropTypes.shape({
            defaultColors: PropTypes.array,
            selectedColor: PropTypes.string,
            useNative: PropTypes.bool,
        }),
        defaultRadius: PropTypes.number,
    }),
    setPins: PropTypes.func,
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
