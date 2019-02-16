import actions from 'constants/actions.js';
import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import employeesReducer from './employeesReducer';
import loaderReducer from './loaderReducer';
import toastReducer from './toastReducer';
import modalReducer from './modalReducer';

const { LOGOUT } = actions.user;

const appReducer = combineReducers({
    currentUser: currentUserReducer,
    employees: employeesReducer,
    loader: loaderReducer,
    toast: toastReducer,
    modal: modalReducer,
});

const initialState = {
    currentUser: {},
    employees: {},
    loader: {},
    toast: {},
    modal: {},
};

/**
 * In case of logout, entire store need to be deleted.
 */
export default (state = initialState, action) => {
    switch (action.type) {
    case LOGOUT:
        return initialState;
    default:
        return appReducer(state, action);
    }
};
