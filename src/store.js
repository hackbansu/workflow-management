import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { loadStore, saveStore } from 'utils/localStorage';
import rootReducer from './reducers';

export const history = createHistory();

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const persistedState = loadStore();

const store = createStore(connectRouter(history)(rootReducer), persistedState, composedEnhancers);

store.subscribe(() => {
    saveStore({
        currentUser: store.getState().currentUser,
    });
});

export default store;
