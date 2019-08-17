import { SET_HELLO } from "../types";

const initialState = 0;

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_HELLO:
        let nextState = initialState;
           return action.payload;
           
        default: 
            return state;
    }
}