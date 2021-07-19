export const ADD_PIN = 'ADD_PIN' //: false,
export const REMOVE_PIN = 'REMOVE_PIN' //: false,
export const ZOOM_IN = 'ZOOM_IN ' //: false,
export const ZOOM_OUT = 'ZOOM_OUT' // : false
 
const addPin = (pin, state) => {
    const updatedPin = [...state.pin];
    const updatedPinIndex = updatedPin.findIndex(
        item => item.id === pin.id
    );

    if (updatedPinIndex < 0) {
        updatedPin.push({ ...pin, quantity: 1 });
    } else {
        const updatedItem = {
            ...updatedPin[updatedPinIndex]
        };
        updatedItem.quantity++;
        updatedPin[updatedPinIndex] = updatedItem;
    }
    return { ...state, pins: updatedPin };
};

const removePin = (pinId, state) => {
    console.log('Removing product with id: ' + pinId);
    const updatedPin = [...state.pins];
    const updatedPinIndex = updatedPin.findIndex(item => item.id === productId);

    const updatedItem = {
        ...updatedPin[updatedPinIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
        updatedPin.splice(updatedPinIndex, 1);
    } else {
        updatedPin[updatedPinIndex] = updatedItem;
    }
    return { ...state, pins: updatedPin };
};



const DiagramReducer = (state, action) => {
    switch (action.type) {
        case ADD_PIN:
            return addPin(action.pin, state)
        case REMOVE_PIN:
            return removePin(action.pin.id, state)
        default:
            return state;
    }
}

