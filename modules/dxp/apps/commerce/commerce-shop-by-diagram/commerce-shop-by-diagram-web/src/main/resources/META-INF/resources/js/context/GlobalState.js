import React, { useState, useReducer } from 'react';

import PinContext from './PinContext';
import { DiagramReducer, ADD_PIN, REMOVE_PIN } from './reducers';

const GlobalState = props => {
    // const pins = [
    //     {
    //         cx: 150,
    //         cy: 50,
    //         draggable: true,
    //         fill: '#f90e19',
    //         id: 0,
    //         label: 'zero',
    //         linked_to_sku: 'sku',
    //         quantity: 0,
    //         r: 25,
    //         sku: '0bskoi0o',
    //     },
    // ];
    
    // const [pins, setPins] = useState([]);
    const [pinsState, dispatch] = useReducer(DiagramReducer, { pins: [] });

    const addPinToDiagram = pin => {
        setTimeout(() => {
            // setPins(pinsupdated);
            dispatch({ type: ADD_PIN, pin: pin });
        }, 700);
    };

    const removePinFromDiagram = pinId => {
        setTimeout(() => {
            // setPins(pinsupdated);
            dispatch({ type: REMOVE_PIN, pinId: pinId });
        }, 700);
    };
 
    return (
        <ShopContext.Provider
            value={{
                pins: pinsState.pins,
                addPinToDiagram: addPinToDiagram,
                removePinFromDiagram: removePinFromDiagram
            }}
        >
            {props.children}
        </ShopContext.Provider>
    );
};

export default GlobalState;
