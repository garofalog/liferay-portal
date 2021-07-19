export const ADD_PIN_TO_DIAGRAM = 'ADD_PIN_TO_DIAGRAM';
export const REMOVE_PIN_FROM_DIAGRAM = 'REMOVE_PIN_FROM_DIAGRAM';

export const addPinToDiagram = product => {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: ADD_PIN_TO_DIAGRAM,
                payload: pin
            });
        }, 700);
    };
};

export const removePinFromDiagram = productId => {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: REMOVE_PIN_FROM_DIAGRAM,
                payload: pinId
            });
        }, 700);
    };
};
