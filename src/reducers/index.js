import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import employeesReducer from './employeesReducer';
import loaderReducer from './loaderReducer';
import toastReducer from './toastReducer';
import modalReducer from './modalReducer';

const a = 'fdd';

export default combineReducers({
    currentUser: currentUserReducer,
    employees: employeesReducer,
    loader: loaderReducer,
    toast: toastReducer,
    modal: modalReducer,
});
