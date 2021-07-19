import React, {useReducer} from 'react'

export default const DiagramStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    function reducer(state, action) {
        switch (action.type) {
            case "ADD_TO_CART":
                return { quantity: state.quantity + 1 };
            case "REMOVE_FROM_CART":
                return { quantity: state.quantity - 1 };
            default:
                throw new Error();
        }
    }


} 