import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import employeesReducer from './employeesReducer';
import loaderReducer from './loaderReducer';
import toastReducer from './toastReducer';

const a = 'fdd';

export default combineReducers({
    currentUser: currentUserReducer,
    employees: employeesReducer,
    loader: loaderReducer,
    toast: toastReducer,
});
