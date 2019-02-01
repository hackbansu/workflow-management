import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import loaderReducer from './loaderReducer';
import toastReducer from './toastReducer';

const a = 'fdd';

export default combineReducers({
    currentUser: currentUserReducer,
    loader: loaderReducer,
    toast: toastReducer,
});
