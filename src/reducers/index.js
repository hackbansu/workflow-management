import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import loaderReducer from './loaderReducer';

const a = 'fdd';

export default combineReducers({
    homeReducer,
    loader: loaderReducer,
});
