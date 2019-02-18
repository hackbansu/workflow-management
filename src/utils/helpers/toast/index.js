import { changeToastStateAction } from 'actions/common';
import store from 'store';

const { dispatch } = store;

/**
 * Show the toast message by dispatching the corresponding action.
 * @param {string} text - text to show in toast message
 */
export function showToast(text) {
    dispatch(changeToastStateAction(true, text));
    setTimeout(() => {
        dispatch(changeToastStateAction(false, ''));
    }, 3000);
}
