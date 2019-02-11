import { changeLoaderStateAction } from 'actions/common';
import store from 'store';

const { dispatch } = store;

/**
 * Show the toast message by dispatching the corresponding action.
 * @param {boolean} show - status of the loader (true/false)
 */
export function showLoader(show) {
    dispatch(changeLoaderStateAction(show));
}
