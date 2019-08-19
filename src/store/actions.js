import { PLUS_NUMBER, MINUS_NUMBER, FETCH_TODOS } from "./types";
import axios from 'axios'

export const plusNumber = (payload) => ({
    type: PLUS_NUMBER,
    payload
});

export const minusNumber = (payload) => ({
    type: MINUS_NUMBER,
    payload
});

export const fetchTodos = () => async dispatch => {
    const resGet = 'https://jsonplaceholder.typicode.com/todos'
    const response = await axios.get(resGet);
    dispatch({
        type: FETCH_TODOS,
        payload: response.data
    })
}