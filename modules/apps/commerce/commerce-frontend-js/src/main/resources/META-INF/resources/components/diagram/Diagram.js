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
import ImagePins from './ImagePins'

import NavigationButtons from './NavigationButtons'

import ZoomContainer from './ZoomController'


const Diagram = ({ completeImageSettings, enableDrag, enableNavigationController, enableResetZoom, enableZoomController, image, spritemap}) => {
    const [resetHandler, setResetHandler] = useState(false)

    // const completeImageSettings = {
    //     height: imageSettings.height,
    //     lastX: imageSettings.width / 2,
    //     lastY: imageSettings.height / 2,
    //     scale: 1.1, //imageSettings.scaleFactor,
    //     width: imageSettings.width,

    // }

    useEffect(() => {
        setTimeout(() => {
            console.log('è un debbounce')
            setResetHandler(false)
        }, 500);
    })


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

            <ImagePins 
                completeImageSettings={completeImageSettings}
                enableDrag={enableDrag}
                enableNavigationController={enableNavigationController}
                enableZoomController={enableZoomController}
                execResetZoom={resetHandler}
                image={image} 

                // zoomIn={zoomIn} 

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
                                selected={item.value === '100' ? true : false}
                                value={item.value}
                            />
                        ))}
                    </ClaySelect>

                    <ClayButton
                        className=""
                        displayType="secondary"

                        // onClick={() => zoomIn}

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

    enableDrag: true,
    enableNavigationController: true,
    enableResetZoom: true,
    enableZoomController: true
};

Diagram.propTypes = {
    // image: PropTypes.string,

    completeImageSettings: PropTypes.shape({
        height: PropTypes.number,
        lastX: PropTypes.number,
        lastY: PropTypes.number,
        scaleFactor: PropTypes.double,
        width: PropTypes.number,
    }),
    enableDrag: PropTypes.bool,
    enableNavigationController: PropTypes.bool,
    enableResetZoom: PropTypes.bool,

    enableZoomController: PropTypes.bool,

    // myzoom: PropTypes.func,
    // setCanvas: PropTypes.func,
    // setCtxStore: PropTypes.func,

    spritemap: PropTypes.string,

    zoomIn: PropTypes.func,
};

export default Diagram;
