import { PLUS_NUMBER, MINUS_NUMBER } from "../types";

const initialState = 0;

export default (state = initialState, action) => {
    switch(action.type) {
        case PLUS_NUMBER:
           let newState = ++state;
           return newState;

        case MINUS_NUMBER:
            let currentState = --state
            return currentState;
           
        default: 
            return state;
    }
}