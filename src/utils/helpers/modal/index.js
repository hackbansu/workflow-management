import { changeModalStateAction } from 'actions/common';
import store from 'store';

const { dispatch } = store;

/**
 * Show the toast message by dispatching the corresponding action.
 * @param {string} text - text to show in toast message
 */
export function showModal(heading, text) {
    dispatch(changeModalStateAction(heading, text));
    document.getElementsByClassName('modal-open-button')[0].click();
}
