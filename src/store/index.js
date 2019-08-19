import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

export const middleware = [thunk]

export const composeEnhancers =
    typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    compose; // eslint-disable-line

export const store = createStore(
    reducers,
    undefined, // начальный state
    composeEnhancers(applyMiddleware(...middleware))
    );
